import express from "express";
import {register, login, logout} from "../controller/auth.controller";
import {authenticationCheck} from "../middleware/auth.middleware";
import {authRateLimiter} from "../security-middleware/securityMiddleware";

const router = express.Router();

router.post(
    "/register",
    authRateLimiter,
    register
);

router.post(
    "/login",
    authRateLimiter,
    login
);


router.post(
    "/logout",
    logout
);

export {router as authRouter}

