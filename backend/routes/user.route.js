import express from "express"
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import authenticatedToken from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";



const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/logout", logout);
userRouter.put(
  "/profile/update",
  authenticatedToken,
  singleUpload,
  updateProfile
);

export default userRouter;