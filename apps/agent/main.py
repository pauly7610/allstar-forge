"""
Allstar Forge Agent Service

Provides intelligent agentic workflows for:
- Automated infrastructure provisioning
- Risk assessment and compliance checking
- Human-in-the-loop approvals
- Cost optimization recommendations
- Security policy enforcement
"""

from fastapi import FastAPI, HTTPException, BackgroundTasks
from pydantic import BaseModel, Field
from typing import Dict, List, Optional, Any
from datetime import datetime
import uuid
import structlog
import asyncio
from enum import Enum

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()

app = FastAPI(
    title="Allstar Forge Agent Service",
    description="Intelligent agentic workflows for infrastructure automation",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)


class RiskLevel(str, Enum):
    """Risk levels for provisioning decisions"""
    LOW = "low"
    MEDIUM = "medium"
    HIGH = "high"
    CRITICAL = "critical"


class ProvisionPlan(BaseModel):
    """Request model for infrastructure provisioning plan"""
    project: str = Field(..., description="Project identifier")
    resources: Dict[str, Any] = Field(..., description="Resource specifications")
    risk_level: RiskLevel = Field(..., description="Risk assessment level")
    environment: str = Field(..., description="Target environment")
    team: Optional[str] = Field(None, description="Responsible team")
    budget_limit: Optional[float] = Field(None, description="Budget constraint")
    compliance_requirements: List[str] = Field(default_factory=list, description="Required compliance standards")


class ProvisionResponse(BaseModel):
    """Response model for provisioning decisions"""
    status: str
    plan_id: str
    approval_required: bool
    risk_assessment: Dict[str, Any]
    cost_estimate: Optional[Dict[str, Any]]
    compliance_status: Dict[str, Any]
    recommendations: List[str]
    next_steps: List[str]


class ApprovalRequest(BaseModel):
    """Request model for human approval"""
    plan_id: str
    approver: str
    decision: bool
    comments: Optional[str] = None


class ApprovalResponse(BaseModel):
    """Response model for approval decisions"""
    plan_id: str
    approved: bool
    approver: str
    timestamp: datetime
    comments: Optional[str]


# In-memory storage for demo purposes (use database in production)
pending_approvals: Dict[str, Dict[str, Any]] = {}
provision_plans: Dict[str, Dict[str, Any]] = {}


@app.post("/agent/provision/plan", response_model=ProvisionResponse)
async def create_provision_plan(plan: ProvisionPlan) -> ProvisionResponse:
    """
    Create an intelligent provisioning plan with risk assessment
    
    Analyzes the request and determines if human approval is required
    based on risk level, cost, and compliance requirements.
    """
    try:
        plan_id = str(uuid.uuid4())
        
        logger.info("Creating provision plan", plan_id=plan_id, project=plan.project, risk_level=plan.risk_level)
        
        # Perform risk assessment
        risk_assessment = await assess_risk(plan)
        
        # Calculate cost estimate
        cost_estimate = await calculate_cost_estimate(plan)
        
        # Check compliance requirements
        compliance_status = await check_compliance(plan)
        
        # Determine if approval is required
        approval_required = determine_approval_requirement(plan, risk_assessment, cost_estimate)
        
        # Generate recommendations
        recommendations = await generate_recommendations(plan, risk_assessment, cost_estimate)
        
        # Determine next steps
        next_steps = determine_next_steps(approval_required, plan.risk_level)
        
        # Store plan for tracking
        provision_plans[plan_id] = {
            "plan": plan.model_dump(),
            "risk_assessment": risk_assessment,
            "cost_estimate": cost_estimate,
            "compliance_status": compliance_status,
            "created_at": datetime.utcnow(),
            "status": "pending_approval" if approval_required else "approved"
        }
        
        # If approval required, add to pending approvals
        if approval_required:
            pending_approvals[plan_id] = {
                "plan": plan.model_dump(),
                "risk_assessment": risk_assessment,
                "cost_estimate": cost_estimate,
                "created_at": datetime.utcnow()
            }
        
        response = ProvisionResponse(
            status="awaiting_approval" if approval_required else "approved",
            plan_id=plan_id,
            approval_required=approval_required,
            risk_assessment=risk_assessment,
            cost_estimate=cost_estimate,
            compliance_status=compliance_status,
            recommendations=recommendations,
            next_steps=next_steps
        )
        
        logger.info("Provision plan created", 
                   plan_id=plan_id, 
                   approval_required=approval_required,
                   risk_score=risk_assessment.get("score", 0))
        
        return response
        
    except Exception as e:
        logger.error("Failed to create provision plan", error=str(e), project=plan.project)
        raise HTTPException(status_code=500, detail="Failed to create provision plan")


