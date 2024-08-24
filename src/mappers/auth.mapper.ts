import { IAuthResponse, IAuthResponseDTO } from "../interfaces/auth.interface";
import { TokenMapper } from "./token.mapper";
import { UserMapper } from "./user.mapper";

export class AuthMapper {
  public static toResponseDTO(data: IAuthResponse): IAuthResponseDTO {
    return {
      tokens: TokenMapper.toDTO(data.tokens),
      user: UserMapper.toDTO(data.user),
    };
  }
}
