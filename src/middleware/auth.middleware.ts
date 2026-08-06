import {Request , Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
import {AuthenticatedRequest} from "../interfaces_and_types/authenticated_request";
import {DecodedToken} from "../interfaces_and_types/decodedToken";
import {User} from "../models/user.model";


export const authenticationCheck = async (req : AuthenticatedRequest, res : Response, next : NextFunction) => {
    try{
        const token = req.cookies.token
        if (!token){
            return res.status(401).json({
                message: "Unauthorized",
                status : res.statusCode
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken
        // console.log("Decoded : ", decoded);
        if(!decoded){
            return res.status(401).json({
                message: "Unauthorized , invalid token",
                status : res.statusCode
            })
        }
        const user = await User.findById(decoded.userId)
        // console.log("User : ", user);
        if(!user){
            return res.status(404).json({
                status : res.statusCode,
                message : "User not found"
            })
        }

        req.user = user;
        next()
    }
    catch (e) {
        console.error(`Error in updateProfile controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}