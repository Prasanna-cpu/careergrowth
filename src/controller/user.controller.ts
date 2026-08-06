
import {Request, Response} from "express";
import {AuthenticatedRequest} from "../interfaces_and_types/authenticated_request";
import {User} from "../models/user.model";

export const updateProfile = async (req : AuthenticatedRequest, res: Response) => {
    try{
        const {fullName, email, phoneNumber, bio, skills} = req.body
        if (!fullName && !email && !phoneNumber && !bio && !skills) {
            return res.status(400).json({
                message: "At least one field is required",
                status: 400
            });
        }

        let skillsArray: string[] | undefined
        if (skills != null) {
            if (Array.isArray(skills)) {
                skillsArray = skills
            } else if (typeof skills === "string") {
                skillsArray = skills.split(",")
            } else {
                return res.status(400).json({
                    message: "Skills must be a comma-separated string or an array",
                    status: res.statusCode
                })
            }

            skillsArray = skillsArray.map((skill) => skill.trim()).filter(Boolean)
        }

        const userId = req.user?.id

        let user = await User.findById(userId)

        if(!user){
            return res.status(404).json({
                message: "User not found",
                status: res.statusCode
            })
        }

        if (fullName != null) user.fullName = fullName
        if (email != null) user.email = email
        if (phoneNumber != null) user.phoneNumber = phoneNumber
        if (bio != null){
            if (user.profile != null){
                user.profile.bio = bio
            }
        }
        if (skillsArray != null) {
            if (user.profile != null) {
                user.profile.skills = skillsArray
            }
        }
        const newUpdatedUser = await user.save();

        return res.status(200).json({
            message: "Profile updated successfully",
            status: res.statusCode,
            data : {
                user : newUpdatedUser
            }
        })
    }
    catch(e){
        console.error(`Error in updateProfile controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}
