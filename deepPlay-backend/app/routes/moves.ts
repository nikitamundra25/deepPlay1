import express from "express";
import {
  downloadVideo,
  getMoveBySetId,
  downloadYoutubeVideo,
  getMoveDetailsById,
  publicUrlMoveDetails,
  updateMoveDetailsAndTrimVideo,
  updateMove
} from "../controllers";
import { ValidateAdminToken } from "../common";
import { storageFile } from "../common/video";
import multer from "multer";

const upload: multer.Instance = multer({ storage: storageFile });
const MoveRouter: express.Router = express.Router();

MoveRouter.post(
  "/download-video",
  ValidateAdminToken,
  upload.single("url"),
  downloadVideo
);
MoveRouter.post(
  "/download-youtube-video",
  ValidateAdminToken,
  downloadYoutubeVideo
);
MoveRouter.get("/getMoveForSet", ValidateAdminToken, getMoveBySetId);
MoveRouter.get(
  "/get-move-details-by-id",
  ValidateAdminToken,
  getMoveDetailsById
);
MoveRouter.get("/public-url-move-details", publicUrlMoveDetails);
MoveRouter.post("/update", updateMoveDetailsAndTrimVideo);
MoveRouter.post("/update-move", updateMove);

export default MoveRouter;
