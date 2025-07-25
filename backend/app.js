import express from "express";
import { config } from "dotenv";    
config(); // Load environment variables 
import mongoose from "mongoose";
import startdb from "./db/init_db.js";
import userRoutes from "./routes/userRoute.js";
import captainRoutes from "./routes/captainRoute.js";
import cookieParser from "cookie-parser";
import path from "path";
import cors from "cors";

import userModel from "./models/userModel.js";


const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
})); // Enable CORS for the frontend URL
app.use(express.static(path.join("public")));
app.use(cookieParser());

app.use("/api/v1/users", userRoutes); 
app.use("/api/v1/captains", captainRoutes); 

app.get("/",(req,res) =>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

startdb(); // Initialize the database connection