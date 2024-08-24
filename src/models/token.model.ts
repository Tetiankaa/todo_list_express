import mongoose, { Types } from "mongoose";

import { ITokenDB } from "../interfaces/token.interface";
import { User } from "./user.model";

const tokenSchema = new mongoose.Schema(
  {
    access: { type: String, required: true },
    refresh: { type: String, required: true },
    userId: { type: Types.ObjectId, required: true, ref: User },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const Token = mongoose.model<ITokenDB>("tokens", tokenSchema);
