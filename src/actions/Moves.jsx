import { createAction } from "redux-actions";
export const MovesAction = {
  DOWNLOAD_YOUTUBE_VIDEO_REQUEST: "Download youtube video Request",
  DOWNLOAD_YOUTUBE_VIDEO_SUCCESS: "Download youtube video Success",
  CREATE_MOVE_REQUEST: "Create Move Request",
  CREATE_MOVE_SUCCESS: "Create Move Success",
  GET_MOVES_OF_SET_REQUEST:"Get moves for sets request!",
  GET_MOVES_OF_SET_SUCCESS:"Get moves for sets success!",
  GET_ALL_MOVE_REQUEST: "Get All Move Request",
  GET_ALL_MOVE_SUCCESS: "Get All Move Success"
};

export const downloadYoutubeVideoRequest = createAction(MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST);
export const downloadYoutubeVideoSuccess = createAction(MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS);

export const createMoveRequest = createAction(MovesAction.CREATE_MOVE_REQUEST);
export const createMoveSuccess = createAction(MovesAction.CREATE_MOVE_SUCCESS);

export const getMovesOfSetRequest = createAction(MovesAction.GET_MOVES_OF_SET_REQUEST);
export const getMovesOfSetSuccess = createAction(MovesAction.GET_MOVES_OF_SET_SUCCESS);
