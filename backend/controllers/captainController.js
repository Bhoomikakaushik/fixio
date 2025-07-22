import bcrypt from "bcrypt";
import Captain from "../models/captainModel.js";
import generateAuthToken from "../utils/generateAuthToken.js";

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
            // profile_picture: req.file ? req.file.path : "../../uploads/captain/default.png",
        });

        const token = generateAuthToken(newCaptain); // Generate auth token
        res.cookie("token", token, { httpOnly: true }); // Set token in cookie  

        // Save the captain to the database
        await newCaptain.save();
        return res.status(201).json({ message: "Captain registered successfully", newCaptain });

    } catch (error) {
        return res.status(500).json({ error: "Internal server error" });
    }
}


export { registerCaptain };