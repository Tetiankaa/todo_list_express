import Joi from "joi";

export class UserValidator {
  private static fullName = Joi.string().min(2).max(50).messages({
    "string.min": "{#label} must have at least {#limit} characters long",
    "string.max": "{#label} must have at most {#limit} characters long",
    "any.required": "{#label} is a required field",
    "string.empty": "{#label} should not be empty",
  });

  private static password = Joi.string()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
    .messages({
      "string.pattern.base":
        "{#label} must have minimum 8 characters, at least one lowercase  letter, one uppercase letter and at least one digit",
      "any.required": "{#label} is a required field",
      "string.empty": "{#label} should not be empty",
    });

  private static email = Joi.string()
    .pattern(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/)
    .messages({
      "string.pattern.base":
        "{#label} address must be in a valid format (Example: user@example.com)",
      "string.empty": "{#label} cannot be an empty field",
      "any.required": "{#label} is a required field",
    });

  public static register = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
    fullName: this.fullName.required(),
  });

  public static login = Joi.object({
    email: this.email.required(),
    password: this.password.required(),
  });

  public static changePassword = Joi.object({
    oldPassword: this.password.required(),
    newPassword: this.password.required(),
  });
}
