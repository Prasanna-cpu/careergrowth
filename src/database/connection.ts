import mongoose from "mongoose"

export const connectDB = async (uri : string) => {
    try {
        const connection = await mongoose.connect(uri);
        console.info(`Connection successful : ${connection.connection.host}`)
    }
    catch (error)        {
        console.error(`Error connecting to database: ${error}`)
        throw error
    }
}