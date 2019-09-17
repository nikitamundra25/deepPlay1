import { handleActions } from "redux-actions";
import { ProfileAction } from "./../actions";

const initialState = {
  profileInfo: ""
};

export const profileInfoReducer = handleActions(
  {
    [ProfileAction.PROFILEINFO_SUCCESS]: (state, { payload }) => ({
      profileInfo: payload.profileInfo
    })
  },
  initialState
);
