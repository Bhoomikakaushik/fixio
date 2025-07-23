import express from "express";
const router = express.Router();
import { registerCaptain,loginCaptain,captainProfile,logoutCaptain } from "../controllers/captainController.js";
import {authCaptain} from "../middlewares/authmiddleware.js"; 
import upload from "../middlewares/multer.js"; 

router.post("/register-captain",upload.single("file"), registerCaptain);
router.post("/login-captain", loginCaptain);
router.get("/captain-profile", authCaptain, captainProfile);
router.get("/logout-captain", authCaptain,logoutCaptain); 


export default router;