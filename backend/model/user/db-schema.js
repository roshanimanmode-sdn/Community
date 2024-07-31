/*
 * @file: db-schema.js
 * @description: It contains db schema for admin, groupadmin and other admin users.
 * @author: Dinesh Kumar
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    // it should be unique for all users
    userName: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    password: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      default: "",
    },
    age: {
      type: String,
      default: "",
    },
    qualification: {
      type: String,
      required: false
    },
    community: {
      type: String,
      required: false
    },
    profilePic: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    // admin will verify the user
    isVerified: {
      type: Boolean,
      default: false,
    },
    isProfileVisible: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: Object,
      default: null,
    },
    role: {
      type:String,
      enum:["0","1"],   // 0-Superadmin, 1-user
      default: "1",
      // type: mongoose.Types.ObjectId,
      // ref: "rolesAndPermissions"
    },
    otp:{
      type: Number,
      require: false
    },
    otpExpiresIn :{
      type: Date,
      require: false
    },
  },
  {
    versionKey: false,
    timestamps: { currentTime: () => Date.now() },
  }
);

const User = mongoose.model('User', userSchema);

export default User;
