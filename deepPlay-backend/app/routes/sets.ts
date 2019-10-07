import express from "express";
import {
  createSet,
  getAllSetById,
  getRecentSetById,
  addSetInFolder,
  deleteSet,
  getSetsForFolder,
  getSetDetailsById,
  publicUrlsetDetails,
  publicAccessSetInfoById,
  updateSet,
  updateSetStatus
} from "../controllers";
import { ValidateAdminToken } from "../common";
const SetRouter: express.Router = express.Router();

SetRouter.post("/create-set", ValidateAdminToken, createSet);
SetRouter.get("/get-all-set", ValidateAdminToken, getAllSetById);
SetRouter.get("/get-recent-set", ValidateAdminToken, getRecentSetById);
SetRouter.patch("/manage-sets", ValidateAdminToken, addSetInFolder);
SetRouter.get("/get-sets-of-folder", ValidateAdminToken, getSetsForFolder);
SetRouter.patch("/delete-set", ValidateAdminToken, deleteSet);
SetRouter.get("/getSetById", ValidateAdminToken, getSetDetailsById);
SetRouter.get("/public-url-set-details", publicUrlsetDetails);
SetRouter.get("/public-access-set-info-by-id", publicAccessSetInfoById);
SetRouter.put("/update-set", ValidateAdminToken, updateSet);
SetRouter.patch("/update-set-status", ValidateAdminToken, updateSetStatus);

export default SetRouter;
