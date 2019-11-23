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
  isMoveList: false,
  isSavingWebM: false,
  moveUrlDetails: [],
  videoData: {},
  isFullScreenMode: false,
  searchMoveResult: [],
  isMoveSearchLoading: false,
  isCreatingAnotherMove: false,
  videoOriginalFile: "",
  videoFileMain: "",
  isVideoSelected: false,
  isMoveStarLoading: {
    index: 0,
    loading: false
  },
  isVideoFromSearch: false,
  cancelVideo: false
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
      isMoveofSetLoading: true,
      isMoveList: payload.isMoveList ? true : false
    }),
    [MovesAction.GET_MOVES_OF_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      //movesOfSet: payload.movesOfSet,
      movesOfSet: payload.isInfiniteScroll
        ? [...state.movesOfSet, ...payload.movesOfSet]
        : payload.movesOfSet,
      totalMoves: payload.totalMoves,
      isMoveofSetLoading: false,
      isMoveList: false
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
      videoData: payload,
      isVideoFromSearch: false
    }),
    [MovesAction.SEARCH_MOVE_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveSearchLoading: true,
      isMoveList: true
    }),
    [MovesAction.SEARCH_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isMoveSearchLoading: false,
      isMoveList: false
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
    }),
    [MovesAction.STARRED_MOVE_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveStarLoading: {
        index: payload.index,
        loading: true
      }
    }),
    [MovesAction.STARRED_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      movesOfSet: payload.moveofSetList
        ? payload.moveofSetList
        : state.movesOfSet,
      videoData: payload.videoData ? payload.videoData : state.videoData,
      isMoveStarLoading: {
        index: payload.index,
        loading: false
      }
    }),
    [MovesAction.GET_TAG_LIST_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [MovesAction.ADD_TAGS_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [MovesAction.VIDEO_FULLSCREEN_REQ]: (state, { payload }) => ({
      ...state,
      isFullScreenMode: true
    }),
    [MovesAction.VIDEO_FULLSCREEN_EXIT]: (state, { payload }) => ({
      ...state,
      isFullScreenMode: false
    }),
    [MovesAction.VIDEODATA_FROM_SEARCH]: (state, { payload }) => ({
      ...state,
      isVideoFromSearch: true
    }),
    [MovesAction.UPDATE_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [MovesAction.VIDEO_SELECT_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoSelected: true
    }),
    [MovesAction.VIDEO_UNSELECT_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoSelected: false
    }),
    [MovesAction.VIDEO_CANCEL_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isVideoDownloading: false
    })
  },
  initialState
);
