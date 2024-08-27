import { NextFunction, Request, Response } from "express";

import { statusCodes } from "../constants/status-codes.constant";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IUpdateUser, IUser } from "../interfaces/user.interface";
import { UserMapper } from "../mappers/user.mapper";
import { userService } from "../services/user.service";

class UserController {
  public async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.payload as IJwtPayload;

      const user = await userService.getMe(userId);
      const mappedData = UserMapper.toDTO(user);
      res.json(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.payload as IJwtPayload;
      const body = req.body as IUser as IUpdateUser;

      const user = await userService.updateMe(userId, body);
      const mappedData = UserMapper.toDTO(user);
      res.json(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const { userId } = req.res.locals.payload as IJwtPayload;

      await userService.deleteMe(userId);
      res.sendStatus(statusCodes.NO_CONTENT);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
