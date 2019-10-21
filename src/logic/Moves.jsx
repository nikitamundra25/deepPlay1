import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  redirectTo,
  MovesAction,
  downloadYoutubeVideoSuccess,
  getMovesOfSetSuccess,
  getMovesOfSetRequest,
  getMoveDetailsSuccess,
  modelOpenRequest,
  searchMoveSuccess,
  getSetDetailsRequest,
  updateSortIndexSuccess
} from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
import { logger } from "helper/Logger";
import { completeVideoEditingSuccess } from "actions/Moves";
let toastId = null;

//  Download video
const downloadVideoLogic = createLogic({
  type: MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result;
    if (action.payload.isYoutubeUrl) {
      result = await api.FetchFromServer(
        "move",
        "/download-youtube-video",
        "POST",
        true,
        undefined,
        action.payload
      );
    } else {
      result = await api.UploadVideo("move", "/download-video", action.payload);
    }
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(
        downloadYoutubeVideoSuccess({
          videoUrl: ""
        })
      );
      done();
      return;
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        downloadYoutubeVideoSuccess({
          videoUrl:
            result.data && result.data.videoUrl ? result.data.videoUrl : ""
        })
      );
      dispatch(
        redirectTo({
          path: `${AppRoutes.MOVE_DETAILS.url.replace(
            ":id",
            result.data.moveData._id
          )}`
        })
      );
      done();
    }
  }
});

// Get Moves for sets
const getMovesOfSetLogic = createLogic({
  type: MovesAction.GET_MOVES_OF_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/getMoveForSet",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(
        getMovesOfSetSuccess({
          showLoader: false,
          movesOfSet: result.data.movesData,
          totalMoves: result.data.totalMoves,
          isInfiniteScroll: action.payload.isInfiniteScroll
        })
      );
      done();
    }
  }
});

// Get Moves Details by Id
const getMovesDetailsByIdLogic = createLogic({
  type: MovesAction.GET_MOVE_DETAILS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/get-move-details-by-id",
      "GET",
      true,
      action.payload,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(getMoveDetailsSuccess({ moveDetails: "" }));
      done();
      return;
    } else {
      dispatch(
        getMoveDetailsSuccess({
          moveDetails: result.data.movesData
        })
      );
      done();
    }
  }
});

// completed video editing and send for final update
const completeVideoEditingLogic = createLogic({
  type: MovesAction.UPDATE_VIDEO_SETTINGS,
  async process({ action }, dispatch, done) {
    dispatch(
      completeVideoEditingSuccess({
        isSavingWebM: true
      })
    );
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/update",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
    } else {
      logger(result, action.payload);
      if (action.payload.isEdit) {
        dispatch(
          redirectTo({
            path: `${AppRoutes.SET_DETAILS.url.replace(
              ":id",
              result.data.setId
            )}`
          })
        );
      } else {
        dispatch(
          modelOpenRequest({
            modelDetails: {
              isMoveSuccessModal: true
            }
          })
        );
      }
      dispatch(
        completeVideoEditingSuccess({
          isSavingWebM: false,
          moveUrlDetails: {
            moveURL: result.data.data.videoUrl,
            setId: result.data.setId
          }
        })
      );
      done();
    }
  }
});
/**
 *
 */

//Star move
const starMoveLogic = createLogic({
  type: MovesAction.STARRED_MOVE_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/starred-move",
      "PUT",
      true,
      action.payload
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
      dispatch(getMovesOfSetRequest({ setId: action.payload.setId }));
      done();
    }
  }
});

//Delete move
const deleteMoveLogic = createLogic({
  type: MovesAction.DELETE_MOVES_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/delete-move",
      "PATCH",
      true,
      action.payload
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
      dispatch(getMovesOfSetRequest({ setId: action.payload.setId }));
      dispatch(getSetDetailsRequest({ setId: action.payload.setId }));
      done();
    }
  }
});

//Transfer move to set
const transferMoveLogic = createLogic({
  type: MovesAction.TRANSFER_MOVE_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/transfer-move",
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
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            transferToModalOpen: false,
            transferToModalOpenReq: false
          }
        })
      );
      dispatch(
        getMovesOfSetRequest({
          setId: action.payload.previousSetId,
          page: 1,
          isInfiniteScroll: false
        })
      );
      dispatch(getSetDetailsRequest({ setId: action.payload.previousSetId }));
      done();
    }
  }
});

//-------------------Create Another Move Request----------------
const createAnotherMoveLogic = createLogic({
  type: MovesAction.CREATE_ANOTHER_MOVE_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/create-move",
      "POST",
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
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            isMoveSuccessModal: false
          }
        })
      );
      dispatch(
        redirectTo({
          path: `${AppRoutes.MOVE_DETAILS.url.replace(
            ":id",
            result.data.moveId
          )}`
        })
      );
      done();
    }
  }
});

//Filter move
const searchMoveLogic = createLogic({
  type: MovesAction.SEARCH_MOVE_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/filter-move",
      "GET",
      true,
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
        searchMoveSuccess({
          searchMoveResult: result.data.data
        })
      );
      done();
    }
  }
});

//Add Tags
const addTagsLogic = createLogic({
  type: MovesAction.ADD_TAGS_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/add-tags-move",
      "PUT",
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
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            addTagModalOpen: false,
            addTagModalOpenReq: false
          }
        })
      );
      done();
    }
  }
});

//Update sort index
const updateSortIndexLogic = createLogic({
  type: MovesAction.UPDATE_SORT_INDEX_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/sort-index-update",
      "PUT",
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
        updateSortIndexSuccess({
          movesOfSet: result.data.data
        })
      );
      done();
    }
  }
});

export const MoveLogics = [
  downloadVideoLogic,
  getMovesOfSetLogic,
  getMovesDetailsByIdLogic,
  completeVideoEditingLogic,
  starMoveLogic,
  deleteMoveLogic,
  transferMoveLogic,
  createAnotherMoveLogic,
  searchMoveLogic,
  addTagsLogic,
  updateSortIndexLogic
];
