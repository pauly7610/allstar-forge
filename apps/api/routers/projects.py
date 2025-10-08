"""
Projects API Router

Handles project lifecycle management including:
- Project creation and provisioning
- Project listing and filtering
- Project status updates
- Integration with Temporal workflows
"""

from fastapi import APIRouter, Depends, HTTPException, Query
from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime
import uuid
import structlog

from auth import oidc_auth
from db import get_connection
from audit_service import emit_event

logger = structlog.get_logger()
router = APIRouter()


class CreateProjectRequest(BaseModel):
    """Request model for creating a new project"""
    name: str = Field(..., min_length=3, max_length=100, description="Project name")
    template: str = Field(..., description="Template to use for project")
    environment: str = Field(..., description="Target environment (dev/staging/prod)")
    team: Optional[str] = Field(None, description="Team responsible for project")
    metadata: Optional[dict] = Field(default_factory=dict, description="Additional project metadata")


class ProjectResponse(BaseModel):
    """Response model for project data"""
    id: str
    name: str
    template: str
    environment: str
    team: Optional[str]
    status: str
    created_at: datetime
    updated_at: datetime
    created_by: str
    metadata: dict


class ProjectListResponse(BaseModel):
    """Response model for project listing"""
    projects: List[ProjectResponse]
    total: int
    page: int
    page_size: int


@router.get("", response_model=ProjectListResponse)
async def list_projects(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(20, ge=1, le=100, description="Items per page"),
    status: Optional[str] = Query(None, description="Filter by project status"),
    team: Optional[str] = Query(None, description="Filter by team"),
    identity: dict = Depends(oidc_auth)
):
    """List projects with pagination and filtering"""
    try:
        async with get_connection() as conn:
            # Build WHERE clause for filtering
            where_conditions = []
            params = []
            
            if status:
                where_conditions.append("status = $%d" % (len(params) + 1))
                params.append(status)
            
            if team:
                where_conditions.append("team = $%d" % (len(params) + 1))
                params.append(team)
            
            where_clause = "WHERE " + " AND ".join(where_conditions) if where_conditions else ""
            
            # Get total count
            count_query = f"SELECT COUNT(*) FROM projects {where_clause}"
            total = await conn.fetchval(count_query, *params)
            
            # Get projects with pagination
            offset = (page - 1) * page_size
            projects_query = f"""
                SELECT id, name, template, environment, team, status, 
                       created_at, updated_at, created_by, metadata
                FROM projects {where_clause}
                ORDER BY created_at DESC
                LIMIT ${len(params) + 1} OFFSET ${len(params) + 2}
            """
            params.extend([page_size, offset])
            
            rows = await conn.fetch(projects_query, *params)
            projects = [ProjectResponse(**dict(row)) for row in rows]
            
            # Log the list operation
            await emit_event(
                actor=identity["sub"],
                action="project.list",
                resource="projects",
                resource_id=None,
                success=True,
                metadata={"page": page, "page_size": page_size, "filters": {"status": status, "team": team}}
            )
            
            return ProjectListResponse(
                projects=projects,
                total=total,
                page=page,
                page_size=page_size
            )
            
    except Exception as e:
        logger.error("Failed to list projects", error=str(e), actor=identity["sub"])
        raise HTTPException(status_code=500, detail="Failed to retrieve projects")


@router.post("", response_model=dict)
async def create_project(
    req: CreateProjectRequest, 
    identity: dict = Depends(oidc_auth)
):
    """Create a new project and initiate provisioning workflow"""
    try:
        project_id = str(uuid.uuid4())
        now = datetime.utcnow()
        
        async with get_connection() as conn:
            # Insert project record
            await conn.execute("""
                INSERT INTO projects (id, name, template, environment, team, status, created_by, metadata)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
            """, project_id, req.name, req.template, req.environment, req.team, "provisioning", identity["sub"], req.metadata)
            
            # Log the creation event
            await emit_event(
                actor=identity["sub"],
                action="project.create",
                resource="project",
                resource_id=project_id,
                success=True,
                metadata=req.model_dump()
            )
            
            logger.info("Project created", project_id=project_id, name=req.name, actor=identity["sub"])
            
            # TODO: Start Temporal workflow for provisioning
            # For now, return mock workflow ID
            workflow_id = f"wf_provision_{project_id[:8]}"
            
            return {
                "project_id": project_id,
                "workflow_id": workflow_id,
                "status": "provisioning",
                "message": "Project creation initiated"
            }
            
    except Exception as e:
        logger.error("Failed to create project", error=str(e), actor=identity["sub"], project_name=req.name)
        raise HTTPException(status_code=500, detail="Failed to create project")


@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    identity: dict = Depends(oidc_auth)
):
    """Get project details by ID"""
    try:
        async with get_connection() as conn:
            row = await conn.fetchrow("""
                SELECT id, name, template, environment, team, status, 
                       created_at, updated_at, created_by, metadata
                FROM projects WHERE id = $1
            """, project_id)
            
            if not row:
                raise HTTPException(status_code=404, detail="Project not found")
            
            # Log the view event
            await emit_event(
                actor=identity["sub"],
                action="project.view",
                resource="project",
                resource_id=project_id,
                success=True
            )
            
            return ProjectResponse(**dict(row))
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to get project", error=str(e), project_id=project_id, actor=identity["sub"])
        raise HTTPException(status_code=500, detail="Failed to retrieve project")


@router.put("/{project_id}/status")
async def update_project_status(
    project_id: str,
    status: str = Field(..., description="New project status"),
    identity: dict = Depends(oidc_auth)
):
    """Update project status"""
    valid_statuses = ["provisioning", "active", "suspended", "deleted"]
    if status not in valid_statuses:
        raise HTTPException(status_code=400, detail=f"Invalid status. Must be one of: {valid_statuses}")
    
    try:
        async with get_connection() as conn:
            # Update project status
            result = await conn.execute("""
                UPDATE projects 
                SET status = $1, updated_at = NOW()
                WHERE id = $2
            """, status, project_id)
            
            if result == "UPDATE 0":
                raise HTTPException(status_code=404, detail="Project not found")
            
            # Log the status change
            await emit_event(
                actor=identity["sub"],
                action="project.status_update",
                resource="project",
                resource_id=project_id,
                success=True,
                metadata={"new_status": status}
            )
            
            logger.info("Project status updated", project_id=project_id, status=status, actor=identity["sub"])
            
            return {"message": "Project status updated successfully"}
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to update project status", error=str(e), project_id=project_id, actor=identity["sub"])
        raise HTTPException(status_code=500, detail="Failed to update project status")


