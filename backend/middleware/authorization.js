import jwt from 'jsonwebtoken';;
import { messages, responseStatus, responseCodes } from "../lib/constants.js";

export const tokenVerification = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  //check if bearer is undefined
  if (typeof bearerHeader !== "undefined") {
    //split by space
    const bearer = bearerHeader.split(" ");
    //get token from array
    const bearerToken = bearer[1];

    //validating the token
    jwt.verify(
      bearerToken,
      process.env.JWT_SECRET_KEY,
      async (err, decoded) => {
        if (!err) {
          req.user = decoded;
          next();
        }
        //err
        else {
          return res.status(responseCodes.unAuthorizedUser).json({
            status: responseStatus.failedStatus,
            statusCode: responseCodes.unAuthorizedUser,
            message: messages.authError,
          });
        }
      }
    );
  } else {
    return res.status(responseCodes.forbidden).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.forbidden,
      message: messages.invalidToken,
    });
  }
};

export default  tokenVerification
