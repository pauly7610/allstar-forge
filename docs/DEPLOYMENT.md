# Allstar Forge Deployment Guide

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 20+ and npm
- Python 3.11+
- Git

### Local Development Setup

1. **Clone Repository**

   ```bash
   git clone https://github.com/your-org/allstar-forge.git
   cd allstar-forge
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start All Services**

   ```bash
   npm run dev:up
   ```

4. **Access Applications**
   - Frontend: http://localhost:3000
   - API: http://localhost:8081
   - Agent: http://localhost:8083
   - Temporal UI: http://localhost:8233

## 🐳 Docker Deployment

### Development Environment

The platform includes a complete Docker Compose stack for local development:

```yaml
# dev/docker-compose.yml
services:
  postgres: # PostgreSQL database
  redis: # Redis cache
  temporal: # Temporal workflow engine
  temporal-ui: # Temporal web UI
  api: # FastAPI backend
  agent: # Agent service
  worker: # Temporal worker
  web: # React frontend
```

### Production Docker Images

Each service has its own optimized Dockerfile:

#### API Service

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY apps/api/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/api/ .
EXPOSE 8081
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8081"]
```

#### Agent Service

```dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY apps/agent/requirements.txt ./requirements.txt
RUN pip install --no-cache-dir -r requirements.txt
COPY apps/agent/ .
EXPOSE 8083
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8083"]
```

#### Worker Service

```dockerfile
FROM python:3.11-slim
WORKDIR /repo
COPY apps/worker/requirements.txt apps/worker/requirements.txt
RUN pip install --no-cache-dir -r apps/worker/requirements.txt
COPY apps/worker apps/worker
COPY packages packages
CMD ["python", "-m", "apps.worker.start"]
```

#### Web Service

```dockerfile
# Multi-stage build for React app
FROM node:20-alpine AS deps
# ... dependency installation

FROM node:20-alpine AS build
# ... build process

FROM nginx:1.27-alpine
# ... runtime configuration
```

## ☸️ Kubernetes Deployment

### Prerequisites

- Kubernetes cluster (1.24+)
- Helm 3.8+
- kubectl configured

### Helm Charts

#### API Service

```yaml
# charts/api/values.yaml
replicaCount: 3
image:
  repository: allstar-forge/api
  tag: latest
  pullPolicy: IfNotPresent

service:
  type: ClusterIP
  port: 8081

resources:
  limits:
    cpu: 500m
    memory: 512Mi
  requests:
    cpu: 250m
    memory: 256Mi

autoscaling:
  enabled: true
  minReplicas: 2
  maxReplicas: 10
  targetCPUUtilizationPercentage: 80
```

#### Agent Service

```yaml
# charts/agent/values.yaml
replicaCount: 2
image:
  repository: allstar-forge/agent
  tag: latest

service:
  type: ClusterIP
  port: 8083

resources:
  limits:
    cpu: 300m
    memory: 256Mi
  requests:
    cpu: 150m
    memory: 128Mi
```

### Deployment Commands

```bash
# Install API service
helm install api ./charts/api

# Install Agent service
helm install agent ./charts/agent

# Install Worker service
helm install worker ./charts/worker

# Install Web service
helm install web ./charts/web
```

## 🔧 Configuration

### Environment Variables

#### API Service

```bash
# Database
DATABASE_URL=postgresql://user:pass@host:5432/db

# Redis
REDIS_URL=redis://host:6379

# Temporal
TEMPORAL_HOST=localhost:7233

# Logging
LOG_LEVEL=INFO
ENV=production
```

#### Agent Service

```bash
# API Integration
API_BASE_URL=http://api-service:8081

# Risk Assessment
RISK_THRESHOLD_HIGH=30
RISK_THRESHOLD_CRITICAL=50

# Cost Optimization
COST_THRESHOLD_MONTHLY=1000
```

#### Worker Service

```bash
# Temporal Connection
TEMPORAL_HOST=localhost:7233
TEMPORAL_NAMESPACE=default

# Infrastructure
TERRAFORM_VERSION=1.5.0
AWS_REGION=us-west-2
```

### Secrets Management

#### Kubernetes Secrets

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: allstar-forge-secrets
type: Opaque
data:
  database-url: <base64-encoded>
  redis-url: <base64-encoded>
  jwt-secret: <base64-encoded>
```

#### HashiCorp Vault Integration

```yaml
# vault-config.yaml
vault:
  enabled: true
  address: https://vault.company.com
  role: allstar-forge
  path: secret/allstar-forge
```

## 📊 Monitoring Setup

### Prometheus Configuration

```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: "allstar-forge-api"
    static_configs:
      - targets: ["api-service:8081"]
    metrics_path: "/metrics"

  - job_name: "allstar-forge-agent"
    static_configs:
      - targets: ["agent-service:8083"]
    metrics_path: "/metrics"
