import mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String },
    provider: { type: String },
    providerId: { type: String },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("users", userSchema);
