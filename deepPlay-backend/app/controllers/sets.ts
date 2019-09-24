import { Request, Response } from "express";
import { SetModel } from "../models";
import { ISet } from "../interfaces";

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
      sharableLink: "",
      isPublic: true
    };
    const setResult: Document | any = new SetModel(setData);
    await setResult.save();
    res.status(200).json({
      setResult,
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
export { createSet, getAllSetById, getRecentSetById };