import express from "express";
import {
  createFolder,
  getCretedFolderById,
  getAllFolder,
  updateFolder,
  deleteFolder,
  getRecentFolder,
  updateRecentTimeRequest,
  sharableLinkPublicAccess,
  sharableLink,
  publicUrlFolderInfo,
  updateFolderStatus,
  encryptSetIdShareLink
} from "../controllers";
import { ValidateAdminToken } from "../common";
const FolderRouter: express.Router = express.Router();

FolderRouter.post("/create-folder", ValidateAdminToken, createFolder);
FolderRouter.put("/update-folder", ValidateAdminToken, updateFolder);
FolderRouter.get("/get-folder-by-id", ValidateAdminToken, getCretedFolderById);
FolderRouter.get("/all-folder", ValidateAdminToken, getAllFolder);
FolderRouter.get("/recent-folder", ValidateAdminToken, getRecentFolder);
FolderRouter.patch("/delete-folder", ValidateAdminToken, deleteFolder);
FolderRouter.patch(
  "/update-recent-time",
  ValidateAdminToken,
  updateRecentTimeRequest
);
FolderRouter.patch(
  "/public-access",
  ValidateAdminToken,
  sharableLinkPublicAccess
);
FolderRouter.get("/share-link", ValidateAdminToken, sharableLink);
FolderRouter.get("/encrypt-set", encryptSetIdShareLink);
FolderRouter.get("/public-access-folder-info-by-id", publicUrlFolderInfo);
FolderRouter.patch(
  "/update-folder-status",
  ValidateAdminToken,
  updateFolderStatus
);

export default FolderRouter;
