import { handleActions } from "redux-actions";
import { loginAction, signupActions } from "./../actions";

const initialState = {
  isLoginSuccess: false,
  isSendingLink: false,
  isSignupLoading: false
};

export const loginReducer = handleActions(
  {
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
