import mongoose, { Types } from "mongoose";

import { ITask } from "../interfaces/task.interface";
import { User } from "./user.model";

const TaskModel = new mongoose.Schema(
  {
    task: { type: String, required: true },
    isDone: { type: Boolean, required: true, default: false },
    userId: { type: Types.ObjectId, required: true, ref: User },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Task = mongoose.model<ITask>("tasks", TaskModel);
