import { createAction } from "redux-actions";

export * from "./ModalOperation.jsx";
export * from "./Login.jsx";
export * from "./profileInfo.jsx";
export * from "./Signup.jsx"
export * from "./Sets.jsx";
//
export const redirectTo = createAction("REDIRET_TO");
//
export const showLoader = createAction("SHOW_LOADER");
export const hideLoader = createAction("HIDE_LOADER");
