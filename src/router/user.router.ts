import express from "express";
import {updateProfile} from "../controller/user.controller";
import {authenticationCheck} from "../middleware/auth.middleware";
import {upload} from "../mutler/mutler";
import {sensitiveActionRateLimiter} from "../security-middleware/securityMiddleware";


const router = express.Router();

router.put(
    "/update",
    authenticationCheck ,
    sensitiveActionRateLimiter,
    upload.single("profilePhoto"),
    updateProfile
)

export {router as userRouter}



