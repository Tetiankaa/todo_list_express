import express, { NextFunction, Request, Response } from "express";
import * as mongoose from "mongoose";

import { config } from "./configs/config";
import { ApiError } from "./errors/api-error";
import { authRouter } from "./routers/auth.router";
import { taskRouter } from "./routers/task.router";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/tasks", taskRouter);
app.use("/auth", authRouter);

app.use(
  "*",
  (err: ApiError, req: Request, res: Response, next: NextFunction) => {
    return res.status(err.status || 500).json(err.message);
  },
);

process.on("uncaughtException", (error) => {
  console.error("Uncaught exception", error);
  process.exit(1);
});

app.listen(config.PORT, config.HOST, async () => {
  console.log(`Server is running at http://${config.HOST}:${config.PORT}`);
  await mongoose.connect(config.MONGO_URL, {});
});
