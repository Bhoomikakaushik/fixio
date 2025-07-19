import jwt from "jsonwebtoken";

const generateAuthToken = (user) => {
    const token = jwt.sign(
        {
            id: user._id,
            username: user.username,
            email: user.email
        },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
    );
    return token;
}

export default generateAuthToken;