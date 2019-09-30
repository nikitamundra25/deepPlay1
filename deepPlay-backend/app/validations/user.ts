import Mongoose from "mongoose";
import { body } from "express-validator";

export const UpdateUserValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please enter first name.")
    .trim(),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Please enter last name."),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter valid email."),
  body("roleType")
    .not()
    .isEmpty()
    .withMessage("Role type is required.")
    .trim()
];
export const UpdateUserPasswordValidations = [
  body("newPassword")
    .not()
    .isEmpty()
    .withMessage("Please enter new password.")
    .trim(),
  body("userId")
    .not()
    .isEmpty()
    .withMessage("Please provide user id to update.")
    .custom((userId: string) => {
      Mongoose.Types.ObjectId(userId);
      return true;
    })
];
