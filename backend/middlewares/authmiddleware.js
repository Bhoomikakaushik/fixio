import jwt from "jsonwebtoken";
import BlacklistToken from "../models/blacklistTokenModel.js";
import User from "../models/userModel.js";

const authUser = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized access" });
  }

    // Check if the token is blacklisted    
    const isBlackListed =await BlacklistToken.findOne({ token: token})
    // console.log("isBlackListed", isBlackListed);
    if (isBlackListed) {
      return res.status(403).json({ message: "Unauthorized,Token is blacklisted" });
    }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token:", decoded);
        // console.log("Decoded user ID:", decoded.id);
        if (!decoded || !decoded.id) { 
            return res.status(401).json({ message: "Invalid token" });
        }
        const user =   await User.findById(decoded.id)
        // console.log(user)
        req.user = user;
        // console.log("User authenticated:", user);
        return next();

    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}
  
export default authUser;