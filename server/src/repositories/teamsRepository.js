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

export async function findTeamsWithMembers() {
  const result = await pool.query(`
    SELECT
      t.id,
      t.name,
      COALESCE(
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', u.id,
            'name', u.name,
            'email', u.email
          )
        ) FILTER (WHERE u.id IS NOT NULL),
        '[]'
      ) AS members
    FROM teams t
    LEFT JOIN users u
      ON u.team_id = t.id
    GROUP BY
      t.id,
      t.name
    ORDER BY
      t.name
  `);

  return result.rows;
}