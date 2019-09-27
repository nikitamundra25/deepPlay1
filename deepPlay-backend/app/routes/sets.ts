import express from "express";
import {
  createSet,
  getAllSetById,
  getRecentSetById,
  addSetInFolder,
  getSets
} from "../controllers";
import { ValidateAdminToken } from "../common";
const SetRouter: express.Router = express.Router();

SetRouter.post("/createSet", ValidateAdminToken, createSet);
SetRouter.get("/getAllSet", ValidateAdminToken, getAllSetById);
SetRouter.get("/getRecentSet", ValidateAdminToken, getRecentSetById);
SetRouter.post("/manageSets", ValidateAdminToken, addSetInFolder);
SetRouter.post("/getSets", ValidateAdminToken, getSets);

export default SetRouter;
