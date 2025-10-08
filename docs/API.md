# Allstar Forge API Documentation

## Overview

The Allstar Forge API provides comprehensive endpoints for managing analytics projects, infrastructure, compliance, and monitoring. Built with FastAPI, it offers automatic OpenAPI documentation and type safety.

## Base URL

- **Local Development**: `http://localhost:8081`
- **Production**: `https://api.allstar-forge.com`

## Authentication

All endpoints require authentication via Bearer token:

```bash
Authorization: Bearer <your-token>
```

For local development, use: `Bearer dev-token`

## Core Endpoints

### Projects

#### List Projects

```http
GET /api/v1/projects
```

**Query Parameters:**

- `page` (int): Page number (default: 1)
- `page_size` (int): Items per page (default: 20, max: 100)
- `status` (string): Filter by project status
- `team` (string): Filter by team

**Response:**

```json
{
  "projects": [
    {
      "id": "uuid",
      "name": "string",
      "template": "string",
      "environment": "string",
      "team": "string",
      "status": "string",
      "created_at": "2024-01-01T00:00:00Z",
      "updated_at": "2024-01-01T00:00:00Z",
      "created_by": "string",
      "metadata": {}
    }
  ],
  "total": 100,
  "page": 1,
  "page_size": 20
}
```

#### Create Project

```http
POST /api/v1/projects
```

**Request Body:**

```json
{
  "name": "string",
  "template": "string",
  "environment": "string",
  "team": "string",
  "metadata": {}
}
```

#### Get Project

```http
GET /api/v1/projects/{project_id}
```

#### Update Project Status

```http
PATCH /api/v1/projects/{project_id}/status
```

**Request Body:**

```json
{
  "status": "string",
  "metadata": {}
}
```

### Environments

#### List Environments

```http
GET /api/v1/environments
```

#### Create Environment

```http
POST /api/v1/environments
```

**Request Body:**

```json
{
  "project_id": "uuid",
  "name": "string",
  "type": "string",
  "metadata": {}
}
```

### Monitoring

#### Get Metrics

```http
GET /api/v1/monitoring/metrics
```

**Response:**

```json
{
  "metrics": [
    {
      "name": "string",
      "value": "number|string",
      "unit": "string",
      "change": "number",
      "change_label": "string",
      "timestamp": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### Health Check

```http
GET /api/v1/monitoring/health
```

### Audit

#### List Audit Events

```http
GET /api/v1/audit/events
```

**Query Parameters:**

- `limit` (int): Maximum events to return (default: 100)
- `offset` (int): Number of events to skip (default: 0)
- `actor` (string): Filter by actor
- `action` (string): Filter by action

**Response:**

```json
{
  "events": [
    {
      "id": "uuid",
      "timestamp": "2024-01-01T00:00:00Z",
      "actor": "string",
      "action": "string",
      "resource": "string",
      "resource_id": "string",
      "success": true,
      "metadata": {},
      "ip_address": "string",
      "user_agent": "string"
    }
  ]
}
```

#### Get Audit Summary

```http
GET /api/v1/audit/summary
```

### Policies

#### Validate Policy

```http
POST /api/v1/policies/validate
```

**Request Body:**

```json
{
  "env": "string",
  "resource": {
    "encryption_at_rest": true,
    "additional_properties": {}
  }
}
```

**Response:**

```json
{
  "allowed": true,
  "reasons": ["string"]
}
```

### Workflows

#### Start Workflow

```http
POST /api/v1/workflows/{workflow_type}/start
```

**Request Body:**

```json
{
  "inputs": {}
}
```

**Response:**

```json
{
  "workflow_id": "string"
}
```

#### Get Workflow Status

```http
GET /api/v1/workflows/{workflow_id}/status
```

#### Approve Workflow

```http
POST /api/v1/workflows/{workflow_id}/approve
```

**Request Body:**

```json
{
  "approved": true,
  "reason": "string"
}
```

### Scorecards

#### Get Scorecard

```http
GET /api/v1/scorecards/{project_id}
```

**Response:**

```json
{
  "id": "uuid",
  "project_id": "uuid",
  "tier": "gold|silver|bronze",
  "security_score": 95,
  "quality_score": 88,
  "performance_score": 92,
  "compliance_score": 96,
  "calculated_at": "2024-01-01T00:00:00Z",
  "metadata": {}
}
```

### Costs

#### Get Cost Data

```http
GET /api/v1/costs/{project_id}
```

**Response:**

```json
{
  "id": "uuid",
  "project_id": "uuid",
  "current_cost": 1234.56,
  "forecast_cost": 1500.0,
  "currency": "USD",
  "calculated_at": "2024-01-01T00:00:00Z",
  "metadata": {}
}
```

### Catalog

#### List Services

```http
GET /api/v1/catalog/services
```

**Response:**

```json
{
  "services": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "owner": "string",
      "maturity": "string",
      "version": "string",
      "dependencies": 5,
      "consumers": 12,
      "health": "healthy|warning|error",
      "api_docs": true,
      "slo": 99.9
    }
  ]
}
```

### Extensions

#### List Extensions

```http
GET /api/v1/extensions
```

#### Install Extension

```http
POST /api/v1/extensions/install
```

**Request Body:**

```json
{
  "id": "string",
  "name": "string",
  "version": "string"
}
```

## Error Handling

### Standard Error Response

```json
{
  "detail": "Error message",
  "status_code": 400
}
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `422` - Validation Error
- `500` - Internal Server Error
- `503` - Service Unavailable

## Rate Limiting

- **Default**: 1000 requests per hour per API key
- **Headers**: Rate limit information included in response headers
- **Exceeded**: Returns `429 Too Many Requests`

## Pagination

List endpoints support pagination:

- `page`: Page number (1-based)
- `page_size`: Items per page (max 100)
- Response includes `total`, `page`, `page_size`

## Filtering and Sorting

Many endpoints support filtering:

- Use query parameters for simple filters
- Complex filtering via request body for POST endpoints
- Sorting via `sort` parameter (e.g., `sort=created_at:desc`)

## Webhooks

Webhook endpoints for real-time updates:

- `POST /webhooks/project-updates`
- `POST /webhooks/audit-events`
- `POST /webhooks/workflow-completion`

## SDKs and Libraries

Official SDKs available:

- **Python**: `pip install allstar-forge-sdk`
- **JavaScript**: `npm install @allstar/forge-sdk`
- **Go**: `go get github.com/allstar/forge-sdk-go`

## Interactive Documentation

- **Swagger UI**: `http://localhost:8081/docs`
- **ReDoc**: `http://localhost:8081/redoc`
- **OpenAPI Spec**: `http://localhost:8081/openapi.json`

## Support

- **Documentation**: [docs.allstar-forge.com](https://docs.allstar-forge.com)
- **Issues**: [GitHub Issues](https://github.com/allstar/forge/issues)
- **Discord**: [Community Discord](https://discord.gg/allstar-forge)
- **Email**: api-support@allstar-forge.com
