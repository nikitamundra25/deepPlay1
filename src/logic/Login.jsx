import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  loginAction,
  modelOpenRequest,
  redirectTo,
  logoutRequest,
  loginSuccess,
  logoutSuccess,
  profileSuccess,
  forgotPasswordSuccess,
  changePasswordSuccess,
  changePasswordAction,
  forgotPasswordFailed,
  changePasswordFailed
} from "../actions";
//import { logger } from "helper/Logger";
import { toast } from "react-toastify";
import { AppRoutes } from "../config/AppRoutes";
let toastId = null;
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
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(loginSuccess({ isLoginSuccess: false }));
      done();
      return;
    } else {
      localStorage.setItem("token", result.data.token);
      dispatch(
        modelOpenRequest({
          modelDetails: {
            loginModelOpen: false
          }
        })
      );
      dispatch(
        profileSuccess({
          profileInfo: result.data.userData
        })
      );
      dispatch(loginSuccess({ isLoginSuccess: true }));
      dispatch(redirectTo({ path: AppRoutes.DASHBOARD.url }))
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
    localStorage.removeItem("token");
    dispatch(logoutSuccess({ isLoginSuccess: false }));
    dispatch(redirectTo({ path: AppRoutes.HOME_PAGE.url }))
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
      localStorage.setItem("token", result.data.token);
      if (result.data.message) {
        toast.success(result.data.message);
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            loginModelOpen: false
          }
        })
      );
      dispatch(loginSuccess({ isLoginSuccess: true }));
      dispatch(redirectTo({ path: AppRoutes.DASHBOARD.url }))
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
      dispatch(forgotPasswordFailed());
      done();
      return;
    } else {
      dispatch(forgotPasswordSuccess());
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            forgotPasswordModalOpen: false
          }
        })
      );
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
const verifyAccountAccessLogic = createLogic({
  type: loginAction.VERIFY_WORKSPACE_LOGIN,
  async process({ action }, dispatch, done) {
    const { payload } = action;
    const { user, key, verification } = payload;
    if (!user || !key || !verification) {
      dispatch(logoutRequest());
    }
    localStorage.setItem("token", user);
    const result = await new ApiHelper().FetchFromServer(
      "user",
      "/getProfileInfo",
      "GET",
      true
    );
    if (result.isError) {
      dispatch(logoutRequest());
    }
    localStorage.setItem("token", user);
    dispatch(
      redirectTo({
        path: AppRoutes.DASHBOARD.url
      })
    );
    done();
  }
});

//---------Change password----------
const changePasswordLogic = createLogic({
  type: changePasswordAction.CHANGE_PASSWORD_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/change-password",
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(
          result.messages[0].oldPassword ||
          result.messages[0] ||
          result.messages
        );
      }
      dispatch(changePasswordFailed());
      done();
      return;
    } else {
      dispatch(changePasswordSuccess());
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      done();
    }
  }
});

export const LoginLogics = [
  loginLogic,
  logOutLogic,
  socialLoginLogic,
  forgetPasswordLogic,
  verifyResetTokenLogic,
  resetPasswordLogic,
  verifyAccountAccessLogic,
  changePasswordLogic
];
