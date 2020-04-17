import { Request, Response } from "express";
import { IsProductionMode, ServerURL } from "../config";
import Mongoose, { Document } from "mongoose";
import ytdl from "ytdl-core";
import { MoveModel, SetModel, TagModel } from "../models";
import fs from "fs";
import path from "path";
import ffmpeg from "ffmpeg";
import FFMpeg from "fluent-ffmpeg";
import { decrypt } from "../common";
import { IMoveCopy, IUpdateMove } from "../interfaces";
import moment, { min } from "moment";
import { s3BucketUpload } from "../common/awsBucket";
import { algoliaAppId, algoliaAPIKey } from "../config/app";
import request from "request";
import youtubedl from "youtube-dl";
import ThumbnailGenerator from "video-thumbnail-generator";
import { exec } from "child_process";
import JobQueue from "../common/Queue";
import url from "url";
const instagramUtil = require("../common/instagramUtil");
var CronJob = require("cron").CronJob;
const algoliasearch = require("algoliasearch");
const client = algoliasearch(algoliaAppId, algoliaAPIKey);
const index: any = client.initIndex("deep_play_data");
const __basedir = path.join(__dirname, "../public");
let ObjectId = require("mongoose").Types.ObjectId;
/**
 * Title:- Download Video to local server
 * Prams:- valid youtube video url
 * Created By:- Rishabh Bula
 */

