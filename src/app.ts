import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import todoRoutes from "./modules/todo/todo.routes";

import connectDB from "./configs/db";
import cors, { CorsOptions } from "cors";

dotenv.config();

const app = express();

const allowedOrigins: string[] = (process.env.ALLOWED_ORIGIN || "")
  .split(",")
  .map((origin) => origin.trim());

const corsOptions: CorsOptions = {
  origin: (
    origin: string | undefined,
    callback: (err: Error | null, allow?: boolean) => void
  ) => {
    if (allowedOrigins.includes(origin as string) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

app.use(cors(corsOptions));

connectDB();

app.use(express.json());
//static file serving
app.use("/api/todos", todoRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Test application!");
});

export default app;
