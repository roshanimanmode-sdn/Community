/**
 * Summary. This files will contain all the functions which can used in common across the application
 * Description. This files will contain all the functions which can used in common across the application
 * @Author: Roshni Manmode
 * @Created On: 20 oct, 2022
 */
import moment from "moment";
import _ from "underscore-node";
import bcrypt from "bcrypt";
import crypto from "crypto";
import mongoose from "mongoose";
import Responsecodes from "./constants.js";

// Hash password
export async function hashPassword(plaintextPassword) {
  const hash = await bcrypt.hash(plaintextPassword, 10);
  return hash;
}

// compare password
export async function comparePassword(plaintextPassword, hash) {
  const result = await bcrypt.compare(plaintextPassword, hash);
  return result;
}

// compare password
export const genericResponse = (res, isError, status, json) => {
  return isError
    ? res.status(Responsecodes.responseCodes.internalServerError).jsonp({
        success: false,
        message: Responsecodes.messages.errorMessage,
      })
    : res.status(status).jsonp(json);
};

// Generate random strings.
export const GenerateRandom = (length = 32, alphanumeric = true) => {
  let data = "",
    keys = "";

  if (alphanumeric) {
    keys = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  } else {
    keys = "0123456789";
  }

  for (let i = 0; i < length; i++) {
    data += keys.charAt(Math.floor(Math.random() * keys.length));
  }
  return data;
};

/**
 * @param // cerate key String
 * @returns return a key String
 */
export const createKeyString = async (item) => item.toLowerCase().replace(/ /g, "_").trim();


// Validate Email
export const validateEmail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

/**
* @Description: Return date without offset in milliseconds
* @param: {
    date //new Date()
  }
  @return {
    type: number
  }
*/
export const removeOffset = (date) => {
  var userOffset = new Date(date).getTimezoneOffset();
  var userOffsetMilli = userOffset * 60 * 1000;
  var dateInMilli = moment(new Date(date)).valueOf();
  var dateInUtc = !isNaN(userOffsetMilli) ? dateInMilli - userOffsetMilli : "";
  return dateInUtc;
};

/**
* @Description: Return date with offset in milliseconds
* @param: {
    date //new Date()
  }
  @return {
    type: number
  }
*/
export const addOffset = (date) => {
  var userOffset = new Date(date).getTimezoneOffset();
  var userOffsetMilli = userOffset * 60 * 1000;
  var dateInMilli = moment(new Date(date)).valueOf();
  var dateInUtc = !isNaN(userOffsetMilli) ? dateInMilli + userOffsetMilli : "";
  return dateInUtc;
};

// Encrypt data
export const encrypt = (text) => {
  var cipher = crypto.createCipher("aes-256-cbc", "d6F3Efeq");
  var crypted = cipher.update(text, "utf8", "hex");
  crypted += cipher.final("hex");
  return crypted;
};

// Decrypt data
export const decrypt = (text) => {
  var decipher = crypto.createDecipher("aes-256-cbc", "d6F3Efeq");
  var dec = decipher.update(text, "hex", "utf8");
  dec += decipher.final("utf8");
  return dec;
};

// Check gender
export const checkGender = (gender) => {
  if (typeof gender == "string") {
    gender = gender.toLowerCase();
    if (gender.length > 1) {
      gender = gender.substr(0, 1);
    }
    if (gender == "2" || gender == "m") {
      return 2;
    } else if (gender == "1" || gender == "f") {
      return 1;
    } else {
      return 2;
    }
  } else {
    return 2;
  }
};

// Set default password
export const defaultPassword = (staticPassword) => {
  if (staticPassword) {
    return "Community123";
  } else {
    var chars = "23456789";
    var uppercase = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    var lowercase = "abcdefhkmnprstuvwxyz";
    var len = 3;
    var randomstring = "";
    for (var i = 0; i < len; i++) {
      var rnum = Math.floor(Math.random() * uppercase.length);
      randomstring += uppercase.substring(rnum, rnum + 1);
    }
    for (var i = 0; i < len; i++) {
      var rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum, rnum + 1);
    }
    for (var i = 0; i < len; i++) {
      var rnum = Math.floor(Math.random() * lowercase.length);
      randomstring += lowercase.substring(rnum, rnum + 1);
    }
    return randomstring;
  }
};


export default {
  hashPassword,
  defaultPassword,
  checkGender,
  GenerateRandom,
  comparePassword,
  decrypt,
  encrypt,
  addOffset,
  removeOffset,
  validateEmail,
  createKeyString,
  genericResponse
}