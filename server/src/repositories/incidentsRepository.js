// Repository is for SQL queries
import pool from "../config/database.js";

export async function findAllIncidents() {
  const result = await pool.query(`
    SELECT
      i.id,
      i.title,
      i.description,
      i.severity,
      i.status,
      i.affected_service AS "affectedService",
      i.assigned_to_user_id AS "assignedToUserId",
      u.name AS "assignedTo",
      i.created_at AS "createdAt"
    FROM incidents i
    LEFT JOIN users u
      ON i.assigned_to_user_id = u.id
    ORDER BY i.created_at DESC
  `);

  return result.rows;
}

export async function findIncidentById(id) {
  const result = await pool.query(
    `
      SELECT
        i.id,
        i.title,
        i.description,
        i.severity,
        i.status,
        i.affected_service AS "affectedService",
        i.assigned_to_user_id AS "assignedToUserId",
        u.name AS "assignedTo",
        i.created_at AS "createdAt"
      FROM incidents i
      LEFT JOIN users u
        ON i.assigned_to_user_id = u.id
      WHERE i.id = $1
    `,
    [id]
  );

  return result.rows[0];
}

export async function createIncident(incidentData, userId) {
  const {
    title,
    description,
    severity,
    affectedService,
  } = incidentData;

  const result = await pool.query(
    `
      INSERT INTO incidents (
        title,
        description,
        severity,
        affected_service,
        assigned_to_user_id
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `,
    [
      title,
      description,
      severity,
      affectedService,
      userId,
    ]
  );

  const newIncidentId = result.rows[0].id;

  return findIncidentById(newIncidentId);
}

export async function updateStatus(id, status) {
  const result = await pool.query(
    `
      UPDATE incidents
      SET status = $1
      WHERE id = $2
      RETURNING id
    `,
    [status, id]
  );

  if (!result.rows[0]) {
    return undefined;
  }

  return findIncidentById(result.rows[0].id);
}
