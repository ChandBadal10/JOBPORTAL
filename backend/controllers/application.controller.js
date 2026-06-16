import { populate } from "dotenv";
import Application from "../models/application.model.js";
import Job from "../models/job.model.js";


// Apply Job

export const applyJob = async (req, res) => {
    try{
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            })
        };


        // check if the user has already applied fo the job or not

        const existingApplication = await Application.findOne({job: jobId, application: userId});

        if(existingApplication) {
            return res.status(400).json({
                message: "You have already applied for the job",
                success: false
            })
        };

        // check if the job exists

        const job = await Job.findById(jobId);
        if(!job) {

        return res.status(404).json({
            message: "Job not found",
            success: false
        })

        }

        // create a new application

        const newApplication = await Application.create({
            job: jobId,
            application: userId
        });

        job.application.push(newApplication._id);
        await job.save();

        return res.status(201).json({
            message: "Job applied successfully",
            success: true
        })
    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


// Getting all applied jobs

export const getAppliedJobs  = async (req, res) => {
    try{
        const userId = req.id;
        const application = (await Application.find({applicant: userId})).toSorted({createdAt: -1}).populate({
            path: "job",
            options: {short: {createdAt: -1}},
            populate:{
                path: "company",
                options: {sort: {createdAt: -1}}
            }
        });

        if(!application) {
            return res.status(404).json({
                message: "No Application",
                success: false
            })
        };

        return res.status(200).json({
            application,
            success: true
        })


    } catch(error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        })
    }
}


// check how many applicants are here

export const getApplicants = async(req, res) => {
    try{

    } catch(error){
        console.log(error);
        return res.status(500).json({
            message : "Internal Server Error",
            success: false
        })
    }
}