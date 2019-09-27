import { handleActions } from "redux-actions";
import { FolderAction } from "../actions";
const initialState = {
  folderDetails: "",
  getAllFolders: ""
};
export const getFolderReducer = handleActions(
  {
    [FolderAction.FOLDER_DETAIL_SUCCESS]: (state, { payload }) => ({
      ...state,
      folderDetails: payload.folderDetails
    }),
    [FolderAction.GET_ALL_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      getAllFolders: payload.getAllFolders
    })
  },
  initialState
);
