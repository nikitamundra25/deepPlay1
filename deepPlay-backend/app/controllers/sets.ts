import { Request, Response } from "express";
import { SetModel, MoveModel } from "../models";
import { ISet, IUpdateSet } from "../interfaces";
import Mongoose, { Document } from "mongoose";
// import { algoliaAppId, algoliaAPIKey } from "../config/app";
//import * as algoliasearch from 'algoliasearch'; // When using TypeScript
const algoliasearch = require("algoliasearch");
const client = algoliasearch("81ZJX0Y0SX", "cbc15a12426d1027b8e49ca62a68407e");

import { decrypt, encrypt } from "../common";
// --------------Create set---------------------
const createSet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    const headToken: Request | any = currentUser;
    const index = client.initIndex("rishabh_name");
    const setData: ISet = {
      title: body.title,
      description: body.description ? body.description : "",
      status: body.status ? body.status : true,
      userId: body.userId ? body.userId : headToken.id,
      folderId: body.folderId ? body.folderId : null,
      sharableLink: body.sharableLink ? body.sharableLink : "",
      isPublic: body.isPublic ? body.isPublic : true,
      isDeleted: body.isDeleted ? body.isDeleted : false
    };
    const setResult: Document | any = new SetModel(setData);
    await setResult.save();
    index.addObjects([setData], (err: string, content: string) => {
      if (err) {
        console.error(err);
      } else {
        console.log("##################", content);
      }
    });
    res.status(200).json({
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
    const { limit, page } = query;
    const pageValue = ((parseInt(page) || 1) - 1) * (limit || 10);
    const limitValue = parseInt(limit) || 10;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let result: Document | any,
      moveCount: Document | any,
      count: Document | any,
      setResult: any = [];
    if (query.roleType === "admin") {
      result = await SetModel.find({
        isDeleted: false
      }).populate({
        path: "folderId",
        match: {
          isDeleted: false
        }
      });
    } else {
      result = await SetModel.find({
        userId: headToken.id,
        isDeleted: false
      })
        .populate({
          path: "folderId",
          match: {
            isDeleted: false
          }
        })
        .skip(pageValue)
        .limit(limitValue);

      count = await SetModel.find({
        userId: headToken.id,
        isDeleted: false
      }).count();
    }
    if (result && result.length) {
      for (let index = 0; index < result.length; index++) {
        const setData = result[index];
        moveCount = await MoveModel.count({
          setId: setData._id,
          isDeleted: false
        });
        setResult.push({
          ...setData._doc,
          moveCount: moveCount
        });
      }
    }
    res.status(200).json({
      result: setResult,
      totalSets: count,
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
    const result: Document | any = await SetModel.find({
      userId: headToken.id,
      isDeleted: false
    })
      .sort({ isRecentTime: -1 })
      .limit(limit);

    res.status(200).json({
      data: result,
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
          isDeleted: false
        });
        setResult.push({
          ...setData._doc,
          moveCount: moveCount
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
    const result: Document | any = await SetModel.findByIdAndUpdate(body.id, {
      $set: { isDeleted: true }
    });

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
      _id: setId,
      isDeleted: false
    }).populate("folderId");

    const moveCount: Document | any = await MoveModel.count({
      setId: result._id,
      isDeleted: false
    });

    const SetResult: any = {
      ...result._doc,
      moveCount: moveCount
    };

    res.status(200).json({
      data: SetResult
    });
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
    const { folderId, isPublic } = query;
    const decryptedFolderId = decrypt(folderId);
    let result: Document | any | null;
    if (isPublic === "true") {
      result = await SetModel.find({
        folderId: decryptedFolderId,
        isDeleted: false
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

//-----Decrypt userId & SetId to get SetDetails for shared link[ public access set component]-----------------
const publicAccessSetInfoById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { userId, setId, isPublic } = query;
    const decryptedUserId = decrypt(userId);
    const decryptedSetId = decrypt(setId);
    let result: Document | any | null;
    if (isPublic === "true") {
      result = await SetModel.findOne({
        userId: decryptedUserId,
        _id: decryptedSetId,
        isDeleted: false
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
//------------------Update Folder Details-------------------------------
const updateSet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { title, description, setId } = body;
    let updateSet: IUpdateSet = {
      title,
      description
    };
    await SetModel.findByIdAndUpdate(setId, {
      $set: updateSet
    });
    return res.status(200).json({
      message: "Set details udpated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
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
  updateSet
};
