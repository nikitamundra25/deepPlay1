import express from "express";
import { login, signup } from "./../controllers";

const AuthRouter: express.Router = express.Router();

AuthRouter.post("/signup", signup), 
AuthRouter.post("/login", login);

export default AuthRouter;
