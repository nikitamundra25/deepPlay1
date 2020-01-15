import { Request, Response } from "express";
import { UserModel } from "../models";
import { resizeImage } from "../common/resizeImage";
import { IDataToUpdate } from "../interfaces/users";
import fs from "fs";
import path from "path";
import { IsProductionMode } from "../config";
import { validationResult, ValidationError, Result } from "express-validator";
import {
  GenerateToken,
  ValidationFormatter,
  encryptPassword,
  Email,
  AvailiableTemplates
} from "../common";
import moment from "moment";
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
    let result: Document | any | null;
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
      result = await UserModel.findByIdAndUpdate(headToken.id, {
        $set: dataToUpdate
      });
    }

    return res.status(200).json({
      data: result,
      message: "Profile details updated successfully."
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
    if (
      body.imageData !== undefined &&
      body.imageData !== "" &&
      body.imageData
    ) {
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
      let originalImagePath: string = "";
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
      fs.writeFileSync(originalImagePath, buf);
      var thumbnailImagePath: string = "";
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
      fs.writeFileSync(thumbnailImagePath, buf);
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
    } else {
      await UserModel.findByIdAndUpdate(currentUser.id, {
        profileImage: ""
      });
      return res.status(200).json({
        responseCode: 200,
        message: "Profile image updated successfully",
        success: true,
        profileImage: "",
        profileThumbnail: ""
      });
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
// --------------- Get All user list -------------- //
const getAllUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { limit, page, search, sort, status } = query;
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 10);
    const limitNumber: number = parseInt(limit) || 10;
    // define condition
    let condition: any = {
      $and: []
    };
    // set default value for condition
    condition.$and.push({
      isDeleted: false,
      roleType: {
        $ne: "admin"
      }
    });
    // check for search condition
    if (search) {
      condition.$and.push({
        $or: [
          {
            name: {
              $regex: new RegExp(search.trim(), "i")
            }
          },
          {
            email: {
              $regex: new RegExp(search.trim(), "i")
            }
          }
        ]
      });
    }
    if (typeof status !== "undefined") {
      condition.$and.push({
        status: status == "1" ? true : false
      });
    }
    // check for sort option
    let sortOption = {};
    switch (sort) {
      case "createddesc":
        sortOption = {
          createdAt: -1
        };
        break;
      case "createdasc":
        sortOption = {
          createdAt: 1
        };
        break;
      case "nasc":
        sortOption = {
          firstName: 1,
          lastName: 1
        };
        break;
      case "ndesc":
        sortOption = {
          firstName: -1,
          lastName: 1
        };
        break;
      default:
        sortOption = {
          createdAt: -1
        };
        break;
    }
    // get user docs
    const userDoc: Document[] = await UserModel.aggregate([
      { $addFields: { name: { $concat: ["$firstName", " ", "$lastName"] } } },
      {
        $match: { ...condition }
      },
      {
        $sort: sortOption
      },
      {
        $skip: pageNumber
      },
      {
        $limit: limitNumber
      }
    ]);
    // get count for the conditions
    const userCount: any[] = await UserModel.aggregate([
      { $addFields: { name: { $concat: ["$firstName", " ", "$lastName"] } } },
      {
        $match: { ...condition }
      },
      {
        $count: "count"
      }
    ]);
    // sends the response
    return res.status(200).json({
      result: userDoc,
      totalUsers: userCount[0] ? userCount[0].count : 0
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
// -------------- Update User status ---------------- //
const updateUserStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { users, status } = body;
    const data: Document = await UserModel.updateMany(
      {
        _id: { $in: users }
      },
      {
        $set: {
          status: status
        }
      }
    );
    for (let x = 0; x < users.length; x++) {
      let result: Document | null | any = await UserModel.findOne({
        _id: users[x]
      }).select("firstName lastName email status");
      if (result === null) {
        return res.status(400).json({
          message: "Email not found."
        });
      }
      const emailVar = new Email(req);
      await emailVar.setTemplate(AvailiableTemplates.STATUS_CHANGE, {
        resetPageUrl: req.headers.host,
        status: result.status === true ? "activated" : "inactivated",
        fullName: result.firstName + " " + result.lastName
      });
      await emailVar.sendEmail(result.email);
    }
    return res.status(200).json({
      message: status
        ? "User activated successfully!"
        : "User inactivated successfully!",
      data
    });
  } catch (error) {
    console.log("this is get all user error", error);
    return res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
/**
 * Update User Details
 */
const updateUserDetails = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { body: $data, params } = req;
    const { userId } = params;
    let sendMail: boolean = false;
    let old_email: string = "";
    let new_email: string = $data.email;
    let inserList: Document = {
      ...$data,
      updatedAt: Date.now()
    };
    let result: Document | any | null = await UserModel.findOne({
      _id: userId
    });
    if (result.email !== $data.email) {
      sendMail = true;
      old_email = result.email;
      new_email = $data.email;
    }
    await UserModel.findByIdAndUpdate(userId, inserList);
    if (sendMail) {
      const emailVar = new Email(req);
      await emailVar.setTemplate(AvailiableTemplates.EMAIL_CHANGE, {
        resetPageUrl: req.headers.host,
        fullName: $data.firstName + " " + $data.lastName,
        old_email: old_email,
        new_email: new_email
      });
      await emailVar.sendEmail($data.email);
    }
    return res.status(200).json({
      message: "User details updated successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
/**
 * Delete User
 */
const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { params } = req;
    const { userId } = params;
    let inserList: Object = {
      isDeleted: true
    };
    await UserModel.findByIdAndUpdate(userId, inserList);
    let result: Document | null | any = await UserModel.findOne({
      _id: userId
    }).select("firstName lastName email status");
    if (result === null) {
      return res.status(400).json({
        message: "Email not found."
      });
    }
    const emailVar = new Email(req);
    await emailVar.setTemplate(AvailiableTemplates.STATUS_CHANGE, {
      resetPageUrl: req.headers.host,
      status: "deleted",
      fullName: result.firstName + " " + result.lastName
    });
    await emailVar.sendEmail(result.email);
    return res.status(200).json({
      message: "Your Account has been deleted Successfully."
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
/**
 * Update user password
 */
const updateUserPassword = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const errors: Result<ValidationError> = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        message: ValidationFormatter(errors.mapped())
      });
    }
    const { body } = req;
    const { newPassword: password, userId } = body;
    let dataToUpdate: Object = {
      password: encryptPassword(password),
      salt: "123456"
    };
    await UserModel.findByIdAndUpdate(userId, {
      $set: dataToUpdate
    });
    return res.status(200).json({
      message: "Password updated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
/**
 *
 */
const proxyLoginToUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { id } = query;
    const result: any = await UserModel.findOne({ _id: id, isDeleted: false });
    const token = await GenerateToken({
      id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.lastName,
      role: result.roleType
    });
    delete result.password;
    return res.status(200).json({
      responseCode: 200,
      tokenExpire: parseInt(moment().toString()) + 86400,
      token: token,
      message: "Successfully Login",
      success: true
    });
  } catch (error) {
    res.status(500).json({
      message: error.message ? error.message : "Unexpected error occure.",
      success: false
    });
  }
};
export {
  getUserInfo,
  editUserInfo,
  deleteUserAccount,
  imageUpload,
  getAllUser,
  updateUserStatus,
  updateUserDetails,
  deleteUser,
  updateUserPassword,
  proxyLoginToUser
};
