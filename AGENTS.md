# AGENTS.md

## Project Overview

This repository is a **Production Incident Management System** built as a full-stack portfolio and learning project.

The goal is to build a realistic incident-management application while keeping the code understandable and maintaining a clean separation between frontend, backend, business logic, and database access.

## Tech Stack

### Frontend
- React
- Vite
- JavaScript
- React Router
- Vanilla CSS

### Backend
- Node.js
- Express
- `pg` PostgreSQL driver
- `cors`
- `dotenv`
- `nodemon`

### Database
- PostgreSQL

Do **not** introduce TypeScript, Tailwind, Bootstrap, Material UI, Chakra, styled-components, or another UI/framework dependency unless explicitly requested.

## Repository Structure

High-level structure:

```text
/
├── client/
├── server/
├── docs/
├── README.md
└── package.json
```

The root `package.json` uses `concurrently` so both frontend and backend can be started together with:

```bash
npm run dev
```

Expected local development ports:

```text
Frontend: http://localhost:5173
Backend:  http://localhost:3001
```

# Frontend Architecture

Main frontend path:

```text
React UI
  ↓
client/src/api/incidentsApi.js
  ↓
HTTP REST API
  ↓
Express backend
```

Relevant frontend structure includes:

```text
client/src/
├── api/
│   └── incidentsApi.js
├── components/
│   ├── common/
│   ├── incidents/
│   └── layout/
├── pages/
├── hooks/
├── utils/
├── App.jsx
├── main.jsx
├── index.css
└── AppLayout.css
```

Important components/pages currently include:

```text
components/layout/
├── Header.jsx
└── Sidebar.jsx

components/incidents/
├── IncidentCard.jsx
├── IncidentList.jsx
├── IncidentForm.jsx
├── IncidentFilters.jsx
├── IncidentStatusBadge.jsx
└── IncidentUpdateForm.jsx

pages/
├── IncidentsPage.jsx
├── IncidentDetailsPage.jsx
├── CreateIncidentPage.jsx
├── DashboardPage.jsx
└── NotFoundPage.jsx
```

## Frontend State Rules

React state should live in the **lowest common parent that needs to share that state**.

Data flows downward through props:

```text
Parent
  ↓ props
Child
```

Children can request state changes through callback props:

```text
Parent
  ↓ callback prop
Child
  ↓ invokes callback
Parent updates state
```

Do not duplicate state unnecessarily.

If a value already lives in application state, do not create another local state copy unless there is a clear reason.

# Frontend API Layer

All HTTP calls related to incidents should live in:

```text
client/src/api/incidentsApi.js
```

React pages/components should not scatter raw `fetch()` calls throughout the UI.

Typical flow:

```text
App/Page
  ↓
incidentsApi.js
  ↓ fetch()
Express API
```

Current frontend is already connected to Express for incident retrieval and creation.

# Backend Architecture

Use this architecture:

```text
Route
  ↓
Controller
  ↓
Service
  ↓
Repository
  ↓
PostgreSQL
```

Each layer has a specific responsibility.

## Routes

Location:

```text
server/src/routes/
```

Responsibilities:
- Map HTTP method + URL to controller function.
- Do not contain business logic.
- Do not contain SQL.

## Controllers

Location:

```text
server/src/controllers/
```

Responsibilities:
- Handle `req` and `res`.
- Read params/body/query values.
- Call the service layer.
- Return HTTP status codes and JSON responses.
- Handle HTTP-level errors.

Controllers should **not contain SQL**.

## Services

Location:

```text
server/src/services/
```

Responsibilities:
- Business logic.
- Validation/business rules that do not belong to HTTP or SQL.
- Coordinate repository calls.

A service may initially look thin. That is acceptable.

Services should **not contain SQL**.

## Repositories

Location:

```text
server/src/repositories/
```

Responsibilities:
- All PostgreSQL queries.
- `SELECT`
- `INSERT`
- `UPDATE`
- `DELETE`
- Translate database rows where appropriate.

All SQL belongs here.

## Database Configuration

Location:

```text
server/src/config/database.js
```

Responsibilities:
- Configure and export the PostgreSQL `Pool`.
- Read connection information from environment variables.

Repositories import the pool and call:

```js
pool.query(...)
```

# PostgreSQL Conventions

Database name:

```text
incident_management
```

Main table:

```text
incidents
```

Current incident fields:

```text
id
title
description
severity
status
affected_service
assigned_to
created_at
```

JavaScript uses camelCase:

```text
affectedService
assignedTo
createdAt
```

PostgreSQL uses snake_case:

```text
affected_service
assigned_to
created_at
```

When returning rows to JavaScript, SQL aliases may be used:

```sql
affected_service AS "affectedService",
assigned_to AS "assignedTo",
created_at AS "createdAt"
```

Use parameterized SQL queries.

Correct:

```js
pool.query(
  "SELECT * FROM incidents WHERE id = $1",
  [id]
);
```

Avoid building SQL by interpolating user input.

# Environment Variables

Backend `.env` contains local configuration such as:

```env
PORT=3001
DB_USER=postgres
DB_HOST=localhost
DB_NAME=incident_management
DB_PASSWORD=
DB_PORT=5432
```

Never commit real secrets.

`.env.example` may contain variable names and safe placeholder values.

# Current API State

The backend currently has or has already introduced:

```http
GET  /api/health
GET  /api/incidents
GET  /api/incidents/:id
POST /api/incidents
```

## `GET /api/incidents`

This endpoint has been moved toward the intended PostgreSQL architecture:

```text
Route
→ Controller
→ Service
→ Repository
→ PostgreSQL
```

## `GET /api/incidents/:id`

This was initially implemented against the temporary in-memory incidents array.

