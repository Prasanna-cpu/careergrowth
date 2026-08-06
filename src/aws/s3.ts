import {S3Client} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

dotenv.config();

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_KEY
const bucketName = process.env.AWS_BUCKET

if(!region || !accessKeyId || !secretAccessKey || !bucketName) throw new Error("AWS credentials not found")

export const awsS3Client = new S3Client({
    region : region,
    credentials : {
        accessKeyId : accessKeyId,
        secretAccessKey : secretAccessKey
    }
})


