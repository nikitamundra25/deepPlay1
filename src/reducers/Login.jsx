import { handleActions } from "redux-actions";
import { loginAction, signupActions, changePasswordAction } from "./../actions";

const initialState = {
  isLoginSuccess: false,
  isSendingLink: false,
  isSignupLoading: false,
  isLoginRequest: false,
  isChangePasswordSuccess: false,
  isChangePasswordDone: false
};

export const loginReducer = handleActions(
  {
    [loginAction.LOGIN_REQUEST]: (state, { payload }) => ({
      ...state,
      isLoginRequest: true
    }),
    [loginAction.LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoginRequest: false,
      isLoginSuccess: true
    }),
    [loginAction.LOGIN_FAILED]: (state, { payload }) => ({
      ...state,
      isLoginRequest: false,
      isLoginSuccess: false
    }),
    [loginAction.LOGOUT_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoginRequest: false,
      isLoginSuccess: false
    }),
    [signupActions.SIGNUP_REQUEST]: (state, { payload }) => ({
      ...state,
      isSignupLoading: true
    }),
    [signupActions.SIGNUP_SUCCESS]: (state, { payload }) => ({
      ...state,
      isSignupLoading: false,
      isLoginSuccess: true
    }),
    [signupActions.SIGNUP_FAILED]: (state, { payload }) => ({
      ...state,
      isSignupLoading: false,
      isLoginSuccess: false
    }),
    [loginAction.FORGET_PASSWORD_REQUEST]: (state, { payload }) => ({
      ...state,
      isSendingLink: true
    }),
    [loginAction.FORGET_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      isSendingLink: false
    }),
    [loginAction.FORGET_PASSSWORD_FAILED]: (state, { payload }) => ({
      ...state,
      isSendingLink: false
    }),
    [changePasswordAction.CHANGE_PASSWORD_REQUEST]: (state, { payload }) => ({
      ...state,
      isChangePasswordSuccess: true,
      isChangePasswordDone: false
    }),
    [changePasswordAction.CHANGE_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      isChangePasswordSuccess: false,
      isChangePasswordDone: true
    }),
    [changePasswordAction.CHANGE_PASSWORD_FAILED]: (state, { payload }) => ({
      ...state,
      isChangePasswordSuccess: false,
    }),
  },
  initialState
);
