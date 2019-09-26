import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: "",
  setListinFolder: ""
};
export const getAllSetReducer = handleActions(
  {
    [SetsAction.GET_ALL_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      allSetList: payload.allSetList
    }),

    [SetsAction.GET_FOLDER_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      setListinFolder: payload.setListinFolder
    })
  },
  initialState
);
