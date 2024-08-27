import { IToken, ITokenDTO } from "./token.interface";
import { IUser, IUserDTO } from "./user.interface";

export interface IAuthResponse {
  user: IUser;
  tokens: IToken;
}

export interface IAuthResponseDTO {
  user: IUserDTO;
  tokens: ITokenDTO;
}
export interface IChangePassword {
  oldPassword: string;
  newPassword: string;
}
export interface IForgotPassword {
  email: string;
}
export interface ISetForgotPassword {
  password: string;
}
