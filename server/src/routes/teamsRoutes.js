import express from "express";
import { getTeams, getTeamsMembers } from "../controllers/teamsController.js";
import requireAuth from "../middleware/requireAuth.js";

const router = express.Router();

router.get("/", getTeams);
router.get("/members", requireAuth, getTeamsMembers)

export default router;