export interface IUser {
  _id: string;
  email: string;
  password: string;
  fullName: string;
}
export interface IUserRegister
  extends Pick<IUser, "password" | "email" | "fullName"> {}

export interface IUserLogin extends Pick<IUser, "password" | "email"> {}

export interface IUserDTO extends Pick<IUser, "_id" | "fullName" | "email"> {}
