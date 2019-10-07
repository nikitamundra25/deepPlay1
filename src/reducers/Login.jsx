import { handleActions } from "redux-actions";
import { loginAction, signupActions, changePasswordAction } from "./../actions";

const initialState = {
  isLoginSuccess: false,
  isSendingLink: false,
  isSignupLoading: false,
  isLoginRequest: false,
  isChangePasswordSuccess: false
};

export const loginReducer = handleActions(
  {
    [loginAction.LOGIN_REQUEST]: (state, { payload }) => ({
      ...state,
      isLoginRequest: true
    }),
    [loginAction.LOGIN_SUCCESS]: (state, { payload }) => ({
      ...state,
      isLoginRequest: false
    }),
    [signupActions.SIGNUP_REQUEST]: (state, { payload }) => ({
      ...state,
      isSignupLoading: true
    }),
    [signupActions.SIGNUP_SUCCESS]: (state, { payload }) => ({
      ...state,
      isSignupLoading: false
    }),
    [loginAction.FORGET_PASSWORD_REQUEST]: (state, { payload }) => ({
      ...state,
      isSendingLink: true
    }),
    [loginAction.FORGET_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      isSendingLink: false
    }),
    [changePasswordAction.CHANGE_PASSWORD_REQUEST]: (state, { payload }) => ({
      ...state,
      isChangePasswordSuccess: true
    }),
    [changePasswordAction.CHANGE_PASSWORD_SUCCESS]: (state, { payload }) => ({
      ...state,
      isChangePasswordSuccess: false
    })
  },
  initialState
);
