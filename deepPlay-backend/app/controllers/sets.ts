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
      description: body.description,
      status: true,
      userId: headToken.id,
      folderId: body.folderId ? body.folderId : null,
      sharableLink: "",
      isPublic: true
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
    const result = await SetModel.find({ userId: headToken.id });
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
    const result = await SetModel.find({ userId: headToken.id })
      .sort({ createdAt: -1 })
      .limit(limit);
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

// --------------Add a set in a folder---------------------
const addSetInFolder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(">>>>>>", req.currentUser);

    const { currentUser } = req;
    const { body } = req;
    // let headToken: Request | any = currentUser;
    // if (!headToken.id) {
    //   res.status(400).json({
    //     message: "User id not found"
    //   });
    // }
    if (!body.setId) {
      res.status(400).json({
        message: "Set id not found"
      });
    }
    if (!body.folderId) {
      res.status(400).json({
        message: "Folder id not found"
      });
    }

    const result = await SetModel.find({
      userId: ObjectId("5d8321d12d5cd94be113b900")
      //folderId: body.folderId || " "
    });

    if (result === null) {
      res.status(400).json({
        message: "Set does not found"
      });
    }
    console.log("resp", result);
    for (let index: number = 0; index < result.length; index++) {
      const element = result[index];
      console.log("elee", element._id, body.setId);
      if (element._id == body.setId) {
        console.log("inside if");
        const res = await SetModel.findByIdAndUpdate(body.setId, {
          $set: { folderId: body.folderId }
        });
        console.log("res", res);
      }
    }

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

export { createSet, getAllSetById, getRecentSetById, addSetInFolder };
