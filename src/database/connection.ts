import mongoose from "mongoose"

export const connectDB = async (uri : string) => {
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