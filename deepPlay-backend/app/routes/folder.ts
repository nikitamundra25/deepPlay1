import express from "express";
import {
  createFolder,
  getCretedFolderById,
  getAllFolder,
  deleteFolder,
  getRecentFolder,
  updateRecentTimeRequest,
  sharableLink
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
FolderRouter.patch("/share-link", ValidateAdminToken, sharableLink);

export default FolderRouter;
