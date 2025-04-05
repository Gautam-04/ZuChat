import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";

const Authentication = async (req, res, next) => {
    try {
        const accessToken = req.cookies?.accessToken;

        if (!accessToken) {
            return res.status(401).json({ message: "No token found. Please login again" });
        }

        const decodedToken = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findOne({
            where: { id: decodedToken?.id },
            attributes: { exclude: ['password'] } 
        });

        if (!user.dataValues?.id) {
            return res.status(401).json({ message: "Token is not valid or user not found" });
        }
        req.userId = user.dataValues?.id;
        
        next();
    } catch (error) {
        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({ message: "Invalid token" });
        }
        
        return res.status(500).json({ message: "Authentication error", error: error.message });
    }
};

export { Authentication };