import { createAction } from 'redux-actions';

export const loginAction = {
    LOGIN_REQUEST: "Login Requested!",
    LOGIN_SUCCESS: "Login Success!",
    LOGOUT_REQUEST: "Logout Started!",
    LOGOUT_SUCCESS: "Logout Success!",
    FORGET_PASSWORD_REQUEST: "Forget Password Started!",
    VALIDATE_RESET_REQUEST: "Reset Token Validation Started!",
    RESET_PASSSWORD_REQUEST: "Reset Password Started!",
}

export const loginRequest = createAction(loginAction.LOGIN_REQUEST);
export const loginSuccess = createAction(loginAction.LOGIN_SUCCESS);
export const logoutRequest = createAction(loginAction.LOGOUT_REQUEST);
export const logoutSuccess = createAction(loginAction.LOGOUT_SUCCESS);
