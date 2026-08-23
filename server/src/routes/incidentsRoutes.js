// Given an url what to do with it.

import express from "express";
import { getAllIncidents } from "../controllers/incidentsController.js";

const router = express.Router();

router.get("/", getAllIncidents);

export default router;