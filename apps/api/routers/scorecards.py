from fastapi import APIRouter, Depends
from auth import oidc_auth

router = APIRouter()


@router.get("/{project_id}")
def get_scorecard(project_id: str, _: dict = Depends(oidc_auth)):
  return {"projectId": project_id, "tier": "gold", "metrics": {"security": 92, "quality": 91, "performance": 90, "compliance": 96}}


