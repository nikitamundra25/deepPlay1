import Mongoose from "mongoose";
import { Schema } from "express-validator";
const Schema = Mongoose.Schema;

const tagSchema: Mongoose.Schema = new Schema({
  tags: {
    type: Object,
    default: []
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const TagModel = Mongoose.model("tags", tagSchema);
