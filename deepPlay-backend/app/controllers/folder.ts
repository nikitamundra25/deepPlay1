import { Request, Response } from "express";
import { FolderModel } from "../models";
import { IFolder } from "../interfaces";

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
    const result = await FolderModel.find({ userId: headToken.id });
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
// --------------Get Created folder info---------------------
const getCretedFolderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { body } = req;
    if (!body.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result = await FolderModel.find({ _id: body.id });
    res.status(200).json({
      data: result[0],
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
    const result: any = await FolderModel.findByIdAndUpdate(query.id, {
      $set: { isDeleted: true }
    });
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
export { createFolder, getCretedFolderById, getAllFolder, deleteFolder };
