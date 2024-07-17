import express from "express";
import { register } from "../controller/user/index.js";
import { tokenVerification } from '../middleware/authorization.js';
import validationMiddleware from "../validators/joi.validator.js";
import { upload } from "../middleware/uploadFile.js";


const usersRouter = express.Router();
usersRouter.get("/register", tokenVerification, register);