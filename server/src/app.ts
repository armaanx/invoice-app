import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

//routes
import userRouter from "./routes/user.routes.ts";
app.use("/api/auth", userRouter);

export { app };
