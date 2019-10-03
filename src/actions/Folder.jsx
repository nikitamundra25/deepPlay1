import { createAction } from "redux-actions";
export const FolderAction = {
  CREATE_FOLDER_REQUEST: "Create Folder Request",
  CREATE_FOLDER_SUCCESS: "Create Folder Success",
  FOLDER_DETAIL_REQUEST: "Folder Detail Request",
  FOLDER_DETAIL_SUCCESS: "Folder Detail Success",
  GET_ALL_FOLDER_REQUEST: "Get All Folder Request",
  GET_ALL_FOLDER_SUCCESS: "Get All Folder Success",
  DELETE_FOLDER_REQUEST: "Delete Folder Request",
  DELETE_FOLDER_SUCCESS: "Delete Folder Success",
  RECENT_FOLDER_REQUEST: "Recent Folder Request",
  RECENT_FOLDER_SUCCESS: "Recent Folder Success",
  UPDATE_RECENT_TIME_REQUEST: "Update Recent Time Request",
  UPDATE_RECENT_TIME_SUCCESS: "Update Recent Time Success",
  UPDATE_FOLDER_REQUEST: "Update Folder Request",
  UPDATE_FOLDER_SUCCESS: "Update Folder Success"
};
export const createFolderRequest = createAction(
  FolderAction.CREATE_FOLDER_REQUEST
);
export const createFolderSuccess = createAction(
  FolderAction.CREATE_FOLDER_SUCCESS
);
export const folderDetailRequest = createAction(
  FolderAction.FOLDER_DETAIL_REQUEST
);
export const folderDetailSuccess = createAction(
  FolderAction.FOLDER_DETAIL_SUCCESS
);
export const getAllFolderRequest = createAction(
  FolderAction.GET_ALL_FOLDER_REQUEST
);
export const getAllFolderSuccess = createAction(
  FolderAction.GET_ALL_FOLDER_SUCCESS
);
export const deleteFolderRequest = createAction(
  FolderAction.DELETE_FOLDER_REQUEST
);
export const deleteFolderSuccess = createAction(
  FolderAction.DELETE_FOLDER_SUCCESS
);
export const recentFolderRequest = createAction(
  FolderAction.RECENT_FOLDER_REQUEST
);
export const recentFolderSuccess = createAction(
  FolderAction.RECENT_FOLDER_SUCCESS
);
export const updateRecentTimeRequest = createAction(
  FolderAction.UPDATE_RECENT_TIME_REQUEST
);
export const updateRecentTimeSuccess = createAction(
  FolderAction.UPDATE_RECENT_TIME_SUCCESS
);
export const updateFolderRequest = createAction(
  FolderAction.UPDATE_FOLDER_REQUEST
);
export const updateFolderSuccess = createAction(
  FolderAction.UPDATE_FOLDER_SUCCESS
);
