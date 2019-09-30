import { body } from "express-validator";
import { comparePassword } from "../common";

export const UpdateAdminProfileValidation = [
  body("firstName")
    .not()
    .isEmpty()
    .withMessage("Please enter first name.")
    .trim(),
  body("lastName")
    .not()
    .isEmpty()
    .withMessage("Please enter last name.")
    .trim(),
  body("email")
    .trim()
    .isEmail()
    .withMessage("Please enter valid email.")
];

export const UpdateAdminPasswordValidation = [
  body("oldPassword")
    .not()
    .isEmpty()
    .withMessage("Please enter old password.")
    .trim()
    .custom(
      async (password: string, {req}): Promise<any> => {
        const { currentUser } = req;
        if (!comparePassword(password, currentUser.password)) {
          throw new Error("Old password is incorrect.");
        }
        return true;
      }
    ),
  body("newPassword")
    .not()
    .isEmpty()
    .withMessage("Please enter new password.")
    .trim()
];
