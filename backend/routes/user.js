import express from "express";
import { changePassword, forgetPassword, login, register, resetPassword, setProfileVisible, updateProfile, getUserDetails, getAllUsers } from "../controller/user/index.js";
import tokenVerification from "../middleware/authorization.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/forget-password", forgetPassword);
usersRouter.post("/reset-password", resetPassword);
usersRouter.put("/profile-visible", setProfileVisible);
usersRouter.get("/get-all", getAllUsers);
usersRouter.use(tokenVerification);
usersRouter.put("/change-password", changePassword);
usersRouter.get("/get-details", getUserDetails);
usersRouter.put("/profile-update", updateProfile);




export default usersRouter;
