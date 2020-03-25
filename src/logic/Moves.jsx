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
  updateSortIndexSuccess,
  createAnotherMoveSuccess,
  getMoveBySearchSuccess,
  getMoveBySearchRequest,
  starredMovesSuccess,
  getTagListSuccess,
  getAllSetRequest,
  videoCancelSuccess
} from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
import { logger } from "helper/Logger";
import { completeVideoEditingSuccess } from "actions/Moves";
import { addTagsSuccess } from "actions/Moves";
import { updateMoveSuccess } from "actions/Moves";
import { addTagsInTagModalSuccess } from "actions/Moves";
import { onVideoUploadProgressChange } from "actions/Moves";

let toastId = null;
let api = new ApiHelper();
//  Download video
const downloadVideoLogic = createLogic({
  type: MovesAction.DOWNLOAD_YOUTUBE_VIDEO_REQUEST,
  async process({ action, getState }, dispatch, done) {
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
      result = await api.UploadVideo(
        "move",
        "/upload-video",
        action.payload,
        progressEvent => {
          const percent =
            Math.round(
              (progressEvent.loaded / progressEvent.total) * 100 * 100
            ) / 100;
          dispatch(
            onVideoUploadProgressChange({
              uploaded: percent
            })
          );
        }
      );
    }
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(
        downloadYoutubeVideoSuccess({
          videoUrl: "",
          cancelVideo: true
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
      // toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(
        getMovesOfSetSuccess({
          // showLoader: false,
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
      // toast.error(result.messages[0]);
      dispatch(getMoveDetailsSuccess({ moveDetails: "" }));
      dispatch(
        redirectTo({
          path: `${AppRoutes.MOVE.url}`
        })
      );
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
  async process({ action, getState }, dispatch, done) {
    let currMoveArr = getState().moveReducer.isSavingWebM;
    const temp = {
      success: true,
      id: action.payload.moveId
    };
    currMoveArr.push(temp);
    dispatch(
      modelOpenRequest({
        isSavingWebM: { currMoveArr }
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
              //isMoveSuccessModal: false,
              createSetModalOpen: false
            }
          })
        );
      }

      let currMoveArr = getState().moveReducer.movesOfSet;
      let finalMoveList = [];
      if (currMoveArr && currMoveArr.length) {
        currMoveArr.map((key, index) => {
          if (key._id === action.payload.moveId) {
            let data = {
              ...key,
              moveURL: result.data.s3VideoUrl,
              videoThumbnail: result.data.videoThumbnail,
              isMoveProcessing: false
            };
            finalMoveList.push(data);
          } else {
            finalMoveList.push(key);
          }
          return true;
        });
      }

      let savingWebm = getState().moveReducer.isSavingWebM;
      let savingVideo = [...savingWebm];
      if (savingVideo && savingVideo.length) {
        savingVideo.map((key, index) => {
          if (key.id === result.data.data._id) {
            savingVideo.splice(index, 1);
          }
          return true;
        });
      }

      dispatch(
        completeVideoEditingSuccess({
          isSavingWebM: savingVideo,
          moveUrlDetails: {
            moveURL: result.data.data.videoUrl,
            setId: result.data.setId,
            videoOriginalFile: result.data.videoOriginalFile,
            videoFileMain: result.data.videoFileMain,
            s3VideoUrl: result.data.s3VideoUrl
          },
          movesOfSet: finalMoveList
        })
      );
      // let temp = getState().moveReducer.isMoveDone;
      // if (temp) {
      //   dispatch(
      //     removeVideoLocalServerRequest({
      //       videoOriginalFile: result.data.videoOriginalFile,
      //       videoFileMain: result.data.videoFileMain,
      //       setId: result.data.setId
      //     })
      //   );
      // }
      done();
    }
  }
});
/**
 *
 */
// completed youTube video editing and send for final update
const completeYouTubeVideoEditingLogic = createLogic({
  type: MovesAction.YOUTUBE_UPDATE_MOVE_REQUEST,
  async process({ action, getState }, dispatch, done) {
    let currMoveArr = getState().moveReducer.isSavingWebM;
    const temp = {
      success: true,
      id: action.payload.moveId
    };
    currMoveArr.push(temp);
    dispatch(
      modelOpenRequest({
        isSavingWebM: { currMoveArr }
      })
    );
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/update-youtube-video",
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
              //isMoveSuccessModal: false,
              createSetModalOpen: false
            }
          })
        );
      }

      let currMoveArr = getState().moveReducer.movesOfSet;
      let finalMoveList = [];
      if (currMoveArr && currMoveArr.length) {
        currMoveArr.map((key, index) => {
          if (key._id === action.payload.moveId) {
            let data = {
              ...key,
              moveURL: result.data.s3VideoUrl,
              videoThumbnail: result.data.videoThumbnail,
              isMoveProcessing: false
            };
            finalMoveList.push(data);
          } else {
            finalMoveList.push(key);
          }
          return true;
        });
      }
      let savingWebm = getState().moveReducer.isSavingWebM;
      let savingVideo = [...savingWebm];
      if (savingVideo && savingVideo.length) {
        savingVideo.map((key, index) => {
          if (key.id === result.data.data._id) {
            savingVideo.splice(index, 1);
          }
          return true;
        });
      }
      dispatch(
        completeVideoEditingSuccess({
          isSavingWebM: savingVideo,
          moveUrlDetails: {
            moveURL: result.data.data.videoUrl,
            setId: result.data.setId,
            videoOriginalFile: result.data.videoOriginalFile,
            videoFileMain: result.data.videoFileMain,
            s3VideoUrl: result.data.s3VideoUrl
          },
          movesOfSet: finalMoveList
        })
      );
      // let temp = getState().moveReducer.isMoveDone;
      // if (temp) {
      //   dispatch(
      //     removeVideoLocalServerRequest({
      //       videoOriginalFile: result.data.videoOriginalFile,
      //       videoFileMain: result.data.videoFileMain,
      //       setId: result.data.setId
      //     })
      //   );
      // }
      done();
    }
  }
});

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
      {
        moveId: action.payload ? action.payload.moveId : null,
        isStarred: action.payload ? action.payload.isStarred : false,
        setId: action.payload ? action.payload.setId : null
      }
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      done();
      return;
    } else {
      // if (!toast.isActive(toastId)) {
      //   toastId = toast.success(result.messages[0]);
      // }
      if (action.payload.isSearch) {
        dispatch(getMoveBySearchRequest({ search: action.payload.isSearch }));
      }
      if (action.payload && action.payload.moveofSetList) {
        dispatch(
          starredMovesSuccess({
            moveofSetList: action.payload.moveofSetList,
            index: action.payload.index
          })
        );
      } else {
        if (!toast.isActive(toastId)) {
          toastId = toast.success(result.messages[0]);
        }
        dispatch(
          starredMovesSuccess({
            videoData: action.payload.videoData
          })
        );
      }
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
      dispatch(
        modelOpenRequest({
          modelDetails: {
            isVideoModalOpenReq: false,
            isVideoModalOpen: false
          }
        })
      );
      if (!action.payload.isSearch) {
        dispatch(
          getMovesOfSetRequest({
            setId: action.payload.setId,
            isMoveList: true
          })
        );
        dispatch(
          modelOpenRequest({
            modelDetails: {
              isVideoModalOpenReq: false,
              isVideoModalOpen: false
            }
          })
        );
        dispatch(getSetDetailsRequest({ setId: action.payload.setId }));
        dispatch(getAllSetRequest({ isSetNoLimit: false }));
      } else {
        dispatch(getMoveBySearchRequest({ search: action.payload.isSearch }));
      }
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
            transferToModalOpenReq: false,
            transferMoveModalOpen: false,
            isVideoModalOpen: false,
            isVideoModalOpenReq: false,
            transferMoveModalOpenReq: false
          }
        })
      );

      if (!action.payload.fromMoveSearch || !action.payload.isSearch) {
        dispatch(
          getMovesOfSetRequest({
            setId: action.payload.previousSetId,
            page: 1,
            isInfiniteScroll: false,
            isMoveList: true
          })
        );
        dispatch(getSetDetailsRequest({ setId: action.payload.previousSetId }));
      } else {
        dispatch(getMoveBySearchRequest({ search: action.payload.isSearch }));
      }
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
      // dispatch(
      //   redirectTo({
      //     path: `${AppRoutes.MOVE_DETAILS.url.replace(
      //       ":id",
      //       result.data.moveId
      //     )}`
      //   })
      // );

      dispatch(
        redirectTo({
          path: `${AppRoutes.MOVE_DETAILS.url.replace(
            ":id",
            result.data.moveId
          )}`
        })
      );
      dispatch(
        createAnotherMoveSuccess({
          moveDetails: result.data,
          creatingAnother: {
            newMoveId: "",
            isCreateAnother: false
          }
        })
      );

      dispatch(
        modelOpenRequest({
          modelDetails: {
            isMoveSuccessModal: false
          }
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
          movesOfSet: result.data.data,
          totalMoves: result.data.totalMoves
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
      {
        data: action.payload.data
      }
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
      if (action.payload.data.fromMoveList) {
        dispatch(addTagsSuccess({ movesOfSet: action.payload.moveList }));
      } else {
        dispatch(
          addTagsSuccess({
            videoData: action.payload.moveVideo,
            movesOfSet: action.payload.moveData
          })
        );
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
    dispatch(
      updateSortIndexSuccess({
        movesOfSet: action.payload.movesOfSet
      })
    );
    let api = new ApiHelper();
    dispatch(
      updateSortIndexSuccess({
        movesOfSet: action.payload.movesOfSet
      })
    );
    await api.FetchFromServer(
      "move",
      "/sort-index-update",
      "PUT",
      true,
      undefined,
      action.payload
    );
    done();
  }
});

//Edit moves
const editMoveLogic = createLogic({
  type: MovesAction.UPDATE_MOVE_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/update-move",
      "PUT",
      true,
      undefined,
      action.payload.data
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
      if (action.payload.data.fromMoveList) {
        dispatch(updateMoveSuccess({ movesOfSet: action.payload.moveList }));
      } else {
        console.log("Comment videoData for testing");
        dispatch(
          updateMoveSuccess({
            //             videoData: action.payload.moveVideo,
            movesOfSet: action.payload.moveData
          })
        );
      }
      dispatch(
        modelOpenRequest({
          modelDetails: {
            editMoveModalOpen: false
            // isVideoModalOpen: false,
            // isVideoModalOpenReq: false
          }
        })
      );
      // dispatch(getMovesOfSetRequest({ setId: action.payload.setId }));
      done();
    }
  }
});

