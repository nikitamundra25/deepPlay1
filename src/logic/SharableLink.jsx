import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  SharableLinkAction,
  showLoader,
  hideLoader,
  publicAccessSuccess,
  shareableLinkSuccess,
  sharedFolderInfoSuccess,
  redirectTo
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
      "/public-access",
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

// Shareable link get encrypted info of user
const shareLinkLogic = createLogic({
  type: SharableLinkAction.SHAREABLE_LINK_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/share-link",
      "GET",
      true,
      { folderId: action.payload }
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(hideLoader());
      dispatch(shareableLinkSuccess({ userEncryptedInfo: result.data.data }));
      done();
    }
  }
});

// get folder details of shared link
const sharedLinkFolderDetailsLogic = createLogic({
  type: SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/get-public-url-for-folder",
      "GET",
      false,
      action.payload
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      dispatch(redirectTo({ path: "/404" }));
      done();
      return;
    } else {
      dispatch(hideLoader());
      dispatch(
        sharedFolderInfoSuccess({ decryptedFolderDetails: result.data.data })
      );
      done();
    }
  }
});

// get folder details of shared link
const getPublicUrlSetsDetailsLogic = createLogic({
  type: SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/public-url-set-details",
      "GET",
      false,
      action.payload
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      dispatch(redirectTo({ path: "/404" }));
      done();
      return;
    } else {
      dispatch(hideLoader());
      dispatch(
        sharedFolderInfoSuccess({ publicUrlSetDetails: result.data.data })
      );
      done();
    }
  }
});

export const SharableLinkLogics = [
  publicAccessLogic,
  shareLinkLogic,
  sharedLinkFolderDetailsLogic,
  getPublicUrlSetsDetailsLogic
];
