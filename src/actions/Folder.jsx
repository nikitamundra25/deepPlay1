import { createAction } from "redux-actions";
export const FolderAction = {
  CREATE_FOLDER_REQUEST: "Create Folder Request",
  CREATE_FOLDER_SUCCESS: "Create Folder Success",
  FOLDER_DETAIL_REQUEST: "Folder Detail Request",
  FOLDER_DETAIL_SUCCESS: "Folder Detail Success",
  GET_ALL_FOLDER_REQUEST: "Get All Folder Request",
  GET_ALL_FOLDER_SUCCESS: "Get All Folder Success",
  DELETE_FOLDER_REQUEST: "Delete Folder Request",
  DELETE_FOLDER_SUCCESS: "Delete Folder Success"
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
