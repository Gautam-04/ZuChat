import mongoose from "mongoose"
// import bcrypt from "bcrypt"

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId,ref: "User"},
    content: {type: String,required: true},
    chat: {type: mongoose.Schema.Types.ObjectId,ref: "Chat"},
    readBy: [{type: mongoose.Schema.Types.ObjectId,ref: "User"}]
},
{
    timestamps: true
})

// messageSchema.pre("save",async function(next) {
//     this.content = await bcrypt.hash(this.content,10);
//     next();
// });

// messageSchema.post("save",async function(next) {
//     this.content = await bcrypt.
// })

export const Message = mongoose.model('Message',messageSchema)