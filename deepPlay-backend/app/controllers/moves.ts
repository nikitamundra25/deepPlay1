import { Request, Response } from "express";
import { IsProductionMode, ServerURL } from "../config";
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
var CronJob = require("cron").CronJob;
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index: any = client.initIndex("deep_play_data");
const __basedir = path.join(__dirname, "../public");

/**
 * Title:- Download Video to local server
 * Prams:- valid youtube video url
 * Created By:- Rishabh Bula
 */

const downloadVideo = async (req: Request, res: Response): Promise<any> => {
  const { file, currentUser, body } = req;
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
      isYoutubeUrl: false,
      setId: body.setId !== "undefined" ? body.setId : null
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
          ytdl(body.url, { quality: "highest" }).pipe(
            (videoStream = fs.createWriteStream(originalVideoPath))
          );
          videoStream.on("open", async function() {
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
              videoName,
              setId: body.setId !== "undefined" ? body.setId : null
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
  return await new Promise((resolve, reject) => {
    console.log("Inside Feeee Video");
    video.fnExtractFrameToJPG(
      `${dirName.split(".")[0]}_frames`,
      {
        start_time: 0,
        frame_rate: 20 / videoDuration
      },
      (error: any, file: any) => {
        if (error) {
          console.log(error);
          reject(error);
        }
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
    const {
      moveUrl,
      frames,
      videoMetaData,
      videoName,
      sourceUrl,
      isYoutubeUrl
    } = body;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }

    let moveResult: Document | any;
    if (!frames && !frames.length) {
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
      moveResult = new MoveModel({
        videoUrl: moveUrl,
        userId: headToken.id,
        frames: frames,
        videoMetaData: videoMetaData,
        videoName: videoName,
        isYoutubeUrl: false
      });
      await moveResult.save();
    } else {
      moveResult = new MoveModel({
        videoUrl: moveUrl,
        userId: headToken.id,
        sourceUrl: sourceUrl,
        frames: frames ? frames : null,
        videoMetaData: videoMetaData ? videoMetaData : null,
        videoName: videoName ? videoName : null,
        isYoutubeUrl: isYoutubeUrl ? isYoutubeUrl : false
      });
      await moveResult.save();
    }
    return res.status(200).json({
      message: "Move has been created successfully.",
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
    const { page, limit, sortIndex } = query;
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
        userId: headToken.id,
        isDeleted: false,
        isStarred: true
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber)
        .sort({ sortIndex: 1 });
    } else {
      // const moveListData: Document | any = await MoveModel.find({
      //   setId: query.setId,
      //   userId: headToken.id,
      //   isDeleted: false,
      //   moveURL: { $ne: null }
      // }).sort({ sortIndex: 1 });

      // let isRepetedSortIndex: Boolean = false;
      // if (moveListData && moveListData.length) {
      //   for (let index = 0; index < moveListData.length; index++) {
      //     const element = moveListData[index].sortIndex;
      //     const check = moveListData.filter(
      //       (item: any) => item.sortIndex === element
      //     );
      //     if (check && check.length > 1) {
      //       isRepetedSortIndex = true;
      //     }
      //   }
      // }
      // let num: number = 0;
      // if (isRepetedSortIndex) {
      //   for (let index = 0; index < moveListData.length; index++) {
      //     await MoveModel.updateOne(
      //       {
      //         _id: moveListData[index]._id
      //       },
      //       {
      //         sortIndex: ++num
      //       }
      //     );
      //   }
      // }

      movesData = await MoveModel.find({
        setId: query.setId,
        userId: headToken.id,
        isDeleted: false,
        moveURL: { $ne: null }
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber)
        .sort({ sortIndex: 1 });
    }
    const moveList: Document | any | null = await MoveModel.populate(
      movesData,
      { path: "setId.folderId", match: { isDeleted: false } }
    );
    let totalMoves: Document | any | null;
    if (query.isStarred === "true") {
      totalMoves = await MoveModel.count({
        setId: query.setId,
        userId: headToken.id,
        isDeleted: false,
        isStarred: true,
        moveURL: { $ne: null }
      });
    } else {
      totalMoves = await MoveModel.count({
        setId: query.setId,
        userId: headToken.id,
        isDeleted: false,
        moveURL: { $ne: null }
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
    const { setId, isPublic, fromFolder, page, limit, userId } = query;
    const decryptedSetId = decrypt(setId);
    const decryptedUserId = decrypt(userId);
    let result: Document | any | null, totalMove: Document | any | null;
    let temp: Document | any | null, movesData: Document | any;
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
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
        setId: decryptedSetId,
        userId: decryptedUserId,
        isDeleted: false,
        moveURL: { $ne: null }
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber);

      totalMove = await MoveModel.count({
        setId: decryptedSetId,
        userId: decryptedUserId,
        isDeleted: false,
        moveURL: { $ne: null }
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
      totalMoves: totalMove,
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
    const { body, currentUser } = req;
    let headToken: Request | any = currentUser;
    const { timer, moveId, title, description, tags, setId, frames } = body;
    const result: Document | null | any = await MoveModel.findById(moveId);
    const temp: Document | null | any = await SetModel.findById(setId);
    const setData = temp.isVideoProcessing;
    setData.push({ isLoading: true, index: temp.isVideoProcessing.length });
    const resp: Document | null | any = await SetModel.updateOne(
      {
        _id: setId
      },
      {
        isVideoProcessing: setData
      }
    );

    await MoveModel.updateOne(
      {
        _id: result._id
      },
      {
        title,
        description,
        tags,
        startTime: timer.min ? timer.min : 0,
        sourceUrl: result.sourceUrl ? result.sourceUrl : null,
        isYoutubeUrl: result.isYoutubeUrl ? result.isYoutubeUrl : false,
        setId,
        videoMetaData: {},
        isMoveProcessing: true,
        moveURL: ""
      }
    );

    //update sort index by 1
    const moveListData: Document | any = await MoveModel.find({
      setId: setId,
      isDeleted: false,
      moveURL: { $ne: null }
    }).sort({ sortIndex: 1 });

    for (let index = 0; index < moveListData.length; index++) {
      await MoveModel.updateOne(
        { setId: setId, _id: moveListData[index]._id },
        { $set: { sortIndex: index + 1 } }
      );
    }
    //-------

    let thumbnailPath: any[] = [];
    if (frames && frames.length) {
      if (IsProductionMode) {
        thumbnailPath = frames.split("8005");
      } else {
        thumbnailPath = frames.split("8000");
      }
    }
    if (result) {
      let videoFile: String | any, videoThumbnail: String | any;
      if (IsProductionMode) {
        videoFile = path.join(__dirname, result.videoUrl);
        if (thumbnailPath && thumbnailPath.length) {
          videoThumbnail = path.join(__dirname, thumbnailPath[1]);
          console.log(videoThumbnail, "videoThumbnail");
        }
      } else {
        videoFile = path.join(__basedir, "..", result.videoUrl);
        if (thumbnailPath && thumbnailPath.length) {
          videoThumbnail = path.join(__basedir, "..", thumbnailPath[1]);
        }
      }
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
      const duration = timer.max - timer.min;
      video
        .setVideoStartTime(timer.min)
        .setVideoDuration(duration)
        .setVideoFormat("webm")
        .save(videoFileMain, async (err: any, file: any) => {
          console.log("=========================");
          console.log(err);
          console.log("=========================");
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
          let s3VideoThumbnailUrl: any | null;
          if (videoThumbnail) {
            s3VideoThumbnailUrl = await s3BucketUpload(
              videoThumbnail,
              "deep-play.jpeg",
              "moves-thumbnail"
            );
          }
          let moveDataForAlgolia: Document | any;
          /* Add items to algolia */
          moveDataForAlgolia = {
            _id: result._id,
            moveURL: s3VideoUrl,
            title,
            description,
            startTime: timer.min ? timer.min : 0,
            sourceUrl: result.sourceUrl ? result.sourceUrl : null,
            tags,
            setId,
            isYoutubeUrl: result.isYoutubeUrl ? result.isYoutubeUrl : false,
            userId: result.userId,
            isDeleted: result.isDeleted,
            createdAt: result.createdAt,
            videoMetaData: {
              ...result.videoMetaData,
              duration: {
                ...result.videoMetaData.duration,
                seconds: duration
              }
            },
            videoThumbnail: s3VideoThumbnailUrl ? s3VideoThumbnailUrl : null,
            searchType: "move"
          };
          let temp: any;

          index.addObjects(
            [moveDataForAlgolia],
            async (err: string, content: any) => {
              if (err) throw err;
              temp = content.objectIDs[0];
              await MoveModel.updateOne(
                { _id: result._id },
                {
                  objectId: temp,
                  videoThumbnail: s3VideoThumbnailUrl
                    ? s3VideoThumbnailUrl
                    : null
                }
              );
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
              sortIndex: 0,
              isMoveProcessing: false,
              startTime: timer.min ? timer.min : 0,
              videoMetaData: {
                ...result.videoMetaData,
                duration: {
                  ...result.videoMetaData.duration,
                  seconds: duration
                }
              }
            }
          );

          const stemp: Document | null | any = await SetModel.findById(setId);
          const setData1 = stemp.isVideoProcessing;
          setData1.pop();
          await SetModel.updateOne(
            {
              _id: setId
            },
            {
              isVideoProcessing: setData1
            }
          );

          return res.status(200).json({
            responsecode: 200,
            data: result,
            setId: setId,
            videoOriginalFile: videoOriginalFile,
            videoFileMain: videoFileMain,
            s3VideoUrl: s3VideoUrl,
            videoThumbnail: s3VideoThumbnailUrl
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

    let objectIds: Document | any = [],
      stemp: any | string;
    for (let index = 0; index < moveId.length; index++) {
      const element = moveId[index];
      const result: any = await MoveModel.find({ _id: element });
      if (result && result.length && result[0].objectId) {
        objectIds = [...objectIds, result[0].objectId];
      }
    }

    if (objectIds) {
      index.deleteObjects(objectIds, (err: string, content: any) => {
        if (err) throw err;
      });
    }
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
    const { query, currentUser } = req;
    const { search, setId, page, limit } = query;
    let searchData: Document | any | null, totalMoves: Number | any | null;
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found"
      });
    }
    let condition: any = {
      $and: []
    };
    condition.$and.push({
      isDeleted: false,
      setId: setId,
      userId: headToken.id,
      moveURL: { $ne: null }
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
            "tags.label": search.trim()
          }
        ]
      });
      searchData = await MoveModel.find(condition)
        .skip(pageNumber)
        .limit(limitNumber);

      totalMoves = await MoveModel.count(condition);
    }

    return res.status(200).json({
      message: "Move has been searched successfully",
      data: searchData,
      totalMoves: totalMoves
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
    const { data } = body;
    const { tags, moveId, fromMoveList, description, edit } = data;
    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found"
      });
    }
    if (fromMoveList) {
      for (let i = 0; i < moveId.length; i++) {
        const moveid = moveId[i];
        const result: Document | null | any = await MoveModel.findById(moveid, {
          tags: 1
        });
        const tagArr: Document | any | null = result.tags;
        if (tagArr && tagArr.length) {
          let oldTagArray: { label: string }[] = tagArr;
          var array3: any[] = oldTagArray.concat(
            tags.filter(
              (item: any) =>
                oldTagArray.findIndex((tag: any) => tag.label === item.label) <
                0
            )
          );
          await MoveModel.updateOne(
            { _id: moveid },
            {
              $set: {
                tags: array3
              }
            }
          );

          const result1: any = await MoveModel.find({ _id: moveid });
          const stemp = result1.length ? result1[0].objectId : null;
          if (stemp) {
            index.partialUpdateObject(
              {
                tags: array3,
                objectID: stemp
              },
              (err: string, content: any) => {
                if (err) throw err;
                console.log(content);
              }
            );
          }
        } else {
          await MoveModel.updateOne(
            { _id: moveid },
            {
              $set: {
                tags: tags
              }
            }
          );
          const result1: any = await MoveModel.find({ _id: moveid });
          const stemp = result1.length ? result1[0].objectId : null;
          if (stemp) {
            index.partialUpdateObject(
              {
                tags: tags,
                objectID: stemp
              },
              (err: string, content: any) => {
                if (err) throw err;
                console.log(content);
              }
            );
          }
        }
      }
    } else {
      await MoveModel.updateOne(
        { _id: moveId },
        {
          $set: {
            tags: tags,
            description: description
          }
        }
      );

      const result1: any = await MoveModel.find({ _id: moveId });
      const stemp = result1.length ? result1[0].objectId : null;
      if (stemp) {
        index.partialUpdateObject(
          {
            description: description,
            tags: tags,
            objectID: stemp
          },
          (err: string, content: any) => {
            if (err) throw err;
            console.log(content);
          }
        );
      }
    }
    if (fromMoveList) {
      return res.status(200).json({
        message: "Tags have been updated successfully"
      });
    } else if (!fromMoveList && !edit) {
      return res.status(200).json({
        message: "Tags have been updated for this move successfully"
      });
    } else if (edit) {
      return res.status(200).json({
        message: "Move details have been updated successfully"
      });
    } else {
      return res.status(200).json({
        message: "Tags have been updated for this move successfully"
      });
    }
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
        { $set: { sortIndex: index + 1 } }
      );
    }
    const resp: Document | any | null = await MoveModel.find({
      setId: setId,
      isDeleted: false,
      moveURL: { $ne: null }
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

    const result1: any = await MoveModel.find({ _id: moveId });
    const stemp = result1.length ? result1[0].objectId : null;
    if (stemp) {
      index.partialUpdateObject(
        {
          title: title,
          description: description,
          tags: tags,
          objectID: stemp
        },
        (err: string, content: any) => {
          if (err) throw err;
          console.log(content);
        }
      );
    }
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
          isStarred: true,
          moveURL: { $ne: null }
        })
          .populate({
            path: "setId",
            match: { isDeleted: false }
          })
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
      } else {
        movesData = await MoveModel.find({
          title: {
            $regex: new RegExp(search.trim(), "i")
          },
          isDeleted: false,
          userId: headToken.id,
          moveURL: { $ne: null }
        })
          .populate({
            path: "setId",
            match: { isDeleted: false }
          })
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
      }

      moveList = await MoveModel.populate(movesData, {
        path: "setId.folderId",
        match: { isDeleted: false }
      });

      totalMoves = await MoveModel.count({
        title: {
          $regex: new RegExp(search.trim(), "i")
        },
        isDeleted: false,
        userId: headToken.id,
        moveURL: { $ne: null }
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
/*
/*
*/

//Running cron job to remove local server videos
new CronJob(
  "00 00 00 * * *",
  async (req: Request, res: Response) => {
    console.log("You will see this at midnight");
    try {
      let dirPath: string | any;
      if (IsProductionMode) {
        dirPath = path.join(__dirname, "uploads", "youtube-videos");
      } else {
        dirPath = path.join(__basedir, "../uploads", "youtube-videos");
      }
      fs.readdir(dirPath, (err, files) => {
        if (err) throw err;
        for (const file of files) {
          const isDir: any[] = file.split("frames");
          if (isDir[1] !== undefined) {
            if (IsProductionMode) {
              const folderPath = path.join(
                __dirname,
                "uploads",
                "youtube-videos",
                file
              );
              fs.readdir(folderPath, (err, files) => {
                if (files && files.length) {
                  fs.unlink(path.join(folderPath, file), err => {
                    if (err) throw err;
                  });
                } else {
                  fs.rmdirSync(folderPath);
                }
              });
            } else {
              const folderPath = path.join(
                __basedir,
                "../uploads",
                "youtube-videos",
                file
              );
              fs.readdir(folderPath, (err, files) => {
                if (files && files.length) {
                  for (const file of files) {
                    fs.unlink(path.join(folderPath, file), err => {
                      if (err) throw err;
                    });
                  }
                } else {
                  fs.rmdirSync(folderPath);
                }
              });
            }
          } else {
            fs.unlink(path.join(dirPath, file), err => {
              if (err) throw err;
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  },
  null,
  true,
  "America/Los_Angeles"
);

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
