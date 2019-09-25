import { handleActions } from "redux-actions";
import { FolderAction } from "../actions";
const initialState = {
  getFolder: "",
};
export const getFolderReducer = handleActions(
  {
    [FolderAction.GET_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
