import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  SharableLinkAction,
  showLoader,
  hideLoader,
  publicAccessSuccess
} from "../actions";
import { toast } from "react-toastify";

//Sharable link public access api
const publicAccessLogic = createLogic({
  type: SharableLinkAction.PUBLIC_ACCESS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/share-link",
      "PATCH",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(hideLoader());
      dispatch(publicAccessSuccess());
      done();
    }
  }
});

export const SharableLinkLogics = [publicAccessLogic];
