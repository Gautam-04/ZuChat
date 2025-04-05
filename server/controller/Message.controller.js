import { Message } from "../model/message.model.js"
import { User } from "../model/user.model.js"
import { Chat } from "../model/chat.model.js"

const allMessages = async(req,res)=>{
try {
    const messages = await Message.find({ chat: req.params.chatId }).populate("chat");

    return res.status(200).json({
      message: "Messages loaded successfully",
      messages,
    });
  } catch (error) {
    console.error("Error fetching messages:", error);
    return res.status(400).json({
      message: "There was an error fetching messages",
      error: error.message,
    });
  }
}

const sendMessage = async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    console.log("Invalid data passed into request");
    return res.status(400).json({ message: "Content and ChatId are required" });
  }

  try {
    const sender = await User.findOne({
      where: { id: req.userId },
      attributes: ["id", "username", "avatarUrl", "email"],
      raw: true,
    });

    if (!sender) {
      return res.status(404).json({ message: "Sender not found in SQL DB" });
    }

    // Create message with embedded sender
    const newMessage = await Message.create({
      sender,
      content,
      chat: chatId,
    });

    // Populate chat users
    const populatedMessage = await Message.findById(newMessage._id).populate({
      path: "chat",
      populate: {
        path: "users",
        select: "-password", // or only select fields if needed
      },
    });

    // Update latest message in the chat
    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage });

    return res.status(200).json(populatedMessage);
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(400).json({ message: "Error sending message", error: error.message });
  }
};
export {allMessages,sendMessage}