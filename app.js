import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json({limit: '16kb'}))

app.use(express.urlencoded({extended: true,limit: '16kb'}));

app.use(express.static('public'));

app.use(cookieParser());

//routes
import userRoutes from "./routes/user.routes.js"
import chatRoutes from "./routes/chat.routes.js"
import messageRoutes from "./routes/message.routes.js"

app.use('/api/v1/users',userRoutes)
app.use('/api/v1/chat',chatRoutes);
app.use('/api/v1/message',messageRoutes);

export {app}