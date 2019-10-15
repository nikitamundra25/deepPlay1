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
  videoUrl: {
    type: String,
    default: null
  },
  moveURL: {
    type: String
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
  isStarred: {
    type: Boolean,
    default: false
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
