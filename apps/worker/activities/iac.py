from temporalio import activity


@activity.defn
async def terraform_plan(workdir: str, variables: dict | None = None) -> dict:
  # placeholder - returns a fake plan
  return {"workdir": workdir, "changes": 3, "variables": variables or {}}


@activity.defn
async def terraform_apply(workdir: str, variables: dict | None = None) -> dict:
  # placeholder - returns a fake apply result
  return {"workdir": workdir, "applied": True, "variables": variables or {}}


