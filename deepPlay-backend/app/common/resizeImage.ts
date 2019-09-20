const Jimp = require("jimp");

export const resizeImage = async (
  sourcePath: string,
  destinationPath: string,
  width: number
) => {
  return new Promise((resolve, reject) => {
    Jimp.read(sourcePath, function(err: any, lenna: any) {
      if (err) {
        console.log("*********** Resize Error =>", err);
        reject(new Error(err));
      }
      lenna
        .resize(width, Jimp.AUTO)
        .quality(100)
        .write(destinationPath); // save

      resolve(destinationPath);
    });
  });
};
