import express from "express";
import {applyForJob, getApplicants, getAppliedJobs, updateStatus} from "../controller/application.controller";
import {authenticationCheck} from "../middleware/auth.middleware";
import {sensitiveActionRateLimiter} from "../security-middleware/securityMiddleware";

const router = express.Router()

router.post(
    "/apply-job/:jobId",
    authenticationCheck,
    sensitiveActionRateLimiter,
    applyForJob
)

router.get(
    "/applied-jobs",
    authenticationCheck ,
    sensitiveActionRateLimiter,
    getAppliedJobs
)


router.get(
    "/applicants/:jobId",
    authenticationCheck ,
    sensitiveActionRateLimiter,
    getApplicants
)


router.put(
    "/update-status/:applicationId",
    authenticationCheck,
    sensitiveActionRateLimiter,
    updateStatus
)

export {router as applicationRouter}
