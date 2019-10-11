import express from "express";
import {
  getUserInfo,
  editUserInfo,
  deleteUserAccount,
  imageUpload,
  getAllUser,
  updateUserStatus,
  updateUserDetails,
  updateUserPassword,
  deleteUser,
  proxyLoginToUser
} from "./../controllers";
import { ValidateAdminToken } from "../common";
import {
  UpdateUserValidation,
  UpdateUserPasswordValidations
} from "../validations";

const UserRouter: express.Router = express.Router();

UserRouter.get("/getProfileInfo", ValidateAdminToken, getUserInfo);
UserRouter.put("/updateUserData", ValidateAdminToken, editUserInfo);
UserRouter.post("/uploadFiles", ValidateAdminToken, imageUpload);
UserRouter.delete("/userAccountDelete", ValidateAdminToken, deleteUserAccount);
UserRouter.get("/all-user", getAllUser);
UserRouter.patch("/update-user-status",ValidateAdminToken,updateUserStatus);
UserRouter.put(
  "/:userId",
  ValidateAdminToken,
  UpdateUserValidation,
  updateUserDetails
);
UserRouter.patch(
  "/update-password",
  ValidateAdminToken,
  UpdateUserPasswordValidations,
  updateUserPassword
);
UserRouter.delete("/:userId", ValidateAdminToken, deleteUser);
UserRouter.get("/proxy-login", ValidateAdminToken, proxyLoginToUser);

export default UserRouter;
