import {AuthenticatedRequest} from "../interfaces_and_types/authenticated_request";
import {Request, Response} from "express";
import {Job} from "../models/job.model";
import {Company} from "../models/company.model";
import {User} from "../models/user.model";

export const postJob = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const {title, description, requirements, salary, location, jobType, experience, position, companyId} = req.body
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

        if (user.role === "student"){
            return res.status(403).json({
                message : "Students are forbidden to do this operation",
                status : res.statusCode
            })
        }

        if(!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId){
            return res.status(400).json({
                message: "All fields are required",
                status : res.statusCode
            })
        }

        let requirementArray : string[] | undefined
        if(requirements != null){
            if (Array.isArray(requirements)) {
                requirementArray = requirements
            } else if (typeof requirements === "string") {
                requirementArray = requirements.split(",")
            } else {
                return res.status(400).json({
                    message: "Requirements must be a comma-separated string or an array",
                    status: res.statusCode
                })
            }
            requirementArray = requirementArray.map((requirement) => requirement.trim()).filter(Boolean)
        }

        const company = await Company.findOne({_id : companyId, userId})
        if(!company){
            return res.status(403).json({
                message: "You are not authorized to create jobs for this company",
                status : res.statusCode
            })
        }

         const newJob = await Job.create({
             title,
             description,
             requirements : requirementArray,
             salary : Number(salary),
             location,
             jobType,
             experienceLevel : experience,
             position,
             company : companyId,
             created_by : userId
         })

        return res.status(201).json({
            message : "New Job Created Successfully",
            data : {
                job : newJob
            },
            status : res.statusCode
        })
    }
    catch (e) {
        console.error(`Error in postJob controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const getAllJobs = async (req : AuthenticatedRequest, res : Response) => {
    try{
       const keyword = typeof req.query.keyword === "string" ? req.query.keyword.trim() : "";
       const query = keyword ? {
           $or: [
               { title: { $regex: keyword, $options: "i" } },
               { description: { $regex: keyword, $options: "i" } },
           ]
       } : {}

       const jobs = await Job.find(query).populate({
           path : "company"
       }).sort({
           createdAt : -1
       })

        if (!jobs) {
            return res.status(404).json({
                message: "Jobs not found.",
                success: false
            })
        }

       return res.status(200).json({
           message: "Jobs retrieved successfully",
           status: res.statusCode,
           data: {
               jobs
           }
       })

    }
    catch(e) {
        console.error(`Error in getAllJobs controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }


}

export const getJobById = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const {jobId} = req.params
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }

        const job = await Job.findById(jobId)
        if(!job){
            return res.status(404).json({
                message: "Job not found",
                status : res.statusCode
            })
        }

        if(job.created_by.toString() === userId.toString()){
            await job.populate({
                path : "applications"
            })
        }

        return res.status(200).json({
            message: "Job retrieved successfully",
            status : res.statusCode,
            data : {
                job
            }
        })
    }
    catch (e) {
        console.error(`Error in getJobById controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const getAdminJob = async (req : AuthenticatedRequest , res : Response) => {
    try{
        const adminId = req.user?._id

        const user = await User.findById(adminId)

        if (!user){
            return res.status(404).json({
                message: "User not found , or not authorized",
                status : res.statusCode
            })
        }

        if (user.role === "student"){
            return res.status(403).json({
                message : "Students are forbidden to do this operation",
                status : res.statusCode
            })
        }

        const jobs = await Job.find({created_by : adminId}).populate({
            path : "company"
        }).sort({
            createdAt : -1
        })

        if (!jobs || jobs.length === 0){
            return res.status(404).json({
                message: "Jobs not found",
                status : res.statusCode
            })
        }

        return res.status(200).json({
            message: "Admin jobs retrieved successfully",
            status : res.statusCode,
            data : {
                jobs
            }
        })

    }
    catch (e) {
        console.error(`Error in getAdminJob controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}
