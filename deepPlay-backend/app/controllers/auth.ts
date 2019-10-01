import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserModel } from "../models";
import {
  GenerateToken,
  ValidationFormatter,
  encryptPassword,
  Email,
  AvailiableTemplates,
  encrypt,
  decrypt
} from "../common";
import { IUser } from "../interfaces"
import { comparePassword } from "../common/password"
import { webURL } from "../config/app"
import { ValidationError, Result, validationResult } from "express-validator";

/* Title:- Login For User
Prams:- email and password 
Created By:- Rishabh Bula*/

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { email, password } = body;
    const result: Document | null | any = await UserModel.findOne({
      email,
      isDeleted: false
    }).select("firstName lastName email password");
    if (result === null) {
      return res.status(400).json({
        message: "User not found."
      });
    }
    if (result.password) {
      if (!comparePassword(password, result.password)) {
        return res.status(400).json({
          message: "Password didn't match."
        });
      }
    } else {
      return res.status(400).json({
        message: "Password didn't match."
      });
    }

    const token = await GenerateToken({
      id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.lastName,
      role: result.roleType
    });
    delete result.password;
    return res.status(200).send({
      token: token,
      userData: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

/* Title:- Login For Admin
Prams:- email and password 
Created By:- Rishabh Bula*/

const adminLogin = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { email, password } = body;
    const result: Document | null | any = await UserModel.findOne({
      email,
      isDeleted: false,
      roleType: "admin"
    }).select("firstName lastName email password");
    if (result === null) {
      return res.status(400).json({
        message: "User not found."
      });
    }
    if (result.password) {
      if (!comparePassword(password, result.password)) {
        return res.status(400).json({
          message: "Password didn't match."
        });
      }
    } else {
      return res.status(400).json({
        message: "Password didn't match."
      });
    }

    const token = await GenerateToken({
      id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.lastName,
      role: result.roleType
    });
    delete result.password;
    return res.status(200).send({
      token: token,
      userData: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

/* Title:- Signup For User
Prams:- email,password,firstName,lastName,profileImage,roleType 
Created By:- Rishabh Bula*/

const signup = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    body.password = encryptPassword(body.password);
    const result: Document | null | any = await UserModel.findOne({
      email: body.email
    });
    if (result) {
      return res.status(400).json({
        message: "Email already exist",
        success: false
      });
    } else {
      const userData: IUser = {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        password: body.password,
        salt: "",
        loggedInIp: "",
        loggedInAt: new Date(),
        profileImage: body.profileImage || "",
        createdAt: new Date(),
        isDeleted: false,
        updatedAt: new Date(),
        verifyToken: "",
        roleType: body.roleType || "isUnclassified",
        status: true
      };
      const userResult: Document | any = new UserModel(userData);
      await userResult.save();

      const token = await GenerateToken({
        id: userResult._id,
        firstName: userResult.firstName,
        lastName: userResult.lastName,
        email: userResult.lastName,
        role: userResult.roleType
      });

      const emailVar = new Email(req);
      await emailVar.setTemplate(AvailiableTemplates.SIGNUP_CONFIRM, {
        firstName: userResult.firstName,
        lastName: userResult.lastName,
      });
      await emailVar.sendEmail(body.email);
      return res.status(200).json({
        message: "User added successfully.",
        token: token,
        userData: userResult,
        success: true
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

/* Title:- Social Signup For User
Prams:- accessToken,email,firstName,lastName
Created By:- Rishabh Bula */

const socialSignup = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    if (body.accessToken) {
      const userData: Document | null = await UserModel.findOne({
        email: body.email
      });
      if (!userData) {
        const userSignup: IUser = {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: "",
          salt: "",
          loggedInIp: "",
          loggedInAt: new Date(),
          profileImage: body.profileImage || "",
          createdAt: new Date(),
          isDeleted: false,
          updatedAt: new Date(),
          verifyToken: "",
          roleType: "isUnclassified",
          status: true
        };
        const userResult: Document | any = new UserModel(userSignup);
        await userResult.save();

        const token = await GenerateToken({
          id: userResult._id,
          firstName: userResult.firstName,
          lastName: userResult.lastName,
          email: userResult.lastName,
          role: userResult.roleType
        });
        return res.status(200).json({
          message: "User Regitered Successfully.",
          token: token,
          userData: userResult,
          success: true
        });
      } else {
        const result: Document | null | any = await UserModel.findOne({
          email: body.email
        });
        const token = await GenerateToken({
          id: result._id,
          firstName: result.firstName,
          lastName: result.lastName,
          email: result.lastName,
          role: result.roleType
        });
        return res.status(200).json({
          token: token,
          userData: result,
          success: true
        });
      }
    } else {
      return res.status(400).json({
        message: "Access token is missing!",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
}

/*  Title:- User forgot Password
Prams:- email
Created By:- Rishabh Bula */

const userForgotPassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { body } = req;
    const { email } = body;
    const result: Document | null | any = await UserModel.findOne({
      email: email
    });
    if (result === null) {
      return res.status(400).json({
        message: "Email not found."
      });
    }
    const encryptedUserId = encrypt(result.id);
    const encrypteUserEmail = encrypt(result.email);
    const encrypteVerifyToken = encrypt(
      result.email + result.id
    );
    const emailVar = new Email(req);
    await emailVar.setTemplate(AvailiableTemplates.FORGET_PASSWORD, {
      fullName: result.firstName + " " + result.lastName,
      email: encrypteUserEmail,
      userId: encryptedUserId,
      verifyToken: encrypteVerifyToken,
      resetPageUrl: webURL
    });
    await UserModel.updateOne(
      {
        email: result.email
      },
      {
        verifyToken: encrypteVerifyToken
      }
    );
    await emailVar.sendEmail(body.email);
    return res.status(200).json({
      responsecode: 200,
      message:
        "Reset password link have been send successfully to your registered email address.",
      success: true
    });
  } catch (error) {
    console.log("this is forgot password error", error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/*  Title:- User Veryfy Link
Prams:- verification, token,
Created By:- Rishabh Bula */

const userVerifyLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { body } = req;
    const decryptedUserId = decrypt(body.verification);
    const decryptedUserEmail = decrypt(body.user);
    const userData: Document | any | null = await UserModel.findOne({
      email: decryptedUserEmail,
      _id: decryptedUserId,
      verifyToken: body.token
    });
    if (!userData) {
      return res.status(400).json({
        responsecode: 400,
        message: "Your session has been expired.",
        success: false
      });
    }
    return res.status(200).json({
      message: "Link verified successfully!",
      data: userData,
      success: true
    });
  } catch (error) {
    console.log("this is verify link error", error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};

/*  Title:- User Reset Password
Prams:- user, password 
Created By:- Rishabh Bula*/

const userResetpassword = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { body } = req;
    const decryptedUserEmail = decrypt(body.user);
    const userData: Document | any | null = await UserModel.findOne({ email: decryptedUserEmail });
    if (!userData) {
      return res.status(400).json({
        responsecode: 400,
        message: "Email not registered.",
        success: false
      });
    }
    const encryptedUserpassword = encryptPassword(
      body.password
    );
    if (!userData.verifyToken) {
      return res.status(400).json({
        responsecode: 400,
        message: "Your session has been expired.",
        success: false
      });
    }
    const result = await UserModel.findByIdAndUpdate(
      {
        _id: userData.id
      },
      {
        $set: {
          password: encryptedUserpassword,
          verifyToken: null
        }
      }
    );
    if (result) {
      return res.status(200).json({
        message: "Password updated successfully!",
        success: true
      });
    } else {
      return res.status(400).json({
        responsecode: 400,
        message: "Your session has been expired.",
        success: false
      });
    }
  } catch (error) {
    console.log("this is Reset password error", error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
/**
 *
 */
export {
  login,
  adminLogin,
  signup,
  socialSignup,
  userForgotPassword,
  userVerifyLink,
  userResetpassword
};
