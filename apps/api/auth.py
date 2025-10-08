from fastapi import Header, HTTPException


def oidc_auth(authorization: str | None = Header(default=None)):
  if authorization is None:
    # In production, verify JWT via JWKS and map roles
    raise HTTPException(status_code=401, detail="Missing authorization header")
  # Stubbed identity for local dev
  return {"sub": "user@example.com", "roles": ["platform.admin"]}


