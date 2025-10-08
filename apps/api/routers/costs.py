from fastapi import APIRouter, Depends
from auth import oidc_auth

router = APIRouter()


@router.get("/{project_id}")
def get_costs(project_id: str, _: dict = Depends(oidc_auth)):
  return {"projectId": project_id, "current": 1234.56, "forecast": 1500.00, "savingsOpportunities": []}


