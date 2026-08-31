// Placeholder for Express app setup.
import incidentsRoutes from "./routes/incidentsRoutes.js";
import incidentUpdatesRoutes from "./routes/incidentUpdatesRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import updatesRoutes from "./routes/updatesRoutes.js";

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/api/incidents", incidentsRoutes);
app.use("/api/incidents", incidentUpdatesRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/updates", updatesRoutes);

export default app;