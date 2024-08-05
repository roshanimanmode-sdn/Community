import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { messages, responseStatus, responseCodes } from "../../lib/constants.js";
import User from '../../model/user/db-schema.js';
import sendEmail from "../../middleware/sendEmail.js";
import { forgotPasswordEmailTemplate } from "../../const/template.js";
import moment from "moment";
import mongoose from "mongoose";

// register user.
export const register = async (req, res) => {
  try {
    const { fullName, userName, email, password, phoneNumber, gender, age, profilePic, dob, address, role, qualification, commuity } = req.body;
    const useSignup = new User({
      fullName: fullName,
      userName: userName,
      phoneNumber: phoneNumber,
      email: email,
      gender: gender,
      age: age,
      dob: dob,
      address: address,
      qualification: qualification,
      community: commuity,
      role: role,
      password: bcrypt.hashSync(password, 8),
      // profilePic:req.file.filename
    })
    const result = await useSignup.save();
    if (result) {
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.showSuccess,
        data: result
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

// login user.
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.authError,
      });
    }
    if (!user.isActive) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.lockUser,
      });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);
    if (isPasswordCorrect) {
      const token = jwt.sign({ _id: user?._id, email: user?.email, role: user?.role }, process.env.JWT_SECRET_KEY,
        {
          expiresIn: "24h"
        }
      );
      user.password = undefined;
      // const encryptedResponse = await encryptData(JSON.stringify({
      //   accessToken: token,
      //   ...httpResponse.data.data
      // }));
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.loginSuccess,
        data: user,
        token: token
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

// forget password.
export const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(Math.random() * 900000) + 100000;
    let user = await User.findOne({ email: email });
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
      body: forgotPasswordEmailTemplate({ email: email, otp: otp })
    }).then(async () => {
      user.otp = otp
      user.otpExpiresIn = moment().add(5, "minutes")
      await user.save()
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.emailSent
      });
      // return response.successResponse(res, 200, {}, languageSelected.LINK_SENT);
    }).catch((error) => {
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

// reset password.
export const resetPassword = async (req, res) => {
  try {
    const { otp, newPassword } = req.body
    console.log("req.query----", req.query)
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
          message: "OTP Expired"
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

// change password.
export const changePassword = async (req, res) => {
  try {
    const { newPassword, oldPassword } = req.body
    const userId = req?.user?._id;
    let user = await User.findById(userId);
    if (await bcrypt.compare(oldPassword, user.password)) {
      await user.updateOne({ $set: { password: bcrypt.hashSync(newPassword.toString(), 10) } })
      // return response.successResponse(res, 200, {}, languageSelected?.PASSWORD_UPDATED);
      return res.status(responseCodes.successCode).json({
        status: responseStatus.successStatus,
        statusCode: responseCodes.successCode,
        message: messages.changePassword
      });
    } else {
      // return response.errorMessageResponse(res, 400, "Old pasword is not matched.");
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.badRequest,
        message: "Old pasword is not matched."
      });
    }
  } catch (error) {
    console.log("error", error)
    // return response.somethingErrorMsgResponse(res, 500, languageSelected.ERROR);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError
    });
  }
}

// Edit user profile data
export const updateProfile = async (req, res) => {
  try {
    const { userId, fullName, email, phoneNumber, gender, age, profilePic, dob, address, aboutYourself } = req.body;

    // Validate user ID
    if (!userId) {
      return res.status(responseCodes.badRequest).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.badRequest,
        message: "User ID is required"
      });
    }

    // Find the user by ID
    const user = await User.findById(userId);
    if (!user) {
      return res.status(responseCodes.notFound).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.notFound,
        message: messages.NotFound
      });
    }

    // Update user fields
    if (fullName !== undefined) user.fullName = fullName;
    if (email !== undefined) user.email = email;
    if (phoneNumber !== undefined) user.phoneNumber = phoneNumber;
    if (gender !== undefined) user.gender = gender;
    if (age !== undefined) user.age = age;
    if (profilePic !== undefined) user.profilePic = profilePic;
    if (dob !== undefined) user.dob = dob;
    if (address !== undefined) user.address = address;
    if (aboutYourself !== undefined) user.aboutYourself = aboutYourself;

    // Save the updated user
    await user.save();

    // Respond with success
    return res.status(responseCodes.ok).json({
      status: responseStatus.successStatus,
      statusCode: responseCodes.ok,
      message: "Profile updated successfully",
      data: user
    });

  } catch (error) {
    console.log("error :------", error);
    return res.status(responseCodes.internalServerError).json({
      status: responseStatus.failedStatus,
      statusCode: responseCodes.internalServerError,
      message: messages.internalServerError
    });
  }
};

// Make profile visible to everyone.
export const setProfileVisible = async (req, res) => {
  try {
    const { userId, isProfileVisible } = req.body;
    console.log("req.body--",req.body);
    let user = await User.findOne({ _id: mongoose.Types.ObjectId(userId) });
    if (!user) {
      return res.status(responseCodes.failureCode).json({
        status: responseStatus.failedStatus,
        statusCode: responseCodes.failureCode,
        message: messages.NotFound,
      });
    } else {
      const updateData = await User.findByIdAndUpdate({ _id: mongoose.Types.ObjectId(userId) }, { $set: { isProfileVisible: isProfileVisible } }, { $new: true })
      console.log("updateData--", updateData);
      if (updateData) {
        return res.status(responseCodes.successCode).json({
          status: responseStatus.successStatus,
          statusCode: responseCodes.successCode,
          message: messages.showSuccess
        });
      } else {
        return res.status(responseCodes.internalServerError).json({
          status: responseStatus.failedStatus,
          statusCode: responseCodes.internalServerError,
          message: messages.errorMessage,
        });
      }
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

// Get login User Details
export const getUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({ _id: mongoose.Types.ObjectId(req.user._id) });
    if (!user) {
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
          data: user
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

// Get all Users Data
export const getAllUsers = async (req, res) => {
  try {
    const user = await User.find({ isProfileVisible: true, isActive: true });
    if (!user) {
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
          data: user
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