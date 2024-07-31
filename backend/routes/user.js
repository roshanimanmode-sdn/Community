import express from "express";
import { changePassword, forgetPassword, login, register, resetPassword } from "../controller/user/index.js";
import tokenVerification from "../middleware/authorization.js";

const usersRouter = express.Router();

usersRouter.post("/register", register);
usersRouter.post("/login", login);
usersRouter.post("/forget-password", forgetPassword);
usersRouter.post("/reset-password", resetPassword);

usersRouter.use(tokenVerification);

usersRouter.put("/change-password", changePassword);

export default usersRouter;
