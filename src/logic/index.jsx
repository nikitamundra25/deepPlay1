import { createLogic } from "redux-logic";
import { push } from "react-router-redux";

import { LoginLogics } from "./Login.jsx";
import { SignupLogics } from "./Signup.jsx";
import { profileInfoLogics } from "./userInfo";
import { SetLogics } from "./sets";
import { FolderLogics } from "./Folder";
import { MoveLogics } from "./Moves";
import { SharableLinkLogics } from "./SharableLink";

export const redirectToLogic = createLogic({
  type: "REDIRET_TO",
  async process({ action }, dispatch, done) {
    dispatch(push(action.payload.path));
    done();
  }
});

export default [
  ...LoginLogics,
  ...SignupLogics,
  ...profileInfoLogics,
  ...SetLogics,
  ...FolderLogics,
  ...MoveLogics,
  ...SharableLinkLogics,
  redirectToLogic
];
