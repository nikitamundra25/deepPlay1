import { Request, Response } from "express";
import { SetModel, MoveModel, FolderModel } from "../models";
import Mongoose, { Document } from "mongoose";
import { ISet, IUpdateSet, IMove } from "../interfaces";
import { algoliaAppId, algoliaAPIKey } from "../config/app";
//import * as algoliasearch from 'algoliasearch'; // When using TypeScript
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index = client.initIndex("deep_play_data");
import { decrypt, encrypt } from "../common";
import { body } from "express-validator";

// --------------Create set---------------------
const createSet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    const headToken: Request | any = currentUser;

    const countSetCopy: Document | any | null = await SetModel.count({
      title: body.title,
      description: body.description ? body.description : "",
      status: body.status ? body.status : true,
      userId: body.userId ? body.userId : headToken.id,
      folderId: body.folderId ? Mongoose.Types.ObjectId(body.folderId) : null,
      sharableLink: body.sharableLink ? body.sharableLink : "",
      isPublic: body.isPublic ? body.isPublic : true,
      isDeleted: body.isDeleted ? body.isDeleted : false,
      isCopy: true
    });

    const setData: ISet = {
      title: body.title,
      description: body.description ? body.description : "",
      status: body.status ? body.status : true,
      userId: body.userId ? body.userId : headToken.id,
      folderId: body.folderId ? body.folderId : null,
      sharableLink: body.sharableLink ? body.sharableLink : "",
      isPublic: body.isPublic ? body.isPublic : true,
      isDeleted: body.isDeleted ? body.isDeleted : false,
      isCopy: body.isCopy ? true : false,
      copyIndex: countSetCopy && body.isCopy ? countSetCopy : 0
    };
    const setResult: Document | any = new SetModel(setData);
    await setResult.save();

    const setId: String = setResult._id;
    if (body.isCopy) {
      const moveResult: Document | any | null = await MoveModel.find({
        setId: Mongoose.Types.ObjectId(body.copyOfSetId),
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
            moveURL: moveElement.moveURL,
            sourceUrl: moveElement.sourceUrl ? moveElement.sourceUrl : null,
            isYoutubeUrl: moveElement.isYoutubeUrl
              ? moveElement.isYoutubeUrl
              : false
          };
          const moveData: Document | any = new MoveModel(newMoveData);
          await moveData.save();
        }
      }
    }

    let setDataForAlgolia: Document | any;
    /* Add items to algolia */
    setDataForAlgolia = {
      ...setResult._doc,
      searchType: "sets"
    };
    let temp: any;
    index.addObjects([setDataForAlgolia], async (err: string, content: any) => {
      if (err) throw err;
      temp = content.objectIDs[0];
      await SetModel.updateOne(
        { _id: setResult._id },
        {
          objectId: temp
        }
      );
    });
    /*  */

    return res.status(200).json({
      setResult: setResult,
      message: "Set created successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all set info---------------------
const getAllSetById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser, query } = req;
    let headToken: Request | any = currentUser;
    const { limit, page, search, sort, status, roleType, userId } = query;
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

    // dcrypt userId for shareable link in yoursets component
    // if (userId) {
    //   headToken = { id: decrypt(userId) };
    //   console.log("<<<,headToken.id", headToken.id);
    // }
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
    let result: Document | any | null,
      moveCount: Document | any,
      setResult: any = [];

    result = await SetModel.find(condition)
      .sort(sortOption)
      .skip(pageNumber)
      .limit(limitNumber)
      .populate({
        path: "folderId",
        match: {
          isDeleted: false
        }
      });
    // get count for the conditions
    const setCount: number | any[] = await SetModel.countDocuments(condition);
    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const setData = result[index];
        moveCount = await MoveModel.count({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        });

        let data: any = await MoveModel.find({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        })
          .sort({ updatedAt: -1 })
          .limit(1);

        setResult.push({
          ...setData._doc,
          moveCount: moveCount,
          recentlyAddMoveImg: data.length ? data[0].moveURL : null
        });
      }
    }

    res.status(200).json({
      result: setResult,
      totalSets: setCount ? setCount : 0,
      message: "Sets have been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get Recent set info---------------------
const getRecentSetById = async (req: Request, res: Response): Promise<void> => {
  const limit = 10;
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let moveCount: Document | any,
      setResult: any = [];

    const result: Document | any = await SetModel.find({
      userId: headToken.id,
      isDeleted: false
    })
      .sort({ isRecentTime: -1 })
      .limit(limit);

    // get move count
    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const setData = result[index];
        moveCount = await MoveModel.count({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        });

        let data: any = await MoveModel.find({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        })
          .sort({ updatedAt: -1 })
          .limit(1);

        setResult.push({
          ...setData._doc,
          moveCount: moveCount,
          recentlyAddMoveImg: data.length ? data[0].moveURL : null
        });
      }
    }

    res.status(200).json({
      data: setResult,
      message: "Sets have been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all sets which have folderId or null folderId---------------------
const getSetsForFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser } = req;
    const { query } = req;
    const { limit, page } = query;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let result: Document | any,
      moveCount: Document | any,
      setResult: any = [];

    result = await SetModel.find({
      userId: headToken.id,
      $or: [{ folderId: Mongoose.Types.ObjectId(query.folderId) }],
      isDeleted: false
    })
      .populate({
        path: "folderId",
        match: {
          isDeleted: false
        }
      })
      .skip(((parseInt(page) || 1) - 1) * (limit || 10))
      .limit(parseInt(limit) || 10);
    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const setData = result[index];
        moveCount = await MoveModel.count({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        });
        let data: any = await MoveModel.find({
          setId: setData._id,
          isDeleted: false,
          moveURL: { $ne: null }
        })
          .sort({ updatedAt: -1 })
          .limit(1);

        setResult.push({
          ...setData._doc,
          moveCount: moveCount,
          recentlyAddMoveImg: data.length ? data[0].moveURL : null
        });
      }
    }

    let count: Document | any = await SetModel.find({
      userId: headToken.id,
      folderId: query.folderId,
      $or: [{ folderId: query.folderId }],
      isDeleted: false
    }).count();

    res.status(200).json({
      data: setResult,
      totalSets: count
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Add a set in a folder---------------------
const addSetInFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    if (!body.setId) {
      res.status(400).json({
        message: "Set id not found"
      });
    }

    await SetModel.findByIdAndUpdate(body.setId, {
      $set: { folderId: body.isFolderAdd ? body.folderId : null }
    });

    res.status(200).json({
      message: "Sets have been added successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Delete folder---------------------
const deleteSet = async (req: Request, res: Response): Promise<void> => {
  try {
    const { body } = req;
    if (!body.id) {
      res.status(400).json({
        message: "Set id not found"
      });
    }
    let moveObjectIds: Document | any = [];
    const result: Document | any = await SetModel.findByIdAndUpdate(body.id, {
      $set: { isDeleted: true }
    });

    const result1: any = await SetModel.findOne({ _id: body.id });
    const stemp: Number | any = result1 ? result1.objectId : null;

    const includeMove: Document | any | null = await MoveModel.find({
      setId: result1._id
    });

    if (includeMove) {
      for (let index = 0; index < includeMove.length; index++) {
        const moveData = includeMove[index];
        await MoveModel.findByIdAndUpdate(moveData._id, {
          isDeleted: true
        });
        if (moveData.objectId) {
          moveObjectIds.push(moveData.objectId);
        }
      }
    }
    if (stemp) {
      index.deleteObject(stemp, (err: string, content: any) => {
        if (err) throw err;
      });
    }

    if (moveObjectIds.length) {
      index.deleteObjects(moveObjectIds, (err: string, content: any) => {
        if (err) throw err;
      });
    }

    res.status(200).json({
      data: result[0],
      message: "Sets has been deleted successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

/* Title:- Get sets with its id
Query Prams:- folderId
Created By:- Rishabh Bula*/

const getSetDetailsById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { currentUser } = req;
    const { query } = req;
    const { setId } = query;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }

    const result: Document | any = await SetModel.findOne({
      userId: headToken.id,
      _id: Mongoose.Types.ObjectId(setId),
      isDeleted: false
    }).populate("folderId");

    let moveCount: Document | any;
    if (result) {
      moveCount = await MoveModel.count({
        setId: Mongoose.Types.ObjectId(result._id),
        isDeleted: false,
        moveURL: { $ne: null }
      });
      const SetResult: any = {
        ...result._doc,
        moveCount: moveCount
      };

      res.status(200).json({
        data: SetResult
      });
    } else {
      res.status(400).json({
        message: "Set details not found.",
        success: false
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----Decrypt  folderId to get setDetails for shared link[public access folder component]-----------------
const publicUrlsetDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { folderId, isPublic, limit, page, userId } = query;
    const decryptedFolderId = decrypt(folderId);
    const decryptedUserId = decrypt(userId);
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
    let result: Document | any | null,
      moveCount: Document | any,
      setResult: any = [],
      count: Document | any;

    let temp: Document | any | null = await FolderModel.findOne({
      _id: Mongoose.Types.ObjectId(decryptedFolderId)
    });

    if (temp.isPublic) {
      result = await SetModel.find({
        folderId: decryptedFolderId,
        userId: decryptedUserId,
        isDeleted: false
      })
        .populate({
          path: "folderId",
          match: {
            isDeleted: false
          }
        })
        .skip(pageNumber)
        .limit(limitNumber);

      //Count of moves in folder
      if (result && result.length) {
        for (let index = 0; index < result.length; index++) {
          const setData = result[index];
          moveCount = await MoveModel.count({
            setId: setData._id,
            userId: decryptedUserId,
            isDeleted: false,
            moveURL: { $ne: null }
          });

          let data: any = await MoveModel.find({
            setId: setData._id,
            userId: decryptedUserId,
            isDeleted: false,
            moveURL: { $ne: null }
          })
            .sort({ updatedAt: -1 })
            .limit(limitNumber);

          setResult.push({
            ...setData._doc,
            moveCount: moveCount,
            recentlyAddMoveImg: data.length ? data[0].moveURL : null
          });
        }
      }
      count = await SetModel.find({
        folderId: decryptedFolderId,
        userId: decryptedUserId,
        isDeleted: false
      }).count();
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
      data: setResult,
      totalSets: count,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----Decrypt userId & SetId to get SetDetails for shared link[ public access set component]-----------------
const publicAccessSetInfoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { userId, setId, isPublic, fromFolder } = query;
    const decryptedUserId = decrypt(userId);
    const decryptedSetId = decrypt(setId);
    let result: Document | any | null;
    let temp: Document | any | null,
      moveCount: Document | any,
      setResult: any = [];

    if (fromFolder) {
      temp = {
        isPublic: true
      };
    }
    if (decryptedSetId && !fromFolder) {
      temp = await SetModel.findOne({
        _id: Mongoose.Types.ObjectId(decryptedSetId)
      });
    }

    if (temp.isPublic) {
      result = await SetModel.findOne({
        userId: decryptedUserId,
        _id: Mongoose.Types.ObjectId(decryptedSetId),
        isDeleted: false
      }).populate("folderId");

      const moveCount: Document | any = await MoveModel.count({
        setId: result._id,
        isDeleted: false,
        moveURL: { $ne: null }
      });

      setResult = {
        ...result._doc,
        moveCount: moveCount
      };
    } else {
      return res.status(400).json({
        message: {
          message: "Public access link is not enabled.",
          setId: decryptedSetId
        }
      });
    }
    return res.status(200).json({
      responsecode: 200,
      data: setResult,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
//------------------Update Set Details-------------------------------
const updateSet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { title, description, setId } = body;
    let updateSet: IUpdateSet = {
      title,
      description
    };
    await SetModel.findByIdAndUpdate(setId, {
      $set: { ...updateSet, updatedAt: Date.now() }
    });

    const result1: any = await SetModel.find({ _id: setId });
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
      message: "Set details updated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
//------------------ Update Sets Status --------------------//
const updateSetStatus = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { sets, status } = body;
    const data: Document = await SetModel.updateMany(
      {
        _id: { $in: sets }
      },
      {
        $set: {
          status: status
        }
      }
    );
    return res.status(200).json({
      message: status
        ? "Set activated successfully!"
        : "Set inactivated successfully!",
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
  createSet,
  getAllSetById,
  getRecentSetById,
  addSetInFolder,
  getSetsForFolder,
  deleteSet,
  getSetDetailsById,
  publicUrlsetDetails,
  publicAccessSetInfoById,
  updateSet,
  updateSetStatus
};
