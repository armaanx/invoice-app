import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import { DB_NAME } from "./constants.ts";
import dotenv from "dotenv";
dotenv.config();

const app: Express = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["POST", "GET", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: `${process.env.DB_URL}/${DB_NAME}` }),
    cookie: { maxAge: 3600000 }, // Session expires in 30 minutes
  })
);

//routes
import userRouter from "./routes/user.routes.ts";
app.use("/api/auth", userRouter);
import invoiceRouter from "./routes/invoice.routes.ts";
app.use("/api/invoice", invoiceRouter);

export { app };
