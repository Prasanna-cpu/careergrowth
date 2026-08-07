import express from "express"
import {authenticationCheck} from "../middleware/auth.middleware";
import {postJob, getAllJobs, getAdminJob, getJobById} from "../controller/job.controller";
import {sensitiveActionRateLimiter} from "../security-middleware/securityMiddleware";

const router = express.Router()

router.post(
    "/post-job",
    authenticationCheck,
    sensitiveActionRateLimiter,
    postJob
)

router.get(
    "/get-all-jobs",
    authenticationCheck,
    sensitiveActionRateLimiter,
    getAllJobs
)


router.get(
    "/get-job-by-id/:jobId",
    authenticationCheck,
    sensitiveActionRateLimiter,
    getJobById
)

router.get(
    "/get-admin-jobs",
    authenticationCheck,
    sensitiveActionRateLimiter,
    getAdminJob
)

export {router as jobRouter}
