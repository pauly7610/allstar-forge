FROM python:3.11-slim
WORKDIR /repo
COPY apps/worker/requirements.txt apps/worker/requirements.txt
RUN pip install --no-cache-dir -r apps/worker/requirements.txt
COPY apps/worker apps/worker
COPY packages packages
CMD ["python", "-m", "apps.worker.start"]

