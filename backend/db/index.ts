import mongoose from "mongoose";
import { MONGO_URL } from "../constant";

export const connectDB = async () => {
    try {

        const connectionInstance = await mongoose.connect(MONGO_URL);

        console.log(`Database connected successfully: ${connectionInstance.connection.host}`);

    } catch (error) {
        console.log(`Database connection error: ${error}`);
        process.exit(1);
    }
}