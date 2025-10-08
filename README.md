# Allstar Forge Platform

**Enterprise Analytics Platform for Secure, Compliant Data Infrastructure**

A comprehensive monorepo providing intelligent infrastructure automation, compliance management, and observability for enterprise analytics workloads.

## 🏗️ Architecture Overview

Allstar Forge is a modern, cloud-native platform built with:

- **Frontend**: React + TypeScript + Vite + shadcn/ui
- **Backend**: FastAPI (Python) with async PostgreSQL
- **Workflows**: Temporal for orchestration
- **Infrastructure**: Docker Compose for local development
- **Observability**: Structured logging, audit trails, monitoring

## 📁 Monorepo Structure

```
apps/
├── web/           # React frontend (Vite + TypeScript)
├── api/           # FastAPI backend service
├── worker/        # Temporal workflow workers
└── agent/         # Intelligent agent service (human-in-the-loop)

packages/
├── policies/      # OPA/Rego policy definitions
├── scoring/       # Scorecard configurations
└── plugins/       # Extension SDK

dev/               # Docker Compose for local development
infra/             # Terraform/Helm/ArgoCD/Crossplane
ops/               # GitHub Actions, K8s, OpenTelemetry, SIEM
```

## 🚀 Quick Start

### Prerequisites

- Node.js 20+ and npm
- Python 3.11+
- Docker and Docker Compose

### Local Development

1. **Clone and Install**

   ```bash
git clone <YOUR_GIT_URL>
   cd allstar-forge
   npm install
   ```

2. **Start All Services**

   ```bash
   # Start the complete stack (Postgres, Redis, Temporal, API, Agent, Worker, Web)
   npm run dev:up

   # Access the applications:
   # - Frontend: http://localhost:3000
   # - API: http://localhost:8081
   # - Agent: http://localhost:8083
   # - Temporal UI: http://localhost:8233
   ```

3. **Stop Services**
   ```bash
   npm run dev:down
   ```

### Individual Service Development

**Frontend (React)**

```bash
npm run dev -w @allstar/web
```

**API Service**

```bash
cd apps/api
pip install -r requirements.txt
uvicorn main:app --reload --port 8081
```

**Agent Service**

```bash
cd apps/agent
pip install -r requirements.txt
uvicorn main:app --reload --port 8083
```

**Temporal Worker**

```bash
cd apps/worker
pip install -r requirements.txt
python -m apps.worker.start
```

## 🔧 Development Workflow

### Frontend Development

- Uses Vite for fast HMR
- TypeScript for type safety
- shadcn/ui components
- React Query for API state management
- Tailwind CSS for styling

### Backend Development

- FastAPI with async/await
- PostgreSQL with asyncpg
- Structured logging with structlog
- Comprehensive audit trails
- OpenAPI documentation

### Infrastructure

- Docker Compose for local development
- Temporal for workflow orchestration
- Redis for caching and queues
- PostgreSQL for data persistence

## 🏢 Platform Features

### Core Capabilities

- **Project Management**: Create, monitor, and manage analytics projects
- **Infrastructure Automation**: Terraform-based provisioning with Temporal workflows
- **Compliance & Security**: Built-in policy enforcement and audit logging
- **Cost Optimization**: Real-time cost tracking and optimization recommendations
- **Intelligent Agent**: Human-in-the-loop approvals with risk assessment
- **Service Catalog**: Discover and manage platform services
- **Monitoring & Observability**: Comprehensive metrics and alerting

### API Endpoints

- **Projects**: `/api/v1/projects` - CRUD operations for projects
- **Environments**: `/api/v1/environments` - Environment management
- **Monitoring**: `/api/v1/monitoring` - Metrics and health checks
- **Audit**: `/api/v1/audit` - Compliance and audit trails
- **Policies**: `/api/v1/policies` - Policy validation and enforcement
- **Workflows**: `/api/v1/workflows` - Temporal workflow management

### Frontend Pages

- **Dashboard**: Overview of projects, metrics, and quick actions
- **Projects**: Project management and creation
- **Templates**: Infrastructure templates and marketplace
- **Monitoring**: Real-time metrics and alerting
- **Catalog**: Service discovery and management
- **Extensions**: Plugin marketplace and management
- **API Docs**: Interactive API documentation

## 🛠️ Technology Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for build tooling
- **shadcn/ui** for components
- **Tailwind CSS** for styling
- **React Query** for state management
- **React Router** for navigation

### Backend

- **FastAPI** (Python 3.11) with async/await
- **PostgreSQL** with asyncpg for database
- **Redis** for caching and queues
- **Temporal** for workflow orchestration
- **structlog** for structured logging

### Infrastructure

- **Docker** and **Docker Compose** for containerization
- **Terraform** for infrastructure as code
- **OpenTelemetry** for observability
- **Prometheus** and **Grafana** for monitoring

## 📚 Documentation

- **API Documentation**: Available at `/docs` when running locally
- **Frontend Components**: Built with shadcn/ui design system
- **Database Schema**: Comprehensive audit trails and project management
- **Workflow Definitions**: Temporal-based infrastructure automation

## 🚀 Deployment

### Local Development

```bash
npm run dev:up  # Start all services
```

### Production Deployment

The platform is designed for cloud-native deployment with:

- Kubernetes orchestration
- Helm charts for configuration
- ArgoCD for GitOps
- Crossplane for cloud resource management

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests and documentation
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
