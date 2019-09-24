import { handleActions } from "redux-actions";
import { ProfileAction } from "../actions";

const initialState = {
  profileInfo: "",
  profileImage: ""
};

export const profileInfoReducer = handleActions(
  {
    [ProfileAction.PROFILEINFO_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileInfo: payload.profileInfo
    })
  },
  {
    [ProfileAction.UPLOAD_IMAGE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileImage: payload.imageDetails
    })
  },
  initialState
);

export const profileImage = handleActions(
  {
    [ProfileAction.UPLOAD_IMAGE_SUCCESS]: (state, { payload }) => ({
      ...state,
      profileImage: payload.imageDetails
    })
  },
  initialState
);
