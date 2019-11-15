import { ValidationTypes } from "js-object-validation";

export const SingupValidations = {
  firstName: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 50
  },
  lastName: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 50
  },
  email: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EMAIL]: true,
    [ValidationTypes.MAXLENGTH]: 100
  },
  password: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MINLENGTH]: 6,
    [ValidationTypes.MAXLENGTH]: 20
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.EQUAL]: "password"
  }
};

export const SingupValidationsMessaages = {
  firstName: {
    [ValidationTypes.REQUIRED]: "Please enter first name.",
    [ValidationTypes.MAXLENGTH]:
      "First name cannot have more than 50 characters."
  },
  lastName: {
    [ValidationTypes.REQUIRED]: "Please enter last name.",
    [ValidationTypes.MAXLENGTH]:
      "Last name cannot have more than 50 characters."
  },
  email: {
    [ValidationTypes.REQUIRED]: "Please enter email.",
    [ValidationTypes.EMAIL]: "Please enter a valid email.",
    [ValidationTypes.MAXLENGTH]: "Email cannot have more than 100 characters."
  },
  password: {
    [ValidationTypes.REQUIRED]: "Please enter password.",
    [ValidationTypes.MINLENGTH]: "Please enter atleast 6 characters.",
    [ValidationTypes.MAXLENGTH]: "Password cannot have more than 20 characters."
  },
  confirmPassword: {
    [ValidationTypes.REQUIRED]: "Please enter confirm password.",
    [ValidationTypes.EQUAL]: "Password and confirm password didn't match."
  }
};

// Validations for title & description

export const CreateFolderValidations = {
  title: {
    [ValidationTypes.REQUIRED]: true,
    [ValidationTypes.MAXLENGTH]: 50,
    [ValidationTypes.MINLENGTH]: 2
  },
  description: {
    [ValidationTypes.MAXLENGTH]: 250
  }
};
export const CreateFolderValidationsMessaages = {
  title: {
    [ValidationTypes.REQUIRED]: "Please enter title.",
    [ValidationTypes.MINLENGTH]: "Please enter atleast 2 characters.",
    [ValidationTypes.MAXLENGTH]: "Title cannot have more than 50 characters"
  },
  description: {
    [ValidationTypes.MAXLENGTH]:
      "Description cannot have more than 250 characters"
  }
};
