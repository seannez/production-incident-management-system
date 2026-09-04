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

export async function findAllTeams(){
  const result = await pool.query(`
    SELECT id, name FROM teams
    ORDER BY name
    `)

    return result.rows;
}