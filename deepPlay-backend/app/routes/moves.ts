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
  transferMove,
  createMove,
  filterMove,
  addTagsInMove,
  updateMoveIndex,
  removeVideolocalServer
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
MoveRouter.put("/starred-move", ValidateAdminToken, isStarredMove);
MoveRouter.patch("/delete-move", ValidateAdminToken, deleteMove);
MoveRouter.patch("/transfer-move", ValidateAdminToken, transferMove);
MoveRouter.post("/create-move", ValidateAdminToken, createMove);
MoveRouter.get("/filter-move", ValidateAdminToken, filterMove);
MoveRouter.put("/add-tags-move", ValidateAdminToken, addTagsInMove);
MoveRouter.put("/sort-index-update", ValidateAdminToken, updateMoveIndex);
MoveRouter.post("/remove-local-video", ValidateAdminToken, removeVideolocalServer);

export default MoveRouter;
