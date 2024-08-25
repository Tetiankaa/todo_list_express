import { FilterQuery, UpdateQuery } from "mongoose";

import { IPagination } from "../interfaces/pagination.interface";
import { IQuery } from "../interfaces/query.interface";
import { ICreateTask, ITask } from "../interfaces/task.interface";
import { Task } from "../models/task.model";

class TaskRepository {
  public async getAll(
    userId: string,
    query: IQuery,
  ): Promise<IPagination<ITask>> {
    const { search, limit = 20, page = 1 } = query;

    const skip = (Number(page) - 1) * Number(limit);

    const filter: FilterQuery<ITask> = { userId };

    if (search) filter.task = { $regex: search, $options: "i" };

    const items = await Task.find(filter)
      .skip(skip)
      .limit(limit)
      .sort({ isDone: 1 });

    const totalCount = await Task.countDocuments(filter);
    const totalPages = Math.ceil(totalCount / Number(limit));

    return {
      items,
      page: Number(page),
      limit: Number(limit),
      totalCount,
      totalPages,
    };
  }

  public async save(data: ICreateTask, userId: string): Promise<ITask> {
    return await Task.create({ ...data, userId });
  }

  public async getOneBy(filter: FilterQuery<ITask>): Promise<ITask> {
    return await Task.findOne(filter);
  }

  public async deleteById(id: string): Promise<void> {
    await Task.findOneAndDelete({ _id: id });
  }

  public async updateById(
    id: string,
    data: UpdateQuery<ITask>,
  ): Promise<ITask> {
    return await Task.findOneAndUpdate({ _id: id }, data, {
      returnDocument: "after",
    });
  }
}

export const taskRepository = new TaskRepository();
