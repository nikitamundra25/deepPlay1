import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  redirectTo,
  MovesAction,
  downloadYoutubeVideoSuccess
} from "../actions";
import { AppRoutes } from "../config/AppRoutes"
import { toast } from "react-toastify";

//  Download video
const downloadVideoLogic = createLogic({
  type: MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/downloadVideo",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(downloadYoutubeVideoSuccess())
      done();
      return;
    } else {
      toast.success(result.messages[0]);
      dispatch(downloadYoutubeVideoSuccess({
        videoUrl: result.data.videoUrl
      }))
      dispatch(redirectTo({
        path:
          `${AppRoutes.MOVE_DETAILS.url.replace(":id", result.data.moveData._id)}`
      })
      );
      done();
    }
  }
});

export const MoveLogics = [downloadVideoLogic];
