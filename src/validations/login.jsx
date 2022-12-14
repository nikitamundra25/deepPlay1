import { ValidationTypes } from "js-object-validation";

export const LoginValidations = {
  email: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EMAIL]: true,
    [ValidationTypes.MAXLENGTH]: 100
  },
  password: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 20,
    [ValidationTypes.MINLENGTH]: 6
  }
};

export const LoginValidationsMessaages = {
  email: {
    [ValidationTypes.REQUIRED]: "Please enter email.",
    [ValidationTypes.EMAIL]: "Please enter a valid email.",
    [ValidationTypes.MAXLENGTH]: "Email cannot have more than 100 characters."
  },
  password: {
    [ValidationTypes.REQUIRED]: "Please enter password.",
    [ValidationTypes.MAXLENGTH]: "Password cannot have more than 20 characters",
    [ValidationTypes.MINLENGTH]: "Please enter atleast 6 characters."
  }
};

export const ForgetPasswordValidations = {
  email: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EMAIL]: true,
    [ValidationTypes.MAXLENGTH]: 100
  }
};

export const ForgetPasswordValidationsMessaages = {
  email: {
    [ValidationTypes.REQUIRED]: "Please enter email.",
    [ValidationTypes.EMAIL]: "Please enter a valid email.",
    [ValidationTypes.MAXLENGTH]: "Email cannot have more than 100 characters."
  }
};

export const ResetPasswordValidations = {
  password: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 20,
    [ValidationTypes.MINLENGTH]: 6
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EQUAL]: "password"
  }
};

export const ResetPasswordValidationsMessaages = {
  password: {
    [ValidationTypes.REQUIRED]: "Please enter password.",
    [ValidationTypes.MINLENGTH]: "Please enter atleast 6 characters.",
    [ValidationTypes.MAXLENGTH]: "Password cannot have more than 20 characters"
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: "Please enter confirm password.",
    [ValidationTypes.EQUAL]: "Password and confirm password didn't match."
  }
};

export const ChangePasswordValidations = {
  oldPassword: {
    [ValidationTypes.REQUIRED]: true
  },
  newPassword: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 20,
    [ValidationTypes.MINLENGTH]: 6
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EQUAL]: "newPassword"
  }
};
export const ChangePasswordValidationsMessaages = {
  oldPassword: {
    [ValidationTypes.REQUIRED]: "Please enter old password."
  },
  newPassword: {
    [ValidationTypes.REQUIRED]: "Please enter new password.",
    [ValidationTypes.MINLENGTH]: "Please enter atleast 6 characters.",
    [ValidationTypes.MAXLENGTH]: "Password cannot have more than 20 characters"
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: "Please enter confirm password.",
    [ValidationTypes.EQUAL]: "New password and confirm password didn't match."
  }
};
