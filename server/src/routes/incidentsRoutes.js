// Given an url what to do with it.

import express from "express";
import { getAllIncidents, getIncidentById , createNewIncident} from "../controllers/incidentsController.js";

const router = express.Router();

router.get("/", getAllIncidents);
router.get("/:id", getIncidentById);
router.post("/", createNewIncident);

export default router;