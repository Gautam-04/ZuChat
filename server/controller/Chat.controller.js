import {Chat} from '../model/chat.model.js'
import { User } from '../model/user.model.js';

const accessChat = async(req,res) => {
    const { userId } = req.body;
    if(!userId){
        console.log('UserId not sent with the req');
        return res.status(400).json({message: 'User id is not found'})
    }

    var isChat = await Chat.find({
        isGroupChat: false,
        $and: [
            {users: {$elemMatch: {$eq: req.user._id}}},
            {users: {$elemMatch: {$eq: userId}}}
        ]
    }).populate("users", "-password").populate("latestMessage")

    isChat = await User.populate(isChat,{
        path: "latestMessage.sender",
        select: "username avatar email",
    })

    if(isChat.length > 0){
        return res.send(isChat[0]);
    }else{
        var chatData = {
            chatName : "sender",
            isGroupChat: false,
            users: [req.user._id,userId]
        }

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({_id: createdChat._id}).populate("users", "-password");
            return res.status(200).json({'message': 'chat shared successfully',FullChat})
        } catch (error) {
            return res.status(400).json({'message': error.message})
        }

    }
}

const fetchChats = async(req,res) => {
try {
    await Chat.find({users: {$elemMatch: {$eq: req.user._id}}})
    .populate("users","-password").populate("groupAdmin","-password").populate("latestMessage").sort({updatedAt: -1})
    .then(async(results)=>{
        results = await User.populate(results,{
            path: "latestMessage.sender",
            select: "username avatar email"
        })
        return res.status(200).json(results)
    });

} catch (error) {
    return res.status(200).json({'message': 'There was a error in fetching data',error})
}
}

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