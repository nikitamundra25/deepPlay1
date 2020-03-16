import { handleActions } from "redux-actions";

import { MovesAction, loginAction } from "../actions";

const initialState = {
  isVideoDownloading: false,
  movesOfSet: [],
  moveDetails: "",
  tagsList: [],
  totalMoves: 0,
  isMoveDetailsLoading: false,
  isMoveofSetLoading: false,
  isMoveList: false,
  isSavingWebM: [
    {
      success: false,
      id: -1
    }
  ],
  moveUrlDetails: [],
  videoData: {},
  isFullScreenMode: false,
  searchMoveResult: [],
  isMoveSearchLoading: false,
  isCreatingAnotherMove: false,
  isSortIndexUpdate: false,
  videoOriginalFile: "",
  videoFileMain: "",
  isVideoSelected: false,
  isMoveStarLoading: {
    index: 0,
    loading: false
  },
  isVideoFromSearch: false,
  cancelVideo: false,
  isMoveDone: false,
  isIosDevice: false,
  creatingAnother: {},
  alreadyExist: false,
  uploaded: 0,
  videoSize: 0
};

export const moveReducer = handleActions(
  {
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST]: (state, { payload }) => ({
      ...state,
      isVideoDownloading: true,
      moveDetails: {
        videoUrl: ""
      },
      cancelVideo: false,
      alreadyExist: true
    }),
    [MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isVideoDownloading: false,
      moveDetails: {
        videoUrl: payload.videoUrl
      },
      alreadyExist: true
    }),
    [MovesAction.GET_MOVES_OF_SET_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveofSetLoading: payload.isInfiniteScroll ? false : true,
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
    [MovesAction.UPDATE_VIDEO_SETTINGS]: (state, { payload }) => ({
      ...state
      // isSavingWebM: true
    }),
    [MovesAction.YOUTUBE_UPDATE_MOVE_REQUEST]: (state, { payload }) => ({
      ...state
      // isSavingWebM: true
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
    [MovesAction.UPDATE_SORT_INDEX_REQUEST]: (state, { payload }) => ({
      ...state,
      isSortIndexUpdate: true
    }),
    [MovesAction.UPDATE_SORT_INDEX_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isSortIndexUpdate: false
    }),
    [MovesAction.CREATE_ANOTHER_MOVE_REQUEST]: (state, { payload }) => ({
      ...state,
      isCreatingAnotherMove: true
    }),
    [MovesAction.CREATE_ANOTHER_MOVE_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isCreatingAnotherMove: false,
      alreadyExist: true
    }),
    [MovesAction.GET_MOVE_BY_SEARCH_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveofSetLoading: payload.isInfiniteScroll ? false : true
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
    [MovesAction.ADD_TAGS_IN_TAGMODAL_SUCCESS]: (state, { payload }) => ({
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
      ...payload,
      isMoveDone: false
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
    }),
    [MovesAction.I_AM_DONE_REQUEST]: (state, { payload }) => ({
      ...state,
      isMoveDone: true,
      alreadyExist: false,
      creatingAnother: {}
    }),
    [MovesAction.VIDEO_UPLOAD_PROGRESS_CHANGE]: (state, { payload }) => ({
      ...state,
      uploaded: payload.uploaded,
      videoSize: payload.videoSize
    }),
    [loginAction.DETECT_BROWSER_REQUEST]: (state, { payload }) => ({
      ...state,
      isIosDevice: true
    })
  },
  initialState
);
