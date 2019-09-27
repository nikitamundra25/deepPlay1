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
  getSetDetailsSuccess
} from "../actions";
import { toast } from "react-toastify";

//  Create sets
const createSetLogic = createLogic({
  type: SetsAction.CREATE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/createSet",
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
      toast.success(result.messages[0]);
      dispatch(
        createSetSuccess({
          showLoader: false,
          setData: result.data.setResult
        })
      );
      if (!action.payload.isCopy) {
        dispatch(redirectTo({ path: "/move" }));
      } else {
        toast.success("Set Copy has been created successfully");
        dispatch(getAllSetRequest());
      }
      done();
    }
  }
});

//  ---------------Get all sets ---------------
const getAllSetLogic = createLogic({
  type: SetsAction.GET_ALL_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/getAllSet",
      "GET",
      true,
      undefined,
      undefined
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
          allSetList: result.data.result
        })
      );
      done();
    }
  }
});

//  ---------------Get sets list to add or remove in folders---------------
const getSetLogic = createLogic({
  type: SetsAction.GET_FOLDER_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/getSets",
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
        getFolderSetSuccess({
          showLoader: false,
          setListinFolder: result.data.data
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
    console.log("act", action.payload);
    let result = await api.FetchFromServer(
      "set",
      "/manageSets",
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
      dispatch(
        ManageSetSuccess({
          showLoader: false
        })
      );

      dispatch(
        getFolderSetRequest({
          folderId: action.payload.previousFolderId
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
      done();
    }
  }
});
/*  Get Set Details By Id */
const getSetDetailsLogic = createLogic({
  type: SetsAction.GET_SET_DETAILS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "set",
      "/getSetById",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      dispatch(hideLoader());
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
      dispatch(hideLoader());
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

export const SetLogics = [
  createSetLogic,
  getAllSetLogic,
  getSetLogic,
  ManageSetLogic,
  getSetDetailsLogic
];
