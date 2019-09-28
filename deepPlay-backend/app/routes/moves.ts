import express from "express";
import { downloadVideo, getMoveBySetId } from "../controllers";
import { ValidateAdminToken } from "../common";

const MoveRouter: express.Router = express.Router();

MoveRouter.post("/downloadVideo", ValidateAdminToken, downloadVideo);
MoveRouter.get("/getMoveForSet", ValidateAdminToken, getMoveBySetId);

export default MoveRouter;
