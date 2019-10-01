import multer, { StorageEngine } from "multer";
import path from "path";
const __basedir = path.join(__dirname, "../public");

// Upload image File using multer
var storageFile: StorageEngine = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, path.join(
      __basedir,
      "../uploads",
      "youtube-videos"
    ));
  },
  filename: function (req, file, callback) {
    const { currentUser } = req
    let headToken: Request | any = currentUser;

    callback(null, headToken.id + Date.now() + "deep_play_video" + ".webm");
  }
});

export { storageFile };