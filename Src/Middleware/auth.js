import jwt from "jsonwebtoken";
import userModel from "../../DB/Models/userModel.js";

export const auth = () => {
    return async (req, res, next) => {
        const { authorization } = req.headers;
        if (!authorization?.startsWith(process.env.BEARERKEY)) {
            return res.status(400).json({message:"invalid authorization"})
        }
        const token = authorization.split(process.env.BEARERKEY)[1];
        const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
        if (!decoded) {
            return res.status(400).json({message:"invalid authorization"})
        }
        const user = await userModel.findById(decoded.id);
        if (!user) {
            return res.status(400).json({message:"not registred user"})
        }
        if (user.role == "User") {
            return res.status(400).json({message:"not auth user"})
        }
        return res.json({message: "fg", user})
        next();
    }
}