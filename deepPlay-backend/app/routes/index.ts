import express from "express";
import AuthRouter from "./auth";
import UserRouter from "./user";
import SetRouter from "./sets";
import MoveRouter from "./moves";
import FolderRouter from "./folder";
const router: express.Router = express.Router();

router.use("/auth", AuthRouter);
router.use("/user", UserRouter);
router.use("/set", SetRouter);
router.use("/move", MoveRouter)
router.use("/folder", FolderRouter);
export default router;
