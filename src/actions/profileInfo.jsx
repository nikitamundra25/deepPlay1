import { createAction } from "redux-actions";
export const ProfileAction = {
  PROFILEINFO_REQUEST: "Get User Profile Request",
  PROFILEINFO_SUCCESS: "Get User Profile Success",
  PROFILEINFO_FAILURE: "Get User Profile Failure",
  UPDATEPROFILEINFO_REQUEST: "Update Profile Request",
  UPDATEPROFILEINFO_SUCCESS: "Update Profile Success",
  DELETE_USER_ACCOUNT_REQUEST: "Delete User Account Request",
  DELETE_USER_ACCOUNT_SUCCESS: "Delete User Account Success",
  UPLOAD_IMAGE_REQUEST: "Upload User Profile Image Request",
  UPLOAD_IMAGE_SUCCESS: "Upload User Profile Image Success",
  UPLOAD_IMAGE_FAILED: "Upload User Profile Image failed!",
  CANCEL_IMAGE_UPLOAD: "Cancel Image Upload"
};

export const cancelProfileRequest = createAction(ProfileAction.CANCEL_IMAGE_UPLOAD);
export const profileRequest = createAction(ProfileAction.PROFILEINFO_REQUEST);
export const profileSuccess = createAction(ProfileAction.PROFILEINFO_SUCCESS);
export const updateProfileRequest = createAction(
  ProfileAction.UPDATEPROFILEINFO_REQUEST
);
export const updateProfileSuccess = createAction(
  ProfileAction.UPDATEPROFILEINFO_SUCCESS
);
export const deleteUserAccountRequest = createAction(
  ProfileAction.DELETE_USER_ACCOUNT_REQUEST
);
export const deleteUserAccountSuccess = createAction(
  ProfileAction.DELETE_USER_ACCOUNT_SUCCESS
);
export const uploadImageRequest = createAction(
  ProfileAction.UPLOAD_IMAGE_REQUEST
);
export const uploadImageSuccess = createAction(
  ProfileAction.UPLOAD_IMAGE_SUCCESS
);
export const uploadImageFailed = createAction(
  ProfileAction.UPLOAD_IMAGE_FAILED
);
