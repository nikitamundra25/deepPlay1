import { createLogic } from "redux-logic";
import { ApiHelper } from "../helper";
import { createSetSuccess, SetsAction, getAllSetSuccess } from "../actions";
import { toast } from "react-toastify";

//  Create sets
const createSetLogic = createLogic({
  type: SetsAction.CREATE_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/createSet",
      "POST",
      true,
      undefined,
      action.payload
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      toast.success(result.messages[0]);
      dispatch(
        createSetSuccess({
          showLoader: false
        })
      );
      window.location.href = "./move";
      done();
    }
  }
});

const getAllSetLogic = createLogic({
  type: SetsAction.GET_ALL_SET_REQUEST,
  async process({ action }, dispatch, done) {
    let api = new ApiHelper();
    let result = await api.FetchFromServer(
      "set",
      "/getAllSet",
      "GET",
      true,
      undefined,
      undefined
    );
    if (result.isError) {
      toast.error(result.messages[0]);
      done();
      return;
    } else {
      dispatch(
        getAllSetSuccess({
          showLoader: false,
          allSetList: result.data.result
        })
      );
      done();
    }
  }
});
export const SetLogics = [createSetLogic, getAllSetLogic];
