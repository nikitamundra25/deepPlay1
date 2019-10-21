import { createAction } from "redux-actions";

export const AllSearchAction = {
    ALL_SEARCH_REQUEST: "Get All Search Request",
    ALL_SEARCH_SUCCESS: "Get All Search Success",
};

export const allSearchRequest = createAction(AllSearchAction.ALL_SEARCH_REQUEST);
export const allSearchSuccess = createAction(AllSearchAction.ALL_SEARCH_SUCCESS);
