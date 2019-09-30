import { handleActions } from "redux-actions";

import { MovesAction } from "../actions";

const initialState = {
  isVideoDownloading: false,
  videoUrl: "",
  movesOfSet: []
};

export const moveReducer = handleActions(
  {
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: true,
      videoUrl: ""
    }),
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: false,
      videoUrl: payload.videoUrl
    }),
    [MovesAction.GET_MOVES_OF_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      movesOfSet: payload.movesOfSet
    })
  },
  initialState
);
