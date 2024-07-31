/*
 * @file: db-schema.js
 * @description: It contains db schema for admin, groupadmin and other admin users.
 * @author: Dinesh Kumar
 */

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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
    isVerified: {
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
      // type: mongoose.Types.ObjectId,
      enum:["0","1","2"],   // 0-Superadmin,1-community-head,2-user
      ref: "rolesAndPermissions"
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
