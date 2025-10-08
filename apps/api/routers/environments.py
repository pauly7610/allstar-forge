from fastapi import APIRouter, Depends
from pydantic import BaseModel
from auth import oidc_auth
from audit_service import emit_event

router = APIRouter()


class CreateEnvRequest(BaseModel):
  projectId: str
  type: str


@router.post("")
def create_environment(req: CreateEnvRequest, identity: dict = Depends(oidc_auth)):
  emit_event(actor=identity["sub"], action="environment.create", resource="environment", resource_id=req.projectId, success=True, metadata=req.model_dump())
  return {"env": {"id": "env1", "type": req.type, "projectId": req.projectId}, "status": "provisioning"}