// Get Moves By Search
const getMovesBySearchLogic = createLogic({
  type: MovesAction.GET_MOVE_BY_SEARCH_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/get-move-by-search",
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
        getMoveBySearchSuccess({
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

//Add Tags In TagModal
const addTagsInModalLogic = createLogic({
  type: MovesAction.ADD_TAGS_IN_TAGMODAL_REQUEST,
  async process({ action, getState }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/add-tags",
      "PUT",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      done();
      return;
    } else {
      let tags = getState().moveReducer.tagsList;
      dispatch(
        addTagsInTagModalSuccess({
          tagsList: [...tags, action.payload.tags]
        })
      );
      done();
    }
  }
});

// Get Tags List
const getTagListRequestLogic = createLogic({
  type: MovesAction.GET_TAG_LIST_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "move",
      "/get-tag-list",
      "GET",
      true
    );
    if (result.isError) {
      done();
      return;
    } else {
      dispatch(
        getTagListSuccess({
          tagsList: result.data.data
        })
      );
      done();
    }
  }
});

//Cancel Video upload
const videoCancelRequestLogic = createLogic({
  type: MovesAction.VIDEO_CANCEL_REQUEST,
  async process({ action }, dispatch, done) {
    api.cancelRequest("cancel");
    if (!toast.isActive(toastId)) {
      toastId = toast.success("Move Request Canceled successfully!");
    }
    dispatch(
      videoCancelSuccess({
        cancelVideo: true
      })
    );
    done();
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
  updateSortIndexLogic,
  editMoveLogic,
  getMovesBySearchLogic,
  addTagsInModalLogic,
  getTagListRequestLogic,
  videoCancelRequestLogic,
  completeYouTubeVideoEditingLogic
];
