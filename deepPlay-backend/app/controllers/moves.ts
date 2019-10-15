import { Request, Response } from "express";
import {
  CloudinaryAPIKey,
  CloudinaryAPISecretKey,
  CloudName,
  IsProductionMode,
  ServerURL
} from "../config";
import cloudinary from "cloudinary";
import Mongoose, { Document } from "mongoose";
import ytdl from "ytdl-core";
import { MoveModel, SetModel } from "../models";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg";
import { decrypt } from "../common";
import { orderBy } from "natural-orderby";
import { IMove, IMoveCopy } from "../interfaces";
import moment from "moment";
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

/**
 * Title:- Download Video to local server
 * Prams:- valid youtube video url
 * Created By:- Rishabh Bula
 */

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
    const fileName = file.filename;
    videoURL = path.join("uploads", "youtube-videos", fileName);
    const {
      frames: framesArray,
      videoMetaData,
      videoName
    } = await getVideoFrames(fileName);
    delete videoMetaData.filename;
    const frames = framesArray.map(
      (frame: string) => `${ServerURL}/uploads/youtube-videos/${frame}`
    );
    const moveResult: Document | any = new MoveModel({
      videoUrl: videoURL,
      userId: headToken.id,
      frames,
      videoMetaData,
      videoName
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
        "uploads",
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
    videoURL = path.join("uploads", "youtube-videos", fileName);
    let videoStream: any;

    /* Download youtube videos on localserver */
    const trueYoutubeUrl = ytdl.validateURL(body.url);
    if (trueYoutubeUrl) {
      ytdl.getInfo(body.url, (err, info) => {
        if (err) throw err;
        if (info) {
          ytdl(body.url, {
            quality: "lowest"
          }).pipe((videoStream = fs.createWriteStream(originalVideoPath)));
          videoStream.on("close", async function() {
            const {
              frames: framesArray,
              videoMetaData,
              videoName
            } = await getVideoFrames(fileName);
            delete videoMetaData.filename;
            const frames = framesArray.map(
              (frame: string) => `${ServerURL}/uploads/youtube-videos/${frame}`
            );
            const moveResult: Document | any = new MoveModel({
              videoUrl: videoURL,
              frames: orderBy(frames),
              userId: headToken.id,
              videoMetaData,
              videoName
            });
            await moveResult.save();
            return res.status(200).json({
              message: "Video uploaded successfully!",
              videoUrl: videoURL,
              moveData: moveResult,
              frames
            });
          });
        }
      });
    } else {
      return res.status(400).json({
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
/**
 *
 */
const getVideoFrames = async (videoName: string): Promise<any> => {
  const videoURL: string = path.join(
    __dirname,
    "..",
    "uploads",
    "youtube-videos",
    videoName
  );
  const dirName: string = videoURL;
  const video = await new ffmpeg(videoURL);
  const videoDuration = (video.metadata.duration as any).seconds;
  console.log(videoDuration / 10);
  return await new Promise((resolve, reject) => {
    video.fnExtractFrameToJPG(
      `${dirName.split(".")[0]}_frames`,
      {
        start_time: 0,
        every_n_percentage: 10
      },
      (error: any, file: any) => {
        console.log(error);
        if (error) {
          reject(error);
        }
        console.log("====================================");
        console.log(file);
        console.log("====================================");
        const frames: string[] = (file as any).map((f: string) => {
          const fArray = f.split("/");
          return `${fArray[fArray.length - 2]}/${fArray[fArray.length - 1]}`;
        });
        resolve({ frames, videoMetaData: video.metadata, videoName });
      }
    );
  });
};
/*  */
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
      setId: query.setId,
      isDeleted: false
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

//-----Decrypt  setId to get moveDetails for shared link [public access set component]-----------------
const publicUrlMoveDetails = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { query } = req;
    const { setId, isPublic, fromFolder } = query;
    const decryptedSetId = decrypt(setId);
    let result: Document | any | null;
    let temp: Document | any | null, movesData: Document | any;

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

      movesData = await MoveModel.find({
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
      movesData: movesData,
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};
/**
 *
 */
const updateMoveDetailsAndTrimVideo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body } = req;
    const { timer, moveId, title, description, tags, setId } = body;
    const result: Document | null | any = await MoveModel.findById(moveId);
    if (result) {
      const videoFile = path.join(__dirname, "..", result.videoUrl);
      const fileName = `${
        result.videoUrl.split(".")[0]
      }_clip_${moment().unix()}.webm`;
      const videoFileMain = path.join(__dirname, "..", `${fileName}`);
      const video = await new ffmpeg(videoFile);
      const duration = timer.max - timer.min - 1;
      video
        .setVideoStartTime(timer.min)
        .setVideoDuration(duration)
        .setVideoFormat("webm")
        .save(videoFileMain, async (err: any, file: any) => {
          console.log(err, videoFile, file);
          if (err) {
            return res.status(400).json({
              message:
                "We are having an issue while creating webm for you. Please try again."
            });
          }
          await MoveModel.updateOne(
            {
              _id: result._id
            },
            {
              moveURL: fileName,
              title,
              description,
              tags,
              setId,
              videoMetaData: {
                ...result.videoMetaData,
                duration: {
                  ...result.videoMetaData.duration,
                  seconds: duration
                }
              }
            }
          );
          return res.status(200).json({
            responsecode: 200,
            data: result
          });
        });
    } else {
      return res.status(400).json({
        message: "You've requested to update an unknown move."
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

/**
 *
 */
//------------------Copy move------------------
const copyMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const moveDetails: IMoveCopy = {
      title: body.title ? body.title : "",
      description: body.description ? body.description : "",
      status: body.status ? body.status : "",
      isDeleted: body.isDeleted,
      isPublic: body.isPublic,
      frames: body.frames ? body.frames : "",
      moveURL: body.moveURL,
      setId: body.setId,
      tags: body.tags ? body.tags : "",
      userId: body.userId,
      videoMetaData: body.videoMetaData ? body.videoMetaData : "",
      videoName: body.videoName,
      videoUrl: body.videoUrl,
      isCopy: body.isCopy
    };
    const moveData: Document | any = new MoveModel(moveDetails);
    await moveData.save();
    if (!moveData) {
      res.status(400).json({
        message: "Failed to create a copy! Please try again."
      });
    }
    res.status(200).json({
      data: moveData,
      message: "Move Copy has been created successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

//-----------------------Starred mark api-----------------------
const isStarredMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { moveId, isStarred } = query;
    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found"
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          isStarred: isStarred
        }
      }
    );

    res.status(200).json({
      message: "Move has been starred successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

//--------------------Remove move----------------------
const deleteMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { moveId } = query;
    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found"
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          isDeleted: true
        }
      }
    );

    res.status(200).json({
      message: "Move has been deleted successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

//-------------------Transfer moves------------------------
const transferMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { setId, moveId } = body;
    console.log(">>>>>>", moveId);
    if (!setId) {
      res.status(400).json({
        message: "SetId not found"
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          setId: setId
        }
      }
    );

    res.status(200).json({
      message: "Move has been transferred successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

// //-----------------------Filter move details-----------------------
// const filterMove = async (req: Request, res: Response): Promise<any> => {
//   try {
//     const { body } = req;
//     const { search } = body;
//     let condition: any = {
//       $and: []
//     };
//     if (search) {
//       condition.$and.push({
//         $or: [
//           {
//             title: {
//               $regex: new RegExp(search.trim(), "i")
//             }
//           },
//           {
//             description: {
//               $regex: new RegExp(search.trim(), "i")
//             }
//           },
//           {
//             tags: {
//               $regex: new RegExp(search.trim(), "i")
//             }
//           }
//         ]
//       });
//     }
//     const searchData: Document | any | null = MoveModel.find({ condition });
//     console.log(">>>", searchData);
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       message: error.message
//     });
//   }
// };

export {
  downloadVideo,
  getMoveBySetId,
  downloadYoutubeVideo,
  getMoveDetailsById,
  publicUrlMoveDetails,
  updateMoveDetailsAndTrimVideo,
  copyMove,
  isStarredMove,
  deleteMove,
  transferMove
};
