import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  createSetSuccess,
  SetsAction,
  getAllSetSuccess,
  redirectTo,
  showLoader,
  hideLoader,
  getFolderSetSuccess,
  ManageSetSuccess,
  getFolderSetRequest,
  modelOpenRequest,
  getAllSetRequest,
  recentSetSuccess,
  getSetDetailsSuccess
} from "../actions";
import { toast } from "react-toastify";
import { AppConfig } from "../config/Appconfig";
import { AppRoutes } from "../config/AppRoutes";
let toastId = null;

//  Create sets
const createSetLogic = createLogic({
  type: SetsAction.CREATE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/create-set",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      dispatch(hideLoader());
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      done();
      return;
    } else {
      dispatch(
        createSetSuccess({
          showLoader: false,
          setData: result.data.setResult
        })
      );
      if (!action.payload.isCopy) {
        if (!toast.isActive(toastId)) {
          toastId = toast.success(result.messages[0]);
        }
        dispatch(redirectTo({ path: AppRoutes.MOVE.url }));
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.success("Set Copy has been created successfully");
        }
        dispatch(getAllSetRequest({ isSetNoLimit: false }));
      }
      done();
    }
  }
});

// Recent Folder (dashboard)
const recentSetLogic = createLogic({
  type: SetsAction.RECENT_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/get-recent-set",
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
        recentSetSuccess({
          recentSets: result.data.data
        })
      );
      done();
    }
  }
});

//Delete folder
const deleteSetLogic = createLogic({
  type: SetsAction.DELETE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/delete-set",
      "PATCH",
      true,
      undefined,
      { id: action.payload }
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      done();
      return;
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      // dispatch(redirectTo({ path: AppRoutes.SET.url }));
      dispatch(getAllSetRequest({ isSetNoLimit: false }));
      done();
    }
  }
});
//  ---------------Get all sets ---------------
const getAllSetLogic = createLogic({
  type: SetsAction.GET_ALL_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let setPayload;
    if (action.payload.isSetNoLimit) {
      setPayload = action.payload;
    } else {
      setPayload = {
        ...action.payload,
        limit: AppConfig.ITEMS_PER_PAGE
      };
    }
    let result = await api.FetchFromServer(
      "set",
      "/get-all-set",
      "GET",
      true,
      setPayload
    );
    if (result.isError) {
      dispatch(hideLoader());
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(hideLoader());
      dispatch(
        getAllSetSuccess({
          showLoader: false,
          allSetList: result.data.result,
          totalSets: result.data.totalSets ? result.data.totalSets : 0
        })
      );
      done();
    }
  }
});

//  ---------------Get sets list to add or remove in folders---------------
const getSetOfFolderLogic = createLogic({
  type: SetsAction.GET_FOLDER_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/get-sets-of-folder",
      "GET",
      true,
      {
        ...action.payload,
        limit: AppConfig.ITEMS_PER_PAGE
      }
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(
        getFolderSetSuccess({
          showLoader: false,
          setListinFolder: []
        })
      );
      done();
      return;
    } else {
      dispatch(
        getFolderSetSuccess({
          showLoader: false,
          setListinFolder: result.data.data,
          totalSetsInFolder: result.data.totalSets ? result.data.totalSets : 0
        })
      );
      done();
    }
  }
});

//  ---------------Add or remove sets in folders---------------
const ManageSetLogic = createLogic({
  type: SetsAction.MANAGE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(hideLoader());

    let result = await api.FetchFromServer(
      "set",
      "/manage-sets",
      "PATCH",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      done();
      return;
    } else {
      dispatch(
        ManageSetSuccess({
          showLoader: false
        })
      );
      dispatch(
        modelOpenRequest({
          modelDetails: {
            transferToModalOpen: false,
            addSetModalOpen: false
          }
        })
      );
      dispatch(getAllSetRequest({ isSetNoLimit: false }));
      if (action.payload.previousFolderId) {
        dispatch(
          getFolderSetRequest({
            folderId: action.payload.previousFolderId
          })
        );
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.success("Your set has been transfered successfully");
        }
        dispatch(getAllSetRequest({ isSetNoLimit: false }));
        dispatch(getFolderSetRequest());
      }
      done();
    }
  }
});
/*  Get Set Details By Id */
const getSetDetailsLogic = createLogic({
  type: SetsAction.GET_SET_DETAILS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/getSetById",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(
        getSetDetailsSuccess({
          showLoader: false,
          setDetails: {}
        })
      );
      done();
      return;
    } else {
      dispatch(
        getSetDetailsSuccess({
          showLoader: false,
          setDetails: result.data.data
        })
      );
      done();
    }
  }
});

//update set
const UpdateSetLogic = createLogic({
  type: SetsAction.UPDATE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/update-set",
      "PUT",
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
        redirectTo({
          path: AppRoutes.SET_DETAILS.url.replace(":id", action.payload.setId)
        })
      );
      // dispatch(redirectTo({ path: `/set/details/${action.payload.setId}` }));
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      done();
    }
  }
});
export const SetLogics = [
  createSetLogic,
  getAllSetLogic,
  getSetOfFolderLogic,
  ManageSetLogic,
  recentSetLogic,
  deleteSetLogic,
  getSetDetailsLogic,
  UpdateSetLogic
];
