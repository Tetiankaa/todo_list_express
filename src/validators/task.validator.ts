import Joi from "joi";

export class TaskValidator {
  private static task = Joi.string().min(2).max(300).messages({
    "string.min": "{#label} must be at least {#limit} characters long",
    "string.max": "{#label} must be at most {#limit} characters long",
    "any.required": "{#label} is a required field",
    "string.empty": "{#label} can not be empty",
  });

  private static isDone = Joi.boolean().messages({
    "boolean.base": "The value of {#label} must be a boolean (true or false)",
  });

  public static create = Joi.object({
    task: this.task.required(),
  });

  public static update = Joi.object({
    task: this.task,
    isDone: this.isDone,
  });
}
