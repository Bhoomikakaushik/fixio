import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import generateAuthToken from "../utils/generateAuthToken.js";
import BlacklistToken from "../models/blacklistTokenModel.js";

const registerUser = async (req, res) => {
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

const loginUser = async (req,res) => {
    const { email, password } = req.body;   
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }

        const token = generateAuthToken(user); // Generate auth token
        res.cookie("token", token, { httpOnly: true }); // Set token in cookie

        return res.status(200).json({ message: "Login successful", token, user });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const userProfile = async (req, res) => {
    try {
        const user = req.user; // User is set by auth middleware
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        return res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const logoutUser = async (req,res) => {
    try {
        
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        // console.log("Token to be cleared:", token)
        if (!token) {
            return res.status(400).json({ message: "No token provided" });
        }
        res.clearCookie("token"); // Clear the cookie

        if (token) {
            await BlacklistToken.create({ token:token }); 
        }

        return res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }

}
export {registerUser,loginUser, userProfile, logoutUser};