@app.post("/agent/approval", response_model=ApprovalResponse)
async def process_approval(approval: ApprovalRequest) -> ApprovalResponse:
    """
    Process human approval for provisioning plans
    
    Updates plan status and triggers next steps based on approval decision.
    """
    try:
        if approval.plan_id not in pending_approvals:
            raise HTTPException(status_code=404, detail="Plan not found or already processed")
        
        plan_data = pending_approvals[approval.plan_id]
        
        # Update plan status
        provision_plans[approval.plan_id]["status"] = "approved" if approval.decision else "rejected"
        provision_plans[approval.plan_id]["approver"] = approval.approver
        provision_plans[approval.plan_id]["approval_comments"] = approval.comments
        provision_plans[approval.plan_id]["approved_at"] = datetime.utcnow()
        
        # Remove from pending approvals
        del pending_approvals[approval.plan_id]
        
        # If approved, trigger provisioning workflow
        if approval.decision:
            await trigger_provisioning_workflow(approval.plan_id, plan_data)
        
        response = ApprovalResponse(
            plan_id=approval.plan_id,
            approved=approval.decision,
            approver=approval.approver,
            timestamp=datetime.utcnow(),
            comments=approval.comments
        )
        
        logger.info("Approval processed", 
                   plan_id=approval.plan_id, 
                   approved=approval.decision,
                   approver=approval.approver)
        
        return response
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error("Failed to process approval", error=str(e), plan_id=approval.plan_id)
        raise HTTPException(status_code=500, detail="Failed to process approval")


@app.get("/agent/approvals")
async def list_pending_approvals() -> List[Dict[str, Any]]:
    """List all pending approval requests"""
    return [
        {
            "plan_id": plan_id,
            "project": data["plan"]["project"],
            "risk_level": data["plan"]["risk_level"],
            "cost_estimate": data["cost_estimate"],
            "created_at": data["created_at"],
            "risk_score": data["risk_assessment"].get("score", 0)
        }
        for plan_id, data in pending_approvals.items()
    ]


@app.get("/agent/plans/{plan_id}")
async def get_plan_status(plan_id: str) -> Dict[str, Any]:
    """Get status of a specific provisioning plan"""
    if plan_id not in provision_plans:
        raise HTTPException(status_code=404, detail="Plan not found")
    
    return provision_plans[plan_id]


# Helper functions for intelligent decision making

async def assess_risk(plan: ProvisionPlan) -> Dict[str, Any]:
    """Assess risk level of the provisioning request"""
    risk_factors = []
    risk_score = 0
    
    # Environment risk
    if plan.environment == "prod":
        risk_score += 30
        risk_factors.append("Production environment")
    elif plan.environment == "staging":
        risk_score += 10
        risk_factors.append("Staging environment")
    
    # Resource complexity
    resource_count = len(plan.resources)
    if resource_count > 10:
        risk_score += 20
        risk_factors.append("High resource complexity")
    elif resource_count > 5:
        risk_score += 10
        risk_factors.append("Medium resource complexity")
    
    # Cost risk
    if plan.budget_limit and plan.budget_limit < 1000:
        risk_score += 15
        risk_factors.append("Low budget constraint")
    
    # Compliance requirements
    if len(plan.compliance_requirements) > 3:
        risk_score += 20
        risk_factors.append("Multiple compliance requirements")
    
    # Determine risk level
    if risk_score >= 50:
        risk_level = "critical"
    elif risk_score >= 30:
        risk_level = "high"
    elif risk_score >= 15:
        risk_level = "medium"
    else:
        risk_level = "low"
    
    return {
        "score": risk_score,
        "level": risk_level,
        "factors": risk_factors,
        "recommendations": [
            "Review resource specifications",
            "Validate compliance requirements",
            "Consider staging deployment first"
        ]
    }


