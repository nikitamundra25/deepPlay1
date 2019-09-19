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
  folderId: [
    {
      type: Schema.Types.ObjectId,
      ref: "folder",
      required: true
    }
  ],
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

export const SetModel = Mongoose.model("set", setSchema);
