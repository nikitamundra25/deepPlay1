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
  videoUrl: {
    type: String,
    default: null
  },
  tags: {
    type: [String],
    default: []
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  sharableLink: {
    type: String
  },
  setId: {
    type: Schema.Types.ObjectId,
    ref: "set",
    required: true
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
