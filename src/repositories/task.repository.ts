import {ITask} from "../interfaces/task.interface";
import {Task} from "../models/task.model";
import {UpdateQuery} from "mongoose";

class TaskRepository {
    public async getAll(): Promise<ITask[]> {
        return await Task.find().sort({isDone: 1});
    }

    public async save(data: Partial<ITask>): Promise<ITask> {
        return await Task.create(data);
    }

    public async getById(id: string): Promise<ITask> {
        return await Task.findOne({_id: id});
    }

    public async deleteById(id: string): Promise<void> {
        await Task.findOneAndDelete({_id: id});
    }

    public async updateById(id: string, data: UpdateQuery<ITask> ): Promise<ITask> {
        return await Task.findOneAndUpdate({ _id: id}, data,{returnDocument: 'after'});
    }

}

export const taskRepository = new TaskRepository();
