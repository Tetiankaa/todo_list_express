import { NextFunction, Request, Response } from "express";

import { statusCodes } from "../constants/status-codes.constant";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { ITokenDB } from "../interfaces/token.interface";
import { IUser, IUserLogin, IUserRegister } from "../interfaces/user.interface";
import { AuthMapper } from "../mappers/auth.mapper";
import { TokenMapper } from "../mappers/token.mapper";
import { authService } from "../services/auth.service";

class AuthController {
  public async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as IUserRegister;
      const authResponse = await authService.register(userData);
      const mappedData = AuthMapper.toResponseDTO(authResponse);
      res.status(statusCodes.CREATED).json(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async login(req: Request, res: Response, next: NextFunction) {
    try {
      const userData = req.body as IUserLogin;
      const authResponse = await authService.login(userData);
      const mappedData = AuthMapper.toResponseDTO(authResponse);
      res.status(statusCodes.CREATED).json(mappedData);
    } catch (e) {
      next(e);
    }
  }

  public async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      const { _id } = req.res.locals.tokenPair as ITokenDB;
      const jwtPayload = req.res.locals.payload as IJwtPayload;

      const newTokenPair = await authService.refresh(_id, jwtPayload);

      const mappedData = TokenMapper.toDTO(newTokenPair);
      res.status(statusCodes.CREATED).json(mappedData);
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthController();
