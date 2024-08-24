import { ApiError } from "../errors/api-error";
import { ITask } from "../interfaces/task.interface";
import { taskRepository } from "../repositories/task.repository";

class TaskService {
  public async getTasks(): Promise<ITask[]> {
    return await taskRepository.getAll();
  }

  public async saveTask(task: Partial<ITask>): Promise<ITask> {
    return await taskRepository.save(task);
  }

  public async getTask(id: string): Promise<ITask> {
    const task = await taskRepository.getById(id);
    if (!task) {
      throw new ApiError(404, "Task was not found");
    }
    return task;
  }

  public async deleteTask(id: string): Promise<void> {
    await taskRepository.deleteById(id);
  }

  public async toggleTaskCompletion(id: string): Promise<ITask> {
    const task = await taskRepository.getById(id);
    if (!task) {
      throw new ApiError(404, "Task was not found");
    }
    return await taskRepository.updateById(id, { isDone: !task.isDone });
  }
}

export const taskService = new TaskService();
