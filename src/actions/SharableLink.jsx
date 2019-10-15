import { createAction } from "redux-actions";
export const SharableLinkAction = {
  PUBLIC_ACCESS_REQUEST: "Public Access Request",
  PUBLIC_ACCESS_SUCCESS: "Public Access Success",

  SHAREABLE_LINK_REQUEST: "Shareable Link Request",
  SHAREABLE_LINK_SUCCESS: "Shareable Link Success",

  GET_PUBLIC_URL_FOR_FOLDER_REQUEST: "Get Public Url For Folder Request",
  GET_PUBLIC_URL_FOR_FOLDER_SUCCESS: "Get Public Url For Folder Success",

  PUBLIC_URL_SET_DETAILS_REQUEST: "Get Public Url Set Details Request",
  PUBLIC_URL_SET_DETAILS_SUCCESS: "Get Public Url Set Details Success",

  GET_PUBLIC_URL_FOR_SET_REQUEST: "Get Public Url For Set Request",
  GET_PUBLIC_URL_FOR_SET_SUCCESS: "Get Public Url For Set Success",
  
  PUBLIC_URL_MOVE_DETAILS_REQUEST: "Get Public Url Move Details Request",
  PUBLIC_URL_MOVE_DETAILS_SUCCESS: "Get Public Url Move Details Success"
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

//---------- Public url folder component---------------
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

//---------- Public url set component---------------
export const sharedSetInfoRequest = createAction(
  SharableLinkAction.GET_PUBLIC_URL_FOR_SET_REQUEST
);
export const sharedSetInfoSuccess = createAction(
  SharableLinkAction.GET_PUBLIC_URL_FOR_SET_SUCCESS
);
export const publicUrlMoveDetailsRequest = createAction(
  SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_REQUEST
);
export const publicUrlMoveDetailsSuccess = createAction(
  SharableLinkAction.PUBLIC_URL_MOVE_DETAILS_SUCCESS
);
