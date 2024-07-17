/*
 * @file: db-schema.js
 * @description: It contains db schema for admin, groupadmin and other admin users.
 * @author: Dinesh Kumar
 */

import mongoose from 'mongoose';;

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
      default: "",
    },
    email: {
      type: String,
    },
    userType: {
      type: String,
      default: "user",
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
    loginToken: {
      type: String,
      default: null,
    },
    lastloginAt: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isFirstLogin: {  //It will become false once user complete his basic information in first login
      type: Boolean,
      default: true,
    },
    termsCondition: {
      type: Boolean,
      default: false,
    },
    dob: {
      type: Date,
      default: null,
    },
    address: {
      type: String,
      default: null,
    },
    city: {
      type: String,
      default: null,
    },
    state: {
      type: String,
      default: null,
    },
    zipCode: {
      type: String,
      default: null,
    },
    fcmToken: {
      type: String,
    },
    customerId: {
      type: String,
      default: null,
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: "rolesAndPermissions",
    },
  },
  {
    versionKey: false,
    // Make Mongoose use Unix time (seconds since Jan 1, 1970)
    timestamps: { currentTime: () => Date.now() },
  }
);

export default UserSchema;