If it has not already been migrated, move it to PostgreSQL using a parameterized query such as:

```sql
SELECT ...
FROM incidents
WHERE id = $1
```

## `POST /api/incidents`

This was initially implemented against the temporary in-memory incidents array and is already called by the React Create Incident flow.

If it has not already been migrated, move it to PostgreSQL.

The frontend should send the user-entered fields while the backend/database should own generated/default values such as:
- `id`
- initial `status`
- default `assigned_to` where appropriate
- `created_at`

## Planned next endpoint

```http
PATCH /api/incidents/:id/status
```

This should replace frontend-only status mutation so that status changes persist in PostgreSQL.

# Temporary In-Memory Data

The backend previously used:

```js
const incidents = [...]
```

This was intentionally used to learn Express before adding PostgreSQL.

Do not treat this array as the final data source.

The target is:

```text
React
  ↓ HTTP
Express
  ↓
Service/Repository
  ↓
PostgreSQL
```

Once an endpoint has been migrated to PostgreSQL, remove its dependency on the in-memory array.

# Current Frontend Functionality

The frontend already includes the core incident workflow:
- Incident list
- Search
- Filtering by status/severity
- Dynamic incident details route
- Create Incident page/form
- Basic form validation
- Status-changing UI
- React Router navigation
- GET integration with Express
- POST integration with Express

Current routes include concepts such as:

```text
/incidents
/incidents/:id
/incidents/new
```

The root route redirects to `/incidents`.

# Current UI Direction

The frontend has been visually redesigned toward a professional operations/SaaS dashboard style.

Current styling includes:
- Dark navy sidebar
- Main light workspace
- Header
- New Incident button
- Table-like incidents list
- Severity/status badges
- Styled incident details
- Styled Create Incident form
- Vanilla CSS
- `client/src/AppLayout.css`

Visual target:
- Clean production/operations dashboard
- Compact typography
- Light borders
- Subtle shadows
- Moderate border radius
- Efficient use of screen width
- Consistent spacing
- Blue/purple primary accent

Do not add fake functionality simply because an item exists visually in a sidebar.

Items such as Dashboard, Updates, Teams, and Settings may remain placeholders until their underlying features are implemented.

When asked for **styling only**:
- Do not modify API calls.
- Do not modify state management.
- Do not modify routing logic.
- Do not modify form submission behavior.
- Do not change backend behavior.
- Small JSX changes for wrappers/classNames are allowed.

# Planned Functional Work

Suggested order from the current state:

```text
1. Verify/finish GET /api/incidents through PostgreSQL
2. Migrate GET /api/incidents/:id to PostgreSQL
3. Migrate POST /api/incidents to PostgreSQL
4. Add PATCH /api/incidents/:id/status
5. Connect React status update to PATCH
6. Add backend validation and consistent error handling
7. Build Dashboard using real data
8. Add incident updates/timeline
9. UI cleanup/polish
```

After the main application is complete, separate work may include:
- Tests
- Docker
- AWS/deployment
- Monitoring
- Documentation

Do not mix those into unrelated tasks unless explicitly requested.

# Future Incident Updates Feature

A likely later feature is incident history/timeline.

Possible endpoints:

```http
GET  /api/incidents/:id/updates
POST /api/incidents/:id/updates
```

Potential table:

```text
incident_updates
```

Conceptual fields:

```text
id
incident_id
message
created_by
created_at
```

Do not implement this prematurely unless requested.

# Error Handling Expectations

Use appropriate HTTP status codes.

Examples:

```text
200 OK
201 Created
400 Bad Request
404 Not Found
500 Internal Server Error
```

Do not expose sensitive database information to the frontend.

# Development Style

This project is also being used to learn full-stack development.

Therefore:
- Prefer readable JavaScript over clever abstractions.
- Do not overengineer.
- Keep functions small and responsibilities clear.
- Make focused changes.
- Avoid unrelated refactors.
- Preserve working behavior unless a change is explicitly requested.
- Do not invent requirements.
- Do not invent application behavior.
- Do not add dependencies unnecessarily.
- Do not rewrite multiple working files when a smaller change is sufficient.

Before making a significant architectural change:
1. Inspect the existing implementation.
2. Explain briefly what should change and why.
3. Make the smallest coherent change.
4. Verify the affected flow.

When asked to explain code:
- Explain where the file sits in the architecture.
- Explain what data it receives.
- Explain what it returns/calls.
- Explain why the layer exists.
- Explain the end-to-end flow when relevant.

# Codex Working Rules

When working in this repository:

1. Read this `AGENTS.md` before making changes.
2. Inspect existing files instead of assuming their contents.
3. Preserve the existing architecture.
4. Do not move SQL outside repositories.
5. Do not silently change working logic while doing UI work.
6. Do not install dependencies without a clear need.
7. Do not switch the project to TypeScript.
8. Do not introduce Tailwind or another UI framework.
9. Do not expose `.env` secrets.
10. Use parameterized PostgreSQL queries.
11. Prefer small, reviewable edits.
12. If the requested task is ambiguous, inspect the relevant code before choosing an implementation.
13. Do not create fake features simply to match a visual reference.
14. Keep the frontend/backend contract consistent.
15. When a change affects both frontend and backend, verify the entire data flow.

# Mental Model

Preserve this primary full-stack flow:

```text
React Component/Page
        ↓
incidentsApi.js
        ↓ HTTP
Express Route
        ↓
Controller
        ↓
Service
        ↓
Repository
        ↓
PostgreSQL
        ↑
Repository returns data
        ↑
Service returns data
        ↑
Controller sends JSON
        ↑ HTTP
incidentsApi.js parses response
        ↑
React state updates
        ↑
UI renders
```

Keep this separation clear as the application grows.
