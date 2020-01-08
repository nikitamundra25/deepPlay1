import Mongoose from "mongoose";
import { Schema } from "express-validator";
const Schema = Mongoose.Schema;

const setSchema: Mongoose.Schema = new Schema({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharableLink: {
    type: String
  },
  folderId: {
    type: Schema.Types.ObjectId,
    ref: "folder"
  },
  objectId: {
    type: Number
  },
  isCopy: {
    type: Boolean,
    default: false
  },
  isVideoProcessing: {
    type: [Object],
    default: []
  },
  copyIndex: {
    type: Number,
    default: 0
  },
  copyCount: {
    type: Number,
    default: 0
  },
  copySetId: {
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

export const SetModel = Mongoose.model("set", setSchema);
