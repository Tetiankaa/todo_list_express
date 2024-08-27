import { FilterQuery } from "mongoose";

import { IToken, ITokenDB } from "../interfaces/token.interface";
import { Token } from "../models/token.model";

class TokenRepository {
  public async save(tokens: IToken, userId: string): Promise<ITokenDB> {
    return await Token.create({ ...tokens, userId });
  }

  public async findOneBy(filter: FilterQuery<ITokenDB>): Promise<ITokenDB> {
    return await Token.findOne(filter);
  }
  public async deleteOneBy(filter: FilterQuery<ITokenDB>): Promise<void> {
    await Token.deleteOne(filter);
  }
  public async deleteAllBy(filter: FilterQuery<ITokenDB>): Promise<void> {
    await Token.deleteMany(filter);
  }
}

export const tokenRepository = new TokenRepository();
