import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserModel } from "../models";
import {
  GenerateToken,
  ValidationFormatter,
  encryptPassword
} from "../common";
import { IUser } from "../interfaces"
import { comparePassword } from "../common/password"

import { ValidationError, Result, validationResult } from "express-validator";

/* Title:- Login For User
Prams:- email and password */

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { email, password } = body;
    const result: Document | null | any = await UserModel.findOne({
      email
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
      })
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
Prams:- email,password,firstName,lastName,profileImage,roleType */
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
      })
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
      }
      const userResult: Document | any = new UserModel(userData)
      await userResult.save();

      const token = await GenerateToken({
        id: userResult._id,
        firstName: userResult.firstName,
        lastName: userResult.lastName,
        email: userResult.lastName,
        role: userResult.roleType
      });

      return res.status(200).json({
        message: "User added successfully.",
        token: token,
        userData: userResult,
        success: true
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
/* Title:- Social Signup For User
Prams:- accessToken,email,firstName,lastName */
const socialSignup = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    if (body.accessToken) {
      const userData: Document | null = await UserModel.findOne({ email: body.email })
      if (!userData) {
        const userSignup: IUser = {
          firstName: body.firstName,
          lastName: body.lastName,
          email: body.email,
          password: null,
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
        }
        const userResult: Document | any = new UserModel(userSignup)
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
        })
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
        })
      }
    } else {
      return res.status(400).json({
        message: "Access token is missing!",
        success: false
      })
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
}
/**
 *
 */
export {
  login,
  signup,
  socialSignup
};
