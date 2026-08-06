import {Request, Response} from "express"
import {AuthenticatedRequest} from "../interfaces_and_types/authenticated_request";
import {Company} from "../models/company.model";

export const registerCompany = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const {companyName} = req.body
        const userId = req.user?._id

        if(!userId){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }

        if(!companyName){
            return res.status(400).json({
                message: "Company name is required",
                status : res.statusCode
            })
        }
        let company = await Company.findOne({
            name : companyName
        })

        if(company){
            return res.status(409).json({
                message: "Company already exists",
                status : res.statusCode
            })
        }

        const newCompany = await Company.create({
            name : companyName,
            userId
        })

        return res.status(201).json({
            message : "Company successfully created",
            data : {
                company : newCompany
            }
        })


    }
    catch(e){
        console.error(`Error in registerCompany controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const getCompanyByUser = async (req : AuthenticatedRequest, res : Response) => {
    try{
        const userId = req.user?.id
        const companies = await Company.find({userId})
        if(!companies) {
            return res.status(404).json({
                message: "No companies found",
                status : res.statusCode
            })
        }

        return res.status(200).json({
            message: "Companies retrieved successfully",
            status : res.statusCode,
            data : {
                companies
            }
        })
    }
    catch (e) {
        console.error(`Error in getCompanyByUser controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }

}

export const getCompanyById = async (req : AuthenticatedRequest , res : Response) => {
    try{
        const {companyId} = req.params
        const company = await Company.findById(companyId)
        if(!company){
            return res.status(404).json({
                message: "Company not found",
                status : res.statusCode
            })
        }
        return res.status(200).json({
            message: "Company retrieved successfully",
            status : res.statusCode,
            data : {
                company
            }
        })
    }
    catch (e) {
        console.error(`Error in getCompanyById controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}


export const updateCompany = async (req : AuthenticatedRequest , res : Response) => {
    try{
        const {name , description, website, location} = req.body
        const file = req.file

        const updateData = {name, description, website, location}

        const company = await Company.findByIdAndUpdate(req.params.companyId, updateData, {returnDocument : "after"})

        if(!company) {
            return res.status(404).json({
                message: "Company not found",
                status : res.statusCode
            })
        }

        return res.status(200).json({
            message : "Company information updated",
            data : {
                company
            }
        })

    }
    catch (e) {
        console.error(`Error in updateCompany controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}
