import express from "express";
import { archiveUser } from "../controller/archieve/index.js";
import tokenVerification from "../middleware/authorization.js";

const archieveRouter = express.Router();

archieveRouter.post("/user", tokenVerification, archiveUser);

export default archieveRouter;
