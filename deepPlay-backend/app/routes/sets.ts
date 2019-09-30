import express from "express";
import {
  createSet,
  getAllSetById,
  getRecentSetById,
  addSetInFolder,
  deleteSet,
  getSetsForFolder,
  getSetDetailsById
} from "../controllers";
import { ValidateAdminToken } from "../common";
const SetRouter: express.Router = express.Router();

SetRouter.post("/create-set", ValidateAdminToken, createSet);
SetRouter.get("/get-all-set", ValidateAdminToken, getAllSetById);
SetRouter.get("/get-recent-set", ValidateAdminToken, getRecentSetById);
SetRouter.patch("/manage-sets", ValidateAdminToken, addSetInFolder);
SetRouter.patch("/get-sets", ValidateAdminToken, getSetsForFolder);
SetRouter.delete("/delete-set", ValidateAdminToken, deleteSet);
SetRouter.get("/getSetById", ValidateAdminToken, getSetDetailsById);

export default SetRouter;
