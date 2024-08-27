import { FilterQuery } from "mongoose";

import { IActionToken } from "../interfaces/action-token.interface";
import { ActionToken } from "../models/action-token.model";

class ActionTokenRepository {
  public async save(data: Partial<IActionToken>): Promise<IActionToken> {
    return await ActionToken.create(data);
  }
  public async findOneBy(
    filter: FilterQuery<IActionToken>,
  ): Promise<IActionToken> {
    return await ActionToken.findOne(filter);
  }
  public async deleteOneBy(filter: FilterQuery<IActionToken>): Promise<void> {
    await ActionToken.deleteOne(filter);
  }
}

export const actionTokenRepository = new ActionTokenRepository();
