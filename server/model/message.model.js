import mongoose from "mongoose"
// import bcrypt from "bcrypt"

const messageSchema = new mongoose.Schema({
    sender: {
      id: { type: Number, required: true },
      username: String,
      avatarUrl: String,
      email: String,
    },
    content: { type: String, required: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [
      {
        id: Number,
        username: String,
        avatarUrl: String,
        email: String,
      },
    ],
  },
  {
    timestamps: true,
  })

// messageSchema.pre("save",async function(next) {
//     this.content = await bcrypt.hash(this.content,10);
//     next();
// });

// messageSchema.post("save",async function(next) {
//     this.content = await bcrypt.
// })

export const Message = mongoose.model('Message',messageSchema)