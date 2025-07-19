import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        
        firstName: {
            type: String,
            required: true,
            min:3
        },
        lastName: {
            type: String,
        }
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min:[5,'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        min:6
    },
    socketId: {
        type: String,   
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model("User", userSchema);
export default User;