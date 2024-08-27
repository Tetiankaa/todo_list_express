import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ApiError } from "../errors/api-error";
import { IUpdateUser, IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getMe(userId: string): Promise<IUser> {
    return await this.findUserOrThrow(userId);
  }
  public async updateMe(userId: string, body: IUpdateUser): Promise<IUser> {
    const user = await this.findUserOrThrow(userId);
    return await userRepository.updateBy({ _id: userId }, { ...user, ...body });
  }
  public async deleteMe(userId: string): Promise<void> {
    await this.findUserOrThrow(userId);
    await userRepository.deleteOneBy({ _id: userId });
  }
  private async findUserOrThrow(userId: string): Promise<IUser> {
    const user = await userRepository.findOneBy({ _id: userId });
    if (!user) {
      throw new ApiError(statusCodes.NOT_FOUND, errorMessages.USER_NOT_FOUND);
    }
    return user;
  }
}

export const userService = new UserService();
