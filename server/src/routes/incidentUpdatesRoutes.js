// Placeholder for incident updates routes.

import express from "express";
import {
    getIncidentUpdates, createIncidentUpdate
}   from "../controllers/incidentUpdatesController.js";

const router = express.Router();

router.get("/:id/updates", getIncidentUpdates);
router.post("/:id/updates", createIncidentUpdate);

export default router;