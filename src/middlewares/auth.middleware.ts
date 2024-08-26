import { NextFunction, Request, Response } from "express";

import { config } from "../configs/config";
import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { ITokenDB } from "../interfaces/token.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { tokenService } from "../services/token.service";

class AuthMiddleware {
  public verifyToken(tokenType: ETokenType) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.headers.authorization?.split(config.TOKEN_PREFIX)[1];
        if (!token) {
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.NO_TOKEN_PROVIDED,
          );
        }

        const payload = tokenService.verifyToken(tokenType, token);

        if (!payload) {
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.INVALID_TOKEN,
          );
        }

        const tokenPair = await this.findToken(
          tokenType,
          token,
          payload.userId,
        );

        if (!tokenPair) {
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.INVALID_TOKEN,
          );
        }
        const user = await userRepository.findOneBy({ _id: payload.userId });

        if (!user) {
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.INVALID_TOKEN,
          );
        }
        req.res.locals.payload = payload;
        req.res.locals.tokenPair = tokenPair;

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isEmailExists(req: Request, res: Response, next: NextFunction) {
    try {
      const email = req.body.email;

      const user = await userRepository.findOneBy({ email });

      if (user) {
        throw new ApiError(
          statusCodes.BAD_REQUEST,
          errorMessages.EMAIL_ALREADY_EXISTS,
        );
      }

      next();
    } catch (e) {
      next(e);
    }
  }

  private async findToken(
    tokenType: ETokenType,
    token: string,
    userId: string,
  ): Promise<ITokenDB> {
    let foundedToken: ITokenDB;

    switch (tokenType) {
      case ETokenType.ACCESS:
        foundedToken = await tokenRepository.findOneBy({
          userId,
          access: token,
        });
        break;
      case ETokenType.REFRESH:
        foundedToken = await tokenRepository.findOneBy({
          userId,
          refresh: token,
        });
        break;
    }

    return foundedToken;
  }
}
export const authMiddleware = new AuthMiddleware();
