/*
 * @file: index.js
 * @description: It contains function layer for user collection.
 * @author: Roshni Manmode
 */

import mongoose from 'mongoose';
import DbSchema from './db-schema.js';

class User {
  static saveUser(payload) {
    return this(payload).save();
  }
  static checkEmail(email) {
    return this.findOne(email).populate('role');
  }
  static checkUserType(userType) {
    return this.findOne(userType);
  }

  static findOneByCondition(condition) {
    return this.findOne(condition);
  }

  static updateUserById(userId, payload) {
    let updateData = {
      $set: payload
    };
    return this.findByIdAndUpdate(userId, updateData, { new: true });
  } 
  
}

DbSchema.loadClass(User);
DbSchema.index({ 
  firstName: 'text',
  lastName: 'text',
  email: 'text',
});
export default mongoose.model("users", DbSchema, "users");

