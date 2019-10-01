import { handleActions } from "redux-actions";
import { SharableLinkAction } from "../actions";
const initialState = {
  userEncryptedInfo: "",
  decryptedFolderDetails: "",
  publicUrlSetDetails: []
};
export const shareLinkReducer = handleActions(
  {
    [SharableLinkAction.SHAREABLE_LINK_SUCCESS]: (state, { payload }) => ({
      ...state,
      userEncryptedInfo: payload.userEncryptedInfo
    }),
    [SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload
    }),
    [SharableLinkAction.PUBLIC_URL_SET_DETAILS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
