import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  SharableLinkAction,
  showLoader,
  hideLoader,
  publicAccessSuccess,
  shareableLinkSuccess,
  sharedFolderInfoSuccess,
  redirectTo,
  publicUrlSetDetailsSuccess,
  sharedSetInfoSuccess,
  publicUrlMoveDetailsSuccess
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
      action.payload
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

// get folder details by id of shared link [public access folder component]
const sharedLinkFolderDetailsLogic = createLogic({
  type: SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "folder",
      "/public-access-folder-info-by-id",
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
      dispatch(sharedFolderInfoSuccess({ decryptedDetails: result.data.data }));
      done();
    }
  }
});

// get set details of shared link [public access folder component]
const getPublicUrlSetsDetailsLogic = createLogic({
  type: SharableLinkAction.PUBLIC_URL_SET_DETAILS_REQUEST,
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
        publicUrlSetDetailsSuccess({ publicUrlSetDetails: result.data.data })
      );
      done();
    }
  }
});

// get set details of shared link [public access set component]
const sharedLinkSetDetailsLogic = createLogic({
  type: SharableLinkAction.GET_PUBLIC_URL_FOR_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/public-access-set-info-by-id",
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
      dispatch(sharedSetInfoSuccess({ decryptedSetDetails: result.data.data }));
      done();
    }
  }
});

// get move details of shared link [public access set component]
const getPublicUrlMoveDetailsLogic = createLogic({
  type: SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "move",
      "/public-url-move-details",
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
        publicUrlMoveDetailsSuccess({ publicUrlmoveDetails: result.data.data })
      );
      done();
    }
  }
});
export const SharableLinkLogics = [
  publicAccessLogic,
  shareLinkLogic,
  sharedLinkFolderDetailsLogic,
  getPublicUrlSetsDetailsLogic,
  sharedLinkSetDetailsLogic,
  getPublicUrlMoveDetailsLogic
];
