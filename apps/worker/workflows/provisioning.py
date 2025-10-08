from datetime import timedelta
from temporalio import workflow


@workflow.defn
class ProjectProvisioningWorkflow:
    @workflow.run
    async def run(self, inputs: dict):
        plan = await workflow.execute_activity(
            "terraform_plan",
            inputs.get("workdir", "./infra/terraform"),
            inputs.get("variables", {}),
            start_to_close_timeout=timedelta(seconds=30),
        )
        apply = await workflow.execute_activity(
            "terraform_apply",
            inputs.get("workdir", "./infra/terraform"),
            inputs.get("variables", {}),
            start_to_close_timeout=timedelta(seconds=60),
        )
        return {"status": "completed", "plan": plan, "apply": apply}


