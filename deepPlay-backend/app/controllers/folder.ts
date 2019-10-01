import { Request, Response } from "express";
import { FolderModel, SetModel, MoveModel } from "../models";
import { IFolder } from "../interfaces";
import { encrypt, decrypt } from "../common";

// --------------Create folder---------------------
const createFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    if (!body) {
      res.status(400).send({
        message: "Title is required"
      });
    }
    const headToken: Request | any = currentUser;
    const folderData: IFolder = {
      title: body.title,
      description: body.description ? body.description : "",
      status: body.status ? body.status : true,
      userId: body.userId ? body.userId : headToken.id,
      sharableLink: body.sharableLink ? body.sharableLink : "",
      isPublic: body.isPublic ? body.isPublic : true,
      isDeleted: body.isDeleted ? body.isDeleted : false
    };
    const Result: Document | any = new FolderModel(folderData);
    await Result.save();
    res.status(200).json({
      Result,
      message: "Folder created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all folder ---------------------
const getAllFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result: Document | any = await FolderModel.find({
      userId: headToken.id,
      isDeleted: false
    });
    res.status(200).json({
      data: result,
      message: "Folders has been fetched successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get Recent folder---------------------
const getRecentFolder = async (req: Request, res: Response): Promise<void> => {
  const limit = 10;
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result: Document | any = await FolderModel.find({
      userId: headToken.id,
      isDeleted: false
    })
      .sort({ isRecentTime: -1 })
      .limit(limit);
    res.status(200).json({
      data: result,
      message: "Folder have been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get Created folder info---------------------
const getCretedFolderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { query } = req;
    if (!query.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result: Document | any = await FolderModel.findOne({ _id: query.id });
    res.status(200).json({
      data: result,
      message: "Folder has been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Delete folder---------------------
const deleteFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { query } = req;
    if (!query.id) {
      res.status(400).json({
        message: "Folder id not found"
      });
    }
    const result: Document | any = await FolderModel.findByIdAndUpdate(
      query.id,
      {
        $set: { isDeleted: true }
      }
    );
    res.status(200).json({
      data: result,
      message: "Folder has been deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------updateRecentTimeRequest---------------------
const updateRecentTimeRequest = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body, currentUser } = req;
    const headToken: Request | any = currentUser;
    const { isSetId, isFolderId } = body;
    // if (!isSetId || !isFolderId) {
    //   res.status(400).json({
    //     message: "Id not found"
    //   });
    // }
    if (isSetId !== null) {
      await SetModel.findByIdAndUpdate(
        { _id: isSetId },
        {
          $set: {
            isRecentTime: new Date()
          }
        }
      );
    } else {
      await FolderModel.findByIdAndUpdate(
        { _id: isFolderId },
        {
          $set: {
            isRecentTime: new Date()
          }
        }
      );
    }
    return res.status(200).json({
      message: "Recent Time udpated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----------------SharableLink Public access------------------------------
const sharableLinkPublicAccess = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body } = req;
    const { isSetId, isFolderId, isMoveId, isPublic } = body;
    // if (!isSetId || !isFolderId || isMoveId) {
    //   res.status(400).json({
    //     message: "Id not found"
    //   });
    // }

    if (isSetId !== null) {
      await SetModel.findByIdAndUpdate(
        { _id: isSetId },
        {
          $set: {
            isPublic: isPublic
          }
        }
      );
    } else if (isFolderId !== null) {
      await FolderModel.findByIdAndUpdate(
        { _id: isFolderId },
        {
          $set: {
            isPublic: isPublic
          }
        }
      );
    } else {
      await MoveModel.findByIdAndUpdate(
        { _id: isMoveId },
        {
          $set: {
            isPublic: isPublic
          }
        }
      );
    }
    return res.status(200).json({
      message: "Public access has been set successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----------------SharableLink user details------------------------------
const sharableLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query, currentUser } = req;
    const { folderId } = query;
    const headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const encryptedUserId = encrypt(headToken.id);
    const encryptedFolderId = encrypt(folderId);
    const data = {
      encryptedUserId: encryptedUserId,
      encryptedFolderId: encryptedFolderId
    };
    return res.status(200).json({
      responsecode: 200,
      data: data,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----Decrypt userId & folderId to get folderDetails for shared link-----------------
const publicUrlFolderInfo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { userId, folderId, isPublic } = query;
    const decryptedUserId = decrypt(userId);
    const decryptedFolderId = decrypt(folderId);
    let result: Document | any | null;
    if (isPublic === "true") {
      result = await FolderModel.findOne({
        userId: decryptedUserId,
        _id: decryptedFolderId
      });
    } else {
      return res.status(400).json({
        message: "Public access link is not enabled."
      });
    }
    return res.status(200).json({
      responsecode: 200,
      data: result,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

export {
  createFolder,
  getCretedFolderById,
  getAllFolder,
  deleteFolder,
  getRecentFolder,
  updateRecentTimeRequest,
  sharableLinkPublicAccess,
  sharableLink,
  publicUrlFolderInfo
};
