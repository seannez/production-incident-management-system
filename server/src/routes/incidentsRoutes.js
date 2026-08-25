// Given an url what to do with it.

import express from "express";
import { getAllIncidents, getIncidentById , createNewIncident
    , upDateIncidentStatus
} from "../controllers/incidentsController.js";
import  validateIncident  from "../middleware/validateIncident.js";

const router = express.Router();

router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.post("/", validateIncident, createNewIncident);
router.patch('/:id/status', upDateIncidentStatus)

export default router;