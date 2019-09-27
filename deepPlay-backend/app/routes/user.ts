import express from "express";
import {
  getUserInfo,
  editUserInfo,
  deleteUserAccount,
  imageUpload,
} from "./../controllers";
import { ValidateAdminToken } from "../common";

const UserRouter: express.Router = express.Router();

UserRouter.get("/getProfileInfo", ValidateAdminToken, getUserInfo);
UserRouter.put("/updateUserData", ValidateAdminToken, editUserInfo);
UserRouter.post("/uploadFiles", ValidateAdminToken, imageUpload);
UserRouter.delete("/userAccountDelete", ValidateAdminToken, deleteUserAccount);
export default UserRouter;
