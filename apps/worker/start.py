import asyncio
from temporalio.client import Client
from temporalio.worker import Worker

from .workflows.provisioning import ProjectProvisioningWorkflow
from .activities.iac import terraform_plan, terraform_apply


async def main() -> None:
  client = await Client.connect("localhost:7233")
  worker = Worker(
    client,
    task_queue="forge-task-queue",
    workflows=[ProjectProvisioningWorkflow],
    activities=[terraform_plan, terraform_apply],
  )
  print("Worker started on forge-task-queue")
  await worker.run()


if __name__ == "__main__":
  asyncio.run(main())


