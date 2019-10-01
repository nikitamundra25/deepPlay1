import { handleActions } from "redux-actions";
import { FolderAction } from "../actions";
const initialState = {
  folderDetails: "",
  getAllFolders: "",
  recentFolders: ""
};
export const getFolderReducer = handleActions(
  {
    [FolderAction.FOLDER_DETAIL_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [FolderAction.GET_ALL_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [FolderAction.RECENT_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    })
  },
  initialState
);
