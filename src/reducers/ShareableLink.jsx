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
  totalSets: 0,
  isShareableUrl: false,
  accessDenied: false
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
      ...payload,
      isShareableUrl: true
    }),
    [SharableLinkAction.PUBLIC_URL_SET_DETAILS_REQUEST]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isSetDetailsLoading: true,
      isShareableUrl: true
    }),
    [SharableLinkAction.PUBLIC_URL_SET_DETAILS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isSetDetailsLoading: false,
      isShareableUrl: true
    }),
    [SharableLinkAction.GET_PUBLIC_URL_FOR_SET_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isShareableUrl: true
    }),
    [SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_REQUEST]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      isMoveDetailsLoading: false,
      isShareableUrl: true
    }),
    [SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_SUCCESS]: (
      state,
      { payload }
    ) => ({
      ...state,
      ...payload,
      publicUrlmoveDetails: payload.isInfiniteScroll
        ? [...state.publicUrlmoveDetails, ...payload.publicUrlmoveDetails]
        : payload.publicUrlmoveDetails,
      isMoveDetailsLoading: false,
      isShareableUrl: true
    }),
    [SharableLinkAction.IS_CHANGE_HEADER_REQUEST]: (state, { payload }) => ({
      ...state,
      isShareableUrl: false
    })
  },
  initialState
);
