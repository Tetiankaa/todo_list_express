import { NextFunction, Request, Response } from "express";
import { ObjectSchema } from "joi";
import { isObjectIdOrHexString } from "mongoose";

import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ApiError } from "../errors/api-error";

class CommonMiddleware {
  public isBodyValid(validator: ObjectSchema) {
    return async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { error } = await validator.validateAsync(req.body);
        if (error) {
          throw new ApiError(statusCodes.BAD_REQUEST, error.details[0].message);
        }

        next();
      } catch (e) {
        next(e);
      }
    };
  }

  public async isIdValid(req: Request, res: Response, next: NextFunction) {
    try {
      const id = req.params.id;
      if (!isObjectIdOrHexString(id)) {
        throw new ApiError(statusCodes.BAD_REQUEST, errorMessages.INVALID_ID);
      }

      next();
    } catch (e) {
      next(e);
    }
  }
}

export const commonMiddleware = new CommonMiddleware();
