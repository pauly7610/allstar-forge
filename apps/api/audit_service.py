"""
Audit Service for Allstar Forge Platform

Provides comprehensive audit logging capabilities:
- Structured JSON logging for SIEM integration
- PostgreSQL persistence for compliance
- Real-time event streaming
- Security and compliance reporting
"""

import json
import structlog
from typing import Any, Optional, List, Dict
from datetime import datetime
from db import get_connection

logger = structlog.get_logger()


async def emit_event(
    actor: str,
    action: str,
    resource: str,
    resource_id: Optional[str] = None,
    success: bool = True,
    metadata: Optional[Dict[str, Any]] = None,
    ip_address: Optional[str] = None,
    user_agent: Optional[str] = None
) -> str:
    """
    Emit an audit event with structured logging and database persistence
    
    Args:
        actor: User or system performing the action
        action: Action being performed (e.g., 'project.create', 'user.login')
        resource: Resource type being acted upon (e.g., 'project', 'user')
        resource_id: Specific resource identifier
        success: Whether the action succeeded
        metadata: Additional context data
        ip_address: Client IP address
        user_agent: Client user agent string
    
    Returns:
        Event ID for tracking
    """
    event_id = None
    
    try:
        # Prepare event payload
        payload = {
            "actor": actor,
            "action": action,
            "resource": resource,
            "resource_id": resource_id,
            "success": success,
            "metadata": metadata or {},
            "timestamp": datetime.utcnow().isoformat(),
            "ip_address": ip_address,
            "user_agent": user_agent
        }
        
        # Emit structured JSON log for SIEM/external systems
        logger.info(
            "audit_event",
            event_id=event_id,
            **payload
        )
        
        # Persist to database
        async with get_connection() as conn:
            result = await conn.fetchrow("""
                INSERT INTO audit_events (
                    actor, action, resource, resource_id, success, 
                    metadata, ip_address, user_agent
                ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                RETURNING id
            """, 
                payload["actor"], 
                payload["action"], 
                payload["resource"], 
                payload["resource_id"], 
                payload["success"], 
                json.dumps(payload["metadata"]),
                payload["ip_address"],
                payload["user_agent"]
            )
            event_id = str(result["id"])
            
        logger.info("Audit event persisted", event_id=event_id, action=action, actor=actor)
        return event_id
        
    except Exception as e:
        logger.error("Failed to emit audit event", error=str(e), action=action, actor=actor)
        # Don't raise exception to avoid breaking the main flow
        return ""


async def get_audit_events(
    actor: Optional[str] = None,
    action: Optional[str] = None,
    resource: Optional[str] = None,
    resource_id: Optional[str] = None,
    success: Optional[bool] = None,
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None,
    limit: int = 100,
    offset: int = 0
) -> List[Dict[str, Any]]:
    """
    Retrieve audit events with filtering and pagination
    
    Args:
        actor: Filter by actor
        action: Filter by action
        resource: Filter by resource type
        resource_id: Filter by specific resource
        success: Filter by success status
        start_date: Filter events after this date
        end_date: Filter events before this date
        limit: Maximum number of events to return
        offset: Number of events to skip
    
    Returns:
        List of audit events
    """
    try:
        async with get_connection() as conn:
            # Build WHERE clause dynamically
            where_conditions = []
            params = []
            param_count = 0
            
            if actor:
                param_count += 1
                where_conditions.append(f"actor = ${param_count}")
                params.append(actor)
            
            if action:
                param_count += 1
                where_conditions.append(f"action = ${param_count}")
                params.append(action)
            
            if resource:
                param_count += 1
                where_conditions.append(f"resource = ${param_count}")
                params.append(resource)
            
            if resource_id:
                param_count += 1
                where_conditions.append(f"resource_id = ${param_count}")
                params.append(resource_id)
            
            if success is not None:
                param_count += 1
                where_conditions.append(f"success = ${param_count}")
                params.append(success)
            
            if start_date:
                param_count += 1
                where_conditions.append(f"timestamp >= ${param_count}")
                params.append(start_date)
            
            if end_date:
                param_count += 1
                where_conditions.append(f"timestamp <= ${param_count}")
                params.append(end_date)
            
            where_clause = "WHERE " + " AND ".join(where_conditions) if where_conditions else ""
            
            # Add pagination parameters
            param_count += 1
            limit_param = f"${param_count}"
            param_count += 1
            offset_param = f"${param_count}"
            params.extend([limit, offset])
            
            query = f"""
                SELECT id, timestamp, actor, action, resource, resource_id, 
                       success, metadata, ip_address, user_agent
                FROM audit_events {where_clause}
                ORDER BY timestamp DESC
                LIMIT {limit_param} OFFSET {offset_param}
            """
            
            rows = await conn.fetch(query, *params)
            return [dict(row) for row in rows]
            
    except Exception as e:
        logger.error("Failed to retrieve audit events", error=str(e))
        return []


async def get_audit_summary(
    start_date: Optional[datetime] = None,
    end_date: Optional[datetime] = None
) -> Dict[str, Any]:
    """
    Get audit event summary statistics
    
    Returns:
        Summary statistics including total events, success rate, top actors, etc.
    """
    try:
        async with get_connection() as conn:
            # Build date filter
            date_filter = ""
            params = []
            if start_date and end_date:
                date_filter = "WHERE timestamp BETWEEN $1 AND $2"
                params = [start_date, end_date]
            elif start_date:
                date_filter = "WHERE timestamp >= $1"
                params = [start_date]
            elif end_date:
                date_filter = "WHERE timestamp <= $1"
                params = [end_date]
            
            # Get summary statistics
            summary_query = f"""
                SELECT 
                    COUNT(*) as total_events,
                    COUNT(*) FILTER (WHERE success = true) as successful_events,
                    COUNT(*) FILTER (WHERE success = false) as failed_events,
                    COUNT(DISTINCT actor) as unique_actors,
                    COUNT(DISTINCT action) as unique_actions,
                    COUNT(DISTINCT resource) as unique_resources
                FROM audit_events {date_filter}
            """
            
            summary = await conn.fetchrow(summary_query, *params)
            
            # Get top actors
            actors_query = f"""
                SELECT actor, COUNT(*) as event_count
                FROM audit_events {date_filter}
                GROUP BY actor
                ORDER BY event_count DESC
                LIMIT 10
            """
            
            top_actors = await conn.fetch(actors_query, *params)
            
            # Get top actions
            actions_query = f"""
                SELECT action, COUNT(*) as event_count
                FROM audit_events {date_filter}
                GROUP BY action
                ORDER BY event_count DESC
                LIMIT 10
            """
            
            top_actions = await conn.fetch(actions_query, *params)
            
            return {
                "summary": dict(summary),
                "top_actors": [dict(row) for row in top_actors],
                "top_actions": [dict(row) for row in top_actions]
            }
            
    except Exception as e:
        logger.error("Failed to get audit summary", error=str(e))
        return {"summary": {}, "top_actors": [], "top_actions": []}


