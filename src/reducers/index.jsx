import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { routerReducer } from "react-router-redux";

import { modelInfoReducer } from "./ModelOperation.jsx";
import { loginReducer } from "./Login.jsx";
import { profileInfoReducer, profileImage } from "./ProfileInfo.jsx";
import { setReducer } from "./Set";
import { getFolderReducer } from "./Folder";
import { moveReducer } from "./Moves";
import { shareLinkReducer } from "./ShareableLink";
import { allSearchReducer } from "./AllSearch";
export const mainReducer = handleActions(
  {
    SHOW_LOADER: (state, action) => ({
      showLoader: true
    }),
    HIDE_LOADER: (state, action) => ({
      showLoader: false
    })
  },
  {
    showLoader: false
  }
);
/**
 *
 */
const AppReducer = combineReducers({
  mainReducer,
  modelInfoReducer,
  loginReducer,
  profileInfoReducer,
  setReducer,
  getFolderReducer,
  profileImage,
  moveReducer,
  shareLinkReducer,
  allSearchReducer,
  routing: routerReducer
});

export default AppReducer;
