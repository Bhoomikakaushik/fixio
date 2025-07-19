import express from "express";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../utils/generateAuthToken.js";

const register = async (req, res) => {
    const { fullName, email, password } = req.body;


    if (!fullName?.firstName || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });  
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ error: "User already exists" });
        } 

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10); 

        // Create new user
        const newUser = new User({  
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName || ""
            },
            email,
            password: hashedPassword
        });

        const token = generateAuthToken(newUser); // Generate auth token
        res.cookie("token", token, { httpOnly: true }); // Set token in cookie  

        // Save the user to the database
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully ", token, newUser});

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
     
}

export {register}