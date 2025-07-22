import express from "express";
const router = express.Router();
import { registerCaptain } from "../controllers/captainController.js";

router.post("/register-captain", registerCaptain);

export default router;