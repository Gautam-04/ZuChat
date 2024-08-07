import { app } from "./app.js";
import dotenv from "dotenv"
import connectDb from "./config/DbConfig.js";
import { Server } from "socket.io";

dotenv.config({
    path: './env'
})


connectDb()
const server = app.listen(process.env.PORT || 8000,()=>{
    console.log(`Server connected at port ${process.env.PORT}`)
})

const io = new Server(server,{
    pingTimeout: 60000,
    cors: {
        origin: process.env.CORS_ORIGIN
    }
});

io.on('connection',(socket)=>{
    console.log("Connected to socket.io");
    socket.on("setup",(userData)=>{
        socket.join(userData._id);
        socket.emit('Connected')
    })

    socket.on("join room",(room)=>{
        socket.join(room);
        console.log(`User joined the room: ` + room)
    })

    socket.on("typing", (room)=> socket.in(room).emit("Typing..."));
    socket.on("stoptyping", (room)=> socket.in(room).emit("Stop typing"))

    socket.on("new message", (newMessageReceived)=>{
        var chat = newMessageReceived.chat;

        if(!chat.user) return console.log("chat.users not defined");

        chat.users.forEach((user)=>{
            if(user._id == newMessageReceived.sender._id) return;

            socket.in(user._id).emit("new message",newMessageReceived)
        })
    })

    socket.off("setup",()=>{
        console.log('User is disconnected');
        socket.leave(userData._id)
    })
})