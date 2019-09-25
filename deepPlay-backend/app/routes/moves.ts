import express from "express";
import { createMove } from "../controllers";
const MoveRouter: express.Router = express.Router();

MoveRouter.post("/createMove", createMove);

export default MoveRouter;
