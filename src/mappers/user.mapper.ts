import { IUser, IUserDTO } from "../interfaces/user.interface";

export class UserMapper {
  public static toDTO(user: IUser): IUserDTO {
    return {
      _id: user._id,
      email: user.email,
      fullName: user.fullName,
    };
  }
}
