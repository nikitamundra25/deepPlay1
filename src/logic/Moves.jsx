import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  redirectTo,
  MovesAction,
  downloadYoutubeVideoSuccess,
  getMovesOfSetSuccess,
  getMoveDetailsSuccess
} from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
let toastId = null;

//  Download video
const downloadVideoLogic = createLogic({
  type: MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result
    if (action.payload.isYoutubeUrl) {
      result = await api.FetchFromServer(
        "move",
        "/download-youtube-video",
        "POST",
        true,
        undefined,
        action.payload
      );
    } else {
      result = await api.UploadVideo(
        "move",
        "/download-video",
        action.payload
      )
    }
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(downloadYoutubeVideoSuccess({
        videoUrl: ""
      }));
      done();
      return;
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        downloadYoutubeVideoSuccess({
          videoUrl: result.data && result.data.videoUrl ? result.data.videoUrl : ""
        })
      );
      dispatch(
        redirectTo({
          path: `${AppRoutes.MOVE_DETAILS.url.replace(
            ":id",
            result.data.moveData._id
          )}`
        })
      );
      done();
    }
  }
});

// Get Moves for sets
const getMovesOfSetLogic = createLogic({
  type: MovesAction.GET_MOVES_OF_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/getMoveForSet",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(
        getMovesOfSetSuccess({
          showLoader: false,
          movesOfSet: result.data.movesData
        })
      );
      done();
    }
  }
});

// Get Moves Details by Id
const getMovesDetailsByIdLogic = createLogic({
  type: MovesAction.GET_MOVE_DETAILS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/get-move-details-by-id",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(getMoveDetailsSuccess({moveDetails: ""}))
      done();
      return;
    } else {
      dispatch(getMoveDetailsSuccess({
        moveDetails: result.data.movesData
      }))
      done();
    }
  }
});
export const MoveLogics = [
  downloadVideoLogic, 
  getMovesOfSetLogic,
  getMovesDetailsByIdLogic
];
