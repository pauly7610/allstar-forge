"""
Database connection and schema management for Allstar Forge Platform

Provides:
- Connection pooling for PostgreSQL
- Schema initialization and migrations
- Audit logging infrastructure
- Project and environment data models
"""

import os
import asyncpg
import structlog
from typing import Optional
from contextlib import asynccontextmanager

logger = structlog.get_logger()

# Database configuration
DATABASE_URL = os.getenv("DATABASE_URL", "postgresql://app:app@localhost:5432/app")
_pool: Optional[asyncpg.Pool] = None


async def get_db_pool() -> asyncpg.Pool:
    """Get or create database connection pool"""
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(
            DATABASE_URL,
            min_size=5,
            max_size=20,
            command_timeout=60
        )
        logger.info("Database connection pool created")
    return _pool


async def init_db() -> None:
    """Initialize database schema and tables"""
    pool = await get_db_pool()
    
    async with pool.acquire() as conn:
        # Create audit events table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS audit_events (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                timestamp TIMESTAMPTZ DEFAULT NOW(),
                actor VARCHAR(255) NOT NULL,
                action VARCHAR(255) NOT NULL,
                resource VARCHAR(255) NOT NULL,
                resource_id VARCHAR(255),
                success BOOLEAN NOT NULL DEFAULT true,
                metadata JSONB DEFAULT '{}'::jsonb,
                ip_address INET,
                user_agent TEXT
            );
        """)
        
        # Create projects table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS projects (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name VARCHAR(255) NOT NULL UNIQUE,
                template VARCHAR(100) NOT NULL,
                environment VARCHAR(50) NOT NULL,
                team VARCHAR(100),
                status VARCHAR(50) NOT NULL DEFAULT 'provisioning',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW(),
                created_by VARCHAR(255) NOT NULL,
                metadata JSONB DEFAULT '{}'::jsonb
            );
        """)
        
        # Create environments table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS environments (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(50) NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'provisioning',
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW(),
                metadata JSONB DEFAULT '{}'::jsonb
            );
        """)
        
        # Create scorecards table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS scorecards (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
                tier VARCHAR(20) NOT NULL,
                security_score INTEGER NOT NULL DEFAULT 0,
                quality_score INTEGER NOT NULL DEFAULT 0,
                performance_score INTEGER NOT NULL DEFAULT 0,
                compliance_score INTEGER NOT NULL DEFAULT 0,
                calculated_at TIMESTAMPTZ DEFAULT NOW(),
                metadata JSONB DEFAULT '{}'::jsonb
            );
        """)
        
        # Create costs table
        await conn.execute("""
            CREATE TABLE IF NOT EXISTS costs (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
                current_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
                forecast_cost DECIMAL(10,2) NOT NULL DEFAULT 0,
                currency VARCHAR(3) NOT NULL DEFAULT 'USD',
                calculated_at TIMESTAMPTZ DEFAULT NOW(),
                metadata JSONB DEFAULT '{}'::jsonb
            );
        """)
        
        # Create indexes for performance
        await conn.execute("""
            CREATE INDEX IF NOT EXISTS idx_audit_events_timestamp ON audit_events(timestamp);
            CREATE INDEX IF NOT EXISTS idx_audit_events_actor ON audit_events(actor);
            CREATE INDEX IF NOT EXISTS idx_audit_events_resource ON audit_events(resource);
            CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
            CREATE INDEX IF NOT EXISTS idx_projects_created_by ON projects(created_by);
            CREATE INDEX IF NOT EXISTS idx_environments_project_id ON environments(project_id);
            CREATE INDEX IF NOT EXISTS idx_scorecards_project_id ON scorecards(project_id);
            CREATE INDEX IF NOT EXISTS idx_costs_project_id ON costs(project_id);
        """)
        
        logger.info("Database schema initialized successfully")


@asynccontextmanager
async def get_connection():
    """Context manager for database connections"""
    pool = await get_db_pool()
    async with pool.acquire() as conn:
        yield conn


async def close_pool():
    """Close database connection pool"""
    global _pool
    if _pool:
        await _pool.close()
        _pool = None
        logger.info("Database connection pool closed")


