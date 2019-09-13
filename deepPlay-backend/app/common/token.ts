import Mongoose from "mongoose";
import { IUserTokenData } from "./../interfaces";
import { sign as JWTSign, verify as VerifyJWT } from "jsonwebtoken";
import { JWTSecrete } from "./password";
import { Request, NextFunction, Response } from "express";
import { UserModel } from "../models";

/**
 *
 */
export const GenerateToken = async (data: IUserTokenData): Promise<string> => {
  return new Promise((resolve, reject) => {
    JWTSign(
      data,
      JWTSecrete,
      {
        expiresIn: 86400
      },
      (err, token) => {
        if (err) {
          reject(err);
        }
        resolve(token);
      }
    );
  });
};

/**
 *
 */
export const VerifyToken = async (req: Request, res: Response) => {
  try {
    const { currentUser } = req;
    return res.status(200).json({
      data: currentUser
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};

/**
 *
 */

export const ValidateAdminToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const token: string = req.headers["authorization"]
    ? req.headers["authorization"].toString()
    : "";
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized, Please provide authentication token!"
    });
  }
  try {
    const tokenData: IUserTokenData = VerifyJWT(
      token,
      JWTSecrete
    ) as IUserTokenData;
    const currentUser: Document | null | any = await UserModel.findOne({
      isDeleted: false,
      _id: Mongoose.Types.ObjectId(tokenData.id)
    });
    if (!currentUser) {
      return res.status(401).json({
        message: "Unauthorized, Invalid token!"
      });
    }
    req.currentUser = currentUser;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Token has expired"
    });
  }
};
