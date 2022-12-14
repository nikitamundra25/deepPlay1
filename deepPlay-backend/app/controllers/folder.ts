import { Request, Response } from "express";
import { FolderModel, SetModel, MoveModel } from "../models";
import { IFolder, ISet, IMove, IUpdateFolder } from "../interfaces";
import { encrypt, decrypt } from "../common";
import { algoliaAppId, algoliaAPIKey } from "../config/app";
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index = client.initIndex("deep_play_data");
let ObjectId = require("mongoose").Types.ObjectId;

// --------------Create folder---------------------
const createFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    if (!body) {
      return res.status(400).send({
        message: "Title is required"
      });
    }
    const headToken: Request | any = currentUser;

    let indexx: number = 0;
    if (body.copyOfFolderId && body.isCopy) {
      const folderData1: Document | any | null = await FolderModel.findOne({
        _id: body.copyOfFolderId
      });
      const copied: number = folderData1.copyIndex;
      indexx = copied + 1;

      await FolderModel.updateOne(
        { _id: body.copyOfFolderId },
        {
          copyIndex: indexx
        }
      );
    }
    const folderData: IFolder = {
      title: body.isCopy ? `copy of ${body.title}` : body.title,
      description: body.description ? body.description : "",
      status: body.status ? body.status : true,
      userId: body.userId ? body.userId : headToken.id,
      sharableLink: body.sharableLink ? body.sharableLink : "",
      isPublic: body.isPublic ? true : false,
      isDeleted: body.isDeleted ? body.isDeleted : false,
      isCopy: body.isCopy ? true : false,
      copyCount: indexx,
      copySetId: body.isCopy ? body.copyOfSetId : null
    };
    const Result: Document | any = new FolderModel(folderData);
    await Result.save();

    const folderId = Result._id;
    if (body.isCopy) {
      const setResult: Document | any | null = await SetModel.find({
        folderId: body.copyOfFolderId,
        isDeleted: false
      });
      if (setResult && setResult.length) {
        for (let index = 0; index < setResult.length; index++) {
          const element = setResult[index];
          const newSetData: ISet = {
            title: element.title,
            description: element.description,
            isPublic: element.isPublic ? true : false,
            folderId: folderId,
            sharableLink: element.sharableLink,
            status: true,
            userId: headToken.id,
            isCopy: element.isCopy,
            isDeleted: element.isDeleted,
            copyIndex: element.copyIndex,
            copyCount: element.copyCount,
            copySetId: element.copyOfSetId ? element.copyOfSetId : null
          };
          const setData: Document | any = new SetModel(newSetData);
          await setData.save();
          const setId = setData._id;
          const moveResult: Document | any | null = await MoveModel.find({
            setId: element._id,
            isDeleted: false
          });
          if (moveResult && moveResult.length) {
            for (let index = 0; index < moveResult.length; index++) {
              const moveElement = moveResult[index];
              const newMoveData: IMove = {
                title: moveElement.title,
                description: moveElement.description,
                videoUrl: moveElement.videoUrl,
                tags: moveElement.tags,
                isPublic: moveElement.isPublic ? moveElement.isPublic : false,
                userId: headToken.id,
                sharableLink: moveElement.sharableLink,
                status: true,
                setId: setId,
                isStarred: moveElement.isStarred,
                moveURL: moveElement.moveURL,
                videoThumbnail: moveElement.videoThumbnail
                  ? moveElement.videoThumbnail
                  : null,
                sortIndex: moveElement.sortIndex ? moveElement.sortIndex : null,
                sourceUrl: moveElement.sourceUrl ? moveElement.sourceUrl : null,
                startTime: moveElement.startTime ? moveElement.startTime : null,
                isYoutubeUrl: moveElement.isYoutubeUrl
                  ? moveElement.isYoutubeUrl
                  : false
              };
              const moveData: Document | any = new MoveModel(newMoveData);
              await moveData.save();
            }
          }
        }
      }
    }

    let folderDataForAlgolia: Document | any;
    /* Add items to algolia */
    folderDataForAlgolia = {
      ...Result._doc,
      searchType: "folder"
    };
    let temp: any;

    index.addObjects(
      [folderDataForAlgolia],
      async (err: string, content: any) => {
        if (err) {
          console.error(err);
        } else {
          temp = content.objectIDs[0];
          await FolderModel.updateOne(
            { _id: Result._id },
            {
              objectId: temp
            }
          );
        }
      }
    );
    /*  */
    return res.status(200).json({
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
    const { currentUser, query } = req;
    let headToken: Request | any = currentUser;
    const { limit, page, search, sort, status, roleType } = query;
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 10);
    const limitNumber: number = parseInt(limit) || 10;
    // define condition
    let condition: any = {
      $and: []
    };
    // set default value for condition
    condition.$and.push({
      isDeleted: false
    });
    // check for search condition
    if (search) {
      condition.$and.push({
        $or: [
          {
            title: {
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
    if (!roleType || roleType !== "admin") {
      condition.$and.push({
        userId: headToken.id
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
          title: 1
        };
        break;
      case "ndesc":
        sortOption = {
          title: -1
        };
        break;
      default:
        sortOption = {
          createdAt: -1
        };
        break;
    }
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let result: Document | any,
      setCount: Document | any,
      folderResult: any = [];
    result = await FolderModel.find(condition)
      .sort(sortOption)
      .skip(pageNumber)
      .limit(limitNumber);
    // get count for the conditions
    const folderCount: number | any[] = await FolderModel.countDocuments(
      condition
    );
    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const folderData = result[index];
        setCount = await SetModel.countDocuments({
          folderId: folderData._id,
          isDeleted: false
        });
        folderResult.push({
          ...folderData._doc,
          setCount: setCount
        });
      }
    }
    res.status(200).json({
      data: folderResult,
      totalFolders: folderCount ? folderCount : 0,
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
const getRecentFolder = async (req: Request, res: Response): Promise<any> => {
  const limit = 10;
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      return res.status(400).json({
        message: "User id not found"
      });
    }
    let setCount: Document | any,
      folderResult: any = [];

    const result: Document | any = await FolderModel.find({
      userId: headToken.id,
      isDeleted: false
    })
      .sort({ isRecentTime: -1 })
      .limit(limit);

    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const folderData = result[index];
        setCount = await SetModel.countDocuments({
          folderId: folderData._id,
          isDeleted: false
        });
        folderResult.push({
          ...folderData._doc,
          setCount: setCount
        });
      }
    }

    if (!result) {
      return res.status(400).json({
        message: "Folderid not found"
      });
    }

    return res.status(200).json({
      data: folderResult,
      message: "Folder have been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get Created folder info---------------------
const getCretedFolderById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    if (!query.id) {
      return res.status(400).json({
        message: "User id not found"
      });
    }
    if (!ObjectId.isValid(query.id)) {
      return res.status(400).json({
        message: "Folder id not found",
        success: false
      });
    }
    const result: Document | any = await FolderModel.findOne({ _id: query.id });
    if (!result) {
      res.status(400).json({
        message: "Folderid not found"
      });
    }
    return res.status(200).json({
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
const deleteFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    if (!query.id) {
      return res.status(400).json({
        message: "Folder id not found"
      });
    }
    const result: Document | any = await FolderModel.findByIdAndUpdate(
      query.id,
      {
        $set: { isDeleted: true }
      }
    );
    const includSet: Document | any = await SetModel.find({
      folderId: query.id,
      isDeleted: false
    });

    let setObjectIds: Document | any = [];

    if (includSet) {
      for (let index = 0; index < includSet.length; index++) {
        const setData = includSet[index];
        const includeMove: Document | any | null = await MoveModel.find({
          setId: setData._id
        });
        if (setData.objectId) {
          setObjectIds.push(setData.objectId);
        }

        if (includeMove) {
          for (let index = 0; index < includeMove.length; index++) {
            const moveData = includeMove[index];
            await MoveModel.findByIdAndUpdate(moveData._id, {
              isDeleted: true
            });
            if (moveData.objectId) {
              setObjectIds.push(moveData.objectId);
            }
          }
        }
        await SetModel.findByIdAndUpdate(setData._id, {
          isDeleted: true
        });
      }
    }
    const result1: any = await FolderModel.find({ _id: query.id });
    const stemp = result1.length ? result1[0].objectId : null;
    if (stemp) {
      index.deleteObject(stemp, (err: string, content: any) => {
        if (err) throw err;
      });
    }

    if (setObjectIds.length) {
      index.deleteObjects(setObjectIds, (err: string, content: any) => {
        if (err) throw err;
      });
    }

    res.status(200).json({
      data: result,
      message: "Folder has been removed Successfully"
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

//-----------------SharableLink user details encrypt------------------------------
const sharableLink = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query, currentUser } = req;
    const { linkOf } = query;
    const headToken: Request | any = currentUser;
    // if (!headToken.id) {
    //   res.status(400).json({
    //     message: "User id not found"
    //   });
    // }
    let encryptedFolderId: String;
    let encryptedSetId: String;
    let data: Document | any;
    const encryptedUserId = encrypt(headToken.id);
    if (linkOf === "folder") {
      encryptedFolderId = encrypt(query.folderId);
      data = {
        encryptedUserId: encryptedUserId,
        encryptedFolderId: encryptedFolderId
      };
    }
    if (linkOf === "set") {
      encryptedSetId = encrypt(query.setId);
      data = {
        encryptedUserId: encryptedUserId,
        encryptedSetId: encryptedSetId
      };
    }

    if (linkOf === "yourSet") {
      data = {
        encryptedUserId: encryptedUserId
      };
    }

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

//-------------------Encrpt setId when user click on folder to set--------------------
const encryptSetIdShareLink = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { userId, setId } = query;

    let encryptedSetId: String;
    let data: Document | any;
    encryptedSetId = encrypt(setId);
    data = {
      encryptedUserId: userId,
      encryptedSetId: encryptedSetId
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

    let temp: Document | any | null = await FolderModel.findOne({
      userId: decryptedUserId,
      _id: decryptedFolderId
    });

    if (temp.isPublic) {
      result = await FolderModel.findOne({
        userId: decryptedUserId,
        _id: decryptedFolderId,
        isDeleted: false
      });
    } else {
      return res.status(400).json({
        message: {
          message: "Public access link is not enabled.",
          folderId: decryptedFolderId
        },
        success: false
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

//------------------Update Folder Details-------------------------------
const updateFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { title, description, id } = body;
    let updateFolder: IUpdateFolder = {
      title,
      description,
      isCopy: false,
      copyCount: 0
    };
    await FolderModel.findByIdAndUpdate(id, {
      $set: { ...updateFolder, updatedAt: Date.now() }
    });

    const result1: any = await FolderModel.find({ _id: id });
    const stemp = result1.length ? result1[0].objectId : null;
    if (stemp) {
      index.partialUpdateObject(
        {
          title: title,
          description: description,
          objectID: stemp
        },
        (err: string, content: any) => {
          if (err) throw err;
          console.log(content);
        }
      );
    }
    return res.status(200).json({
      message: "Folder details updated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
//------------------ Update Folder Status --------------------//
const updateFolderStatus = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body } = req;
    const { folders, status } = body;
    const data: Document = await FolderModel.updateMany(
      {
        _id: { $in: folders }
      },
      {
        $set: {
          status: status
        }
      }
    );
    return res.status(200).json({
      message: status
        ? "Folder activated successfully!"
        : "Folder inactivated successfully!",
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

export {
  createFolder,
  getCretedFolderById,
  getAllFolder,
  deleteFolder,
  getRecentFolder,
  updateRecentTimeRequest,
  sharableLinkPublicAccess,
  sharableLink,
  publicUrlFolderInfo,
  updateFolder,
  updateFolderStatus,
  encryptSetIdShareLink
};
