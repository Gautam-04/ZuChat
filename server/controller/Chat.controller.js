import {Chat} from '../model/chat.model.js'
import { User } from '../model/user.model.js';

const accessChat = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required." });
  }

  try {
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      "users.id": req.userId,
      "users.id": userId,
    }).populate("latestMessage").sort({ updatedAt: -1 });

    // If chat exists, attach sender info from SQL
    if (existingChat) {
      if (existingChat.latestMessage?.sender) {
        const sender = await User.findOne({
          where: { id: existingChat.latestMessage.sender },
          attributes: ["id", "username", "avatarUrl", "email"],
          raw: true,
        });

        if (sender) {
          existingChat.latestMessage = {
            ...existingChat.latestMessage.toObject?.() || existingChat.latestMessage,
            sender,
          };
        }
      }

      return res.status(200).json(existingChat);
    }

    // If chat doesn't exist, fetch both users from SQL
    const [user1, user2] = await Promise.all([
      User.findOne({
        where: { id: req.userId },
        attributes: ["id", "username", "avatarUrl", "email"],
        raw: true,
      }),
      User.findOne({
        where: { id: userId },
        attributes: ["id", "username", "avatarUrl", "email"],
        raw: true,
      }),
    ]);

    if (!user1 || !user2) {
      return res.status(404).json({ message: "One or both users not found." });
    }

    const chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [user1, user2], // embed user objects directly
    };

    const createdChat = await Chat.create(chatData);
    const fullChat = await Chat.findById(createdChat._id).populate("latestMessage");

    return res.status(200).json({ message: "Chat created successfully", chat: fullChat });

  } catch (error) {
    console.error("Access Chat Error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};


  const fetchChats = async (req, res) => {
    try {
      const results = await Chat.find({
        "users.id": req.userId, 
      })
        .populate("latestMessage") // This will include embedded sender
        .sort({ updatedAt: -1 });

      return res.status(200).json(results);
    } catch (error) {
      console.error("Fetch Chats Error:", error);
      return res.status(500).json({
        message: "There was an error in fetching chats",
        error: error.message,
      });
    }
  };


const createGroupChats = async(req,res) => {
    if(!req.body.users || !req.body.chatName) {
        return res.status(400).json({message: 'There is no user to create a group'})
    }

    var users = req.body.users;

    if(users.length < 2){
        return res.status(400).json({message: "Group can be created in more than 2 members"});
    }

    users.push(req.user);

    try {
        const groupChat = await Chat.create({
            chatName: req.body.chatName,
            isGroupChat: true,
            users: users,
            groupAdmin: req.user
        })

        if(!groupChat){
            return res.status(400).json({message: "groupchat not created"})
        }

        const fullGroupChat = await Chat.findOne({_id: groupChat._id}).populate("users", "-password").populate("groupAdmin", "-password")

        return res.status(200).json({message: "Groupd created successfully", fullGroupChat})

    } catch (error) {
        return res.status(400).json({message: 'Group cannot be created'})
    }
}

const renameGroupChats = async(req,res) => {
    const {chatId,updatedchatName} = req.body;

    if(!chatId){
        return res.status(400).json({message: 'There is a error in receiving chatid from body'})
    }

    const updatedChat = await Chat.findByIdAndUpdate(chatId,{
        chatName: updatedchatName
    },
    {
        new: true,
    }
).populate("users", "-password").populate("groupAdmin","-password")

if(updatedChat){
    return res.status(200).json({message: "Groupname updated successfully"})
}else{
    return res.status(400).json({message: "Groupname not updated"})
}
}

const addMembers = async (req,res) => {
    const {chatId,userId} = req.body;

    if(!chatId || !userId){
        return res.status(400).json({message: "No user or chat selected to delete user"})
    }

    const addChat = await Chat.findByIdAndUpdate(chatId,{
        $push: {users: userId}
    },{
        new: true
    }).populate("users","-password").populate("groupAdmin","-password")

    if(addChat){
        return res.status(200).json({message: "User added succesfully",addChat})
    }else{
        return res.status(400).json({message: "User not added"})
    }
}

const removeMember = async(req,res) => {
    const {chatId,userId} = req.body;

    if(!chatId || !userId){
        return res.status(400).json({message: "No user or chat selected to delete user"})
    }

    const removedChat = await Chat.findByIdAndUpdate(chatId,{
        $pull: {users: userId}
    },{
        new: true
    }).populate("users","-password").populate("groupAdmin","-password")

    if(removedChat){
        return res.status(200).json({message: "User removed succesfully",removedChat})
    }else{
        return res.status(400).json({message: "User not removed"})
    }
}

export {accessChat,fetchChats,createGroupChats,renameGroupChats,addMembers,removeMember}