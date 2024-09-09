import mongoose from "mongoose"
import {DB_NAME} from "../constant.js"

async function connectDb(){
try {
    const Connection = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
    console.log(`MongoDB server connected to port: ${Connection.connection.host}`)
} catch (error) {
    console.log(`Server not connected to the database`,error);
    process.exit(1)
}
}

export default connectDb