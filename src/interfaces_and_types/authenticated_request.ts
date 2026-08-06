import express from "express";
import {TUser} from "../models/user.model";

export interface AuthenticatedRequest extends express.Request {
    user? : any | TUser
    file? : any
}