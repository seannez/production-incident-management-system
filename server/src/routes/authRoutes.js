import express from "express";
import { register, login, me } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login)
router.post("/me", me)

export default router;