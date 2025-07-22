import mongoose from "mongoose";
const captainSchema = new mongoose.Schema({
    fullName: { 
        firstName: {
            type: String,
            required: true,
            min: 3
        },
        lastName: {
            type: String,
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        min: [5, 'Email must be at least 5 characters long'],
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    contact:{
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    profile_picture: {
        type: String,
        default: "../../uploads/captain/default.png"
    },
    address: {
        type: String,
        required: true,
    },
    services_offered: {
        type: [String],
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: false,
    },
    socketId: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
});

const Captain = mongoose.model("Captain", captainSchema);
export default Captain;