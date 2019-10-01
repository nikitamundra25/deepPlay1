import express from "express";
import {
    login,
    signup,
    socialSignup,
    userForgotPassword,
    userVerifyLink,
    userResetpassword,
    adminLogin
} from "./../controllers";

const AuthRouter: express.Router = express.Router();

AuthRouter.post("/signup", signup);
AuthRouter.post("/login", login);
AuthRouter.post("/login", login);
AuthRouter.post("/socialLogin", socialSignup);
AuthRouter.post("/forgotPassword", userForgotPassword);
AuthRouter.post("/verifylink", userVerifyLink);
AuthRouter.post("/resetPassword", userResetpassword);
AuthRouter.post("/admin-login", adminLogin);

export default AuthRouter;
