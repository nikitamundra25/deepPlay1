import { handleActions } from "redux-actions";
import { SharableLinkAction } from "../actions";
const initialState = {
  userEncryptedInfo: "",
  decryptedDetails: "",
  decryptedSetDetails: "",
  publicUrlSetDetails: [],
  isSetDetailsLoading: false,
  publicUrlMoveDetails: [],
  isMoveDetailsLoading: false,
  totalSets: 0
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
    [SharableLinkAction.PUBLIC_URL_SET_DETAILS_REQUEST]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isSetDetailsLoading: true
    }),
    [SharableLinkAction.PUBLIC_URL_SET_DETAILS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isSetDetailsLoading: false
    }),
    [SharableLinkAction.GET_PUBLIC_URL_FOR_SET_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload
    }),
    [SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_REQUEST]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isMoveDetailsLoading: true
    }),
    [SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isMoveDetailsLoading: false
    })
  },
  initialState
);
