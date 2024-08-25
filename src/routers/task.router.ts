import { Router } from "express";

import { taskController } from "../controllers/task.controller";
import { ETokenType } from "../enums/token-type.enum";
import { authMiddleware } from "../middlewares/auth.middleware";
import { commonMiddleware } from "../middlewares/common.middleware";
import { TaskValidator } from "../validators/task.validator";

const router = Router();

router.get(
  "",
  authMiddleware.verifyToken(ETokenType.ACCESS),
  taskController.getTasks,
);

router.get(
  "/:id",
  commonMiddleware.isIdValid,
  authMiddleware.verifyToken(ETokenType.ACCESS),
  taskController.getTask,
);

router.post(
  "",
  authMiddleware.verifyToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(TaskValidator.create),
  taskController.saveTask,
);

router.delete(
  "/:id",
  commonMiddleware.isIdValid,
  authMiddleware.verifyToken(ETokenType.ACCESS),
  taskController.deleteTask,
);

router.patch(
  "/:id",
  commonMiddleware.isIdValid,
  authMiddleware.verifyToken(ETokenType.ACCESS),
  commonMiddleware.isBodyValid(TaskValidator.update),
  taskController.updateTask,
);

export const taskRouter = router;
