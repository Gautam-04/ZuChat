import { Message } from "../model/message.model.js"
import { User } from "../model/user.model.js"
import { Chat } from "../model/chat.model.js"

const allMessages = async(req,res)=>{
try {
    const messages = await Message.find({chat: req.params.chatId}).populate("sender", "username avatar email").populate("chat")
    return res.status(200).json({message: "Messages loaded successfully",messages})
} catch (error) {
    console.log("Error in getting message from connection")
    return res.status(400).json({message: "There is a error in backend",error})
}
}

const sendMessage = async(req,res) => {
const {content,chatId} = req.body;
if(!content || !chatId){
    console.log("Invalid data passed into request");
    return res.status(400).json({message: "Content/ChatId is necessary"});
}

var newMessage = {
    sender: req.user?._id,
    content: content,
    chat: chatId
}

try {
    var message = await Message.create(newMessage);

    message = await message.populate("sender","username avatar");
    message = await message.populate("chat");
    message = await User.populate(message, {
      path: "chat.users",
      select: "username avatar email",
    });

    await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

    return res.status(200).json(message)
} catch (error) {
    console.log("Error in sending message from connection")
    return res.status(400).json({message: `There is a error in sending message ${error}`})
}


}

export {allMessages,sendMessage}