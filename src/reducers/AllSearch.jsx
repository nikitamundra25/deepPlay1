import { handleActions } from "redux-actions";
import { AllSearchAction } from "../actions";
const initialState = {
  searchData: "",
  isSearchLoading: false,
};
export const allSearchReducer = handleActions(
  {
    [AllSearchAction.ALL_SEARCH_REQUEST]: (state, { payload }) => ({
      ...state,
      isSearchLoading: true
    }),
    [AllSearchAction.ALL_SEARCH_SUCCESS]: (state, { payload }) => ({
      ...state,
      searchData: payload.searchData,
      isSearchLoading: false
    })
  },
  initialState
);
