import { Router } from "express";

import { taskController } from "../controllers/task.controller";
import { commonMiddleware } from "../middlewares/common.middleware";
import { TaskValidator } from "../validators/task.validator";

const router = Router();

router.get("", taskController.getTasks);

router.get("/:id", commonMiddleware.isIdValid, taskController.getTask);

router.post(
  "",
  commonMiddleware.isBodyValid(TaskValidator.create),
  taskController.saveTask,
);

router.delete("/:id", commonMiddleware.isIdValid, taskController.deleteTask);

router.patch(
  "/:id",
  commonMiddleware.isIdValid,
  taskController.toggleTaskCompletion,
);

export const taskRouter = router;
