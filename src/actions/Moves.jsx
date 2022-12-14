import { createAction } from "redux-actions";
export const MovesAction = {
  DOWNLOAD_YOUTUBE_VIDEO_REQUEST: "Download youtube video Request",
  DOWNLOAD_YOUTUBE_VIDEO_SUCCESS: "Download youtube video Success",
  CREATE_MOVE_REQUEST: "Create Move Request",
  CREATE_MOVE_SUCCESS: "Create Move Success",
  GET_MOVE_DETAILS_REQUEST: "Get move details request!",
  GET_MOVES_DETAILS_SUCCESS: "Get move details success!",
  GET_MOVES_OF_SET_REQUEST: "Get moves for sets request!",
  GET_MOVES_OF_SET_SUCCESS: "Get moves for sets success!",
  GET_ALL_MOVE_REQUEST: "Get All Move Request",
  GET_ALL_MOVE_SUCCESS: "Get All Move Success",
  UPDATE_VIDEO_SETTINGS: "Update the webm details.",
  UPDATE_VIDEO_SETTINGS_SUCCESS: "Update the webm details success.",
  ADD_NEW_TAG_TO_LIST: "Add new tag to list!",
  DELETE_MOVES_REQUEST: "Delete Moves Request",
  DELETE_MOVES_SUCCESS: "Delete Moves Success",
  STARRED_MOVE_REQUEST: "Starred Moves Request",
  STARRED_MOVE_SUCCESS: "Starred Moves Success",
  TRANSFER_MOVE_REQUEST: "Transfer Moves Request",
  TRANSFER_MOVE_SUCCESS: "Transfer Moves Success",
  CREATE_ANOTHER_MOVE_REQUEST: "Create Another Move Request",
  CREATE_ANOTHER_MOVE_SUCCESS: "Create Another Move Success",
  LOAD_VIDEO_DATA_REQUEST: "Load video data Request!",
  SEARCH_MOVE_REQUEST: "Search Move Request",
  SEARCH_MOVE_SUCCESS: "Search Move Success",
  ADD_TAGS_REQUEST: "Add Tags Request",
  ADD_TAGS_SUCCESS: "Add Tags Success",
  UPDATE_SORT_INDEX_REQUEST: "Update Sort Index Request",
  UPDATE_SORT_INDEX_SUCCESS: "Update Sort Index Success",
  REMOVE_VIDEO_LOCAL_SERVER_REQUEST: "Remove video from local server request!",
  REMOVE_VIDEO_LOCAL_SERVER_SUCCESS: "Remove video from local server success!",
  UPDATE_MOVE_REQUEST: "Update Move Request",
  UPDATE_MOVE_SUCCESS: "Update Move Success",
  YOUTUBE_UPDATE_MOVE_REQUEST: "YouTube Update Move Request",
  YOUTUBE_UPDATE_MOVE_SUCCESS: "YouTube Update Move Success",
  GET_MOVE_BY_SEARCH_REQUEST: "Get Move Details By Search Request",
  GET_MOVE_BY_SEARCH_SUCCESS: "Get Move Details By Search Success",
  ADD_TAGS_IN_TAGMODAL_REQUEST: "Add Tags In Tag Modal Request",
  ADD_TAGS_IN_TAGMODAL_SUCCESS: "Add Tags In Tag Modal Success",
  GET_TAG_LIST_REQUEST: "Get Tags List Request",
  GET_TAG_LIST_SUCCESS: "Get Tags List Success",
  VIDEO_FULLSCREEN_REQ: "Video Fullscreen Request",
  VIDEO_FULLSCREEN_EXIT: "Video Fullscreen Exit",
  VIDEODATA_FROM_SEARCH: "Video data from search",
  VIDEO_SELECT_REQUEST: "Video Select Request",
  VIDEO_UNSELECT_REQUEST: "Video Unselect Request",
  VIDEO_CANCEL_REQUEST: "Video Cancel Request",
  VIDEO_CANCEL_SUCCESS: "Video Cancel Success",
  I_AM_DONE_REQUEST: "I Am Done Request",
  VIDEO_UPLOAD_PROGRESS_CHANGE: "Video progress changed!"
};

export const downloadYoutubeVideoRequest = createAction(
  MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST
);
export const downloadYoutubeVideoSuccess = createAction(
  MovesAction.DOWNLOAD_YOUTUBE_VIDEO_SUCCESS
);

export const createMoveRequest = createAction(MovesAction.CREATE_MOVE_REQUEST);
export const createMoveSuccess = createAction(MovesAction.CREATE_MOVE_SUCCESS);

export const getMovesOfSetRequest = createAction(
  MovesAction.GET_MOVES_OF_SET_REQUEST
);
export const getMovesOfSetSuccess = createAction(
  MovesAction.GET_MOVES_OF_SET_SUCCESS
);

