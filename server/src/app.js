// Placeholder for Express app setup.
import incidentsRoutes from "./routes/incidentsRoutes.js";
import incidentUpdatesRoutes from "./routes/incidentUpdatesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import updatesRoutes from "./routes/updatesRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import session from "express-session";
import connectPgSimple from "connect-pg-simple";
import pool from "./config/database.js";
import requireAuth from "./middleware/requireAuth.js";

import express from "express";
import cors from "cors";

const app = express();
const PgSession = connectPgSimple(session);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

app.use(
  session({
    store: new PgSession({
      pool,
      tableName: "user_sessions",
      createTableIfMissing: true,
    }),

    secret: process.env.SESSION_SECRET,

    resave: false,
    saveUninitialized: false,

    cookie: {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/incidents", requireAuth, incidentsRoutes);
app.use("/api/dashboard", requireAuth, dashboardRoutes);
app.use("/api/updates", requireAuth, updatesRoutes);
app.use("/api/auth", authRoutes);

export default app;