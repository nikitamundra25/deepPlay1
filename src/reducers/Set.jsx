import { handleActions } from "redux-actions";
import { SetsAction } from "../actions";
const initialState = {
  allSetList: ""
};
export const getAllSetReducer = handleActions(
  {
    [SetsAction.GET_ALL_SET_SUCCESS]: (state, { payload }) => ({
      ...state,
      allSetList: payload.allSetList
    })
  },
  initialState
);
