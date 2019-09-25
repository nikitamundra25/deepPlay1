import express from "express";
import { createFolder, getCretedFolderById } from "../controllers";
import { ValidateAdminToken } from "../common";
const FolderRouter: express.Router = express.Router();

FolderRouter.post("/createFolder", ValidateAdminToken, createFolder);
FolderRouter.post("/getFolderById", ValidateAdminToken, getCretedFolderById);

export default FolderRouter;
