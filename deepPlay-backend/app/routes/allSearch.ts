import express from "express";
import {
    allSearchModule
} from "../controllers";
import { ValidateAdminToken } from "../common";
const AllSearchRouter: express.Router = express.Router();

AllSearchRouter.get("/all-search", ValidateAdminToken, allSearchModule);

export default AllSearchRouter;
