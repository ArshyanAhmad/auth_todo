import mongoose, { Schema, Document } from "mongoose";
const bcryptjs = require("bcryptjs");
import jwt from "jsonwebtoken";
import { jwt_token } from "../constant";


interface IUser extends Document {
    username: string;
    password: string;
    generateToken(): string;
    isPasswordCorrect(password: string): boolean;
}

const userSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    userTodo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todos"
    }
})

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcryptjs.hash(this.password, 10);
    next();
})

userSchema.methods.generateToken = async function (): Promise<string> {
    const token = await jwt.sign({ _id: this._id }, jwt_token, {
        expiresIn: "1h"
    })
    return token;
}

userSchema.methods.isPasswordCorrect = async function (password: string): Promise<boolean> {
    const isMatch = await bcryptjs.compare(password, this.password);

    return isMatch;
}

export const User = mongoose.model<IUser>("User", userSchema);