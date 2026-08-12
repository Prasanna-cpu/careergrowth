import mongoose from "mongoose"

export const connectDB = async (uri : string) => {
    console.log("URI:", JSON.stringify(uri));
    console.log("Starts with mongodb+srv:// ?", uri.startsWith("mongodb+srv://"));
    try {
        const connection = await mongoose.connect(uri, {
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        });
        console.info(`Connection successful : ${connection.connection.host}`)
    }
    catch (error)        {
        console.error(`Error connecting to database: ${error}`)
        throw error
    }
}