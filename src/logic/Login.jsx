import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper"
import {
  loginAction,
  modelOpenRequest,
  // redirectTo,
  loginSuccess,
  logoutSuccess
} from "../actions";
//import { logger } from "helper/Logger";
import { AppRoutes } from "../config/AppRoutes"
/**
 *
 */
const loginLogic = createLogic({
  type: loginAction.LOGIN_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/login",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError || !result.data.userData) {
      done();
      return;
    } else {
      localStorage.setItem("token", result.data.token)
      dispatch(
        modelOpenRequest({
          modelDetails: {
            loginModelOpen: false
          }
        })
      )
      dispatch(
        loginSuccess({ isLoginSuccess: true })
      )
      window.location.href = AppRoutes.DASHBOARD.url;
      done();
    }
  }
});
/**
 *
 */
const logOutLogic = createLogic({
  type: loginAction.LOGOUT_REQUEST,
  async process({ action }, dispatch, done) {
    dispatch(logoutSuccess({ isLoginSuccess: false }))
    localStorage.removeItem("token");
    window.location.href = AppRoutes.HOME_PAGE.url
    done();
  }
});
/**
 *
 */
export const LoginLogics = [
  loginLogic,
  logOutLogic
];
