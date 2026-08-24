// Repository is for SQL queries
import pool from "../config/database.js";

export async function findAllIncidents() {
    const result = await pool.query(`SELECT
    id,
    title,
    description,
    severity,
    status,
    affected_service AS "affectedService",
    assigned_to AS "assignedTo",
    created_at AS "createdAt"
    FROM incidents`);
    return result.rows;
}

export async function findIncidentById(id) {
    const result = await pool.query( `
        SELECT
            id,
            title,
            description,
            severity,
            status,
            affected_service AS "affectedService",
            assigned_to AS "assignedTo",
            created_at AS "createdAt"
        FROM incidents
        WHERE id = $1
        `,
        [id]);
    return result.rows[0];
}

export async function createIncident(incidentData){
    const {title, description, severity, affectedService} = incidentData;
      const result = await pool.query(
    `
      INSERT INTO incidents (
        title,
        description,
        severity,
        affected_service
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        title,
        description,
        severity,
        status,
        affected_service AS "affectedService",
        assigned_to AS "assignedTo",
        created_at AS "createdAt"
    `,
    [
      title,
      description,
      severity,
      affectedService,
    ]
  );

  return result[0];

    
}