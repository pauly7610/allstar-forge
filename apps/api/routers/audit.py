from fastapi import APIRouter, Depends
from auth import oidc_auth

router = APIRouter()


@router.get("/events")
def list_events(limit: int = 100, _: dict = Depends(oidc_auth)):
  return {"events": [], "limit": limit}


