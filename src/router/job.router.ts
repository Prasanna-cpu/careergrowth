import express from "express"
import {authenticationCheck} from "../middleware/auth.middleware";
import {postJob, getAllJobs, getAdminJob, getJobById} from "../controller/job.controller";

const router = express.Router()

router.post("/post-job", authenticationCheck, postJob)
router.get("/get-all-jobs", authenticationCheck, getAllJobs)
router.get("/get-job-by-id/:jobId", authenticationCheck, getJobById)
router.get("/get-admin-jobs", authenticationCheck, getAdminJob)

export {router as jobRouter}
