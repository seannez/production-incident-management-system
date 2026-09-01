import pool from "../config/database.js";

export async function findTeamById(id) {
  const result = await pool.query(
    `
      SELECT id, name
      FROM teams
      WHERE id = $1
    `,
    [id]
  );

  return result.rows[0];
}