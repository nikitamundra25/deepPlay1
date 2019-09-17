import express from "express";
import { getUserInfo } from "./../controllers";
import { ValidateAdminToken } from "../common";

const UserRouter: express.Router = express.Router();

UserRouter.get("/profileInfo", ValidateAdminToken, getUserInfo);
export default UserRouter;
