import { createAction } from "redux-actions";
export const SetsAction = {
  CREATE_SET_REQUEST: "Create Set Request",
  CREATE_SET_SUCCESS: "Create Set Success",
  GET_ALL_SET_REQUEST: "Get All Set Request",
  GET_ALL_SET_SUCCESS: "Get All Set Success"
};
export const createSetRequest = createAction(SetsAction.CREATE_SET_REQUEST);
export const createSetSuccess = createAction(SetsAction.CREATE_SET_SUCCESS);
export const getAllSetRequest = createAction(SetsAction.GET_ALL_SET_REQUEST);
export const getAllSetSuccess = createAction(SetsAction.GET_ALL_SET_SUCCESS);
