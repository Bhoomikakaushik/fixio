import express from "express";
import { config } from "dotenv";    
import mongoose from "mongoose";
import startdb from "./db/init_db.js";
import userRoutes from "./routes/userRoute.js";
import cookieParser from "cookie-parser";

import userModel from "./models/userModel.js";
config(); // Load environment variables from .ev file

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded data
app.use(cookieParser()); // Middleware to parse cookies

app.use("/api/v1/users", userRoutes); 

app.get("/",(req,res) =>{
    res.send("hello world")
})

app.listen(port,()=>{
    console.log(`app is listening on port ${port}`)
})

startdb(); // Initialize the database connection