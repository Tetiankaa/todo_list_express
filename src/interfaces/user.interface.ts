export interface IUser {
  _id: string;
  email: string;
  fullName: string;
  password?: string;
  provider?: string;
  providerId?: string;
}
export interface IUserRegister
  extends Pick<IUser, "password" | "email" | "fullName"> {}

export interface IUserDB extends Omit<IUser, "_id"> {}

export interface IUserLogin extends Pick<IUser, "password" | "email"> {}

export interface IUserDTO extends Pick<IUser, "_id" | "fullName" | "email"> {}

export interface IUpdateUser extends Pick<IUser, "password"> {}
