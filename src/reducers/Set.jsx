import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: "",
  recentSetAdded: "",
  setListinFolder: "",
  recentSets: "",
  setDetails: "",
  isSetListLoading: false,
  isFolderSetLoading: false,
  isRecentSetLoading: false,
  isSetDetailsLoading: false
};
export const setReducer = handleActions(
  {
    [SetsAction.GET_ALL_SET_REQUEST]: (state, { payload }) => ({
      ...state,
      isSetListLoading: true
    }),
    [SetsAction.GET_ALL_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isSetListLoading: false
    }),
    [SetsAction.CREATE_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      recentSetAdded: payload.setData
    }),
    [SetsAction.GET_FOLDER_SET_REQUEST]: (state, { payload }) => ({
      ...state,
      isFolderSetLoading: true
    }),
    [SetsAction.GET_FOLDER_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isFolderSetLoading: false
    }),
    [SetsAction.RECENT_SET_REQUEST]: (state, { payload }) => ({
      ...state,
      isRecentSetLoading: true
    }),
    [SetsAction.RECENT_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isRecentSetLoading: false
    }),
    [SetsAction.GET_SET_DETAILS_REQUEST]: (state, { payload }) => ({
      ...state,
      isSetDetailsLoading: true
    }),
    [SetsAction.GET_SET_DETAILS_SUCCESS]: (state, { payload }) => ({
      ...state,
      setDetails: payload.setDetails,
      isSetDetailsLoading: false
    })
  },
  initialState
);
