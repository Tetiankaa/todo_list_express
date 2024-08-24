import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ApiError } from "../errors/api-error";
import { IAuthResponse } from "../interfaces/auth.interface";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IToken } from "../interfaces/token.interface";
import { IUserLogin, IUserRegister } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";

class AuthService {
  public async register(userData: IUserRegister): Promise<IAuthResponse> {
    const hashedPassword = await passwordService.hashPassword(
      userData.password,
    );
    const savedUser = await userRepository.save({
      ...userData,
      password: hashedPassword,
    });

    const tokenPair = await this.generateAndSaveTokens(
      savedUser._id,
      savedUser.email,
    );

    return {
      user: savedUser,
      tokens: tokenPair,
    };
  }

  public async login(userData: IUserLogin): Promise<IAuthResponse> {
    const user = await userRepository.findOneBy({ email: userData.email });

    if (!user) {
      this.throwWrongCredentialsError();
    }
    const isPasswordsMatch = await passwordService.compare(
      userData.password,
      user.password,
    );

    if (!isPasswordsMatch) {
      this.throwWrongCredentialsError();
    }
    const tokenPair = await this.generateAndSaveTokens(user._id, user.email);

    return {
      user,
      tokens: tokenPair,
    };
  }

  public async refresh(
    oldTokenId: string,
    jwtPayload: IJwtPayload,
  ): Promise<IToken> {
    await tokenRepository.deleteOneBy({ _id: oldTokenId });

    return await this.generateAndSaveTokens(
      jwtPayload.userId,
      jwtPayload.email,
    );
  }
  private async generateAndSaveTokens(
    userId: string,
    email: string,
  ): Promise<IToken> {
    const tokenPair = tokenService.generateTokenPair({
      userId,
      email,
    });

    await tokenRepository.save(tokenPair, userId);

    return tokenPair;
  }

  private throwWrongCredentialsError(): never {
    throw new ApiError(
      statusCodes.UNAUTHORIZED,
      errorMessages.WRONG_EMAIL_OR_PASSWORD,
    );
  }
}

export const authService = new AuthService();
