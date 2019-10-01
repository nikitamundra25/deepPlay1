import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: "",
  recentSetAdded: "",
  setListinFolder: "",
  recentSets: "",
  setDetails: "",
  isSetDetailsLoading: false
};
export const setReducer = handleActions(
  {
    [SetsAction.GET_ALL_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [SetsAction.CREATE_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      recentSetAdded: payload.setData
    }),
    [SetsAction.GET_FOLDER_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [SetsAction.RECENT_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
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
