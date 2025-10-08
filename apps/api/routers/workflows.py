from fastapi import APIRouter, Depends
from pydantic import BaseModel
from auth import oidc_auth
from audit_service import emit_event

router = APIRouter()


class StartWorkflowRequest(BaseModel):
  type: str
  inputs: dict


@router.post("/{wf_type}/start")
def start(wf_type: str, body: StartWorkflowRequest, identity: dict = Depends(oidc_auth)):
  wf_id = f"wf_{wf_type}_demo"
  emit_event(actor=identity["sub"], action="workflow.start", resource="workflow", resource_id=wf_id, success=True, metadata={"type": wf_type, "inputs": body.inputs})
  return {"workflowId": wf_id}


class ApprovalDecision(BaseModel):
  approved: bool
  reason: str | None = None


@router.post("/{workflow_id}/approval")
def approve(workflow_id: str, decision: ApprovalDecision, identity: dict = Depends(oidc_auth)):
  emit_event(actor=identity["sub"], action="workflow.approval", resource="workflow", resource_id=workflow_id, success=decision.approved, metadata=decision.model_dump())
  return {"status": "received", "workflowId": workflow_id, "decision": decision.model_dump()}