```

### Grafana Dashboards

#### API Service Dashboard

- Request rate and latency
- Error rates and status codes
- Database connection pool
- Memory and CPU usage

#### Agent Service Dashboard

- Approval request rates
- Risk assessment metrics
- Cost optimization savings
- Workflow completion times

### Alerting Rules

```yaml
# alerting-rules.yml
groups:
  - name: allstar-forge
    rules:
      - alert: HighErrorRate
        expr: rate(http_requests_total{status=~"5.."}[5m]) > 0.1
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate detected"

      - alert: ServiceDown
        expr: up == 0
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: "Service is down"
```

## 🔐 Security Configuration

### Network Policies

```yaml
# network-policy.yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allstar-forge-netpol
spec:
  podSelector:
    matchLabels:
      app: allstar-forge
  policyTypes:
    - Ingress
    - Egress
  ingress:
    - from:
        - namespaceSelector:
            matchLabels:
              name: ingress-nginx
      ports:
        - protocol: TCP
          port: 8081
```

### Pod Security Standards

```yaml
# pod-security.yaml
apiVersion: v1
kind: Pod
metadata:
  name: allstar-forge-pod
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    fsGroup: 2000
  containers:
    - name: api
      securityContext:
        allowPrivilegeEscalation: false
        readOnlyRootFilesystem: true
        capabilities:
          drop:
            - ALL
```

## 🚀 CI/CD Pipeline

### GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Run Tests
        run: |
          npm test
          cd apps/api && pytest

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Build Images
        run: |
          docker build -t allstar-forge/api:latest apps/api/
          docker build -t allstar-forge/agent:latest apps/agent/
          docker build -t allstar-forge/worker:latest apps/worker/
          docker build -t allstar-forge/web:latest apps/web/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to Kubernetes
        run: |
          helm upgrade --install allstar-forge ./charts/
```

### ArgoCD Configuration

```yaml
# argocd-app.yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: allstar-forge
spec:
  project: default
  source:
    repoURL: https://github.com/your-org/allstar-forge
    targetRevision: HEAD
    path: charts/
  destination:
    server: https://kubernetes.default.svc
    namespace: allstar-forge
  syncPolicy:
    automated:
      prune: true
      selfHeal: true
```

## 🔄 Database Migrations

### Migration Scripts

```python
# migrations/001_initial_schema.py
async def up(conn):
    await conn.execute("""
        CREATE TABLE projects (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name VARCHAR(255) NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW()
        );
    """)

async def down(conn):
    await conn.execute("DROP TABLE projects;")
```

### Migration Commands

```bash
# Run migrations
python -m alembic upgrade head

# Create new migration
python -m alembic revision --autogenerate -m "description"

# Rollback migration
python -m alembic downgrade -1
```

## 📋 Health Checks

### Kubernetes Health Checks

```yaml
# health-checks.yaml
livenessProbe:
  httpGet:
    path: /healthz
    port: 8081
  initialDelaySeconds: 30
  periodSeconds: 10

readinessProbe:
  httpGet:
    path: /ready
    port: 8081
  initialDelaySeconds: 5
  periodSeconds: 5
```

### Custom Health Checks

```python
# apps/api/health.py
@app.get("/healthz")
async def health_check():
    # Check database connectivity
    # Check Redis connectivity
    # Check external dependencies
    return {"status": "healthy"}
```

## 🔧 Troubleshooting

### Common Issues

#### Database Connection Issues

```bash
# Check database connectivity
kubectl exec -it api-pod -- psql $DATABASE_URL -c "SELECT 1"

# Check connection pool
kubectl logs api-pod | grep "connection pool"
```

#### Temporal Worker Issues

```bash
# Check worker registration
kubectl logs worker-pod | grep "worker registered"

# Check workflow execution
kubectl exec -it worker-pod -- temporal workflow list
```

#### Frontend Build Issues

```bash
# Check build logs
kubectl logs web-pod | grep "build"

# Check nginx configuration
kubectl exec -it web-pod -- nginx -t
```

### Debug Commands

```bash
# Get pod logs
kubectl logs -f deployment/api

# Execute commands in pod
kubectl exec -it deployment/api -- /bin/bash

# Port forward for debugging
kubectl port-forward svc/api 8081:8081
```

## 📈 Performance Tuning

### Database Optimization

```sql
-- Add indexes for performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_audit_events_timestamp ON audit_events(timestamp);

-- Optimize queries
EXPLAIN ANALYZE SELECT * FROM projects WHERE status = 'active';
```

### Application Tuning

```python
# Connection pool settings
DATABASE_POOL_SIZE = 20
DATABASE_MAX_OVERFLOW = 30

# Cache settings
REDIS_MAX_CONNECTIONS = 50
REDIS_TIMEOUT = 5
```

### Kubernetes Resource Limits

```yaml
resources:
  limits:
    cpu: 1000m
    memory: 1Gi
  requests:
    cpu: 500m
    memory: 512Mi
```

This deployment guide provides comprehensive instructions for deploying Allstar Forge in various environments, from local development to production Kubernetes clusters.
