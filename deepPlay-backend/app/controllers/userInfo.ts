import { Request, Response } from "express";
import { UserModel } from "../models";
import { resizeImage } from "../common/resizeImage";
import { IDataToUpdate } from "../interfaces/users";
import fs from "fs";
import path from "path";
import { IsProductionMode } from "../config"

const __basedir = path.join(__dirname, "../public");
// --------------Get user info---------------------
const getUserInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const headToken: Request | any = currentUser;
    const result = await UserModel.findById(headToken.id);
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

// --------------update user info---------------------
const editUserInfo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body, currentUser } = req;
    const headToken: Request | any = currentUser;
    const { firstName, lastName, roleType } = body;
    let dataToUpdate: IDataToUpdate = {
      firstName,
      lastName,
      roleType
    };
    const checkProperties: object = (dataToUpdate: IDataToUpdate | any) => {
      for (var i in dataToUpdate) {
        if (dataToUpdate[i] !== null && dataToUpdate[i] != "") return false;
      }
      return true;
    };

    if (checkProperties) {
      await UserModel.findByIdAndUpdate(headToken.id, {
        $set: dataToUpdate
      });
    }
    return res.status(200).json({
      message: "Profile details udpated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

const types: any = {
  "/": "jpg",
  i: "png",
  R: "gif",
  U: "webp"
};

/* ---------------User Image Upload---------------- */
const imageUpload = async (req: Request, res: Response) => {
  try {
    let { body, currentUser: tempCurrentUser } = req;
    const currentUser = tempCurrentUser || { id: "" };
    if (body.imageData !== undefined || body.imageData !== "") {
      const base64Image = body.imageData.replace(
        /^data:image\/\w+;base64,/,
        ""
      );
      var buf = Buffer.from(base64Image, "base64");
      const type = types[base64Image.charAt(0)];
      const randomConst = Math.floor(Math.random() * 90 + 10);
      const fileName = [
        currentUser.id,
        randomConst,
        "profile_img.",
        type || "png"
      ].join("");
      let originalImagePath: string = ""
      if (IsProductionMode) {
        originalImagePath = path.join(
          __dirname,
          "/uploads",
          "images",
          fileName
        );
      } else {
        originalImagePath = path.join(
          __basedir,
          "../uploads",
          "images",
          fileName
        );
      }
      fs.writeFileSync(originalImagePath, buf)
      var thumbnailImagePath: string = ""
      if (IsProductionMode) {
        thumbnailImagePath = path.join(
          __dirname,
          "/uploads",
          "images-thumbnail",
          fileName
        );
      } else {
        thumbnailImagePath = path.join(
          __basedir,
          "../uploads",
          "images-thumbnail",
          fileName
        );
      }
      fs.writeFileSync(thumbnailImagePath, buf)
      const thumbnailImg: string = path.join(
        "uploads",
        "images-thumbnail",
        fileName
      );
      if (body.imageData) {
        await resizeImage(originalImagePath, thumbnailImagePath, 200);
      }
      const uploadimg = await UserModel.findByIdAndUpdate(currentUser.id, {
        profileImage: thumbnailImg
      });

      if (uploadimg) {
        return res.status(200).json({
          responseCode: 200,
          message: "Profile image uploaded successfully!",
          success: true,
          profileImage: originalImagePath,
          profileThumbnail: thumbnailImg
        });
      } else {
        return res.status(400).json({
          responseCode: 400,
          message: "Error uploading profile image.",
          success: false
        });
      }
    }
  } catch (error) {
    console.log("**************This is image upload error", error);
    return res.status(400).json({
      responseCode: 400,
      message: error
    });
  }
};
// --------------delete user account---------------------
const deleteUserAccount = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const headToken: Request | any = currentUser;
    const result = await UserModel.findByIdAndUpdate(headToken.id, {
      $set: { isDeleted: true }
    });
    res.status(200).json({
      result,
      message: "User account deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
// --------------- Get All user list
const getAllUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const result = await UserModel.find({
      roleType: {
        $ne: "admin"
      }
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

export { getUserInfo, editUserInfo, deleteUserAccount, imageUpload, getAllUser };
