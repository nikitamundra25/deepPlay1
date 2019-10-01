import express from "express";
import {
  createFolder,
  getCretedFolderById,
  getAllFolder,
  deleteFolder,
  getRecentFolder,
  updateRecentTimeRequest,
  sharableLinkPublicAccess,
  sharableLink,
  publicUrlFolderInfo
} from "../controllers";
import { ValidateAdminToken } from "../common";
const FolderRouter: express.Router = express.Router();

FolderRouter.post("/create-folder", ValidateAdminToken, createFolder);
FolderRouter.get("/get-folder-by-id", ValidateAdminToken, getCretedFolderById);
FolderRouter.get("/all-folder", ValidateAdminToken, getAllFolder);
FolderRouter.get("/recent-folder", ValidateAdminToken, getRecentFolder);
FolderRouter.patch("/delete-folder", ValidateAdminToken, deleteFolder);
FolderRouter.patch(
  "/update-recent-time",
  ValidateAdminToken,
  updateRecentTimeRequest
);
FolderRouter.patch("/public-access", ValidateAdminToken, sharableLinkPublicAccess);
FolderRouter.get("/share-link", ValidateAdminToken, sharableLink);
FolderRouter.get("/get-public-url-for-folder", publicUrlFolderInfo);

export default FolderRouter;
