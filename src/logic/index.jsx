import { createLogic } from "redux-logic";
import { push } from "react-router-redux";

import { LoginLogics } from "./Login.jsx";
import { SignupLogics } from "./Signup.jsx";
import { profileInfoLogics } from "./profileInfo.jsx";

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
  redirectToLogic
];
