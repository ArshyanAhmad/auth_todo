import express from "express";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// add some middlewares
app.use(express.json());


import userRouter from "./routes/user.routes";
app.use("/users", userRouter);

export default app;