import { body } from "express-validator";

export const AddPlanValidations = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter plan name.")
    .trim(),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Please enter price.")
    .isNumeric()
    .withMessage("Only numbers are allowed.")
    .trim()
];
export const UpdatePlanValidations = [
  body("name")
    .not()
    .isEmpty()
    .withMessage("Please enter plan name.")
    .trim(),
  body("price")
    .not()
    .isEmpty()
    .withMessage("Please enter price.")
    .isNumeric()
    .withMessage("Only numbers are allowed.")
    .trim(),
  body("planId")
    .not()
    .isEmpty()
    .withMessage("Please enter planId.")
    .trim()
];
