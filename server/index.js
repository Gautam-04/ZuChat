import { app } from "./app.js";
import dotenv from "dotenv"
import connectDb from "./config/DbConfig.js";
import { Server } from "socket.io";
import { createServer } from 'node:http';

dotenv.config({
    path: './env'
})


connectDb()

const server = createServer(app);

const io = new Server(server,{ 
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN
    },
    credentials: true
});

io.on('connection',(socket)=>{
    console.log(`Connected successfully ${socket.id}`);

    socket.on('setup',(user)=>{
        socket.join(user?._id);
        socket.emit(`User connected${user?._id}`)
    })

    socket.on("join room",(room)=>{
        socket.join(room);
        console.log(`User joined the room: ` + room)
    })

    socket.on("typing", (room) => socket.to(room).emit("typing"));
    socket.on("stop typing", (room) => socket.to(room).emit("stop typing"));

    socket.on("new-message", (newMessageReceived)=>{

        var chat = newMessageReceived.chat;
        console.log(chat)

        if(!chat.users) return console.log("chat.users not defined");

        chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id)    return;

            socket.in(user._id).emit("message recieved",newMessageReceived)
        })
    })

    socket.off("setup",()=>{
        console.log('User is disconnected');
        socket.leave(userData._id)
    })
})

server.listen(process.env.PORT || 8000,()=>{
    console.log(`Server connected at port ${process.env.PORT}`)
})