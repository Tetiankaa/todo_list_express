import { emailSubjects } from "../constants/email-subjects.constant";
import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ApiError } from "../errors/api-error";
import {
  IAuthResponse,
  IChangePassword,
  IForgotPassword,
  ISetForgotPassword,
} from "../interfaces/auth.interface";
import { IJwtPayload } from "../interfaces/jwt-payload.interface";
import { IToken } from "../interfaces/token.interface";
import { IUserLogin, IUserRegister } from "../interfaces/user.interface";
import { actionTokenRepository } from "../repositories/action-token.repository";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { emailService } from "./email.service";
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

    const tokenPair = await this.generateAndSaveTokens({
      userId: savedUser._id,
      email: savedUser.email,
    });

    return {
      user: savedUser,
      tokens: tokenPair,
    };
  }

  public async login(userData: IUserLogin): Promise<IAuthResponse> {
    const user = await userRepository.findOneBy({ email: userData.email });

    if (!user || user.providerId || user.provider) {
      this.throwWrongCredentialsError();
    }

    const isPasswordMatch = await passwordService.compare(
      userData.password,
      user.password,
    );

    if (!isPasswordMatch) {
      this.throwWrongCredentialsError();
    }
    const tokenPair = await this.generateAndSaveTokens({
      email: user.email,
      userId: user._id,
    });

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

    return await this.generateAndSaveTokens({ ...jwtPayload });
  }
  public async generateAndSaveTokens(payload: IJwtPayload): Promise<IToken> {
    const tokenPair = tokenService.generateTokenPair({
      ...payload,
    });

    await tokenRepository.save(tokenPair, payload.userId);

    return tokenPair;
  }

  public async changePassword(
    data: IChangePassword,
    userId: string,
  ): Promise<void> {
    const user = await userRepository.findOneBy({ _id: userId });

    const isMatch = await passwordService.compare(
      data.oldPassword,
      user.password,
    );

    if (!isMatch) {
      this.throwWrongCredentialsError();
    }
    const hashedPassword = await passwordService.hashPassword(data.newPassword);
    await userRepository.updateBy(
      { _id: userId },
      { password: hashedPassword },
    );
    await tokenRepository.deleteAllBy({ userId });
  }

  public async forgotPassword(dto: IForgotPassword): Promise<void> {
    const user = await userRepository.findOneBy({ email: dto.email });
    if (!user || user.providerId || user.provider) return;

    const token = tokenService.generateActionToken(
      {
        userId: user._id,
        email: user.email,
      },
      EActionTokenType.FORGOT_PASSWORD,
    );

    await actionTokenRepository.save({
      actionToken: token,
      type: EActionTokenType.FORGOT_PASSWORD,
      userId: user._id,
    });

    emailService.sendEmail(
      user.email,
      emailSubjects.FORGOT_PASSWORD,
      this.getResetEmailHtml(token),
    );
  }

  public async resetPassword(
    dto: ISetForgotPassword,
    actionTokenId: string,
    payload: IJwtPayload,
  ): Promise<void> {
    if (payload.providerId) return;
    const hashedPassword = await passwordService.hashPassword(dto.password);
    const user = await userRepository.updateBy(
      { _id: payload.userId },
      { password: hashedPassword },
    );
    await tokenRepository.deleteAllBy({ userId: user._id });
    await actionTokenRepository.deleteOneBy({ _id: actionTokenId });
  }
  private throwWrongCredentialsError(): never {
    throw new ApiError(
      statusCodes.UNAUTHORIZED,
      errorMessages.WRONG_EMAIL_OR_PASSWORD,
    );
  }

  private getResetEmailHtml(token: string): string {
    return `<p>Click <a href="http://localhost:8080/reset-password/token=${token}">here</a> to reset your password</p>`;
  }
}

export const authService = new AuthService();
