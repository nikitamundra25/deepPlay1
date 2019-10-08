import { createAction } from "redux-actions";

export const changePasswordAction = {
  CHANGE_PASSWORD_REQUEST: "Change password Requested!",
  CHANGE_PASSWORD_SUCCESS: "Change password Success!",
  CHANGE_PASSWORD_FAILED: "Change password Failed!"
};

export const changePasswordRequest = createAction(
  changePasswordAction.CHANGE_PASSWORD_REQUEST
);
export const changePasswordSuccess = createAction(
  changePasswordAction.CHANGE_PASSWORD_SUCCESS
);
export const changePasswordFailed = createAction(
  changePasswordAction.CHANGE_PASSWORD_FAILED
);
