from fastapi import APIRouter, Depends
from auth import oidc_auth

router = APIRouter()


@router.get("/services")
def list_services(_: dict = Depends(oidc_auth)):
  return {"services": [{"id": "svc1", "name": "Payments"}]}


