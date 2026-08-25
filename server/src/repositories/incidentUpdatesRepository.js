// Placeholder for incident updates repository.

import pool from "../config/database.js";

export async function findUpdatesByIncidentId(incidentId){
    const result = await pool.query(`
        SELECT id, incident_id as "incidentId", message, created_by AS "createdBy",
        created_at AS "createdAt"
        FROM incident_updates
        WHERE incident_id = $1
        ORDER BY created_at ASC
        `,
        [incidentId]
    );
    return result.rows;
}

export async function createIncidentUpdate(incidentId, updateData){
    const {message, createdBy} = updateData

    const result = await pool.query(
    `
        INSERT INTO incident_updates (
        incident_id,
        message,
        created_by
    )
    VALUES ($1, $2, $3)
    RETURNING
      id,
      incident_id AS "incidentId",
      message,
      created_by AS "createdBy",
      created_at AS "createdAt"
    `,
    [incidentId, message, createdBy]
);
    
    return result.rows[0];
}