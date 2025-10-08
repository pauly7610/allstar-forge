from fastapi import APIRouter, Depends
from auth import oidc_auth

router = APIRouter()


@router.get("/metrics")
def get_metrics(_: dict = Depends(oidc_auth)):
  return {"cpu": 0.42, "memory": 0.73}


