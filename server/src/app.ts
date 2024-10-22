import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

export { app };
