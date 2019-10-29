import { Request, Response, response } from "express";
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
import { MoveModel, SetModel, TagModel } from "../models";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg";
import { decrypt } from "../common";
import { IMoveCopy, IUpdateMove } from "../interfaces";
import moment from "moment";
import { s3BucketUpload } from "../common/awsBucket";
import { algoliaAppId, algoliaAPIKey } from "../config/app";
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index = client.initIndex("deep_play_data");
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
      sourceUrl: videoURL,
      frames: frames,
      videoMetaData,
      videoName,
      isYoutubeUrl: false
    });
    await moveResult.save();
    res.status(200).json({
      message: "Video uploaded successfully!",
      videoUrl: videoURL,
      moveData: moveResult,
      frames,
      videoMetaData,
      videoName
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
              sourceUrl: body.url,
              isYoutubeUrl: true,
              userId: headToken.id,
              frames: frames,
              videoMetaData,
              videoName
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
/**
 *
 */
const getVideoFrames = async (videoName: string): Promise<any> => {
  let videoURL: string;
  if (IsProductionMode) {
    videoURL = path.join(__dirname, "uploads", "youtube-videos", videoName);
  } else {
    videoURL = path.join(
      __dirname,
      "..",
      "uploads",
      "youtube-videos",
      videoName
    );
  }

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

    let fileName: string[] = moveUrl.split("/");
    const {
      frames: framesArray,
      videoMetaData,
      videoName
    } = await getVideoFrames(fileName[2]);
    delete videoMetaData.filename;
    const frames = framesArray.map(
      (frame: string | null) => `${ServerURL}/uploads/youtube-videos/${frame}`
    );
    const moveResult: Document | any = new MoveModel({
      videoUrl: moveUrl,
      userId: headToken.id,
      sourceUrl: moveUrl,
      frames: frames,
      videoMetaData,
      videoName,
      isYoutubeUrl: false
    });
    await moveResult.save();
    return res.status(200).json({
      message: "Created new move",
      moveId: moveResult._id,
      videoUrl: moveUrl,
      moveData: moveResult,
      frames,
      videoMetaData,
      videoName,
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
    const { page, limit } = query;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
    let movesData: Document | any;
    if (query.isStarred === "true") {
      movesData = await MoveModel.find({
        setId: query.setId,
        isDeleted: false,
        isStarred: true
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber)
        .sort({ sortIndex: 1 });
    } else {
      movesData = await MoveModel.find({
        setId: query.setId,
        isDeleted: false
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber)
        .sort({ sortIndex: 1 });
    }
    const moveList: Document | any | null = await MoveModel.populate(
      movesData,
      { path: "setId.folderId" }
    );
    let totalMoves: Document | any | null;
    if (query.isStarred === "true") {
      totalMoves = await MoveModel.count({
        setId: query.setId,
        isDeleted: false,
        isStarred: true
      });
    } else {
      totalMoves = await MoveModel.count({
        setId: query.setId,
        isDeleted: false
      });
    }
    return res.status(200).json({
      movesData: moveList,
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
    const { setId, isPublic, fromFolder, page, limit } = query;
    const decryptedSetId = decrypt(setId);
    let result: Document | any | null;
    let temp: Document | any | null, movesData: Document | any;
    // const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    // const limitNumber: number = parseInt(limit) || 20;

    if (fromFolder) {
      temp = {
        isPublic: true
      };
    }
    if (decryptedSetId && !fromFolder) {
      temp = await SetModel.findOne({
        _id: decryptedSetId
      });
    }

    if (temp.isPublic) {
      result = await MoveModel.find({
        setId: decryptedSetId
      });
      // .skip(pageNumber)
      // .limit(limitNumber);
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
      let videoFile: String | any;
      if (IsProductionMode) {
        videoFile = path.join(__dirname, result.videoUrl);
      } else {
        videoFile = path.join(__basedir, "..", result.videoUrl);
      }
      // cloudinary.v2.uploader.upload(
      //   videoFile,
      //   {
      //     start_offset: timer.min,
      //     end_offset: timer.max,
      //     resource_type: "video",
      //     format: "webm",
      //     eager_async: true,
      //   },
      //   async function(error: any, moveData: any) {
      //     if (error) {
      //       console.log(">>>>>>>>>>>Error", error);
      //       return res.status(400).json({
      //         responsecode: 400,
      //         message: error.message
      //       });
      //     } else {
      //       console.log(">>>>>>>>>>>Success", result);

      //       fs.unlinkSync(videoFile);
      //       await MoveModel.updateOne(
      //         {
      //           _id: result._id
      //         },
      //         {
      //           moveURL: moveData.url,
      //           title,
      //           description,
      //           tags,
      //           setId
      //         }
      //       );
      //       return res.status(200).json({
      //         responsecode: 200,
      //         data: result,
      //         setId: setId
      //       });
      //     }
      //   }
      // );

      const fileName = `${
        result.videoUrl.split(".")[0]
      }_clip_${moment().unix()}.webm`;
      let videoFileMain: String | any, videoOriginalFile: String | any;
      if (IsProductionMode) {
        videoFileMain = path.join(__dirname, `${fileName}`);
      } else {
        videoFileMain = path.join(__dirname, "..", `${fileName}`);
      }
      if (IsProductionMode) {
        videoOriginalFile = path.join(__dirname, `${result.videoUrl}`);
      } else {
        videoOriginalFile = path.join(__dirname, "..", `${result.videoUrl}`);
      }
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
          const s3VideoUrl = await s3BucketUpload(
            videoFileMain,
            "deep-play.webm",
            "moves"
          );
          let moveDataForAlgolia: Document | any;
          /* Add items to algolia */
          moveDataForAlgolia = {
            _id: result._id,
            moveURL: s3VideoUrl,
            title,
            description,
            tags,
            setId,
            userId: result.userId,
            isDeleted: result.isDeleted,
            videoMetaData: {
              ...result.videoMetaData,
              duration: {
                ...result.videoMetaData.duration,
                seconds: duration
              }
            },
            searchType: "move"
          };
          index.addObjects(
            [moveDataForAlgolia],
            (err: string, content: string) => {
              if (err) throw err;
            }
          );
          /*  */
          await MoveModel.updateOne(
            {
              _id: result._id
            },
            {
              moveURL: s3VideoUrl,
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
            data: result,
            setId: setId,
            videoOriginalFile: videoOriginalFile,
            videoFileMain: videoFileMain,
            s3VideoUrl: s3VideoUrl
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
    return res.status(200).json({
      message: `Move has been ${
        isStarred === "true" ? "starred" : "Unstarred"
      } successfully!`
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
            "tags.label": {
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

//------------------------Add Tags Single & Multiple--------------------------
const addTagsInMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { tags, moveId } = body;
    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found"
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          tags: tags
        }
      }
    );

    return res.status(200).json({
      message: "Tags have been added successfully!"
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

//-----------------------Move index update----------------
const updateMoveIndex = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { setId, sortIndex, moveId, movesOfSet } = body;

    let num: number = parseInt(sortIndex);
    let num1: number = parseInt(sortIndex);

    for (let index = 0; index < movesOfSet.length; index++) {
      await MoveModel.updateOne(
        { setId: setId, _id: movesOfSet[index]._id },
        { $set: { sortIndex: index } }
      );
    }

    // await MoveModel.updateOne(
    //   { setId: setId, _id: moveId },
    //   { $set: { sortIndex: sortIndex } }
    // );

    // let result = await MoveModel.find({
    //   _id: { $ne: moveId },
    //   setId: setId,
    //   isDeleted: false,
    //   sortIndex: { $gte: sortIndex }
    // }).sort({ sortIndex: 1 });

    // let result_data = await MoveModel.find({
    //   _id: { $ne: moveId },
    //   setId: setId,
    //   isDeleted: false,
    //   sortIndex: { $lt: sortIndex }
    // }).sort({ sortIndex: -1 });

    // if (result && result.length) {
    //   for (let index = 0; index < result.length; index++) {
    //     if (result[index]._id !== moveId) {
    //       await MoveModel.updateOne(
    //         { setId: setId, _id: result[index]._id },
    //         { $set: { sortIndex: ++num } }
    //       );
    //     }
    //   }
    // }

    // if (result_data && result_data.length) {
    //   for (let index = 0; index < result_data.length; index++) {
    //     if (result_data[index]._id !== moveId) {
    //       await MoveModel.updateOne(
    //         { setId: setId, _id: result_data[index]._id },
    //         { $set: { sortIndex: --num1 } }
    //       );
    //     }
    //   }
    // }

    const resp: Document | any | null = await MoveModel.find({
      setId: setId,
      isDeleted: false
    }).sort({
      sortIndex: 1
    });

    return res.status(200).json({
      message: "SortIndex have been updated successfully!",
      data: resp
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message
    });
  }
};

/* Remove video from local server */
const removeVideolocalServer = (req: Request, res: Response) => {
  const { body } = req;
  const { videoOriginalFile, videoFileMain } = body;
  if (videoOriginalFile && videoFileMain) {
    fs.unlinkSync(videoOriginalFile);
    fs.unlinkSync(videoFileMain);
    return res.status(200).json({
      success: true
    });
  } else {
    return res.status(400).json({
      message: "Video url not provided",
      success: false
    });
  }
};

//------------------Update Move Details-------------------------------
const updateMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { title, description, tags, moveId } = body;
    let updateMove: IUpdateMove = {
      title,
      description,
      tags
    };

    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found"
      });
    }
    await MoveModel.findByIdAndUpdate(moveId, {
      $set: { ...updateMove, updatedAt: Date.now() }
    });
    return res.status(200).json({
      message: "Move details updated successfully."
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

// --------------Get all Move info by search---------------------
const getMoveBySearch = async (req: Request, res: Response): Promise<any> => {
  try {
    const { currentUser, query } = req;
    const { page, limit, search } = query;
    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
    let movesData: Document | any,
      moveList: Document | any | null,
      totalMoves: Document | any | null;
    if (search) {
      if (query.isStarred === "true") {
        movesData = await MoveModel.find({
          title: {
            $regex: new RegExp(search.trim(), "i")
          },
          isDeleted: false,
          isStarred: true
        })
          .populate("setId")
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
      } else {
        movesData = await MoveModel.find({
          title: {
            $regex: new RegExp(search.trim(), "i")
          },
          isDeleted: false
        })
          .populate("setId")
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
      }

      moveList = await MoveModel.populate(movesData, {
        path: "setId.folderId"
      });
      totalMoves = await MoveModel.count({
        title: {
          $regex: new RegExp(search.trim(), "i")
        },
        isDeleted: false
      });
    }
    return res.status(200).json({
      movesData: moveList,
      totalMoves: totalMoves
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

const addTags = async (req: Request, res: Response): Promise<void> => {
  try {
    const { currentUser, body } = req;
    let headToken: Request | any = currentUser;
    let tagData: Document | any;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    if (body.tags) {
      const tagDetails = {
        tags: body.tags ? body.tags : "",
        userId: headToken.id
      };
      tagData = new TagModel(tagDetails);
      await tagData.save();
    }
    res.status(200).json({
      data: tagData,
      message: "Tags have been added successfully",
      success: true
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message
    });
  }
};

//Get TagList from tag modal
const getTagListByUserId = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { currentUser } = req;
    let headToken: Request | any = currentUser,
      tagList: Document | null | any = [];

    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    const result: Document | any = await TagModel.find({
      userId: Mongoose.Types.ObjectId(headToken.id)
    });

    for (let index = 0; index < result.length; index++) {
      const element = result[index].tags;
      tagList.push(element);
    }

    res.status(200).json({
      data: tagList,
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
  publicUrlMoveDetails,
  updateMoveDetailsAndTrimVideo,
  copyMove,
  isStarredMove,
  deleteMove,
  transferMove,
  createMove,
  filterMove,
  addTagsInMove,
  updateMoveIndex,
  removeVideolocalServer,
  updateMove,
  getMoveBySearch,
  addTags,
  getTagListByUserId
};
