import { handleActions } from "redux-actions";

import { MovesAction } from "../actions";

const initialState = {
  isVideoDownloading: false,
  movesOfSet: [],
  moveDetails:"",
  isMoveDetailsLoading: false
};

export const moveReducer = handleActions(
  {
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: true,
      moveDetails:{
        videoUrl: ""
      }
    }),
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: false,
      moveDetails:{
        videoUrl: payload.videoUrl
      }
    }),
    [MovesAction.GET_MOVES_OF_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      movesOfSet: payload.movesOfSet
    }),
    [MovesAction.GET_MOVE_DETAILS_REQUEST]: (state, { payload }) => ({
      ...state,
      moveDetails: "",
      isMoveDetailsLoading: true
    }),
    [MovesAction.GET_MOVES_DETAILS_SUCCESS]: (state, { payload }) => ({
      ...state,
      moveDetails: payload.moveDetails,
      isMoveDetailsLoading: false
    })
  },
  initialState
);
