import express from "express";
const router = express.Router();
import { registerCaptain,loginCaptain } from "../controllers/captainController.js";


router.post("/register-captain", registerCaptain);
router.post("/login-captain", loginCaptain);


export default router;