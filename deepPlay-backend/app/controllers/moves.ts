import { Request, Response } from "express";
import {
  CloudinaryAPIKey,
  CloudinaryAPISecretKey,
  CloudName,
  IsProductionMode
} from "../config";
import cloudinary from "cloudinary";
import { Document } from "mongoose";
import ytdl from "ytdl-core";
import { MoveModel, SetModel } from "../models";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg";
import { decrypt } from "../common";
import { IMoveCopy } from "../interfaces";
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
    const moveResult: Document | any = new MoveModel({
      videoUrl: videoURL,
      userId: headToken.id,
      sourceUrl: videoURL,
      isYoutubeUrl: false,
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
          ytdl(body.url).pipe(
            (videoStream = fs.createWriteStream(originalVideoPath))
          );
          videoStream.on("close", async function () {
            const moveResult: Document | any = new MoveModel({
              videoUrl: videoURL,
              sourceUrl: body.url,
              isYoutubeUrl: true,
              userId: headToken.id
            });
            await moveResult.save();
            return res.status(200).json({
              message: "Video uploaded successfully!",
              videoUrl: videoURL,
              moveData: moveResult
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
const createMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body, currentUser } = req;
    const { moveUrl } = body;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }

    const moveResult: Document | any = new MoveModel({
      videoUrl: moveUrl,
      userId: headToken.id
    });
    await moveResult.save();

    return res.status(200).json({
      message: "Created new move",
      moveId: moveResult._id,
      success: true
    });
  } catch (error) {
    console.log(error, "kkkkk");
    res.status(500).send({
      message: error.message
    });
  }
};
/*  */
// --------------Get all set info---------------------
const getMoveBySetId = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser, query } = req;
    const { page, limit } = query
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
    let movesData: Document | any
    if (query.isStarred === "true") {
      movesData = await MoveModel.find({
        setId: query.setId,
        isDeleted: false,
        isStarred: true
      })
        .skip(pageNumber)
        .limit(limitNumber)
    } else {
      movesData = await MoveModel.find({
        setId: query.setId,
        isDeleted: false
      })
        .skip(pageNumber)
        .limit(limitNumber)
    }

    const totalMoves: Document | any | null = await MoveModel.count({
      setId: query.setId,
      isDeleted: false
    })
    return res.status(200).json({
      movesData: movesData,
      totalMoves: totalMoves
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
        message: {
          message: "Public access link is not enabled.",
          setId: decryptedSetId
        }
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
      let videoFile: String 
      if (IsProductionMode) {
        videoFile = path.join(
          __dirname,
          result.videoUrl
        );
      } else {
        videoFile = path.join(
          __basedir,
          "..",
          result.videoUrl
        );
      }
      cloudinary.v2.uploader.upload(
        videoFile,
        {
          start_offset: timer.min,
          end_offset: timer.max,
          resource_type: "video",
          format: "webm",
          eager_async: true,
        },
        async function (error: any, moveData: any) {
          if (error) {
            console.log(">>>>>>>>>>>Error", error);
            return res.status(400).json({
              responsecode: 400,
              message: error.message
            });
          } else {
            console.log(">>>>>>>>>>>Success", result);
            
            fs.unlinkSync(videoFile);
            await MoveModel.updateOne(
              {
                _id: result._id
              },
              {
                moveURL: moveData.url,
                title,
                description,
                tags,
                setId
              }
            );
            return res.status(200).json({
              responsecode: 200,
              data: result,
              setId: setId
            });
          }
        }
      );
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

    return res.status(200).json({
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

    return res.status(200).json({
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

    return res.status(200).json({
      message: "Move has been transferred successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

//-----------------------Filter move details-----------------------
const filterMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query } = req;
    const { search, setId } = query;
    let searchData: Document | any | null;
    let condition: any = {
      $and: []
    };
    condition.$and.push({
      isDeleted: false,
      setId: setId
    });

    if (search) {
      condition.$and.push({
        $or: [
          {
            title: {
              $regex: new RegExp(search.trim(), "i")
            }
          },
          {
            description: {
              $regex: new RegExp(search.trim(), "i")
            }
          },
          {
            tags: {
              $regex: new RegExp(search.trim(), "i")
            }
          }
        ]
      });
      searchData = await MoveModel.find(condition);
    }

    return res.status(200).json({
      message: "Move has been searched successfully",
      data: searchData
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

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
  transferMove,
  createMove,
  filterMove
};
