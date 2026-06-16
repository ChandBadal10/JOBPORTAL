import express from "express";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
import authenticatedToken from "../middlewares/isAuthenticated.js";



const applicationRouter = express.Router();

applicationRouter.get("/apply/:id", authenticatedToken, applyJob);
applicationRouter.get("/get", authenticatedToken, getAppliedJobs);
applicationRouter.get("/:id/applicants", authenticatedToken, getApplicants);
applicationRouter.post("/status/:id/update", authenticatedToken, updateStatus);

export default applicationRouter