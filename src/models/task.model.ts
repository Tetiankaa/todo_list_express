import mongoose from "mongoose";
import {ITask} from "../interfaces/task.interface";

const TaskModel = new mongoose.Schema({
    task: { type: String, required: true},
    isDone: {type: Boolean, required: true, default: false}
},
    {
        versionKey: false,
        timestamps: true
    })

export const Task = mongoose.model<ITask>('tasks',TaskModel);
