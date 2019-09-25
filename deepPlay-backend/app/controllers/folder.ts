import { Request, Response } from "express";
import { FolderModel } from "../models";
import { IFolder } from "../interfaces";

// --------------Create folder---------------------
const createFolder = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser } = req;
    const { body } = req;
    const headToken: Request | any = currentUser;
    const folderData: IFolder = {
      title: body.title,
      description: body.description,
      status: true,
      userId: headToken.id,
      sharableLink: "",
      isPublic: true
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

// --------------Get Created folder info---------------------
const getCretedFolderById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { body } = req;
    console.log(">>>>>>", body);

    if (!body.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result = await FolderModel.find({ _id: body.id });
    res.status(200).json({
      data: result[0],
      message: "Folder have been fetched successfully"
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

export { createFolder, getCretedFolderById };
