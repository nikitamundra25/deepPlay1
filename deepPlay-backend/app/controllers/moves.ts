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
      { width: 960, height: 540, crop: "limit", video_codec: "h264:main:3.1", bit_rate: "3500k" }
    ],
  eager_async: true,
  eager_notification_url: "https://mysite.example.com/notify_endpoint",
  public_id: "bb_bunny"
};
// --------------Create move---------------------
const createMove = async (req: Request, res: Response): Promise<any> => {
  const { body, currentUser } = req
  try {
    const originalVideoPath = path.join(
      __basedir,
      "youtube-videos",
      `TestVideo ${new Date()}`
    );
    let picStream: any

    /* Download youtube videos on localserver */
    ytdl('https://www.youtube.com/watch?v=9okSfJjpjXE')
      .pipe(
        picStream = fs.createWriteStream(originalVideoPath)
      );

    picStream.on('close', function () {
      console.log('file done');
      cloudinary.uploader.upload(originalVideoPath, (result: any) => {
        if (result.error) {
          return res.status(result.error.http_code).json({
            message: result.error.message
          })
        } else {
          return res.status(200).json({
            message: "Video uploaded successfully",
            url: result.url,
            id: result.public_id
          })
        }
      }, { resource_type: "video" })
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
  createMove
};
