import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

},
{
    timestamps: true
})

export const Chat = mongoose.model('Chat',chatSchema)