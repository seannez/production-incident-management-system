// Repository is for SQL queries
import pool from "../config/database.js";

export async function findAllIncidents() {
    const result = await pool.query("SELECT * FROM incidents");
    return result.rows;
}