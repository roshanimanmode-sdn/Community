import { messages, responseStatus, responseCodes } from "../../lib/constants.js";

export const register = async function (req, res) {
    try {
 
    } catch (e) {
      console.log("e :------", e);
      return res.status(responseCodes.internalServerError).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.internalServerError,
        message: messages.internalServerError,
      });
    }
  };