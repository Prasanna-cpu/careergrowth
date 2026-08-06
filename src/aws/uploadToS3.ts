import { PutObjectCommand } from "@aws-sdk/client-s3";
import {awsS3Client} from "./s3";
import { v4 as uuid } from "uuid";

const bucket = process.env.AWS_BUCKET

if(!bucket) throw new Error("AWS bucket not found")

export const uploadToS3 = async (file : any, folder : any) => {

    const key = `${folder}/${uuid()}-${file.originalname}`;

    await awsS3Client.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: file.buffer,
            ContentType: file.mimetype
        })
    );

    return {
        key,
        url: `https://${process.env.AWS_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
    };

};