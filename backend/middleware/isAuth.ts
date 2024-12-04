import { RouteHandler } from "../types/userHandler";
import jwt from "jsonwebtoken";
import { jwt_token } from "../constant";
import { User } from "../models/user.model";
import { ApiError } from "../utils/ApiError";

interface jwtPayload {
    _id: string
}

export const isAuthenticated: RouteHandler = async (req, res, next) => {

    const token = req.headers.authorization;

    if (!token) {
        res.json(new ApiError(400, "Invalid input", null, ["Authorization token is required"]))
    };

    try {

        if (token) {
            const jwtToken = token?.split(" ")[1];

            const decoded = jwt.verify(jwtToken, jwt_token) as jwtPayload;

            const user = await User.findById(decoded._id);

            if (!user) {
                res.json(new ApiError(400, "User not found", null, ["Invalid or expired token"]));
            }
        }

        next();
    }

    catch (error) {
        console.log(error);
        res.json(new ApiError(400, "Error detected", null, ["User not authorized"]));
    }

}