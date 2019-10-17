import { handleActions } from "redux-actions";
import { FolderAction } from "../actions";
const initialState = {
  folderDetails: "",
  getAllFolders: "",
  recentFolders: "",
  isFolderLoading: false,
  isRecentFolderLoading: false,
  totalFolders: 0
};
export const getFolderReducer = handleActions(
  {
    [FolderAction.FOLDER_DETAIL_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload
    }),
    [FolderAction.GET_ALL_FOLDER_REQUEST]: (state, { payload }) => ({
      ...state,
      isFolderLoading: true
    }),
    [FolderAction.GET_ALL_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isFolderLoading: false
    }),
    [FolderAction.RECENT_FOLDER_REQUEST]: (state, { payload }) => ({
      ...state,
      isRecentFolderLoading: true
    }),
    [FolderAction.RECENT_FOLDER_SUCCESS]: (state, { payload }) => ({
      ...state,
      ...payload,
      isRecentFolderLoading: false
    })
  },
  initialState
);
