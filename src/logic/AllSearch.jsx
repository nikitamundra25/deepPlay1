import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import {
  AllSearchAction,
  allSearchSuccess
} from "../actions";
import { toast } from "react-toastify";

// Get All Search data for for search params 
const getAllSearchDataLogic = createLogic({
  type: AllSearchAction.ALL_SEARCH_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "search",
      "/all-search",
      "GET",
      true,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      dispatch(allSearchSuccess({ searchData: []}));
      done();
      return;
    } else {
      dispatch(allSearchSuccess({ searchData: result.data.data }));
      done();
    }
  }
});

export const AllSearchLogics = [
  getAllSearchDataLogic
]