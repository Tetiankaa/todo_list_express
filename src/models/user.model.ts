import mongoose from "mongoose";

import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    versionKey: false,
    timestamps: true,
  },
);

export const User = mongoose.model<IUser>("users", userSchema);
