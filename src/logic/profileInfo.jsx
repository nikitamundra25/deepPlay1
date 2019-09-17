import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import { ProfileAction, profileSuccess } from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
/**
 *
 */
const profileInfoLogic = createLogic({
  type: ProfileAction.PROFILEINFO_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "/auth",
      "/signup",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(
        profileSuccess({
          showLoader: false,
          profileInfo: data.data.data
        })
      );
      done();
    }
  }
});
/**
 *
 */
export const profileInfoLogics = [profileInfoLogic];
