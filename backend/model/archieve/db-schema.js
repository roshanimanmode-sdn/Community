/*
 * @file: db-schema.js
 * @description: It contains db schema for admin, groupadmin and other admin users.
 * @author: Roshni Manmode
 */

import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User'
    },
    added_userId: {
      type: mongoose.Types.ObjectId,
      required: true,
      index: true,
      ref: 'User'
    },
    isBookmarkdelete: {
      type: Boolean,
      default: false,
      index: true
    },
    isFriend: {
      type: Boolean,
      default: false,
      index: true
    },
    isBookmarked: {
      type: Boolean,
      default: false,
      index: true
    },
  },
  {
    versionKey: false,
    timestamps: { currentTime: () => Date.now() },
  }
);

const Archieve = mongoose.model('Archieve', bookmarkSchema);

export default Archieve;
