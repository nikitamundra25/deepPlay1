import { createAction } from "redux-actions";

export const loginAction = {
  LOGIN_REQUEST: "Login Requested!",
  LOGIN_SUCCESS: "Login Success!",
  LOGOUT_REQUEST: "Logout Started!",
  LOGOUT_SUCCESS: "Logout Success!",
  SOCIAL_LOGIN_REQUEST: "Social login Requested",
  SOCIAL_LOGIN_SUCCESS: "Social login Success!",
  FORGET_PASSWORD_REQUEST: "Forget Password Started!",
  FORGET_PASSWORD_SUCCESS: "Forget Password Success!",
  FORGET_PASSSWORD_FAILED: "Forget password Failed!",
  VALIDATE_RESET_REQUEST: "Reset Token Validation Started!",
  RESET_PASSSWORD_REQUEST: "Reset Password Started!",
  VERIFY_WORKSPACE_LOGIN: "Verify the login for the workspace!"
};

export const loginRequest = createAction(loginAction.LOGIN_REQUEST);
export const loginSuccess = createAction(loginAction.LOGIN_SUCCESS);

export const logoutRequest = createAction(loginAction.LOGOUT_REQUEST);
export const logoutSuccess = createAction(loginAction.LOGOUT_SUCCESS);

export const forgotPasswordRequest = createAction(
  loginAction.FORGET_PASSWORD_REQUEST
);
export const forgotPasswordSuccess = createAction(
  loginAction.FORGET_PASSWORD_SUCCESS
);
export const forgotPasswordFailed = createAction(
  loginAction.FORGET_PASSSWORD_FAILED
);
export const validateResetToken = createAction(
  loginAction.VALIDATE_RESET_REQUEST
);
export const resetPasswordRequest = createAction(
  loginAction.RESET_PASSSWORD_REQUEST
);

export const socialLoginRequest = createAction(
  loginAction.SOCIAL_LOGIN_REQUEST
);
export const socialLoginSuccess = createAction(
  loginAction.SOCIAL_LOGIN_SUCCESS
);

export const verifyWorkspaceLogin = createAction(
  loginAction.VERIFY_WORKSPACE_LOGIN
);
