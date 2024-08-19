import express from "express";
import { archiveUser, userAllArchive, deleteArchiveUser } from "../controller/archieve/index.js";
import tokenVerification from "../middleware/authorization.js";

const archieveRouter = express.Router();

archieveRouter.post("/user", tokenVerification, archiveUser);
archieveRouter.get("/get-all-archieve", tokenVerification, userAllArchive);
archieveRouter.get("/delete-archieve", tokenVerification, deleteArchiveUser);


export default archieveRouter;
