import Mongoose from "mongoose";
import { Schema } from "express-validator";
const Schema = Mongoose.Schema;

const moveSchema: Mongoose.Schema = new Schema({
  title: {
    type: String,
    default: null
  },
  description: {
    type: String,
    default: null
  },
  videoName: {
    type: String
  },
  sourceUrl: {
    type: String
  },
  isYoutubeUrl: {
    type: Boolean
  },
  videoUrl: {
    type: String,
    default: null
  },
  videoThumbnail: {
    type: String,
    default: null
  },
  moveURL: {
    type: String,
    default: null
  },
  tags: {
    type: [Object],
    default: []
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharableLink: {
    type: String
  },
  isCopy: {
    type: Boolean,
    default: false
  },
  sortIndex: {
    type: Number,
    default: 0
  },
  isStarred: {
    type: Boolean,
    default: false
  },
  startTime: {
    type: Number,
    default: 0
  },
  objectId: {
    type: Number
  },
  setId: {
    type: Schema.Types.ObjectId,
    ref: "set"
  },
  frames: {
    type: [String],
    default: new Array()
  },
  videoMetaData: {
    type: Object
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

export const MoveModel = Mongoose.model("move", moveSchema);
