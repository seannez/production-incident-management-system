-- ============================================
-- Production Incident Management System
-- Database Schema
-- ============================================


-- ============================================
-- Teams
-- ============================================

CREATE TABLE teams (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE
);


-- ============================================
-- Users
-- ============================================

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(100) NOT NULL,

    email VARCHAR(255) NOT NULL UNIQUE,

    password_hash VARCHAR(255) NOT NULL,

    team_id INTEGER NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_user_team
        FOREIGN KEY (team_id)
        REFERENCES teams(id)
        ON DELETE RESTRICT
);


-- ============================================
-- Incidents
-- ============================================

CREATE TABLE incidents (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    title VARCHAR(200) NOT NULL,

    description TEXT NOT NULL,

    severity VARCHAR(20) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'open',

    affected_service VARCHAR(100) NOT NULL,

    assigned_to VARCHAR(100) DEFAULT 'Unassigned',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================
-- Incident Updates
-- ============================================

CREATE TABLE incident_updates (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    incident_id INTEGER NOT NULL,

    message TEXT NOT NULL,

    created_by VARCHAR(100) NOT NULL DEFAULT 'System',

    update_type VARCHAR(30) NOT NULL DEFAULT 'manual',

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_incident
        FOREIGN KEY (incident_id)
        REFERENCES incidents(id)
        ON DELETE CASCADE,

    CONSTRAINT incident_updates_type_check
        CHECK (
            update_type IN ('manual', 'status_change')
        )
);
