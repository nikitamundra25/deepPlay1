import Mongoose from "mongoose";
import { Schema } from "express-validator";
const Schema = Mongoose.Schema;

const folderSchema: Mongoose.Schema = new Schema({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  isCopy: {
    type: Boolean,
    default: false
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharableLink: {
    type: String
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  status: {
    type: Boolean,
    default: true
  },
  isRecentTime: {
    type: Date,
    default: Date.now
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export const FolderModel = Mongoose.model("folder", folderSchema);
