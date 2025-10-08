from fastapi import APIRouter, Depends
from pydantic import BaseModel
from auth import oidc_auth
from audit_service import emit_event

router = APIRouter()


class InstallExtensionPayload(BaseModel):
  id: str
  name: str
  version: str


@router.post("/install")
def install_extension(payload: InstallExtensionPayload, identity: dict = Depends(oidc_auth)):
  emit_event(actor=identity["sub"], action="extension.install", resource="extension", resource_id=payload.id, success=True, metadata=payload.model_dump())
  return {"status": "installed", "extension": payload.model_dump()}


