import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ApiError } from "../errors/api-error";
import { IPagination } from "../interfaces/pagination.interface";
import { IQuery } from "../interfaces/query.interface";
import { ICreateTask, ITask, IUpdateTask } from "../interfaces/task.interface";
import { taskRepository } from "../repositories/task.repository";

class TaskService {
  public async getTasks(
    userId: string,
    query: IQuery,
  ): Promise<IPagination<ITask>> {
    return await taskRepository.getAll(userId, query);
  }

  public async saveTask(task: ICreateTask, userId: string): Promise<ITask> {
    return await taskRepository.save(task, userId);
  }

  public async getTask(id: string, userId: string): Promise<ITask> {
    return await this.findTaskOrThrow(id, userId);
  }

  public async deleteTask(id: string, userId: string): Promise<void> {
    await this.findTaskOrThrow(id, userId);
    await taskRepository.deleteById(id);
  }

  public async updateTask(
    id: string,
    userId: string,
    data: IUpdateTask,
  ): Promise<ITask> {
    await this.findTaskOrThrow(id, userId);

    return await taskRepository.updateById(id, { ...data });
  }

  private async findTaskOrThrow(
    taskId: string,
    userId: string,
  ): Promise<ITask> {
    const task = await taskRepository.getOneBy({ _id: taskId, userId });
    if (!task) {
      throw new ApiError(statusCodes.NOT_FOUND, errorMessages.TASK_NOT_FOUND);
    }
    return task;
  }
}

export const taskService = new TaskService();
