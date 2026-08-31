import express from "express";
import {
  getAllUpdates,
} from "../controllers/incidentUpdatesController.js";

const router = express.Router();

router.get("/", getAllUpdates);

export default router;