export const getMoveDetailsRequest = createAction(
  MovesAction.GET_MOVE_DETAILS_REQUEST
);
export const getMoveDetailsSuccess = createAction(
  MovesAction.GET_MOVES_DETAILS_SUCCESS
);
export const completeVideoEditing = createAction(
  MovesAction.UPDATE_VIDEO_SETTINGS
);
export const completeVideoEditingSuccess = createAction(
  MovesAction.UPDATE_VIDEO_SETTINGS_SUCCESS
);

export const addNewTagToList = createAction(MovesAction.ADD_NEW_TAG_TO_LIST);

export const deleteMovesRequest = createAction(
  MovesAction.DELETE_MOVES_REQUEST
);
export const deleteMovesSuccess = createAction(
  MovesAction.DELETE_MOVES_SUCCESS
);
export const starredMovesRequest = createAction(
  MovesAction.STARRED_MOVE_REQUEST
);
export const starredMovesSuccess = createAction(
  MovesAction.STARRED_MOVE_SUCCESS
);

export const transferMovesRequest = createAction(
  MovesAction.TRANSFER_MOVE_REQUEST
);
export const transferMovesSuccess = createAction(
  MovesAction.TRANSFER_MOVE_SUCCESS
);

export const createAnotherMoveRequest = createAction(
  MovesAction.CREATE_ANOTHER_MOVE_REQUEST
);
export const createAnotherMoveSuccess = createAction(
  MovesAction.CREATE_ANOTHER_MOVE_SUCCESS
);

export const loadVideoDataRequest = createAction(
  MovesAction.LOAD_VIDEO_DATA_REQUEST
);
export const searchMoveRequest = createAction(MovesAction.SEARCH_MOVE_REQUEST);
export const searchMoveSuccess = createAction(MovesAction.SEARCH_MOVE_SUCCESS);

export const addTagsRequest = createAction(MovesAction.ADD_TAGS_REQUEST);
export const addTagsSuccess = createAction(MovesAction.ADD_TAGS_SUCCESS);

export const updateSortIndexRequest = createAction(
  MovesAction.UPDATE_SORT_INDEX_REQUEST
);
export const updateSortIndexSuccess = createAction(
  MovesAction.UPDATE_SORT_INDEX_SUCCESS
);
export const removeVideoLocalServerRequest = createAction(
  MovesAction.REMOVE_VIDEO_LOCAL_SERVER_REQUEST
);
export const removeVideoLocalServerSuccess = createAction(
  MovesAction.REMOVE_VIDEO_LOCAL_SERVER_SUCCESS
);

export const updateMoveRequest = createAction(MovesAction.UPDATE_MOVE_REQUEST);
export const updateMoveSuccess = createAction(MovesAction.UPDATE_MOVE_SUCCESS);

export const YoutubeUpdateMoveRequest = createAction(
  MovesAction.YOUTUBE_UPDATE_MOVE_REQUEST
);
export const YoutubeUpdateMoveSuccess = createAction(
  MovesAction.YOUTUBE_UPDATE_MOVE_SUCCESS
);

export const getMoveBySearchRequest = createAction(
  MovesAction.GET_MOVE_BY_SEARCH_REQUEST
);
export const getMoveBySearchSuccess = createAction(
  MovesAction.GET_MOVE_BY_SEARCH_SUCCESS
);
export const addTagsInTagModalRequest = createAction(
  MovesAction.ADD_TAGS_IN_TAGMODAL_REQUEST
);
export const addTagsInTagModalSuccess = createAction(
  MovesAction.ADD_TAGS_IN_TAGMODAL_SUCCESS
);

export const getTagListRequest = createAction(MovesAction.GET_TAG_LIST_REQUEST);
export const getTagListSuccess = createAction(MovesAction.GET_TAG_LIST_SUCCESS);

export const videoFullscreenReq = createAction(
  MovesAction.VIDEO_FULLSCREEN_REQ
);
export const videoFullscreenExit = createAction(
  MovesAction.VIDEO_FULLSCREEN_EXIT
);

export const videoDataFromSearch = createAction(
  MovesAction.VIDEODATA_FROM_SEARCH
);

export const videoSelectRequest = createAction(
  MovesAction.VIDEO_SELECT_REQUEST
);
export const videoUnSelectRequest = createAction(
  MovesAction.VIDEO_UNSELECT_REQUEST
);

export const videoCancelRequest = createAction(
  MovesAction.VIDEO_CANCEL_REQUEST
);
export const videoCancelSuccess = createAction(
  MovesAction.VIDEO_CANCEL_SUCCESS
);
export const noIAmDoneRequest = createAction(MovesAction.I_AM_DONE_REQUEST);

export const onVideoUploadProgressChange = createAction(
  MovesAction.VIDEO_UPLOAD_PROGRESS_CHANGE
);