const downloadVideo = async (req: Request, res: Response): Promise<any> => {
  const { file, currentUser, body } = req;
  try {
    const headToken: Request | any = currentUser;
    let videoURL: string;
    const fileName = file.filename;
    videoURL = path.join("uploads", "youtube-videos", fileName);

    /* Generate thumbnail and upload on s3 start
     */
    let s3VideoThumbnailUrl: any | null,
      videoFile: string,
      videoThumbnail: string;

    const videoRes: string = await generateThumbanail(fileName);
    if (IsProductionMode) {
      videoFile = path.join(__dirname, videoURL);
      videoThumbnail = videoRes ? videoRes : "";
    } else {
      videoFile = path.join(__basedir, "..", videoURL);
      videoThumbnail = videoRes ? videoRes : "";
    }
    if (videoThumbnail) {
      s3VideoThumbnailUrl = await s3BucketUpload(
        videoThumbnail,
        "deep-play.jpeg",
        "moves-thumbnail"
      );
    }
    /* Generated thumbnail and upload on s3 end
     */

    const moveResult: Document | any = new MoveModel({
      videoUrl: videoURL,
      userId: headToken.id,
      sourceUrl: videoURL,
      isYoutubeUrl: false,
      setId: body.setId !== "undefined" ? body.setId : null,
      videoThumbnail: s3VideoThumbnailUrl ? s3VideoThumbnailUrl : null,
    });
    await moveResult.save();
    res.status(200).json({
      message: "Video uploaded successfully!",
      videoUrl: videoURL,
      moveData: moveResult,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};
/**
 * Saves a move after uploading the video
 * @param {Request} req
 * @param {Response} res
 */
const uploadVideo = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body, currentUser, file } = req;
    const { id } = currentUser || {};
    const { setId } = body;
    const { filename } = file;
    const videoURL: string = `${ServerURL}/uploads/youtube-videos/${filename}`;
    const moveResult: Document = await MoveModel.create({
      videoUrl: videoURL,
      userId: id,
      sourceUrl: videoURL,
      isYoutubeUrl: false,
      setId: setId && setId != "undefined" ? setId : null,
    });
    return res.status(200).json({
      message: "Video uploaded successfully!",
      videoUrl: videoURL,
      moveData: moveResult,
    });
  } catch (error) {
    return res.status(500).send({
      message: error.message,
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
    const headToken: Request | any = currentUser;
    // execute command instead of calling the youtubedl method to speed up the process
    const ex = exec(
      `youtube-dl "${body.url}" --skip-download --get-url --format=best`
    );
    let youTubeUrl = "";
    const source: any = url.parse(body.url);
    const sourcePathnameArr = source.pathname.split("/");
    const youtubeId = sourcePathnameArr[sourcePathnameArr.length - 1];
    let thumbImg = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;

    !ex.stdout
      ? undefined
      : ex.stdout
          .on("data", (message: string) => {
            if (message && message.startsWith("https")) {
              youTubeUrl = message;
              console.log("youTubeUrl", youTubeUrl);
            }
          })
          .on("error", (err) => {
            console.log("Error", err);
            return res.status(400).json({
              message: "This Video is not available.",
              success: false,
            });
          })
          // once the process is end
          .on("end", async () => {
            if (!youTubeUrl) {
              return res.status(400).json({
                message: "This Video is not available.",
                success: false,
              });
            }
            console.log("youTubeUrl", youTubeUrl, thumbImg);
            const moveResult: Document | any = new MoveModel({
              videoUrl: youTubeUrl,
              sourceUrl: body.url,
              isYoutubeUrl: true,
              userId: headToken.id,
              videoThumbnail: thumbImg,
              setId: body.setId !== "undefined" ? body.setId : null,
            });
            await moveResult.save();
            return res.status(200).json({
              message: "Video uploaded successfully!",
              videoUrl: youTubeUrl,
              moveData: moveResult,
            });
          });
    // on error
    ex.on("error", () => {
      return res.status(400).json({
        message: "This Video is not available.",
        success: false,
      });
    });
  } catch (error) {
    return res.status(500).send({
      message: error.msg,
      success: false,
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
    video.fnExtractFrameToJPG(
      `${dirName.split(".")[0]}_frames`,
      {
        start_time: 0,
        frame_rate: 20 / videoDuration,
      },
      (error: any, file: any) => {
        if (error) {
          console.log(error);
          reject(error);
          return;
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
      videoName,
      sourceUrl,
      isYoutubeUrl,
      videoThumbnail,
      setId,
      audioUrl,
    } = body;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found",
      });
    }
    let moveResult: Document | any;

    moveResult = new MoveModel({
      videoUrl: moveUrl,
      userId: headToken.id,
      sourceUrl: sourceUrl,
      videoThumbnail: videoThumbnail ? videoThumbnail : null,
      videoName: videoName ? videoName : null,
      setId: setId ? setId : null,
      isYoutubeUrl: isYoutubeUrl ? isYoutubeUrl : false,
      audioUrl: audioUrl,
    });
    await moveResult.save();

    return res.status(200).json({
      message: "Move has been created successfully.",
      moveId: moveResult._id,
      videoUrl: moveUrl,
      moveData: moveResult,
      videoName,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
      success: false,
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
        message: "User id not found",
      });
    }

    if (!ObjectId.isValid(query.setId)) {
      res.status(400).json({
        message: "Set id not found",
        success: false,
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
        isStarred: true,
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
        moveURL: { $ne: null },
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
      totalMoves = await MoveModel.countDocuments({
        setId: query.setId,
        userId: headToken.id,
        isDeleted: false,
        isStarred: true,
        moveURL: { $ne: null },
      });
    } else {
      totalMoves = await MoveModel.countDocuments({
        setId: query.setId,
        userId: headToken.id,
        isDeleted: false,
        moveURL: { $ne: null },
      });
    }
    return res.status(200).json({
      movesData: moveList,
      totalMoves: totalMoves,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
        message: "User id not found",
      });
    }
    const movesData: Document | any = await MoveModel.findById(query.moveId);
    return res.status(200).json({
      movesData: movesData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
        isPublic: true,
      };
    }
    if (decryptedSetId && !fromFolder) {
      temp = await SetModel.findOne({
        _id: decryptedSetId,
      });
    }

    if (temp.isPublic) {
      result = await MoveModel.find({
        setId: decryptedSetId,
        userId: decryptedUserId,
        isDeleted: false,
        moveURL: { $ne: null },
      })
        .populate("setId")
        .skip(pageNumber)
        .limit(limitNumber)
        .sort({ sortIndex: 1 });

      totalMove = await MoveModel.countDocuments({
        setId: decryptedSetId,
        userId: decryptedUserId,
        isDeleted: false,
        moveURL: { $ne: null },
      });
    } else {
      return res.status(400).json({
        message: {
          message: "Public access link is not enabled.",
          setId: decryptedSetId,
        },
      });
    }
    return res.status(200).json({
      responsecode: 200,
      data: result,
      totalMoves: totalMove,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
    });
  }
};
/**
 * For uploading videos from youTube
 */
const updateMoveDetailsFromYouTubeAndTrim = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body, currentUser } = req;
    let headToken: Request | any = currentUser;
    const { timer, moveId, title, description, tags, setId } = body;
    console.log("Timmer", timer);
    const result: Document | null | any = await MoveModel.findById(moveId);
    const temp: Document | null | any = await SetModel.findById(setId);
    const setData = temp.isVideoProcessing;
    setData.push({ isLoading: true, index: temp.isVideoProcessing.length });
    const resp: Document | null | any = await SetModel.updateOne(
      {
        _id: setId,
      },
      {
        isVideoProcessing: setData,
      }
    );

    //update sort index by 1
    const moveListData: Document | any = await MoveModel.find({
      setId: setId,
      isDeleted: false,
      moveURL: { $ne: null },
    }).sort({ sortIndex: 1 });

    for (let index = 0; index < moveListData.length; index++) {
      if (moveListData[index]._id !== result._id) {
        await MoveModel.updateOne(
          { setId: setId, _id: moveListData[index]._id },
          { $set: { sortIndex: index + 1 } }
        );
      }
    }
    //-------

    await MoveModel.updateOne(
      {
        _id: result._id,
      },
      {
        title,
        description,
        tags,
        startTime: timer.min ? timer.min : 0,
        sourceUrl: result.sourceUrl ? result.sourceUrl : null,
        isYoutubeUrl: true,
        setId,
        videoMetaData: {},
        sortIndex: 0,
        isMoveProcessing: true,
        userId: headToken.id,
        moveURL: "",
      }
    );

    let originalVideoPath: string = "";
    const fileName = [
      headToken.id + Date.now() + "deep_play_video" + ".webm",
    ].join("");

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
    let videoStream: any;
    const video = youtubedl(result.sourceUrl, ["--format= 137"], {});
    // video.on('info', function(info) {
    //   console.log('Download started')
    //   console.log('filename: ' + info._filename)
    //   console.log('size: ' + info.size)
    // })
    console.log("Video", video);

    video.pipe(fs.createWriteStream(originalVideoPath));
    // ytdl(result.sourceUrl, { quality: "highest" }).pipe(
    //   (videoStream = fs.createWriteStream(originalVideoPath)) .size('1920x1080')
    // );

    video.on("close", async function () {
      const videoUrlFileName = originalVideoPath.split("uploads");
      const videoUrl = `uploads/${videoUrlFileName[1]}`;
      const fileName = `${videoUrl.split(".")[0]}_clip_${moment().unix()}.webm`;

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

      const video = await new ffmpeg(originalVideoPath);
      const duration = timer.max - timer.min;
      video
        .setVideoStartTime(timer.min)
        .setVideoDuration(duration)
        // .setVideoSize("1920x1080", true, false)
        .setVideoFormat("webm")
        .save(videoFileMain, async (err: any, file: any) => {
          console.log("=========================");
          console.log(err);
          console.log("=========================");
          if (err) {
            await MoveModel.updateOne(
              {
                _id: result._id,
              },
              {
                isDeleted: true,
              }
            );

            const stemp: Document | null | any = await SetModel.findById(setId);
            const setData1 = stemp.isVideoProcessing;
            setData1.pop();
            await SetModel.updateOne(
              {
                _id: setId,
              },
              {
                isVideoProcessing: setData1,
              }
            );

            return res.status(400).json({
              message:
                "We are having an issue while creating webm for you. Please try again.",
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
            startTime: timer.min ? timer.min : 0,
            sourceUrl: result.sourceUrl ? result.sourceUrl : null,
            tags,
            sortIndex: 0,
            setId,
            isYoutubeUrl: true,
            userId: headToken.id,
            isDeleted: result.isDeleted,
            createdAt: result.createdAt,
            videoMetaData: {},
            searchType: "move",
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
                  videoThumbnail: result.videoThumbnail,
                }
              );
            }
          );
          /*  */
          await MoveModel.updateOne(
            {
              _id: result._id,
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
              videoMetaData: {},
            }
          );

          const stemp: Document | null | any = await SetModel.findById(setId);
          const setData1 = stemp.isVideoProcessing;
          setData1.pop();
          await SetModel.updateOne(
            {
              _id: setId,
            },
            {
              isVideoProcessing: setData1,
            }
          );

          return res.status(200).json({
            responsecode: 200,
            data: result,
            setId: setId,
            videoOriginalFile: videoOriginalFile,
            videoFileMain: videoFileMain,
            s3VideoUrl: s3VideoUrl,
            videoThumbnail: result.videoThumbnail,
          });
        });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

/**
 * For Uploading videos from local server
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
        _id: setId,
      },
      {
        isVideoProcessing: setData,
      }
    );

    //update sort index by 1
    const moveListData: Document | any = await MoveModel.find({
      setId: setId,
      isDeleted: false,
      moveURL: { $ne: null },
    }).sort({ sortIndex: 1 });

    for (let index = 0; index < moveListData.length; index++) {
      await MoveModel.updateOne(
        { setId: setId, _id: moveListData[index]._id },
        { $set: { sortIndex: index + 1 } }
      );
    }
    //-------

    await MoveModel.updateOne(
      {
        _id: result._id,
      },
      {
        title,
        description,
        tags,
        startTime: timer.min ? timer.min : 0,
        sourceUrl: result.sourceUrl ? result.sourceUrl : null,
        isYoutubeUrl: result.isYoutubeUrl ? result.isYoutubeUrl : false,
        videoThumbnail: result.videoThumbnail ? result.videoThumbnail : null,
        setId,
        videoMetaData: {},
        isMoveProcessing: true,
        moveURL: "",
        sortIndex: 0,
      }
    );
    let thumbnailPath: any[] = [];

    if (result) {
      let videoFile: String | any;
      if (IsProductionMode) {
        videoFile = path.join(__dirname, result.videoUrl);
      } else {
        videoFile = path.join(__basedir, "..", result.videoUrl);
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
            await MoveModel.updateOne(
              {
                _id: result._id,
              },
              {
                isDeleted: true,
              }
            );

            const stemp: Document | null | any = await SetModel.findById(setId);
            const setData1 = stemp.isVideoProcessing;
            setData1.pop();
            await SetModel.updateOne(
              {
                _id: setId,
              },
              {
                isVideoProcessing: setData1,
              }
            );

            return res.status(400).json({
              message:
                "We are having an issue while creating webm for you. Please try again.",
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
            startTime: timer.min ? timer.min : 0,
            sourceUrl: result.sourceUrl ? result.sourceUrl : null,
            tags,
            setId,
            sortIndex: 0,
            isYoutubeUrl: result.isYoutubeUrl ? result.isYoutubeUrl : false,
            userId: result.userId,
            isDeleted: result.isDeleted,
            createdAt: result.createdAt,
            // videoMetaData: {
            //   ...result.videoMetaData,
            //   duration: {
            //     ...result.videoMetaData.duration,
            //     seconds: duration
            //   }
            // },
            videoThumbnail: result.videoThumbnail
              ? result.videoThumbnail
              : null,
            searchType: "move",
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
                  videoThumbnail: result.videoThumbnail
                    ? result.videoThumbnail
                    : null,
                }
              );
            }
          );
          /*  */
          await MoveModel.updateOne(
            {
              _id: result._id,
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
            }
          );

          const stemp: Document | null | any = await SetModel.findById(setId);
          const setData1 = stemp.isVideoProcessing;
          setData1.pop();
          await SetModel.updateOne(
            {
              _id: setId,
            },
            {
              isVideoProcessing: setData1,
            }
          );

          return res.status(200).json({
            responsecode: 200,
            data: result,
            setId: setId,
            videoOriginalFile: videoOriginalFile,
            videoFileMain: videoFileMain,
            s3VideoUrl: s3VideoUrl,
            videoThumbnail: result.videoThumbnail,
          });
        });
    } else {
      return res.status(400).json({
        message: "You've requested to update an unknown move.",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};
/**
 *
 * @param {Request} req
 * @param {Response} res
 */
const updateDetailsAndTrimVideo = async (
  req: Request,
  res: Response
): Promise<any> => {
  try {
    const { body, currentUser } = req;
    const { timer, moveId, title, description, tags, setId } = body;
    const { id: userId } = currentUser || {};
    const moveDetails: Document | any = await MoveModel.findOne({
      _id: moveId,
      userId,
    });
    if (!moveDetails) {
      throw new Error("This tag doesn't belogs to the logged in user.");
    }
    // update sort index of all other moves
    await MoveModel.updateMany(
      {
        setId,
        _id: {
          $ne: moveId,
        },
      },
      {
        $inc: {
          sortIndex: 1,
        },
      }
    );

    // set move details
    moveDetails.set("tags", tags);
    moveDetails.set("title", title);
    moveDetails.set("description", description);
    moveDetails.set("startTime", timer.min);
    moveDetails.set("endTime", timer.max);
    moveDetails.set("setId", setId);
    moveDetails.set("sortIndex", 0);
    moveDetails.set("isMoveProcessing", true);
    moveDetails.set("moveURL", "");
    // save the set details
    moveDetails.save();
    const videoPath: string = path.join(
      moveDetails.videoUrl.replace(ServerURL, "")
    );
    // push the process in JobQueue
    JobQueue.push((callback) => {
      processLocalVideo(moveDetails, callback);
    });
    return res.status(200).json({
      responsecode: 200,
      data: moveDetails,
      setId: setId,
      videoThumbnail: moveDetails.videoThumbnail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};
const processLocalVideo = async (moveDetails: any, callback: any) => {
  const { videoUrl, startTime, endTime } = moveDetails;
  let videoFilePath: string = videoUrl.replace(ServerURL, ""),
    videoFile: string = "",
    outputFile: string = "";
  const fileName = path.basename(videoFilePath);
  if (IsProductionMode) {
    videoFile = path.join(__dirname, videoFilePath);
    outputFile = path.join(
      __dirname,
      videoFilePath.replace(fileName, ""),
      `trimmed_${fileName}`
    );
  } else {
    videoFile = path.join(__basedir, "..", videoFilePath);
    outputFile = path.join(
      __basedir,
      "..",
      videoFilePath.replace(fileName, ""),
      `trimmed_${fileName}`
    );
  }
  console.log("Trimming process start for: %s", videoFile);
  trimVideo(startTime, endTime - startTime, videoFile, outputFile, (err) => {
    console.log(err);
    if (err) {
      console.log(err);
      return callback(err);
    }
    // generate thumbnail from the trimmed file
    getThumbnail(outputFile, async (err: any, videoThumbnail: string) => {
      console.log("err", err);
      console.log("====================================");
      console.log("videoThumbnail", videoThumbnail);
      console.log("====================================");
      const s3VideoThumbnailUrl = await s3BucketUpload(
        videoThumbnail,
        "deep-play.png",
        "moves-thumbnail"
      );
      moveDetails.set("videoThumbnail", s3VideoThumbnailUrl);
      // move clip to s3 and update details and save on algolia
      moveToS3AndSetDetails(outputFile, moveDetails, callback);
    });
  });
};
/**
 *
 * @param videPath
 */
const getThumbnail = async (videoPath: string, callback: any) => {
  let fileNames: string[] = [];
  const dir = path.join(path.dirname(videoPath), "..", "images-thumbnail");
  FFMpeg(videoPath)
    .takeScreenshots({
      count: 1,
      filename: `${moment().unix()}_${
        path.parse(videoPath).name
      }_thumbnail.png`,
      folder: dir,
    })
    .on("filenames", (filenames: string[]) => {
      fileNames = filenames.map((file) => `${dir}/${file}`);
    })
    .on("error", callback)
    .on("end", () => callback(null, fileNames[0]))
    .run();
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
      isCopy: body.isCopy,
    };
    const moveData: Document | any = new MoveModel(moveDetails);
    await moveData.save();
    if (!moveData) {
      res.status(400).json({
        message: "Failed to create a copy! Please try again.",
      });
    }
    res.status(200).json({
      data: moveData,
      message: "Move Copy has been created successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
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
        message: "MoveId not found",
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          isStarred: isStarred,
        },
      }
    );
    return res.status(200).json({
      message: `Move has been ${
        isStarred === "true" ? "starred" : "Unstarred"
      } successfully!`,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
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
        message: "MoveId not found",
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          isDeleted: true,
        },
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
      message:
        moveId.length > 1
          ? "Moves has been deleted successfully!"
          : "Move has been deleted successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
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
        message: "SetId not found",
      });
    }

    await MoveModel.updateMany(
      { _id: { $in: moveId } },
      {
        $set: {
          setId: setId,
        },
      }
    );

    return res.status(200).json({
      message: "Move has been transferred successfully!",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

//-----------------------Filter move details-----------------------
const filterMove = async (req: Request, res: Response): Promise<any> => {
  try {
    const { query, currentUser } = req;
    const { search, setId, page, limit, isStarred } = query;
    let searchData: Document | any | null, totalMoves: Number | any | null;
    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;

    let headToken: Request | any = currentUser;
    if (!headToken.id) {
      res.status(400).json({
        message: "User id not found",
      });
    }
    let condition: any = {
      $and: [],
    };
    condition.$and.push({
      isDeleted: false,
      setId: setId,
      userId: headToken.id,
      moveURL: { $ne: null },
    });

    if (search) {
      condition.$and.push({
        $or: [
          {
            title: {
              $regex: new RegExp(search.trim(), "i"),
            },
          },
          {
            description: {
              $regex: new RegExp(search.trim(), "i"),
            },
          },
          {
            "tags.label": {
              $regex: new RegExp(search.trim(), "i"),
            },
          },
        ],
      });

      if (isStarred === "true") {
        let conditionCheck = { ...condition, isStarred: true };
        searchData = await MoveModel.find(conditionCheck)
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
        totalMoves = await MoveModel.countDocuments(conditionCheck);
      } else {
        searchData = await MoveModel.find(condition)
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
        totalMoves = await MoveModel.countDocuments(condition);
      }
    }

    return res.status(200).json({
      message: "Move has been searched successfully",
      data: searchData,
      totalMoves: totalMoves,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
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
        message: "MoveId not found",
      });
    }
    if (fromMoveList) {
      for (let i = 0; i < moveId.length; i++) {
        const moveid = moveId[i];
        const result: Document | null | any = await MoveModel.findById(moveid, {
          tags: 1,
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
                tags: array3,
              },
            }
          );

          const result1: any = await MoveModel.find({ _id: moveid });
          const stemp = result1.length ? result1[0].objectId : null;
          if (stemp) {
            index.partialUpdateObject(
              {
                tags: array3,
                objectID: stemp,
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
                tags: tags,
              },
            }
          );
          const result1: any = await MoveModel.find({ _id: moveid });
          const stemp = result1.length ? result1[0].objectId : null;
          if (stemp) {
            index.partialUpdateObject(
              {
                tags: tags,
                objectID: stemp,
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
            description: description,
          },
        }
      );

      const result1: any = await MoveModel.find({ _id: moveId });
      const stemp = result1.length ? result1[0].objectId : null;
      if (stemp) {
        index.partialUpdateObject(
          {
            description: description,
            tags: tags,
            objectID: stemp,
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
        message: "Tags have been updated successfully",
      });
    } else if (!fromMoveList && !edit) {
      return res.status(200).json({
        message: "Tags have been updated for this move successfully",
      });
    } else if (edit) {
      return res.status(200).json({
        message: "Move details have been updated successfully",
      });
    } else {
      return res.status(200).json({
        message: "Tags have been updated for this move successfully",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
    });
  }
};

//-----------------------Move index update----------------
const updateMoveIndex = async (req: Request, res: Response): Promise<any> => {
  try {
    const { body } = req;
    const { setId, sortIndex, moveId, movesOfSet, parsed } = body;

    let num: number = parseInt(sortIndex);
    let num1: number = parseInt(sortIndex);

    for (let i = 0; i < movesOfSet.length; i++) {
      await MoveModel.updateOne(
        { setId: setId, _id: movesOfSet[i]._id },
        { $set: { sortIndex: i + 1 } }
      );
      let stemp = movesOfSet[i].objectId;
      if (stemp) {
        index.partialUpdateObject(
          {
            sortIndex: i + 1,
            objectID: stemp,
          },
          (err: string, content: any) => {
            if (err) throw err;
          }
        );
      }
    }
    let resp: Document | any | null;
    if (parsed.isStarred) {
      resp = await MoveModel.find({
        setId: setId,
        isDeleted: false,
        isStarred: true,
        moveURL: { $ne: null },
      }).sort({
        sortIndex: 1,
      });
    } else {
      resp = await MoveModel.find({
        setId: setId,
        isDeleted: false,
        moveURL: { $ne: null },
      }).sort({
        sortIndex: 1,
      });
    }

    return res.status(200).json({
      message: "SortIndex have been updated successfully!",
      data: resp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message,
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
      success: true,
    });
  } else {
    return res.status(400).json({
      message: "Video url not provided",
      success: false,
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
      tags,
    };

    if (!moveId) {
      res.status(400).json({
        message: "MoveId not found",
      });
    }
    await MoveModel.findByIdAndUpdate(moveId, {
      $set: { ...updateMove, updatedAt: Date.now() },
    });

    const result1: any = await MoveModel.find({ _id: moveId });
    const stemp = result1.length ? result1[0].objectId : null;
    if (stemp) {
      index.partialUpdateObject(
        {
          title: title,
          description: description,
          tags: tags,
          objectID: stemp,
        },
        (err: string, content: any) => {
          if (err) throw err;
          // console.log(content);
        }
      );
    }
    return res.status(200).json({
      message: "Move details updated successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
        message: "User id not found",
      });
    }

    const pageNumber: number = ((parseInt(page) || 1) - 1) * (limit || 20);
    const limitNumber: number = parseInt(limit) || 20;
    let movesData: Document | any,
      moveList: Document | any | null,
      totalMoves: Document | any | null;
    let condition: any = {
      $and: [],
    };
    condition.$and.push({
      userId: headToken.id,
      isDeleted: false,
      moveURL: { $ne: null },
    });

    if (search) {
      condition.$and.push({
        $or: [
          {
            title: {
              $regex: new RegExp(search.trim(), "i"),
            },
          },
          {
            "tags.label": {
              $regex: new RegExp(search.trim(), "i"),
            },
          },
        ],
      });

      if (query.isStarred === "true") {
        let conditionCheck = { ...condition, isStarred: true };
        movesData = await MoveModel.find(conditionCheck)
          .populate({
            path: "setId",
            match: { isDeleted: false },
          })
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });
        totalMoves = await MoveModel.countDocuments(conditionCheck);
      } else {
        movesData = await MoveModel.find(condition)
          .populate({
            path: "setId",
            match: { isDeleted: false },
          })
          .skip(pageNumber)
          .limit(limitNumber)
          .sort({ sortIndex: 1 });

        totalMoves = await MoveModel.countDocuments(condition);
      }

      moveList = await MoveModel.populate(movesData, {
        path: "setId.folderId",
        match: { isDeleted: false },
      });
    }

    // if (search) {
    //   if (query.isStarred === "true") {
    //     movesData = await MoveModel.find({
    //       title: {
    //         $regex: new RegExp(search.trim(), "i")
    //       },
    //       tags: { $elemMatch: { label: search.trim() } },
    //       isDeleted: false,
    //       isStarred: true,
    //       moveURL: { $ne: null }
    //     })
    //       .populate({
    //         path: "setId",
    //         match: { isDeleted: false }
    //       })
    //       .skip(pageNumber)
    //       .limit(limitNumber)
    //       .sort({ sortIndex: 1 });
    //   } else {
    //     movesData = await MoveModel.find({
    //       title: {
    //         $regex: new RegExp(search.trim(), "i")
    //       },
    //       tags: { $elemMatch: { label: search.trim() } },
    //       isDeleted: false,
    //       userId: headToken.id,
    //       moveURL: { $ne: null }
    //     })
    //       .populate({
    //         path: "setId",
    //         match: { isDeleted: false }
    //       })
    //       .skip(pageNumber)
    //       .limit(limitNumber)
    //       .sort({ sortIndex: 1 });
    //   }
    //   moveList = await MoveModel.populate(movesData, {
    //     path: "setId.folderId",
    //     match: { isDeleted: false }
    //   });

    //   totalMoves = await MoveModel.countDocuments({
    //     title: {
    //       $regex: new RegExp(search.trim(), "i")
    //     },
    //     isDeleted: false,
    //     userId: headToken.id,
    //     moveURL: { $ne: null }
    //   });
    // }
    return res.status(200).json({
      movesData: moveList,
      totalMoves: totalMoves,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
        message: "User id not found",
      });
    }
    if (body.tags) {
      const tagDetails = {
        tags: body.tags ? body.tags : "",
        userId: headToken.id,
      };
      tagData = new TagModel(tagDetails);
      await tagData.save();
    }
    res.status(200).json({
      data: tagData,
      message: "Tags have been added successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
        message: "User id not found",
      });
    }
    const result: Document | any = await TagModel.find({
      userId: Mongoose.Types.ObjectId(headToken.id),
    });

    for (let index = 0; index < result.length; index++) {
      const element = result[index].tags;
      tagList.push(element);
    }

    res.status(200).json({
      data: tagList,
      success: true,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: error.message,
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
                  fs.unlink(path.join(folderPath, file), (err) => {
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
                    fs.unlink(path.join(folderPath, file), (err) => {
                      if (err) throw err;
                    });
                  }
                } else {
                  fs.rmdirSync(folderPath);
                }
              });
            }
          } else {
            fs.unlink(path.join(dirPath, file), (err) => {
              if (err) throw err;
            });
          }
        }
      });
    } catch (error) {
      console.log(error);
      return;
    }
  },
  null,
  true,
  "America/Los_Angeles"
);

