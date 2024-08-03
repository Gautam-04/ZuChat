import { app } from "./app.js";
import dotenv from "dotenv"
import connectDb from "./config/DbConfig.js";

dotenv.config({
    path: './env'
})

connectDb()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`Server connected at port ${process.env.PORT}`)
    })
})
.catch((err)=>{console.log(err);})
