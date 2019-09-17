import Mongoose from "mongoose";
import { Schema } from "express-validator";
const Schema = Mongoose.Schema;

const roleType: Mongoose.Schema = new Schema({
  isTeacher: String,
  isStudent: String,
  isUnclassified: String
})

const userSchema: Mongoose.Schema = new Schema({
  firstName: {
    type: String,
    default: null
  },
  lastName: {
    type: String,
    default: null
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    default: null
  },
  profileImage:{
    type: String
  },
  verifyToken: {
    type: String,
    default: null
  },
  roleType: {
    type: String,
  },
  status: {
    type: Boolean,
    default: true
  },
  loggedInIp: {
    type: String,
    default: null
  },
  loggedInAt: {
    type: Date,
    default: null
  },
  salt: {
    type: String,
    default: null
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

export const UserModel = Mongoose.model("user", userSchema);
