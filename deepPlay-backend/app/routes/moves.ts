import express from "express";
import { downloadVideo } from "../controllers";
import { ValidateAdminToken } from "../common";

const MoveRouter: express.Router = express.Router();

MoveRouter.post("/downloadVideo", ValidateAdminToken, downloadVideo);

export default MoveRouter;
