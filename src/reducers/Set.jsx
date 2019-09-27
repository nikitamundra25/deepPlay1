import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: "",
  recentSetAdded:""
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
    })
  },
  initialState
);
