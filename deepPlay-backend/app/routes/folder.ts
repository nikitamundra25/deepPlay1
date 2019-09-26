import express from "express";
import {
  createFolder,
  getCretedFolderById,
  getAllFolder
} from "../controllers";
import { ValidateAdminToken } from "../common";
const FolderRouter: express.Router = express.Router();

FolderRouter.post("/createFolder", ValidateAdminToken, createFolder);
FolderRouter.post("/getFolderById", ValidateAdminToken, getCretedFolderById);
FolderRouter.get("/allFolder", ValidateAdminToken, getAllFolder);

export default FolderRouter;
