import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  ProfileAction,
  profileSuccess,
  uploadImageSuccess,
  showLoader,
  hideLoader,
  modelOpenRequest,
  uploadImageFailed,
  updateProfileSuccess
} from "../actions";
import { AppRoutes } from "../config/AppRoutes";
import { toast } from "react-toastify";
let toastId = null;
let api = new ApiHelper();
/**
 *
 */
//  get user info
const profileInfoLogic = createLogic({
  type: ProfileAction.PROFILEINFO_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    dispatch(showLoader());
    let result = await api.FetchFromServer(
      "user",
      "/getProfileInfo",
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
        profileSuccess({
          showLoader: false,
          profileInfo: result.data.result
        })
      );
      done();
    }
  }
});
/**
 *
 */
//update user info
const UpdateUserDataLogic = createLogic({
  type: ProfileAction.UPDATEPROFILEINFO_REQUEST,
  async process({ action, getState }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "user",
      "/updateUserData",
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
      let temp = getState().profileInfoReducer.profileInfo;
      if (!action.payload.accountType) {
        temp = {
          ...temp,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName
        };
        dispatch(updateProfileSuccess({ profileInfo: temp }));
        if (!toast.isActive(toastId)) {
          toastId = toast.success(result.messages[0]);
        }
      } else {
        temp = { ...temp, roleType: action.payload.roleType };
        dispatch(updateProfileSuccess({ profileInfo: temp }));
      }
      done();
    }
  }
});

//Delete user account
const DeleteUserAccountLogic = createLogic({
  type: ProfileAction.DELETE_USER_ACCOUNT_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "user",
      "/userAccountDelete",
      "DELETE",
      true,
      undefined
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
      localStorage.removeItem("token");
      window.location.href = AppRoutes.HOME_PAGE.url;
      done();
    }
  }
});

const uploadImageLogic = createLogic({
  type: ProfileAction.UPLOAD_IMAGE_REQUEST,
  async process({ action }, dispatch, done) {
    // const config = {
    //   onUploadProgress: function(progressEvent) {
    //     var percentCompleted = Math.round(
    //       (progressEvent.loaded * 100) / progressEvent.total
    //     );
    //     console.log("nikkkkkkkkkkkkuuuuuuu", percentCompleted);
    //   }
    // };

    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "user",
      "/uploadFiles",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      if (!toast.isActive(toastId)) {
        toastId = toast.error(result.messages[0]);
      }
      dispatch(uploadImageFailed());
      done();
      return;
    } else {
      if (!toast.isActive(toastId)) {
        toastId = toast.success(result.messages[0]);
      }
      dispatch(
        uploadImageSuccess({
          imageDetails: {
            profileThumbnail: result.data.profileThumbnail,
            profileImage: result.data.profileImage
            // profileInfo: result.data.profileThumbnail
          }
        })
      );
      dispatch(
        modelOpenRequest({
          modelDetails: {
            uploadImageModalOpen: false
          }
        })
      );
      done();
    }
  }
});

const CancelImageUploadLogic = createLogic({
  type: ProfileAction.CANCEL_IMAGE_UPLOAD,
  async process({ action }, dispatch, done) {
    api.cancelRequest("cancel");
    if (!toast.isActive(toastId)) {
      toastId = toast.success("Image upload request canceled successfully!");
    }
    done();
  }
});
export const profileInfoLogics = [
  profileInfoLogic,
  UpdateUserDataLogic,
  DeleteUserAccountLogic,
  uploadImageLogic,
  CancelImageUploadLogic
];
