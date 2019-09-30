import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper"
import {
  loginAction,
  modelOpenRequest,
  redirectTo,
  loginSuccess,
  logoutSuccess,
  profileSuccess,
  forgotPasswordSuccess
} from "../actions";
//import { logger } from "helper/Logger";
import { toast } from "react-toastify";
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
      toast.error(result.messages[0]);
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
        profileSuccess({
          profileInfo: result.data.userData
        })
      );
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
const socialLoginLogic = createLogic({
  type: loginAction.SOCIAL_LOGIN_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/socialLogin",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError || !result.data.userData) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      localStorage.setItem("token", result.data.token)
      if (result.data.message) {
        toast.success(result.data.message)
      }
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
const forgetPasswordLogic = createLogic({
  type: loginAction.FORGET_PASSWORD_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/forgotPassword",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(forgotPasswordSuccess())
      toast.success(result.messages[0]);
      dispatch(
        modelOpenRequest({
          modelDetails: {
            forgotPasswordModalOpen: false
          }
        })
      )
      done();
    }
  }
});
/**
 *
 */
const verifyResetTokenLogic = createLogic({
  type: loginAction.VALIDATE_RESET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/verifylink",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(redirectTo({ path: "/404" }));
      done();
      return;
    } else {
      done();
    }
  }
});
/**
 *
 */
const resetPasswordLogic = createLogic({
  type: loginAction.RESET_PASSSWORD_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/resetPassword",
      "POST",
      false,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      toast.success(result.messages[0]);
      dispatch(redirectTo({ path: "/" }));
      done();
    }
  }
});
/**
 *
 */
export const LoginLogics = [
  loginLogic,
  logOutLogic,
  socialLoginLogic,
  forgetPasswordLogic,
  verifyResetTokenLogic,
  resetPasswordLogic
];
