import passport from "passport";
import {
  Strategy as GoogleStrategy,
  Profile,
  VerifyCallback,
} from "passport-google-oauth20";

import { config } from "../configs/config";
import { errorMessages } from "../constants/error-messages.constant";
import { statusCodes } from "../constants/status-codes.constant";
import { ApiError } from "../errors/api-error";
import { IToken } from "../interfaces/token.interface";
import { IUser } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";
import { authService } from "../services/auth.service";

passport.use(
  new GoogleStrategy(
    {
      clientID: config.GOOGLE_CLIENT_ID,
      clientSecret: config.GOOGLE_SECRET,
      callbackURL: "http://localhost:3000/auth/redirect/google",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done: VerifyCallback,
    ) => {
      try {
        const email = profile.emails[0].value;
        const provider = profile.provider;
        const providerId = profile.id;
        const fullName = profile.displayName;

        let user: IUser;
        user = await userRepository.findOneBy({
          email,
        });

        if (user && (!user.provider || !user.providerId)) {
          throw new ApiError(
            statusCodes.UNAUTHORIZED,
            errorMessages.WRONG_EMAIL_OR_PASSWORD,
          );
        }

        if (!user && email && provider && providerId && fullName) {
          user = await userRepository.save({
            email,
            provider,
            providerId,
            fullName,
          });
        }

        let tokenPair: IToken;
        if (user) {
          tokenPair = await authService.generateAndSaveTokens({
            email: user.email,
            userId: user._id,
            providerId: user.providerId,
          });
        }
        done(null, tokenPair);
      } catch (err) {
        done(err);
      }
    },
  ),
);
