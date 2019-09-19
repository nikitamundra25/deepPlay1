import { handleActions } from "redux-actions";
import { modelActions } from "../actions/index.jsx";

const initialAuthState = {
  modelDetails: {
    loginModelOpen: false,
    signupModelOpen: false,
    forgotPasswordModalOpen: false
  }
};

export const modelInfoReducer = handleActions(
  {
    [modelActions.MODEL_OPEN_REQUEST]: (state, action) => ({
      ...state,
      modelDetails: {
        ...state.modelDetails,
        ...action.payload.modelDetails
      },
    }),
    [modelActions.MODEL_CLOSE_REQUEST]: (state, action) => ({
      ...state,
      modelDetails: {
        ...state.modelDetails,
        ...action.payload.modelDetails
      }
    })
  },
  initialAuthState
);
