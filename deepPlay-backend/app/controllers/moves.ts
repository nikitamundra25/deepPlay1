import { Request, Response } from "express";
import { CloudinaryAPIKey, CloudinaryAPISecretKey, CloudName } from "../config"
import cloudinary from "cloudinary";
import ytdl from "ytdl-core";
import { MoveModel } from "../models";
import { IMove } from "../interfaces";
import fs from "fs";
import path from "path";

const __basedir = path.join(__dirname, "../public");

cloudinary.config({
  cloud_name: CloudName,
  api_key: CloudinaryAPIKey,
  api_secret: CloudinaryAPISecretKey
});

var up_options =
{
  resource_type: "video",
  eager:
    [
      { format: "webM", video_codec: "h264:main:3.1", bit_rate: "3500k" }
    ],
  eager_async: true,
};

/* Title:- Download Youtub Video to local server
Prams:- valid youtube video url 
Created By:- Rishabh Bula*/

const downloadVideo = async (req: Request, res: Response): Promise<any> => {
  const { body, currentUser } = req
  try {
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const fileName = [
      headToken.id,
      "deep_play_video",
      "webM"
    ].join("");

    const originalVideoPath = path.join(__basedir,
      "youtube-videos", fileName);

    const videoURL: string = path.join("youtube-videos", fileName);
    let videoStream: any
    /* Download youtube videos on localserver */
    ytdl(body.url)
      .pipe(
        videoStream = fs.createWriteStream(originalVideoPath)
      );

    videoStream.on('close', async function () {
      const moveResult: Document | any = new MoveModel({
        videoUrl: videoURL,
        userId: headToken.id
      });
      await moveResult.save();

      res.status(200).json({
        message: "Video uploaded successfully!",
        videoUrl: videoURL,
        moveData: moveResult
      })
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all set info---------------------
const getAllMoveById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser;
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

export {
  downloadVideo
};
