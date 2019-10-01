import { handleActions } from "redux-actions";
import { loginAction, signupActions } from "./../actions";

const initialState = {
  isLoginSuccess: false,
  isSendingLink: false,
  isSignupLoading: false,
  isLoginRequest: false
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
    })
  },
  initialState
);
