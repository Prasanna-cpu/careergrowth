import express from "express";

export interface AuthenticatedRequest extends express.Request {
    user? : any
    file? : any
}