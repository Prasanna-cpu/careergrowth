import express from "express";
import {updateProfile} from "../controller/user.controller";
import {authenticationCheck} from "../middleware/auth.middleware";
import {upload} from "../mutler/mutler";


const router = express.Router();

router.put(
    "/update",
    authenticationCheck ,
    upload.single("profilePhoto"),
    updateProfile)

export {router as userRouter}



