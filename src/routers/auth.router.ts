import "../auth/passport";

import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";

import { authController } from "../controllers/auth.controller";
import { EActionTokenType } from "../enums/action-token-type.enum";
import { ETokenType } from "../enums/token-type.enum";
import { IToken } from "../interfaces/token.interface";
import { TokenMapper } from "../mappers/token.mapper";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { UserValidator } from "../validators/user.validator";

const router = Router();

router.post(
  "/register",
  authMiddleware.isEmailExists,
  commonMiddleware.isBodyValid(UserValidator.register),
  authController.register,
);

router.post(
  "/login",
  commonMiddleware.isBodyValid(UserValidator.login),
  authController.login,
);

router.post(
  "/refresh",
  authMiddleware.verifyToken(ETokenType.REFRESH),
  authController.refresh,
);
router.patch(
  "/change-password",
  authMiddleware.verifyToken(ETokenType.ACCESS),
  authMiddleware.isAllowedChangingPassword,
  commonMiddleware.isBodyValid(UserValidator.changePassword),
  authController.changePassword,
);
router.post(
  "/forgot-password",
  commonMiddleware.isBodyValid(UserValidator.forgotPassword),
  authController.forgotPassword,
);
router.patch(
  "/reset-password",
  authMiddleware.verifyActionToken(EActionTokenType.FORGOT_PASSWORD),
  commonMiddleware.isBodyValid(UserValidator.setForgotPassword),
  authController.resetPassword,
);
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  }),
);
router.get(
  "/redirect/google",
  passport.authenticate("google", { session: false }),
  (req: Request, res: Response, next: NextFunction) => {
    const tokenPair = req.user as IToken;
    res.json(TokenMapper.toDTO(tokenPair));
  },
);
export const authRouter = router;
