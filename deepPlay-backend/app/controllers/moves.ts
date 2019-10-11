import { Request, Response } from "express";
import {
  CloudinaryAPIKey,
  CloudinaryAPISecretKey,
  CloudName,
  IsProductionMode
} from "../config";
import cloudinary from "cloudinary";
import ytdl from "ytdl-core";
import { MoveModel, SetModel } from "../models";
import fs from "fs";
import path from "path";
import ThumbnailGenerator from "video-thumbnail-generator";
import { decrypt } from "../common";

const __basedir = path.join(__dirname, "../public");

cloudinary.config({
  cloud_name: CloudName,
  api_key: CloudinaryAPIKey,
  api_secret: CloudinaryAPISecretKey
});

var up_options = {
  resource_type: "video",
  eager: [{ format: "webM", video_codec: "h264:main:3.1", bit_rate: "3500k" }],
  eager_async: true
};

/* Title:- Download Video to local server
Prams:- valid youtube video url 
Created By:- Rishabh Bula*/

const downloadVideo = async (req: Request, res: Response): Promise<any> => {
  const { file, currentUser } = req;
  try {
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let videoURL: string;
    videoURL = path.join("uploads", "youtube-videos", file.filename);
    const moveResult: Document | any = new MoveModel({
      videoUrl: videoURL,
      userId: headToken.id
    });
    await moveResult.save();
    res.status(200).json({
      message: "Video uploaded successfully!",
      videoUrl: videoURL,
      moveData: moveResult
    });
  } catch (error) {
    res.status(500).send({
      message: error.message
    });
  }
};

/* Title:- Download Video to local server
Prams:- valid youtube video url 
Created By:- Rishabh Bula*/

const downloadYoutubeVideo = async (
  req: Request,
  res: Response
): Promise<any> => {
  const { body, currentUser } = req;
  try {
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let videoURL: string;
    const fileName = [
      headToken.id + Date.now() + "deep_play_video" + ".webm"
    ].join("");
    let originalVideoPath: string = "";
    if (IsProductionMode) {
      originalVideoPath = path.join(
        __dirname,
        "/uploads",
        "youtube-videos",
        fileName
      );
    } else {
      originalVideoPath = path.join(
        __basedir,
        "../uploads",
        "youtube-videos",
        fileName
      );
    }
    /*  */
    const videoThumbnailPath = path.join(
      __basedir,
      "../uploads",
      "video-image-thumbnail"
    );
    const tg: any = new ThumbnailGenerator({
      sourcePath: originalVideoPath,
      thumbnailPath: videoThumbnailPath
    });
    tg.generateCb((err: string, result: string) => {
      if (err) {
        console.log("err", err);
      } else {
        console.log("####################", result);
      }
    });
    /*  */
    videoURL = path.join("uploads", "youtube-videos", fileName);
    let videoStream: any;

    /* Download youtube videos on localserver */
    const trueYoutubeUrl = ytdl.validateURL(body.url);
    if (trueYoutubeUrl) {
      ytdl(body.url).pipe(
        (videoStream = fs.createWriteStream(originalVideoPath))
      );
      videoStream.on("close", async function() {
        const moveResult: Document | any = new MoveModel({
          videoUrl: videoURL,
          userId: headToken.id
        });
        await moveResult.save();

        res.status(200).json({
          message: "Video uploaded successfully!",
          videoUrl: videoURL,
          moveData: moveResult
        });
      });
    } else {
      res.status(400).json({
        message: "Enter a valid youtube url"
      });
    }
  } catch (error) {
    console.log(error, "kkkkk");
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all set info---------------------
const getMoveBySetId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser, query } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const movesData: Document | any = await MoveModel.find({
      setId: query.setId
    });

    return res.status(200).json({
      movesData: movesData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};


const getMoveDetailsById = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { currentUser, query } = req;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const movesData: Document | any = await MoveModel.findById(query.moveId);
    return res.status(200).json({
      movesData: movesData
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//-----Decrypt  setId to get moveDetails for shared link[public access set component]-----------------
const publicUrlMoveDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { setId, isPublic, fromFolder } = query;
    const decryptedSetId = decrypt(setId);
    let result: Document | any | null;
    let temp: Document | any | null;

    if (fromFolder) {
      temp = {
        isPublic: true
      };
    } else {
      temp = await SetModel.findOne({
        _id: decryptedSetId
      });
    }
    
    if (temp.isPublic) {
      result = await MoveModel.find({
        setId: decryptedSetId
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
  downloadVideo,
  getMoveBySetId,
  downloadYoutubeVideo,
  getMoveDetailsById,
  publicUrlMoveDetails
};
