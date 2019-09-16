import { Request, Response } from "express";
import { Document } from "mongoose";
import { UserModel } from "../models";
import { IUser } from "../interfaces";
const getUserInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const value = req.body.data;
    const result = await UserModel.find({ _id: value });
    res.status(200).json({
      result,
      message: "User profile successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
export { getUserInfo };
