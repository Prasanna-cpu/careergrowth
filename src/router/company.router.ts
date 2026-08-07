import express from "express";
import {getCompanyById, getCompanyByUser, registerCompany, updateCompany} from "../controller/company.controller";
import {authenticationCheck} from "../middleware/auth.middleware";
import {sensitiveActionRateLimiter} from "../security-middleware/securityMiddleware";

const router = express.Router()

router.post(
    "/add",
    authenticationCheck,
    sensitiveActionRateLimiter,
    registerCompany
)

router.get(
    "/get-by-user",
    authenticationCheck,
    sensitiveActionRateLimiter,
    getCompanyByUser
)

router.get(
    "/get-by-id/:companyId",
    authenticationCheck,
    sensitiveActionRateLimiter,
    getCompanyById
)

router.put(
    "/update/:companyId",
    authenticationCheck,
    sensitiveActionRateLimiter,
    updateCompany
)


export {router as companyRouter}