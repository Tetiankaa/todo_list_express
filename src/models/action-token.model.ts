import mongoose, { Types } from "mongoose";

import { EActionTokenType } from "../enums/action-token-type.enum";
import { IActionToken } from "../interfaces/action-token.interface";
import { User } from "./user.model";

const actionTokenModel = new mongoose.Schema(
  {
    userId: { type: Types.ObjectId, required: true, ref: User },
    actionToken: { type: String, required: true },
    type: { type: String, enum: EActionTokenType, required: true },
  },
  { versionKey: false, timestamps: true },
);

export const ActionToken = mongoose.model<IActionToken>(
  "action_tokens",
  actionTokenModel,
);
