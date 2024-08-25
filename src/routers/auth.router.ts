import { Router } from "express";

import { authController } from "../controllers/auth.controller";
import { ETokenType } from "../enums/token-type.enum";
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
router.patch("change-password",
    authMiddleware.verifyToken(ETokenType.ACCESS),
    commonMiddleware.isBodyValid(UserValidator.changePassword),

    )
export const authRouter = router;
