import { handleActions } from "redux-actions";
import { loginAction, signupActions } from "./../actions";

const initialState = {
   isLoginSuccess: false,
};

export const loginReducer = handleActions(
   {
      [loginAction.LOGIN_SUCCESS]: (state, { payload }) => ({
         isLoginSuccess: payload.isLoginSuccess
      }),
   },
   {
      [loginAction.LOGOUT_SUCCESS]: (state, { payload }) => ({
         isLoginSuccess: payload.isLoginSuccess
      }),
   },
   {
      [signupActions.SIGNUP_SUCCESS]: (state, { payload }) => ({
         isLoginSuccess: payload.isLoginSuccess
      }),
   },
   initialState
);