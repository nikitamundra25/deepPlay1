import express from "express";
import { login, signup, socialSignup } from "./../controllers";

const AuthRouter: express.Router = express.Router();

AuthRouter.post("/signup", signup),
AuthRouter.post("/login", login),
AuthRouter.post("/socialLogin", socialSignup);

export default AuthRouter;
