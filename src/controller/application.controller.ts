import {Response} from "express";
import mongoose from "mongoose";
import {AuthenticatedRequest} from "../interfaces_and_types/authenticated_request";
import {Application} from "../models/application.model";
import {Job} from "../models/job.model";
import {User} from "../models/user.model";

export const applyForJob = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const userId = req.user?._id
        const {jobId} = req.params

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }

        const user = await User.findById(userId)

        if (!user){
            return res.status(404).json({
                message: "User not found , or not authorized",
                status : res.statusCode
            })
        }

        if(user.role === "recruiter"){
            return res.status(403).json({
                message: "Applying to jobs forbidden for recruiters",
                status : res.statusCode
            })
        }


        if(!jobId || Array.isArray(jobId) || !mongoose.Types.ObjectId.isValid(jobId)) {
            return res.status(400).json({
                message: "Valid job ID is required",
                status : res.statusCode
            })
        }

        const jobObjectId = new mongoose.Types.ObjectId(jobId)

        const job = await Job.findById(jobObjectId)

        if (!job){
            return res.status(404).json({
                message: "Job not found",
                status : res.statusCode
            })
        }

        const existingApplication = await Application.findOne({
            applicant : userId,
            job : jobObjectId
        })

        if (existingApplication) {
            return res.status(409).json({
                message: "You have already applied for this job",
                status : res.statusCode
            })
        }

        const newApplication = await Application.create({
            applicant : userId,
            job : jobObjectId
        })

        await Job.findByIdAndUpdate(jobObjectId, {
            $push : {
                applications : newApplication._id
            }
        })

        return res.status(201).json({
            message : "Job applied successfully",
            status : res.statusCode,
            data : {
                application : newApplication
            }
        })

    }
    catch (e){
        console.error(`Error in applyForJob controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const getAppliedJobs = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }

        const user = await User.findById(userId)

        if (!user){
            return res.status(404).json({
                message: "User not found , or not authorized",
                status : res.statusCode
            })
        }

        if(user.role === "recruiter"){
            return res.status(403).json({
                message: "Applying to jobs forbidden for recruiters",
                status : res.statusCode
            })
        }

        const applications = await Application.find({
            applicant : userId
        }).sort({
            createdAt : -1
        }).populate({
            path : "job",
            options : {
                sort : {
                    createdAt : -1
                }
            },
            populate : {
                path : "company",
                model : "Company",
                options : {
                    sort : {
                        createdAt : -1
                    }
                }
            }
        })

        if (!applications){
            return res.status(404).json({
                message : "No applications found",
                status : res.statusCode
            })
        }

        return res.status(200).json({
            message : "Applications retrieved successfully",
            status : res.statusCode,
            data : {
                applications
            }
        })

    }
    catch (e){
        console.error(`Error in getAppliedJobs controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const getApplicants = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const {jobId} = req.params
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }

        const user = await User.findById(userId)

        if (!user){
            return res.status(404).json({
                message: "User not found , or not authorized",
                status : res.statusCode
            })
        }

        if(user.role === "student"){
            return res.status(403).json({
                message: "Forbidden to get applicants for this job",
                status : res.statusCode
            })
        }

        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });

        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        }

        return res.status(200).json({
            message : "Applicants retrieved successfully",
            status : res.statusCode,
            data : {
                job
            }
        })

    }
    catch (e){
        console.error(`Error in getApplicants controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const updateStatus = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const {applicationId} = req.params
        const userId = req.user?._id
        const {status} = req.body

        const user = await User.findById(userId)

        if (!user){
            return res.status(404).json({
                message: "User not found , or not authorized",
                status : res.statusCode
            })
        }

        if (user.role === "student"){
            return res.status(403).json({
                message: "Forbidden to update application status",
                status : res.statusCode
            })
        }

        const validStatuses = ['pending', 'accepted', 'rejected'] as const

        if (typeof status !== "string"){
            return res.status(400).json({
                message:'status must be a string',
                status : res.statusCode
            })
        }

        const normalizedStatus = status.toLowerCase()

        if(!validStatuses.includes(normalizedStatus as typeof validStatuses[number])){
            return res.status(400).json({
                message:`status must be one of: ${validStatuses.join(", ")}`,
                status : res.statusCode
            })
        }

        const validStatus = normalizedStatus as typeof validStatuses[number]

        const application = await Application.findOne({_id:applicationId}).populate<{job : {created_by : mongoose.Types.ObjectId}}>("job")
        if(!application) {
            return res.status(404).json({
                message: "Application not found.",
                status : res.statusCode
            })
        }

        if(String(application.job.created_by) !== String(userId)){
             return res.status(403).json({
                     message: "You are not authorized to update this application",
                     status : res.statusCode
             })
        }

        application.status = validStatus
        await application.save();

        return res.status(200).json({
            message: "Application status updated successfully",
            status: res.statusCode,
            data: {
                application
            }
        });

    }
    catch (e){
        console.error(`Error in updateStatus controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}