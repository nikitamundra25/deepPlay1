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
  sets: [
    {
      type: Schema.Types.ObjectId,
      ref: "set"
    }
  ],
  user: {
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

export const FolderModel = Mongoose.model("folder", folderSchema);
