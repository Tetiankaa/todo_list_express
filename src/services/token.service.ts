import * as jsonwebtoken from "jsonwebtoken";

import { config } from "../configs/config";
import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ETokenType } from "../enums/token-type.enum";
import { ApiError } from "../errors/api-error";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IToken } from "../interfaces/token.interface";

class TokenService {
  public generateTokenPair(payload: IJwtPayload): IToken {
    const accessToken = jsonwebtoken.sign(payload, config.JWT_ACCESS_SECRET, {
      expiresIn: config.JWT_ACCESS_EXPIRES_IN,
      algorithm: "HS256",
    });

    const refreshToken = jsonwebtoken.sign(payload, config.JWT_REFRESH_SECRET, {
      expiresIn: config.JWT_REFRESH_EXPIRES_IN,
      algorithm: "HS256",
    });

    return {
      access: accessToken,
      refresh: refreshToken,
    };
  }

  public verifyToken(tokenType: ETokenType, token: string): IJwtPayload {
    try {
      const secret = this.getSecret(tokenType);

      return jsonwebtoken.verify(token, secret, {
        algorithms: ["HS256"],
      }) as IJwtPayload;
    } catch (e) {
      throw new ApiError(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN);
    }
  }

  private getSecret(tokenType: ETokenType): string {
    let secret: string;

    switch (tokenType) {
      case ETokenType.ACCESS:
        secret = config.JWT_ACCESS_SECRET;
        break;
      case ETokenType.REFRESH:
        secret = config.JWT_REFRESH_SECRET;
        break;
      default:
        throw new ApiError(
          statusCodes.UNAUTHORIZED,
          errorMessages.INVALID_TOKEN_TYPE,
        );
    }
    return secret;
  }

  public generateActionToken(
    payload: IJwtPayload,
    tokenType: EActionTokenType,
  ): string {
    try {
      let secret: string;
      let expiresIn: string;

      switch (tokenType) {
        case EActionTokenType.FORGOT_PASSWORD:
          secret = config.ACTION_TOKEN_FORGOT_PASSWORD_SECRET;
          expiresIn = config.ACTION_TOKEN_FORGOT_PASSWORD_EXPIRES_IN;
          break;
        default:
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.INVALID_TOKEN_TYPE,
          );
      }

      return jsonwebtoken.sign(payload, secret, { expiresIn });
    } catch (e) {
      throw new ApiError(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN);
    }
  }

  public verifyActionToken(
    token: string,
    tokenType: EActionTokenType,
  ): IJwtPayload {
    try {
      let secret: string;

      switch (tokenType) {
        case EActionTokenType.FORGOT_PASSWORD:
          secret = config.ACTION_TOKEN_FORGOT_PASSWORD_SECRET;
          break;
        default:
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.INVALID_TOKEN_TYPE,
          );
      }

      return jsonwebtoken.verify(token, secret) as IJwtPayload;
    } catch (e) {
      throw new ApiError(statusCodes.UNAUTHORIZED, errorMessages.INVALID_TOKEN);
    }
  }
}

export const tokenService = new TokenService();
