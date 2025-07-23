import bcrypt from "bcrypt";
import Captain from "../models/captainModel.js";
import generateAuthToken from "../utils/generateAuthToken.js";
import BlacklistToken from "../models/blacklistTokenModel.js";

const registerCaptain = async (req, res) => {
    const { fullName, email, password, address, contact, isAvailable,services_offered } = req.body;

    if (!fullName?.firstName || !email || !password || !address || !contact || !services_offered) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        // Check if captain already exists
        const existingCaptain = await Captain.findOne({ email });
        if (existingCaptain) {
            return res.status(400).json({ error: "Captain already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        const profile_picture = req.file ? req.file.path : "../../uploads/captain/default.png";

        // Create new captain
        const newCaptain = new Captain({
            fullName: {
                firstName: fullName.firstName,
                lastName: fullName.lastName || ""
            },
            email,
            password: hashedPassword,
            contact,
            address,
            services_offered,
            isAvailable: isAvailable || false,
            profile_picture: profile_picture,
        });

        const token = generateAuthToken(newCaptain); // Generate auth token
        res.cookie("token", token, { httpOnly: true }); // Set token in cookie  

        // Save the captain to the database
        await newCaptain.save();
        return res.status(201).json({ message: "Captain registered successfully", token,newCaptain });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const loginCaptain = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }
    try {
        // Find captain by email
        const captain = await Captain.findOne({ email });
        if (!captain) {
            return res.status(400).json({ error: "Invalid email or password" });
        }   
        // Check password
        const isMatch = await bcrypt.compare(password, captain.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password" });
        }
        const token = generateAuthToken(captain); // Generate auth token
        res.cookie("token", token, { httpOnly: true }); // Set token in cookie
        return res.status(200).json({ message: "Login successful", token,captain });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const captainProfile = async (req, res) => {
    try {
        const captain = req.captain; 
        if (!captain) {
            return res.status(404).json({ error: "Captain not found" });
        }
        return res.status(200).json({ captain });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

const logoutCaptain = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "token not provided" });
        }
        res.clearCookie("token"); // Clear the cookie

        if (token) {
            await BlacklistToken.create({ token:token }); 
        }
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}

export { registerCaptain, loginCaptain , captainProfile,logoutCaptain };
