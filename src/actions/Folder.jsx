import { createAction } from "redux-actions";
export const FolderAction = {
  CREATE_FOLDER_REQUEST: "Create Folder Request",
  CREATE_FOLDER_SUCCESS: "Create Folder Success",
  GET_FOLDER_REQUEST: "Get All Folder Request",
  GET_FOLDER_SUCCESS: "Get All Folder Success"
};
export const createFolderRequest = createAction(
  FolderAction.CREATE_FOLDER_REQUEST
);
export const createFolderSuccess = createAction(
  FolderAction.CREATE_FOLDER_SUCCESS
);
export const getFolderRequest = createAction(
  FolderAction.GET_FOLDER_REQUEST
);
export const getFolderSuccess = createAction(
  FolderAction.GET_FOLDER_SUCCESS
);
