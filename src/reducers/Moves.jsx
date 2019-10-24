import { handleActions } from "redux-actions";

import { MovesAction } from "../actions";

const initialState = {
  isVideoDownloading: false,
  movesOfSet: [],
  moveDetails: "",
  tagsList: [],
  totalMoves: 0,
  isMoveDetailsLoading: false,
  isMoveofSetLoading: false,
  isSavingWebM: false,
  moveUrlDetails: [],
  videoData: {},
  searchMoveResult: [],
  isMoveSearchLoading: false,
  isCreatingAnotherMove: false,
  videoOriginalFile: "",
  videoFileMain: ""
};

export const moveReducer = handleActions(
  {
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: true,
      moveDetails: {
        videoUrl: ""
      }
    }),
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: false,
      moveDetails: {
        videoUrl: payload.videoUrl
      }
    }),
    [MovesAction.GET_MOVES_OF_SET_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveofSetLoading: true
    }),
    [MovesAction.GET_MOVES_OF_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      //movesOfSet: payload.movesOfSet,
      movesOfSet: payload.isInfiniteScroll
        ? [...state.movesOfSet, ...payload.movesOfSet]
        : payload.movesOfSet,
      totalMoves: payload.totalMoves,
      isMoveofSetLoading: false
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
    }),
    [MovesAction.UPDATE_VIDEO_SETTINGS_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      videoOriginalFile: payload.videoOriginalFile,
      videoFileMain: payload.videoFileMain
    }),
    [MovesAction.ADD_NEW_TAG_TO_LIST]: (state, { payload }) => ({
      ...state,
      tagsList: payload
    }),
    [MovesAction.LOAD_VIDEO_DATA_REQUEST]: (state, { payload }) => ({
      ...state,
      videoData: payload
    }),
    [MovesAction.SEARCH_MOVE_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveSearchLoading: true
    }),
    [MovesAction.SEARCH_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isMoveSearchLoading: false
    }),
    [MovesAction.UPDATE_SORT_INDEX_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [MovesAction.CREATE_ANOTHER_MOVE_REQUEST]: (state, { payload }) => ({
      ...state,
      isCreatingAnotherMove: true
    }),
    [MovesAction.CREATE_ANOTHER_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isCreatingAnotherMove: false
    }),
    [MovesAction.GET_MOVE_BY_SEARCH_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveofSetLoading: true
    }),
    [MovesAction.GET_MOVE_BY_SEARCH_SUCCESS]: (state, { payload }) => ({
      ...state,
      //movesOfSet: payload.movesOfSet,
      movesOfSet: payload.isInfiniteScroll
        ? [...state.movesOfSet, ...payload.movesOfSet]
        : payload.movesOfSet,
      totalMoves: payload.totalMoves,
      isMoveofSetLoading: false
    })
  },
  initialState
);
