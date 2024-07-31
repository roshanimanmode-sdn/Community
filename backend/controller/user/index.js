import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { messages, responseStatus, responseCodes } from "../../lib/constants.js";
import User from '../../model/user/db-schema.js';
import sendEmail from "../../middleware/sendEmail.js";
import { forgotPasswordEmailTemplate } from "../../const/template.js";
import moment from "moment";

export const register = async(req,res)=> {
    try {
      const {firstName,lastName,middleName,email,password,phoneNumber,gender,age,profilePic,dob,address,role}= req.body;
      const useSignup = new User({
        name:firstName+ " " + middleName + " " + lastName,
        phoneNumber:phoneNumber,
        email:email,
        gender:gender,
        age:age,
        dob:dob,
        address:address,
        role:role,
        password:bcrypt.hashSync(password, 8),
        // profilePic:req.file.filename
      })
      const result = await useSignup.save();
      if (result) {
        return res.status(responseCodes.successCode).json({
          status: responseStatus.successStatus,
          statusCode: responseCodes.successCode,
          message: messages.showSuccess,
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

export const login = async(req,res)=>{
  try {
    const { email, password } = req.body;
    let user = await User.findOne({email: email});
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.authError,
      });
    }
    if (!user.isActive) {
      // await user.save();
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.lockUser,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({_id: user?._id, email: user?.email, role: user?.role}, process.env.JWT_KEY,
        {
          expiresIn: "24h"
        }
      );
      user.password = undefined;
      console.log("token", token)
      // const encryptedResponse = await encryptData(JSON.stringify({
      //   accessToken: token,
      //   ...httpResponse.data.data
      // }));
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.loginSuccess,
        token:token
      });
    } else {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.authError,
      });
    }
  } catch (error) {
    console.log("error :------", error);
      return res.status(responseCodes.internalServerError).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.internalServerError,
        message: messages.internalServerError,
    });
  }
};

export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * 900000) + 100000;
    let user = await User.findOne({email: email});
    // If no user is found with the provided email, send a 404 response
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.authError,
      });
    }
    // const encryptedOtp = bcrypt.hashSync(otp.toString(), 10)
    await sendEmail({
      email: email,
      sub: "Reset Your Password",
      body: forgotPasswordEmailTemplate({email : email, otp: otp})
    }).then(async()=>{
      user.otp = otp
      user.otpExpiresIn = moment().add(5, "minutes")
      await user.save()
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.emailSent
      });
      // return response.successResponse(res, 200, {}, languageSelected.LINK_SENT);
    }).catch((error)=>{
      console.log("error", error)
      // return response.somethingErrorMsgResponse(res, 500, languageSelected.SOMETHING_WENT_WRONG);
      return res.status(responseCodes.internalServerError).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.internalServerError,
        message: messages.internalServerError,
    });
    });

  } catch (error) {
    console.log(error);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError,
    });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body
    console.log("req.query----",req.query)
    if (!req.query.email) {
      // return response.errorMessageResponse(res, 400, "Invalid link");
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: "Invalid link"
      });
    }
    let user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.authError,
      });
    } else {
      if (user.otp != Number(otp)) {
        return res.status(responseCodes.failureCode).json({
          status: responseStatus.failedStatus,
          statusCode: responseCodes.failureCode,
          message: messages.otpverifyfailed,
        });
      } else if (user.otpExpiresIn < moment()) {
        // return response.errorMessageResponse(res, 423, "OTP Expired");
        return res.status(responseCodes.failureCode).json({
          status: responseStatus.failedStatus,
          statusCode: 423,
          message:  "OTP Expired"
        });
      } else {
        await user.updateOne({ $set: { password: bcrypt.hashSync(newPassword, 10), "otp": "", "otpExpiresIn": "", isActive: true } })
        return res.status(responseCodes.successCode).json({
          status: responseStatus.successStatus,
          statusCode: responseCodes.successCode,
          message: messages.changePassword
        });
      }
    }
  } catch (error) {
    console.log("error", error)
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError
    });
  }
}

export const changePassword = async(req,res)=>{
  try {
    const {newPassword, oldPassword} = req.body
    const userId = req?.user?._id;
    let user = await User.findById(userId);
    if(await bcrypt.compare(oldPassword, user.password)){
      await user.updateOne({$set : {password : bcrypt.hashSync(newPassword.toString(), 10)}})
      // return response.successResponse(res, 200, {}, languageSelected?.PASSWORD_UPDATED);
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.changePassword
      });
    }else{
      // return response.errorMessageResponse(res, 400, "Old pasword is not matched.");
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.badRequest,
        message: "Old pasword is not matched."
      });
    }
  } catch (error) {
    console.log("error",error)
    // return response.somethingErrorMsgResponse(res, 500, languageSelected.ERROR);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError
    });
  }
}

export const updateProfile = async(req,res)=>{
  try{
    const {userId,firstName,lastName,middleName,email,password,phoneNumber,gender,age,profilePic,dob,address,role}= req.body;

  }catch (error) {
    console.log("error :------", error);
      return res.status(responseCodes.internalServerError).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.internalServerError,
        message: messages.internalServerError
    });
  }
}