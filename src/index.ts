import express from "express";
import dotenv from "dotenv";
import {setServers} from "node:dns/promises";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";


dotenv.config();

setServers(["1.1.1.1","8.8.8.8"])


const app = express()
const port = process.env.PORT

if(port === undefined || port === null) throw new Error("port is not defined")

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin : process.env.CLIENT_URL,
    credentials : true
}))
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

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})





