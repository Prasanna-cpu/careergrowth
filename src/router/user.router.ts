import express from "express";
import {updateProfile} from "../controller/user.controller";
import {authenticationCheck} from "../middleware/auth.middleware";


const router = express.Router();

router.put("/update", authenticationCheck ,updateProfile)

export {router as userRouter}



