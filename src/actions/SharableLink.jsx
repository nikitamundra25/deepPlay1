import { createAction } from "redux-actions";
export const SharableLinkAction = {
  PUBLIC_ACCESS_REQUEST: "Public Access Request",
  PUBLIC_ACCESS_SUCCESS: "Public Access Success"
};
export const publicAccessRequest = createAction(
  SharableLinkAction.PUBLIC_ACCESS_REQUEST
);
export const publicAccessSuccess = createAction(
  SharableLinkAction.PUBLIC_ACCESS_SUCCESS
);
