import { NextFunction, Request, Response } from "express";

import { ITask } from "../interfaces/task.interface";
import { taskService } from "../services/task.service";

class TaskController {
  public async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const tasks = await taskService.getTasks();
      res.send(tasks);
    } catch (e) {
      next(e);
    }
  }

  public async saveTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskToSave = req.body as Partial<ITask>;
      const savedTask = await taskService.saveTask(taskToSave);
      res.status(201).json(savedTask);
    } catch (e) {
      next(e);
    }
  }
  public async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const task = await taskService.getTask(id);
      res.send(task);
    } catch (e) {
      next(e);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      await taskService.deleteTask(id);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async toggleTaskCompletion(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const task = await taskService.toggleTaskCompletion(id);
      res.send(task);
    } catch (e) {
      next(e);
    }
  }
}
export const taskController = new TaskController();
