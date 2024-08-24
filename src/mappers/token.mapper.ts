import { IToken, ITokenDTO } from "../interfaces/token.interface";

export class TokenMapper {
  public static toDTO(tokens: IToken): ITokenDTO {
    return {
      access: tokens.access,
      refresh: tokens.refresh,
    };
  }
}
