import express from "express";
import { ValidateAdminToken } from "../common";
import {
    getDateOfUser,
    getRoleUserCount,
} from "./../controllers";

const DashboardRouter: express.Router = express.Router();

DashboardRouter.get("/user-date-count", ValidateAdminToken, getDateOfUser);
DashboardRouter.get("/user-roleType-count", ValidateAdminToken, getRoleUserCount);

export default DashboardRouter;