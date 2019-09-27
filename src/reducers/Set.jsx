import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: "",
  recentSetAdded: "",
  setListinFolder: ""
};
export const setReducer = handleActions(
  {
    [SetsAction.GET_ALL_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      allSetList: payload.allSetList
    }),
    [SetsAction.CREATE_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      recentSetAdded: payload.setData
    }),
    [SetsAction.GET_FOLDER_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      setListinFolder: payload.setListinFolder
    })
  },
  initialState
);