async def calculate_cost_estimate(plan: ProvisionPlan) -> Dict[str, Any]:
    """Calculate estimated costs for the provisioning request"""
    # Mock cost calculation (integrate with real cost estimation service)
    base_cost = 100  # Base cost per resource
    resource_count = len(plan.resources)
    
    # Environment multiplier
    env_multiplier = {"dev": 1.0, "staging": 1.5, "prod": 2.0}.get(plan.environment, 1.0)
    
    # Compliance multiplier
    compliance_multiplier = 1.0 + (len(plan.compliance_requirements) * 0.1)
    
    estimated_monthly = base_cost * resource_count * env_multiplier * compliance_multiplier
    estimated_yearly = estimated_monthly * 12
    
    return {
        "monthly": round(estimated_monthly, 2),
        "yearly": round(estimated_yearly, 2),
        "currency": "USD",
        "breakdown": {
            "base_cost": base_cost,
            "resource_count": resource_count,
            "environment_multiplier": env_multiplier,
            "compliance_multiplier": compliance_multiplier
        }
    }


async def check_compliance(plan: ProvisionPlan) -> Dict[str, Any]:
    """Check compliance requirements and status"""
    compliance_status = {}
    
    for requirement in plan.compliance_requirements:
        if requirement.lower() == "soc2":
            compliance_status["soc2"] = {
                "status": "compliant",
                "checks": ["encryption_at_rest", "access_logging", "data_retention"]
            }
        elif requirement.lower() == "gdpr":
            compliance_status["gdpr"] = {
                "status": "compliant",
                "checks": ["data_protection", "consent_management", "right_to_erasure"]
            }
        elif requirement.lower() == "hipaa":
            compliance_status["hipaa"] = {
                "status": "compliant",
                "checks": ["encryption_in_transit", "access_controls", "audit_logging"]
            }
    
    return {
        "overall_status": "compliant" if all(
            status["status"] == "compliant" 
            for status in compliance_status.values()
        ) else "non_compliant",
        "requirements": compliance_status
    }


def determine_approval_requirement(
    plan: ProvisionPlan, 
    risk_assessment: Dict[str, Any], 
    cost_estimate: Dict[str, Any]
) -> bool:
    """Determine if human approval is required"""
    # Always require approval for high/critical risk
    if plan.risk_level in ["high", "critical"]:
        return True
    
    # Require approval for high risk score
    if risk_assessment.get("score", 0) >= 30:
        return True
    
    # Require approval for high cost
    if cost_estimate.get("monthly", 0) > 1000:
        return True
    
    # Require approval for production environment
    if plan.environment == "prod":
        return True
    
    return False


async def generate_recommendations(
    plan: ProvisionPlan, 
    risk_assessment: Dict[str, Any], 
    cost_estimate: Dict[str, Any]
) -> List[str]:
    """Generate intelligent recommendations for the provisioning request"""
    recommendations = []
    
    # Risk-based recommendations
    if risk_assessment.get("score", 0) > 20:
        recommendations.append("Consider implementing additional monitoring and alerting")
        recommendations.append("Review security configurations before deployment")
    
    # Cost-based recommendations
    if cost_estimate.get("monthly", 0) > 500:
        recommendations.append("Consider using spot instances for non-critical workloads")
        recommendations.append("Implement auto-scaling to optimize costs")
    
    # Environment-based recommendations
    if plan.environment == "prod":
        recommendations.append("Ensure backup and disaster recovery procedures are in place")
        recommendations.append("Implement blue-green deployment strategy")
    
    # Compliance recommendations
    if len(plan.compliance_requirements) > 0:
        recommendations.append("Schedule compliance review after deployment")
        recommendations.append("Ensure audit logging is enabled for all resources")
    
    return recommendations


def determine_next_steps(approval_required: bool, risk_level: RiskLevel) -> List[str]:
    """Determine next steps based on approval status and risk level"""
    if approval_required:
        return [
            "Awaiting human approval",
            "Notify stakeholders of pending approval",
            "Prepare detailed deployment plan"
        ]
    else:
        return [
            "Proceed with automated provisioning",
            "Monitor deployment progress",
            "Validate resource health after deployment"
        ]


async def trigger_provisioning_workflow(plan_id: str, plan_data: Dict[str, Any]) -> None:
    """Trigger the actual provisioning workflow"""
    logger.info("Triggering provisioning workflow", plan_id=plan_id)
    
    # TODO: Integrate with Temporal workflow
    # For now, just log the action
    logger.info("Provisioning workflow triggered", 
               plan_id=plan_id, 
               project=plan_data["plan"]["project"])


@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {
        "status": "healthy",
        "service": "agent",
        "version": "1.0.0",
        "pending_approvals": len(pending_approvals),
        "total_plans": len(provision_plans)
    }


