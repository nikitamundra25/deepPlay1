import { Request, Response } from "express";
import { SetModel } from "../models";
import { ISet } from "../interfaces";
const ObjectId = require("mongodb").ObjectId;

// --------------Create set---------------------
const createSet = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    const headToken: Request | any = currentUser;
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
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result = await SetModel.find({
      userId: headToken.id,
      isDeleted: false
    });
    res.status(200).json({
      result,
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
    const result = await SetModel.find({
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
    const { body } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result = await SetModel.find({
      userId: headToken.id,
      $or: [{ folderId: body.folderId }, { folderId: null }]
    });
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
    const { query } = req;
    if (!query.id) {
      res.status(400).json({
        message: "Set id not found"
      });
    }
    const result: any = await SetModel.findByIdAndUpdate(query.id, {
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
    const result: Document | any = await SetModel.findById({
      userId: headToken.id,
      _id: setId
    });
    res.status(200).json({
      data: result
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
  getSetDetailsById
};
