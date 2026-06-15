import express from "express"
import { login, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";



const userRouter = express.Router();


userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.put("/profile/update", isAuthenticated ,updateProfile);


export default userRouter;