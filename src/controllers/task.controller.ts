import { NextFunction, Request, Response } from "express";

import { statusCodes } from "../constants/status-codes.constant";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IQuery } from "../interfaces/query.interface";
import {ICreateTask, IUpdateTask} from "../interfaces/task.interface";
import { TaskMapper } from "../mappers/task.mapper";
import { taskService } from "../services/task.service";

class TaskController {
  public async getTasks(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.payload as IJwtPayload;
      const query = req.query as IQuery;

      const tasks = await taskService.getTasks(userId, query);

      const mappedData = TaskMapper.toListResponseDTO(tasks);

      res.send(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async saveTask(req: Request, res: Response, next: NextFunction) {
    try {
      const taskToSave = req.body as ICreateTask;
      const { userId } = req.res.locals.payload as IJwtPayload;

      const savedTask = await taskService.saveTask(taskToSave, userId);
      const mappedData = TaskMapper.toDTO(savedTask);

      res.status(statusCodes.CREATED).json(mappedData);
    } catch (e) {
      next(e);
    }
  }
  public async getTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { userId } = req.res.locals.payload as IJwtPayload;

      const task = await taskService.getTask(id, userId);

      const mappedData = TaskMapper.toDTO(task);
      res.send(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async deleteTask(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      const { userId } = req.res.locals.payload as IJwtPayload;

      await taskService.deleteTask(id, userId);
      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }

  public async updateTask(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    try {
      const id = req.params.id;
      const { userId } = req.res.locals.payload as IJwtPayload;
      const taskToUpdate = req.body as IUpdateTask;

      const task = await taskService.updateTask(id, userId, taskToUpdate);

      const mappedData = TaskMapper.toDTO(task);
      res.send(mappedData);
    } catch (e) {
      next(e);
    }
  }
}
export const taskController = new TaskController();
