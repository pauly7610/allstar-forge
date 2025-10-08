from fastapi import APIRouter, Depends
from pydantic import BaseModel
from auth import oidc_auth
from audit_service import emit_event

router = APIRouter()


class PolicyInput(BaseModel):
  env: str
  resource: dict


@router.post("/validate")
def validate_policy(payload: PolicyInput, identity: dict = Depends(oidc_auth)):
  # mock: block unencrypted prod
  if payload.env == "prod" and not payload.resource.get("encryption_at_rest"):
    emit_event(actor=identity["sub"], action="policy.deny", resource="policy", resource_id="opa.bundle", success=False, metadata=payload.model_dump())
    return {"allowed": False, "reasons": ["Encryption at rest required for prod"]}
  emit_event(actor=identity["sub"], action="policy.allow", resource="policy", resource_id="opa.bundle", success=True, metadata=payload.model_dump())
  return {"allowed": True, "reasons": []}


