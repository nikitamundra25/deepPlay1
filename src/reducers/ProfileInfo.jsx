import { handleActions } from "redux-actions";
import { ProfileAction } from "../actions";

const initialState = {
  profileInfo: "",
  profileImage: "",
  isImageUploading: false
};

export const profileInfoReducer = handleActions(
  {
    [ProfileAction.PROFILEINFO_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileInfo: payload.profileInfo
    }),
    [ProfileAction.UPLOAD_IMAGE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileInfo: {
        ...state.profileInfo,
        profileImage: payload.imageDetails.profileThumbnail
      }
    })
  },
  initialState
);

export const profileImage = handleActions(
  {
    [ProfileAction.UPLOAD_IMAGE_REQUEST]: (state, { payload }) => ({
      ...state,
      isImageUploading: true
    }),
    [ProfileAction.UPLOAD_IMAGE_FAILED]: (state, { payload }) => ({
      ...state,
      isImageUploading: false
    }),
    [ProfileAction.UPLOAD_IMAGE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileImage: payload.imageDetails,
      isImageUploading: false
    })
  },
  initialState
);
