import express from "express";
import dotenv from "dotenv";
import {setServers} from "node:dns/promises";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import {connectDB} from "./database/connection";
import {authRouter} from "./router/auth.router";
import {userRouter} from "./router/user.router";
import {companyRouter} from "./router/company.router";
import {jobRouter} from "./router/job.router";
import {applicationRouter} from "./router/application.router";
import {botUserAgentBlocker, suspiciousRequestBlocker,standardRateLimiter} from "./security-middleware/securityMiddleware";


dotenv.config();

setServers(["1.1.1.1","8.8.8.8"])


const app = express()
const port = process.env.PORT
const uri = process.env.MONGODB_URI

if(port === undefined || port === null) throw new Error("port is not defined")
if(uri === undefined || uri === null) throw new Error("uri is not defined")


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))
app.use(botUserAgentBlocker)
app.use(suspiciousRequestBlocker)
app.use(standardRateLimiter)
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'", "trusted-cdn.com"],
                styleSrc: ["'self'", "fonts.googleapis.com"],
                imgSrc: ["'self'", "data:"],
            },
        },
    })
);

app.use(cookieParser())

app.get("/", (_, res) => {
    res.send("Hello World!")
})

app.use("/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/company", companyRouter)
app.use("/api/job", jobRouter)
app.use("/api/application", applicationRouter)

const startServer = async () => {
    await connectDB(uri as string)
    console.log("Database connected")

    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`)
    })
}

startServer().catch((error) => {
    console.error("Failed to start server:", error)
    process.exit(1)
})