/* 
/* 
 */
const getInstagramVideoUrl = (
  url: string,
  options: object | any,
  callback: any
) => {
  if (typeof options === "function") (callback = options), (options = {});
  options = instagramUtil.getReqOpt(options);
  options.url = url;
  request(options, (error: any, response: any, body: any) => {
    if (error) {
      callback(error);
    } else {
      if (response.statusCode == 200 && body) {
        const data =
          JSON.parse(
            body.match(
              /<script type="text\/javascript">window._sharedData = (.*);<\/script>/
            )[1]
          ) || {};
        const type =
          data.entry_data.PostPage[0].graphql.shortcode_media.__typename;
        let info: any = {};
        if (type === "GraphImage") {
          info.list = [
            {
              image:
                data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
            },
          ];
        } else if (type === "GraphSidecar") {
          info.list = data.entry_data.PostPage[0].graphql.shortcode_media.edge_sidecar_to_children.edges.map(
            (item: object | any) => ({
              image: item.node.display_url,
              video: item.node.video_url,
            })
          );
        } else if (type === "GraphVideo") {
          info.list = [
            {
              image:
                data.entry_data.PostPage[0].graphql.shortcode_media.display_url,
              video:
                data.entry_data.PostPage[0].graphql.shortcode_media.video_url,
            },
          ];
        }
        callback(null, info);
      } else {
        callback(new Error("Not Found instagram"));
      }
    }
  });
};

