import { s3Key } from "../config/app";
import fs from "fs";
import path from "path";
import AWS from 'aws-sdk';
AWS.config.update({
  accessKeyId: s3Key.keyId,
  secretAccessKey: s3Key.key
});
const s3 = new AWS.S3();

export const s3BucketUpload = async (videoRoute: any, fileName: any, folderPath: any) => {
  let s3PathURL: String = ""
  var params = {
    Bucket: s3Key.bucketName,
    Body: fs.createReadStream(videoRoute),
    Key: `${folderPath}/` + Date.now() + "_" + path.basename(fileName),
    ContentType: folderPath === "moves"?"video/webm":"image/jpeg",
    ContentDisposition: `inline; filename=${fileName}`,
    ACL: "public-read"
  };

  await new Promise((resolve, reject) => {
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        console.log("====================================");
        console.log(err);
        console.log("====================================");
        reject(new Error(err));
      }
      resolve(data.Location);
      if (data) {
        s3PathURL = data.Location
      } else {
        s3PathURL = ""
      }
    });
  });
  return s3PathURL
};
