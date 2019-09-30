import { handleActions } from "redux-actions";
import { FolderAction } from "../actions";
const initialState = {
  folderDetails: "",
  getAllFolders: "",
  recentFolders:""
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
    }),
    [FolderAction.RECENT_FOLDER_SUCCESS]: (state,{payload}) => ({
      ...state,
      recentFolders: payload.recentFolders
    })
  },
  initialState
);
