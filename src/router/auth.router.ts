import express from "express";
import {register, login, logout} from "../controller/auth.controller";
import {authenticationCheck} from "../middleware/auth.middleware";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

export {router as authRouter}

