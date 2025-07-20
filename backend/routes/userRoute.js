import express from "express";
import {loginUser, registerUser,userProfile,logoutUser} from "../controllers/userController.js";
import authUser from "../middlewares/authmiddleware.js";
const router = express.Router();


router.post("/register",registerUser);
router.post("/login", loginUser);
router.get("/profile",authUser, userProfile);
router.post("/logout", authUser, logoutUser);

export default router;