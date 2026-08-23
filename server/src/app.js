// Placeholder for Express app setup.
import incidentsRoutes from "./routes/incidentsRoutes.js";

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

export default app;