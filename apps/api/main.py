"""
Allstar Forge Platform API

Main FastAPI application providing REST endpoints for:
- Project management and provisioning
- Environment orchestration
- Monitoring and observability
- Policy enforcement and compliance
- Audit logging and reporting
"""

from contextlib import asynccontextmanager
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import structlog
import os

from db import init_db, get_db_pool
from auth import oidc_auth
from routers import projects, environments, workflows, monitoring, catalog, scorecards, costs, policies, audit, extensions

# Configure structured logging
structlog.configure(
    processors=[
        structlog.stdlib.add_logger_name,
        structlog.stdlib.add_log_level,
        structlog.processors.TimeStamper(fmt="iso"),
        structlog.dev.ConsoleRenderer() if os.getenv("ENV") == "development" else structlog.processors.JSONRenderer(),
    ],
    wrapper_class=structlog.stdlib.BoundLogger,
    logger_factory=structlog.stdlib.LoggerFactory(),
    cache_logger_on_first_use=True,
)

logger = structlog.get_logger()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Application lifespan manager for startup/shutdown tasks"""
    logger.info("Starting Allstar Forge API")
    
    # Initialize database
    await init_db()
    app.state.db_pool = await get_db_pool()
    
    yield
    
    # Cleanup
    logger.info("Shutting down Allstar Forge API")
    if hasattr(app.state, 'db_pool') and app.state.db_pool:
        await app.state.db_pool.close()


app = FastAPI(
    title="Allstar Forge Platform API",
    description="Enterprise analytics platform for secure, compliant data infrastructure",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS middleware for frontend integration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://localhost:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    """Global HTTP exception handler with structured logging"""
    logger.error(
        "HTTP exception occurred",
        status_code=exc.status_code,
        detail=exc.detail,
        path=request.url.path,
        method=request.method
    )
    return JSONResponse(
        status_code=exc.status_code,
        content={"detail": exc.detail, "status_code": exc.status_code}
    )


@app.exception_handler(Exception)
async def general_exception_handler(request: Request, exc: Exception):
    """Global exception handler for unexpected errors"""
    logger.error(
        "Unexpected error occurred",
        error=str(exc),
        path=request.url.path,
        method=request.method,
        exc_info=True
    )
    return JSONResponse(
        status_code=500,
        content={"detail": "Internal server error", "status_code": 500}
    )


@app.get("/healthz")
async def health_check():
    """Health check endpoint for load balancers and monitoring"""
    try:
        # Check database connectivity
        pool = app.state.db_pool
        async with pool.acquire() as conn:
            await conn.fetchval("SELECT 1")
        
        return {
            "status": "healthy",
            "version": "1.0.0",
            "database": "connected"
        }
    except Exception as e:
        logger.error("Health check failed", error=str(e))
        raise HTTPException(status_code=503, detail="Service unavailable")


# Mount API routers with proper authentication and error handling
app.include_router(projects.router, prefix="/api/v1/projects", tags=["projects"])
app.include_router(environments.router, prefix="/api/v1/environments", tags=["environments"])
app.include_router(workflows.router, prefix="/api/v1/workflows", tags=["workflows"])
app.include_router(monitoring.router, prefix="/api/v1/monitoring", tags=["monitoring"])
app.include_router(catalog.router, prefix="/api/v1/catalog", tags=["catalog"])
app.include_router(scorecards.router, prefix="/api/v1/scorecards", tags=["scorecards"])
app.include_router(costs.router, prefix="/api/v1/costs", tags=["costs"])
app.include_router(policies.router, prefix="/api/v1/policies", tags=["policies"])
app.include_router(audit.router, prefix="/api/v1/audit", tags=["audit"])
app.include_router(extensions.router, prefix="/api/v1/extensions", tags=["extensions"])

