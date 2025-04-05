import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({
    chatName: { type: String, trim: true },
    isGroupChat: { type: Boolean, default: false },

    users: [
      {
        id: Number,
        username: String,
        avatarUrl: String,
        email: String,
      },
    ],

    latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
      default: null,
    },

    groupAdmin: {
      id: Number,
      username: String,
      avatarUrl: String,
      email: String,
    },
  },
  {
    timestamps: true,
  })

export const Chat = mongoose.model('Chat',chatSchema)