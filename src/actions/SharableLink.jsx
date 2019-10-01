import { createAction } from "redux-actions";
export const SharableLinkAction = {
  PUBLIC_ACCESS_REQUEST: "Public Access Request",
  PUBLIC_ACCESS_SUCCESS: "Public Access Success",
  SHAREABLE_LINK_REQUEST: "Shareable Link Request",
  SHAREABLE_LINK_SUCCESS: "Shareable Link Success",
  GET_PUBLIC_URL_FOR_FOLDER_REQUEST: "Get Public Url For Folder Request",
  GET_PUBLIC_URL_FOR_FOLDER_SUCCESS: "Get Public Url For Folder Success",
  PUBLIC_URL_SET_DETAILS_REQUEST: "Get Public Url Set Details Request",
  PUBLIC_URL_SET_DETAILS_SUCCESS: "Get Public Url Set Details Success"
};
export const publicAccessRequest = createAction(
  SharableLinkAction.PUBLIC_ACCESS_REQUEST
);
export const publicAccessSuccess = createAction(
  SharableLinkAction.PUBLIC_ACCESS_SUCCESS
);
export const shareableLinkRequest = createAction(
  SharableLinkAction.SHAREABLE_LINK_REQUEST
);
export const shareableLinkSuccess = createAction(
  SharableLinkAction.SHAREABLE_LINK_SUCCESS
);
export const sharedFolderInfoRequest = createAction(
  SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_REQUEST
);
export const sharedFolderInfoSuccess = createAction(
  SharableLinkAction.GET_PUBLIC_URL_FOR_FOLDER_SUCCESS
);
export const publicUrlSetDetailsRequest = createAction(
  SharableLinkAction.PUBLIC_URL_SET_DETAILS_REQUEST
);
export const publicUrlSetDetailsSuccess = createAction(
  SharableLinkAction.PUBLIC_URL_SET_DETAILS_SUCCESS
);