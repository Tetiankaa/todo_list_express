export interface IToken {
  access: string;
  refresh: string;
}

export interface ITokenDB extends IToken {
  _id: string;
  userId: string;
}

export interface ITokenDTO extends Pick<IToken, "access" | "refresh"> {}
