import { FilterQuery, UpdateQuery } from "mongoose";

import { IUser, IUserDB } from "../interfaces/user.interface";
import { User } from "../models/user.model";

class UserRepository {
  public async save(data: IUserDB): Promise<IUser> {
    return await User.create(data);
  }

  public async findOneBy(filter: FilterQuery<IUser>): Promise<IUser> {
    return await User.findOne(filter);
  }

  public async updateBy(
    filter: FilterQuery<IUser>,
    data: UpdateQuery<IUser>,
  ): Promise<IUser> {
    return await User.findOneAndUpdate(filter, data, {
      returnDocument: "after",
    });
  }
  public async exists(filter: FilterQuery<IUser>): Promise<boolean> {
    const document = await User.exists(filter);
    return !!document;
  }

  public async deleteOneBy(filter: FilterQuery<IUser>): Promise<void> {
    await User.deleteOne(filter);
  }
}

export const userRepository = new UserRepository();
