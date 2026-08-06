import express from "express";
import {getCompanyById, getCompanyByUser, registerCompany, updateCompany} from "../controller/company.controller";
import {authenticationCheck} from "../middleware/auth.middleware";

const router = express.Router()

router.post("/add", authenticationCheck,  registerCompany)
router.get("/get-by-user", authenticationCheck, getCompanyByUser)
router.get("/get-by-id/:companyId", authenticationCheck, getCompanyById)
router.put("/update/:companyId", authenticationCheck, updateCompany)


export {router as companyRouter}