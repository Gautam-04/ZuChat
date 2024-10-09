import { UploadToCloudinary } from "../util/Cloudinary.js";
import { User } from "../model/user.model.js";
import { generateToken } from "../config/generateToken.js";

const registerUser = async(req,res) => {
    const {username,email,dob,password} = req.body;


    if([username,email,dob,password].some((field)=>field?.trim === '')){
        return res.status(400).json({message: "Please fill all the necessary details",errorData: "Please fill all the necessary details"})
    }

    const existedUser = await User.findOne({
        $or: [{username},{email}],
    })

    if(existedUser){
        return res.status(400).json({message: "User already exists pls use different email or username",errorData: "User already exists pls use different email or username"})
    }

const localFileCopy = req.files?.avatar[0].path;

const response = await UploadToCloudinary(localFileCopy);

if(!response){
    return res.status(400).json({message: 'Cannot upload image currently',errorData: 'Cannot upload image currently',response});
}

const user = await User.create({
    username,
    email,
    dob,
    password,
    avatar: response?.url
})

const createdUser = await User.findById(user._id).select(
    "-password"
);

if(!createdUser){
    return res.status(400).json({message: 'User not created',errorData: 'User not created'});
}

const options = {
        // httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    };

const accessToken = generateToken(user._id);


return res.status(200).cookie("accessToken",accessToken,options).json({message: "User created succesfully",createdUser,accessToken})

}

const loginUser = async(req,res)=>{
const {email,username,password} = req.body;


const existedUser = await User.findOne({
    $or: [{email},{username}]
})

if(!existedUser){
    return res.status(400).json({message: "User does not exist by this username/email", errorData: "User does Not exist"})
}

const isPasswordValid = await existedUser.matchPassword(password);

if(!isPasswordValid){
    return res.status(400).json({message: "Password is incorrect", errorData: "Password is incorrect"})
}

const options = {
        // httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000
}

const loggedInUser = await User.findById(existedUser._id).select("-password")

const accessToken = generateToken(loggedInUser._id);

return res.status(200).cookie("accessToken",accessToken,options).json({message: "User Found Successfully",loggedInUser,accessToken})
}

const updateAccountDetails = async(req,res) => {
const {email,username,dob} = req.body;

// if (!username || !email || !dob) {
//         return res.status(400).json({message: 'All fields are Required'})
//     }

const user = await User.findByIdAndUpdate(req.user?._id,{
    $set: {
        email: email,
        username: username,
        dob: dob,
    }
},{new: true}).select("-password");

return res.status(200).json({message: 'Details have been updated',user})
}

const updateAvatar = async(req,res) => {
const avatarFilePath = req.files?.avatar[0]?.path;

if(!avatarFilePath){
    return res.status(400).json({message: "Avatar file is missing"});
}

const avatar = await UploadToCloudinary(avatarFilePath);
if(!avatar.url){
    return res.status(400).json({message: 'Error while uploading'})
}
    const user = await User.findByIdAndUpdate(req.user?._id,{
        $set:{avatar: avatar.url}
    },
{new: true}).select("-password");

return res.status(200).json({message: 'Avatar changes successfully',user})
}

const logout = async(req,res)=>{
const options = {
        httpOnly: true,
        secure: true,
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .json({message: "LoggedOut Successfully"});
}

const searchUser = async(req,res)=>{
const {email} = req.body;

if(!email){
    return res.status(400).json({message: "Email is empty",errorData:"Email is empty"});
}

const user = await User.findOne({email}).select("-password")

if(!user){
    return res.status(400).json({message: "User does Not exists",errorData:"User does Not exists"});
}


return res.status(200).json({message: "User exists",user})
}

export {registerUser,loginUser,updateAccountDetails,updateAvatar,logout,searchUser}