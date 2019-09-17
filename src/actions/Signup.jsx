import { createAction } from 'redux-actions';

export const signupActions = {
    SIGNUP_REQUEST: "Signup Requested!",
    SIGNUP_SUCCESS: "Signup Success!",
    FORGET_PASSWORD_REQUEST: "Forget Password Started!",
    VALIDATE_RESET_REQUEST: "Reset Token Validation Started!",
    RESET_PASSSWORD_REQUEST: "Reset Password Started!",
}

export const signupRequest = createAction(signupActions.SIGNUP_REQUEST);
export const signupSuccess = createAction(signupActions.SIGNUP_SUCCESS);
