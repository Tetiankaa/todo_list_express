import * as bcrypt from "bcrypt";

import { config } from "../configs/config";

class PasswordService {
  public async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, config.HASH_PASSWORD_ROUNDS);
  }

  public async compare(
    password: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}
export const passwordService = new PasswordService();
