import { FilterQuery } from "mongoose";

import { IUser, IUserRegister } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async save(data: IUserRegister): Promise<IUser> {
    return await User.create(data);
  }

  public async findOneBy(filter: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(filter);
  }
}

export const userRepository = new UserRepository();
