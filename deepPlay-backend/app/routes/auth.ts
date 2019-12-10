import express from "express";
import {
  login,
  signup,
  socialSignup,
  userForgotPassword,
  userVerifyLink,
  userResetpassword,
  adminLogin,
  updateAdminPassword
} from "./../controllers";
import { ValidateAdminToken } from "../common";
import {
  UpdateAdminPasswordValidation,
  LoginValidations
} from "../validations";

const AuthRouter: express.Router = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", LoginValidations, login);
AuthRouter.post("/socialLogin", socialSignup);
AuthRouter.post("/forgotPassword", userForgotPassword);
AuthRouter.post("/verifylink", userVerifyLink);
AuthRouter.post("/resetPassword", userResetpassword);
AuthRouter.post("/admin-login", adminLogin);
AuthRouter.put(
  "/change-password",
  ValidateAdminToken,
  UpdateAdminPasswordValidation,
  updateAdminPassword
);

export default AuthRouter;