/* 
Generate thumbnail for bulk upload data
*/
const generateThumbanail = async (fileName: any): Promise<string> => {
  let videourl1: string;
  if (IsProductionMode) {
    videourl1 = path.join(__dirname, "uploads", "youtube-videos", fileName);
  } else {
    videourl1 = path.join(
      __dirname,
      "..",
      "uploads",
      "youtube-videos",
      fileName
    );
  }

  // Path1 is defined to set the path of thumbnail to be stored at
  let path1: any = path.join(
    __dirname,
    "..",
    "uploads",
    "bulk-upload-thumbnail/"
  );
  let videoRes: string = "";
  return await new Promise((resolve, reject) => {
    const tg: any = new ThumbnailGenerator({
      sourcePath: videourl1,
      thumbnailPath: path1,
      tmpDir: path1,
    });

    tg.generateOneByPercentCb(90, async (err: any, result: any) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      if (result) {
        videoRes = path1 + result;
        resolve(videoRes);
      }
    });
  });
};
/**
 * Process video trimming
 */
const processVideoTrmiming = async (
  { body, currentUser }: Request,
  res: Response
) => {
  try {
    const { timer, moveId, tags, setId, title, description } = body;
    const { id: userId } = currentUser || {};
    const moveDetails: Document | any = await MoveModel.findOne({
      _id: moveId,
      userId,
    });
    if (!moveDetails) {
      throw new Error("This tag doesn't belogs to the logged in user.");
    }
    // update sort index of all other moves
    await MoveModel.updateMany(
      {
        setId,
        _id: {
          $ne: moveId,
        },
      },
      {
        $inc: {
          sortIndex: 1,
        },
      }
    );

    // set move details
    moveDetails.set("tags", tags);
    moveDetails.set("title", title);
    moveDetails.set("description", description);
    moveDetails.set("startTime", timer.min);
    moveDetails.set("endTime", timer.max);
    moveDetails.set("setId", setId);
    moveDetails.set("sortIndex", 0);
    moveDetails.set("isMoveProcessing", true);
    moveDetails.set("moveURL", "");
    // save the set details
    moveDetails.save();

    // push the process in JobQueue
    JobQueue.push((callback) => {
      downloadAndTrimVideo(moveDetails, callback);
    });
    return res.status(200).json({
      responsecode: 200,
      data: moveDetails,
      setId: setId,
      videoThumbnail: moveDetails.videoThumbnail,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({
      message: error.message || "Unkown error",
    });
  }
};
/**
 *
 * @param sourceUrl
 * @param originalVideoPath
 * @param callback
 */
const downloadVideoUsingYTDL = async (
  sourceUrl: string,
  originalVideoPath: string,
  callback: (err?: any, data?: any) => void
) => {
  const video = exec(
    `youtube-dl "${sourceUrl}" --format 'bestvideo[height<=1080]' --merge-output-format 'webm' -o "${originalVideoPath}"`
  );
  video.on("close", (data) => {
    console.log("video data", data);
    callback(null, data);
  });
  video.on("error", (err) => {
    console.log("err", err);
    callback(err);
  });
};
/**
 *
 * @param sourceUrl
 * @param originalAudioPath
 * @param callback
 */
const downloadAudioUsingYTDL = async (
  sourceUrl: string,
  originalAudioPath: string,
  callback: (err?: any, data?: any) => void
) => {
  const audio = exec(
    `youtube-dl "${sourceUrl}" --format 'bestaudio' -o "${originalAudioPath}"`
  );
  audio.on("close", (data) => {
    console.log("video data", data);
    callback(null, data);
  });
  audio.on("error", callback);
};
/**
 *
 * @param videoPath
 * @param audioPath
 * @param outputPath
 * @param callback
 */
const mergeVideoAndAudio = async (
  videoPath: string,
  audioPath: string,
  outputPath: string,
  callback: (err?: any) => void
) => {
  FFMpeg(videoPath)
    .addInput(audioPath)
    .output(outputPath)
    .on("error", callback)
    .on("end", callback)
    .run();
};
/**
 *
 * @param start
 * @param duration
 * @param videoPath
 * @param outputPath
 * @param callback
 */
const trimVideo = (
  start: number,
  duration: number,
  videoPath: string,
  outputPath: string,
  callback: (err?: any) => void
) => {
  console.log("Start Time", toHHMMSS(start));
  console.log("duration", duration);
  FFMpeg(videoPath)
    .setStartTime(toHHMMSS(start))
    .setDuration(duration)
    .output(outputPath)
    .on("error", callback)
    .on("end", callback)
    .run();
};
/**
 *
 * @param videoPath
 * @param moveDetails
 * @param callback
 */
const moveToS3AndSetDetails = async (
  videoPath: string,
  moveDetails: any,
  callback: any
) => {
  const s3VideoUrl = await s3BucketUpload(videoPath, "deep-play.webm", "moves");
  console.log("WebM file Moved to S3 Bucket.");
  // save data to algolia
  const moveDataForAlgolia = {
    _id: moveDetails._id,
    moveURL: s3VideoUrl,
    title: moveDetails.title,
    description: moveDetails.title,
    startTime: moveDetails.min,
    sourceUrl: moveDetails.sourceUrl,
    tags: moveDetails.tags,
    sortIndex: 0,
    setId: moveDetails.setId,
    isYoutubeUrl: true,
    userId: moveDetails.userId,
    isDeleted: false,
    createdAt: new Date(),
    videoMetaData: {},
    searchType: "move",
  };

  index.addObjects([moveDataForAlgolia], async (err: string, content: any) => {
    console.log("Move details saved to algolia.");
    // set movedetail's updated data
    moveDetails.set("moveURL", s3VideoUrl);
    moveDetails.set("isMoveProcessing", false);
    if (!err && content && content.objectIDs && content.objectIDs[0]) {
      // set algolia object Id
      moveDetails.set("objectId", content.objectIDs[0]);
    }
    await moveDetails.save();
    console.log("Move details updated successfully!");
    fs.unlinkSync(videoPath);
    console.log("Removed trimmed Move file: %s", videoPath);
    callback();
  });
};
/**
 *
 * @param moveDetails
 * @param callback
 */
const downloadAndTrimVideo = (moveDetails: any, callback: any) => {
  const { sourceUrl, startTime, endTime } = moveDetails;
  let originalVideoPath: string = "",
    originalAudioPath: string = "",
    trimmedVideoPath: string = "",
    trimmedAudioPath: string = "",
    mergedVideoPath: string = "",
    timeStamp = moment().unix();
  const videoName = [timeStamp, "_", "deep_play_video", ".mp4"].join(""),
    audioName = [timeStamp, "_", "deep_play_audio", ".mp3"].join(""),
    mergedName = [timeStamp, "_", "deep_play_merged", ".mp4"].join("");
  if (IsProductionMode) {
    originalVideoPath = path.join(
      __dirname,
      "uploads",
      "youtube-videos",
      videoName
    );
    trimmedVideoPath = path.join(
      __dirname,
      "uploads",
      "youtube-videos",
      `trimmed_${videoName}`
    );
    originalAudioPath = path.join(
      __dirname,
      "uploads",
      "youtube-videos",
      audioName
    );
    trimmedAudioPath = path.join(
      __dirname,
      "uploads",
      "youtube-videos",
      `trimmed_${audioName}`
    );
    mergedVideoPath = path.join(
      __dirname,
      "uploads",
      "youtube-videos",
      mergedName
    );
  } else {
    originalVideoPath = path.join(
      __basedir,
      "..",
      "uploads",
      "youtube-videos",
      videoName
    );
    trimmedVideoPath = path.join(
      __basedir,
      "..",
      "uploads",
      "youtube-videos",
      `trimmed_${videoName}`
    );
    originalAudioPath = path.join(
      __basedir,
      "..",
      "uploads",
      "youtube-videos",
      audioName
    );
    trimmedAudioPath = path.join(
      __basedir,
      "..",
      "uploads",
      "youtube-videos",
      `trimmed_${audioName}`
    );
    mergedVideoPath = path.join(
      __basedir,
      "..",
      "uploads",
      "youtube-videos",
      mergedName
    );
  }
  console.time("VideoDownloadTime");
  downloadVideoUsingYTDL(sourceUrl, originalVideoPath, (err) => {
    if (err) {
      console.log("Error in fetching video", err);
      return;
    }
    console.log("Video Downloaded Successfully");
    console.timeEnd("VideoDownloadTime");
    console.time("AudioDownloadTime");
    downloadAudioUsingYTDL(sourceUrl, originalAudioPath, (err) => {
      if (err) {
        console.log("Error in fetching audio", err);
        return;
      }
      console.timeEnd("AudioDownloadTime");
      console.log("Audio Downloaded Successfully");
      trimVideo(
        startTime,
        endTime - startTime,
        originalVideoPath,
        trimmedVideoPath,
        (err) => {
          if (err) {
            console.log("Error in trimming video", err);
            return;
          }
          console.log("Video trimmed Successfully");
          trimVideo(
            startTime,
            endTime - startTime,
            originalAudioPath,
            trimmedAudioPath,
            (err) => {
              if (err) {
                console.log("Error in trimming audio", err);
                return;
              }
              console.log("Audio trimmed Successfully");
              mergeVideoAndAudio(
                trimmedVideoPath,
                trimmedAudioPath,
                mergedVideoPath,
                async (err) => {
                  if (err) {
                    console.log("Error in merging audio and video", err);
                    return;
                  }
                  console.log("Video and Audio merged successfully");
                  fs.unlinkSync(originalVideoPath);
                  console.log("Removed video file: %s", originalVideoPath);
                  fs.unlinkSync(originalAudioPath);
                  console.log("Removed Audio file: %s", originalAudioPath);
                  fs.unlinkSync(trimmedAudioPath);
                  console.log(
                    "Removed trimmed video file: %s",
                    trimmedAudioPath
                  );
                  fs.unlinkSync(trimmedVideoPath);
                  console.log(
                    "Removed trimmed audio file: %s",
                    trimmedVideoPath
                  );
                  // move the trimmed video to s3 bucket & update details & set on algolia
                  moveToS3AndSetDetails(mergedVideoPath, moveDetails, callback);
                }
              );
            }
          );
        }
      );
    });
  });
};
const pad = function (num: number | string, size: number) {
  return ("000" + num).slice(size * -1);
};

/**
 *
 * @param {number} secs
 */
const toHHMMSS = (secs: number) => {
  const time = parseFloat(parseFloat(secs.toString()).toFixed(3)),
    hours = Math.floor(time / 60 / 60),
    minutes = Math.floor(time / 60) % 60,
    seconds = Math.floor(time - minutes * 60),
    milliseconds = time.toString().slice(-3);
  return `${pad(hours, 2)}:${pad(minutes, 2)}:${pad(seconds, 2)}${pad(
    milliseconds,
    3
  )}`;
};
/**
 *
 */
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
  getTagListByUserId,
  updateMoveDetailsFromYouTubeAndTrim,
  processVideoTrmiming,
  uploadVideo,
  updateDetailsAndTrimVideo,
};
