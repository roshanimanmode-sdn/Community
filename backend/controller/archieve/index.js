import { messages, responseStatus, responseCodes } from "../../lib/constants.js";
import Archieve from "../../model/archieve/db-schema.js";
import User from '../../model/user/db-schema.js';
import moment from "moment";
import mongoose from "mongoose";

// user archeive.
export const archiveUser = async (req, res) => {
  try {
    // Check if there is an existing bookmark for the given user and added user
    const existingBookmark = await Archieve.findOne({
      userId: mongoose.Types.ObjectId(req.body.userId),
      added_userId:mongoose.Types.ObjectId(req.body.added_userId),
    });

    // If no existing bookmark is found, create a new one with isBookmarked set to true
    if (!existingBookmark) {
      const bookmark = new Archieve({
        userId: req.body.userId,
        added_userId: req.body.added_userId,
        isBookmarked: true,
      });
      await bookmark.save();
      console.log("bookmark--",bookmark);
      
      // Respond with a success message for bookmark added
      return res.status(200).json({
        status: true,
        message: 'Bookmark added successfully',
        result: bookmark,
        code: 200,
      });
    } else {
      // If bookmark is already added with isBookmarked true, show a message
      if (existingBookmark.isBookmarked) {
        return res.status(200).json({
          status: true,
          message: 'You have already added this bookmark',
          result: existingBookmark,
          code: 200,
        });
      }

      // Toggle the isBookmarked field
      existingBookmark.isBookmarked = !existingBookmark.isBookmarked;
      await existingBookmark.save();
      console.log("existingBookmark--",existingBookmark);

      // Respond with a success message for bookmark updated
      return res.status(200).json({
        status: true,
        message: 'Bookmark added successfully',
        result: existingBookmark,
        code: 200,
      });
    }
  } catch (e) {
    console.log("e :------", e);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError,
    });
  }
};

export const userAllArchive = async (req, res) => {
  try {
    const userArchiveData = await Archieve.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(req.query._id),
          isBookmarked: true,
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'added_userId',
          foreignField: '_id',
          as: 'userDetails',
        },
      },
      {
        $unwind: '$userDetails',
      },
    ]);
    
    if (!userArchiveData.length) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.NotFound,
      });
    } else {
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.listSuccess,
        data: userArchiveData,
      });
    }
  } catch (e) {
    console.log("e :------", e);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError,
    });
  }
};

export const deleteArchiveUser = async (req, res) => {
  try {
    const bookmarkID = mongoose.Types.ObjectId(req.query._id);
    let deletebookmark = await Archieve.findByIdAndDelete( { _id: mongoose.Types.ObjectId(bookmarkID) });

    if (!deletebookmark) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.NotFound,
      });
    } else {
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: "Bookmark removed successfully",
        data: deletebookmark,
      });
    }
  } catch (e) {
    console.log("e :------", e);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError,
    });
  }
};
