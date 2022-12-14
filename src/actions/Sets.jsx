import { createAction } from "redux-actions";
export const SetsAction = {
  CREATE_SET_REQUEST: "Create Set Request",
  CREATE_SET_SUCCESS: "Create Set Success",
  GET_ALL_SET_REQUEST: "Get All Set Request",
  GET_ALL_SET_SUCCESS: "Get All Set Success",
  GET_SET_DETAILS_REQUEST: "Get set details request",
  GET_SET_DETAILS_SUCCESS: "Get set details success",
  GET_FOLDER_SET_REQUEST: "Get Folder Set Request",
  GET_FOLDER_SET_SUCCESS: "Get Folder Set Success",
  MANAGE_SET_REQUEST: "Manage Sets in Folder Request",
  MANAGE_SET_SUCCESS: " Manage Sets in Folder Success",
  RECENT_SET_REQUEST: "Recent Set Request",
  RECENT_SET_SUCCESS: "Recent Set Success",
  DELETE_SET_REQUEST: "Delete Set Request",
  DELETE_SET_SUCCESS: " Delete Set Success",
  UPDATE_SET_REQUEST: "Update Set Request",
  UPDATE_SET_SUCCESS: " Update Set Success"
};
export const createSetRequest = createAction(SetsAction.CREATE_SET_REQUEST);
export const createSetSuccess = createAction(SetsAction.CREATE_SET_SUCCESS);
export const getAllSetRequest = createAction(SetsAction.GET_ALL_SET_REQUEST);
export const getAllSetSuccess = createAction(SetsAction.GET_ALL_SET_SUCCESS);
export const getFolderSetRequest = createAction(
  SetsAction.GET_FOLDER_SET_REQUEST
);
export const getFolderSetSuccess = createAction(
  SetsAction.GET_FOLDER_SET_SUCCESS
);
export const ManageSetRequest = createAction(SetsAction.MANAGE_SET_REQUEST);
export const ManageSetSuccess = createAction(SetsAction.MANAGE_SET_SUCCESS);
export const recentSetRequest = createAction(SetsAction.RECENT_SET_REQUEST);
export const recentSetSuccess = createAction(SetsAction.RECENT_SET_SUCCESS);
export const deleteSetRequest = createAction(SetsAction.DELETE_SET_REQUEST);
export const deleteSetSuccess = createAction(SetsAction.DELETE_SET_SUCCESS);
export const getSetDetailsRequest = createAction(
  SetsAction.GET_SET_DETAILS_REQUEST
);
export const getSetDetailsSuccess = createAction(
  SetsAction.GET_SET_DETAILS_SUCCESS
);
export const UpdateSetRequest = createAction(SetsAction.UPDATE_SET_REQUEST);
export const UpdateSetSuccess = createAction(SetsAction.UPDATE_SET_SUCCESS);
