//Repository for dashboard
import pool from "../config/database.js"

export async function getDashboardSummary(){
    const result = await pool.query(`
        SELECT COUNT (*)::int AS total,

        COUNT (*) FILTER (
            WHERE status = 'open'
        )::int AS open,

        COUNT(*) FILTER (
        WHERE status = 'investigating'
      )::int AS investigating,

      COUNT(*) FILTER (
        WHERE status = 'resolved'
      )::int AS resolved,

      COUNT(*) FILTER (
        WHERE severity = 'critical'
      )::int AS critical,

      COUNT(*) FILTER (
        WHERE severity = 'high'
      )::int AS high,

      COUNT(*) FILTER (
        WHERE severity = 'medium'
      )::int AS medium,

      COUNT(*) FILTER (
        WHERE severity = 'low'
      )::int AS low

    FROM incidents;
        `)
        return result.rows[0]
}