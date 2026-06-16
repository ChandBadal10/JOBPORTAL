import express from "express";
import authenticatedToken from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";




const jobRouter = express.Router();


jobRouter.post("/post", authenticatedToken, postJob);
jobRouter.get("/get", authenticatedToken, getAllJobs);
jobRouter.get("/getadminjobs", authenticatedToken, getAdminJobs);
jobRouter.get("/get/:id", authenticatedToken, getJobById);


export default jobRouter;