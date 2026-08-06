import {Request, Response} from "express";
import {loginValidation, registerValidation} from "../validations/auth.validation";
import {User} from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"

export const register = async (req: Request, res: Response) => {
    try{
        const valid = registerValidation.validate(req.body)
        if(valid.error){
            return res.status(400).json({
                message: valid.error.details[0].message ,
                status : res.statusCode
            })
        }

        const {fullName , email , password, confirmPassword, role, phoneNumber} = valid.value

        const userExists = await User.exists({email})
        if(userExists){
            return res.status(409).json({
                message: "User already exists",
                status : res.statusCode
            })
        }

        if (password != confirmPassword){
            return res.status(400).json({
                message: "Passwords do not match",
                status : res.statusCode
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const createdUser = await User.create({
            fullName,
            email,
            phoneNumber,
            password : hashedPassword,
            role
        })

        const displayUser = await User.findOne({email}).select("-password")

        return res.status(201).json({
            message: "User registered successfully",
            status : res.statusCode,
            data : {
                user : displayUser
            }
        })

    }
    catch (e) {
        console.error(`Error in register controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}


export const login = async (req : Request, res : Response) => {
    try{
        const {error , value} = loginValidation.validate(req.body)

        if(error){
            return res.status(400).json({
                message: error.details[0].message,
                status : res.statusCode
            })
        }

        const {email , password} = value

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                message: "Invalid credentials",
                status : res.statusCode
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password)

        if(!isPasswordMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
                status : res.statusCode
            })
        }

        const jwtSecret = process.env.JWT_SECRET
        if (!jwtSecret) {
            console.error("JWT_SECRET is not configured")
            return res.status(500).json({
                message: "Internal Server Error",
                status: res.statusCode
            })
        }

        const tokenData = {
            userId : user._id
        }
        const token = jwt.sign(tokenData, jwtSecret, {expiresIn: '1h'})

        return res.status(200).cookie("token", token, {
            httpOnly : true,
            secure : true,
            sameSite : 'strict',
            maxAge : 60 * 60 * 1000
        }).json({
            message: "Login successful",
            status : res.statusCode,
            data : {
                message : `Welcome ${user.fullName}, Login Successful`
            }
        })

    }
    catch (e) {
        console.error(`Error in login controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}

export const logout = async (req : Request , res: Response) => {
    try{
        return res.clearCookie("token").json({
            message: "Logout successful",
            status : res.statusCode
        })
    }
    catch (e) {
        console.error(`Error in logout controller: ${e}`)
        return res.status(500).json({ message: "Internal Server Error" , status : res.statusCode })
    }
}
