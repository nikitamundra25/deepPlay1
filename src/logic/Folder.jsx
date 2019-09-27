import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  FolderAction,
  redirectTo,
  modelOpenRequest,
  folderDetailSuccess,
  showLoader,
  hideLoader,
  getAllFolderSuccess,
  getAllFolderRequest
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
      dispatch(hideLoader());
      dispatch(
        modelOpenRequest({
          modelDetails: {
            createFolderModalOpen: false
          }
        })
      );
      if (!action.payload.isCopy) {
        toast.success(result.messages[0]);
        dispatch(
          redirectTo({ path: `/folder-details/${result.data.Result._id}` })
        );
      } else {
        toast.success("Folder Copy has been created successfully");
        dispatch(getAllFolderRequest());
      }
      done();
    }
  }
});

//  Get All folder
const allFolderLogic = createLogic({
  type: FolderAction.GET_ALL_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/allFolder",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(hideLoader());
      done();
      return;
    } else {
      // toast.success(result.messages[0]);
      dispatch(hideLoader());
      dispatch(
        getAllFolderSuccess({
          getAllFolders: result.data.data
        })
      );
      done();
    }
  }
});

//Delete folder
const deleteFolderLogic = createLogic({
  type: FolderAction.DELETE_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/deleteFolder",
      "DELETE",
      true,
      { id: action.payload },
      undefined
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(hideLoader());
      toast.success(result.messages[0]);
      dispatch(getAllFolderRequest());
      done();
    }
  }
});

//  Recent folder
const getRecentFolderLogic = createLogic({
  type: FolderAction.FOLDER_DETAIL_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/getFolderById",
      "POST",
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
      dispatch(
        folderDetailSuccess({
          folderDetails: result.data.data
        })
      );
      done();
    }
  }
});
export const FolderLogics = [
  createFolderLogic,
  getRecentFolderLogic,
  allFolderLogic,
  deleteFolderLogic
];
