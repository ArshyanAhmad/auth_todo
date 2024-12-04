import { User } from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { userSchema } from "../types/userTypes";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { RouteHandler } from "../types/userHandler";


export const register: RouteHandler = async (req, res, next): Promise<void> => {
    const success = userSchema.safeParse(req.body);

    if (!success.success) {

        const errorMessage = success.error.errors.map(err => err.message).join(",") || "Something went wrong"

        res.status(400).json({
            mess: `Error detected: ${errorMessage}`
        })

    }

    const { username, password } = req.body;

    try {
        const userExist = await User.findOne({ username });

        if (userExist) {
            res.json(new ApiError(400, "Invalid input", null, ["User already exist"]));
        }

        const user = await User.create({
            username,
            password
        })

        res.json(new ApiResponse(201, "User registered successfully", user));

    } catch (error) {
        console.log(error);
        res.json(new ApiError(400, "Internal Server Error, Registration failed"));
    }
}


export const Login: RouteHandler = async (req, res, next): Promise<void> => {

    const success = userSchema.safeParse(req.body);

    if (!success.success) {

        const errorMessage = success.error.errors.map(err => err.message).join(",") || "Something went wrong"

        res.status(400).json({
            mess: `Error detected: ${errorMessage}`
        })

    }

    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username }).select("+password");

        if (!user) {
            res.json(new ApiError(400, "User not found"));
        }

        else {
            const isMatch = await user.isPasswordCorrect(password);

            if (!isMatch) {
                res.json(new ApiError(400, "Invalid input", null, ["Password didn't matched"]));
            }

            let token = await user.generateToken();
            res.header("Authentication", `Bearer ${token}`)
        }

        res.json(new ApiResponse(200, "User login successfully", user))

    } catch (error) {
        console.log(error);
        res.json(new ApiError(400, "Internal Server Error, Login failed"));
    }
}

export const Logout: RouteHandler = (req, res, next) => {
    res.send("Logout");
} 