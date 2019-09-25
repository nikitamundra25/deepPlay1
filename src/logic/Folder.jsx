import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  createFolderSuccess,
  FolderAction,
  redirectTo,
  getFolderRequest,
  getFolderSuccess,
  showLoader,
  hideLoader
} from "../actions";
import { toast } from "react-toastify";

//  Create folder
const createFolderLogic = createLogic({
  type: FolderAction.CREATE_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/createFolder",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(hideLoader());
      done();
      return;
    } else {
      // toast.success(result.messages[0]);
      dispatch(hideLoader());
      dispatch(redirectTo({ path: `/recentFolder/${result.data.Result._id}` }));
      done();
    }
  }
});

//  Recent folder
const getRecentFolderLogic = createLogic({
  type: FolderAction.GET_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "folder",
      "/getFolderById",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      console.log("resulttt", result.data);
      dispatch(
        getFolderSuccess({
          getFolder: result.data.data
        })
      );
      done();
    }
  }
});
export const FolderLogics = [createFolderLogic, getRecentFolderLogic];
