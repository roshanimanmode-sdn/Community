import { messages, responseStatus, responseCodes } from "../../lib/constants.js";
import User from '../../model/user/db-schema.js';
import moment from "moment";
import mongoose from "mongoose";

// user archeive.
export const archiveUser = async (req, res) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(req?.user?._id);
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.dataNotFound,
      });
    }
    // Add the archived userId to the archives array
    user.archieves = user.archieves || [];
    user.archieves.push(userId);
    console.log("user--",user);
    
    // Save the updated user record
    const result = await user.save();

    return res.status(responseCodes.successCode).json({
      status: responseStatus.successStatus,
      statusCode: responseCodes.successCode,
      message: messages.archieveSuccess,
      data: result,
    });
  } catch (e) {
    console.log("e :------", e);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError,
    });
  }
};
