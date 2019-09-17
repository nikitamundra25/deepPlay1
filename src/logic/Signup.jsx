import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper"
import {
  signupActions,
  modelOpenRequest,
  signupSuccess,
} from "../actions";
import { AppRoutes } from "../config/AppRoutes"
import { toast } from "react-toastify";
/**
 *
 */
const signupLogic = createLogic({
  type: signupActions.SIGNUP_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/signup",
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
            signupModelOpen: false
          }
        })
      )
      dispatch(
        signupSuccess({ isLoginSuccess: true })
      )
      window.location.href = AppRoutes.DASHBOARD.url;
      done();
    }
  }
});
/**
 *
 */
export const SignupLogics = [
  signupLogic
];
