import { createAction } from "redux-actions";
export const ProfileAction = {
  PROFILEINFO_REQUEST: "PROFILEINFO_REQUEST",
  PROFILEINFO_SUCCESS: "PROFILEINFO_SUCCESS",
  PROFILEINFO_FAILURE: "PROFILEINFO_FAILURE"
};
export const profileRequest = createAction(ProfileAction.PROFILEINFO_REQUEST);
export const profileSuccess = createAction(ProfileAction.PROFILEINFO_SUCCESS);
