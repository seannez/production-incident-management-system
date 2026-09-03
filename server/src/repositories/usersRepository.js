import pool from "../config/database.js";

export async function findUserByEmail(email){
    const result = await pool.query(
        `
        SELECT id, name, email, password_hash AS "passwordHash", team_id AS "teamId",
        created_at AS "createdAt"
        FROM users
        WHERE email = $1
        `
        , [email]
    )

    return result.rows[0]
}

export async function createUser({
  name,
  email,
  passwordHash,
  teamId,
}) {
  const result = await pool.query(
    `
      INSERT INTO users (
        name,
        email,
        password_hash,
        team_id
      )
      VALUES ($1, $2, $3, $4)
      RETURNING
        id,
        name,
        email,
        team_id AS "teamId",
        created_at AS "createdAt"
    `,
    [name, email, passwordHash, teamId]
  );

  return result.rows[0];
}

export async function findUserById(id){
  const result = await pool.query(
    `
    SELECT id, name, email, team_id AS "teamId", created_at AS "createdAt"
    FROM users
    WHERE id = $1
    `, [id]
  )

  return result.rows[0];
}