import express from "express";
import {applyForJob, getApplicants, getAppliedJobs, updateStatus} from "../controller/application.controller";
import {authenticationCheck} from "../middleware/auth.middleware";

const router = express.Router()

router.post("/apply-job/:jobId", authenticationCheck ,applyForJob)
router.get("/applied-jobs", authenticationCheck ,getAppliedJobs)
router.get("/applicants/:jobId", authenticationCheck ,getApplicants)
router.put("/update-status/:applicationId", authenticationCheck ,updateStatus)

export {router as applicationRouter}
