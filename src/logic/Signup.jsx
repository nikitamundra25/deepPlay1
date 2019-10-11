import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import { signupActions, modelOpenRequest, signupSuccess } from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
let toastId = null;
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
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(signupSuccess({ isLoginSuccess: false }));
      done();
      return;
    } else {
      localStorage.setItem("token", result.data.token);
      window.location.href = AppRoutes.DASHBOARD.url;
      toast.success(result.messages[0]);
      dispatch(
        modelOpenRequest({
          modelDetails: {
            signupModelOpen: false
          }
        })
      );
      dispatch(signupSuccess({ isLoginSuccess: true }));
      done();
    }
  }
});
/**
 *
 */
export const SignupLogics = [signupLogic];
