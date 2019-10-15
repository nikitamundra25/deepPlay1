import express from "express";
import {
  downloadVideo,
  getMoveBySetId,
  downloadYoutubeVideo,
  getMoveDetailsById,
  publicUrlMoveDetails,
  updateMoveDetailsAndTrimVideo,
  copyMove,
  isStarredMove,
  deleteMove,
  transferMove
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
MoveRouter.put("/copy-move", copyMove);
MoveRouter.put("/starred-move", isStarredMove);
MoveRouter.patch("/delete-move", deleteMove);
MoveRouter.patch("/transfer-move", transferMove);

export default MoveRouter;
