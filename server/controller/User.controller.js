import { UploadToCloudinary } from "../util/Cloudinary.js";
import {User} from "../model/user.model.js";
import { generateToken } from "../config/generateToken.js";
import { Sequelize } from "sequelize";
import bcrypt from "bcrypt";

const registerUser = async (req, res) => {
    try {
        const { username, email, dob, password, avatarUrl } = req.body;

        if ([username, email, dob, password].some((field) => !field || field.trim() === '')) {
            return res.status(400).json({ 
                message: "Please fill all the necessary details", 
                errorData: "Please fill all the necessary details" 
            });
        }

        const existedUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [{ email }, { username }]
            }
        });

        if (existedUser) {
            return res.status(400).json({ 
                message: "User already exists, please use different email or username", 
                errorData: "User already exists, please use different email or username" 
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            username,
            email,
            dob,
            password: hashedPassword,
            avatarUrl: avatarUrl || undefined // Use default if not provided
        });

        const createdUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!createdUser) {
            return res.status(400).json({ 
                message: 'User not created', 
                errorData: 'User not created' 
            });
        }

        const options = {
            // httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        };

        const accessToken = generateToken(user.id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json({ 
                message: "User created successfully", 
                createdUser, 
                accessToken 
            });
    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to register user", 
            errorData: error.message 
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        
        if (!email && !username) {
            return res.status(400).json({
                message: "Please provide email or username",
                errorData: "Email or username required"
            });
        }
        
        if (!password) {
            return res.status(400).json({
                message: "Please provide password",
                errorData: "Password required"
            });
        }

        const existedUser = await User.findOne({
            where: {
                [Sequelize.Op.or]: [
                    { email: email || '' },
                    { username: username || '' }
                ]
            }
        });

        if (!existedUser) {
            return res.status(400).json({ 
                message: "User does not exist with this username/email", 
                errorData: "User does not exist" 
            });
        }

        const isPasswordValid = await bcrypt.compare(password, existedUser.password);

        if (!isPasswordValid) {
            return res.status(400).json({ 
                message: "Password is incorrect", 
                errorData: "Password is incorrect" 
            });
        }

        const options = {
            // httpOnly: true,
            secure: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        };

        const loggedInUser = await User.findByPk(existedUser.id, {
            attributes: { exclude: ['password'] }
        });

        const accessToken = generateToken(existedUser.id);

        return res.status(200)
            .cookie("accessToken", accessToken, options)
            .json({ 
                message: "User logged in successfully", 
                loggedInUser, 
                accessToken 
            });
    } catch (error) {
        return res.status(500).json({ 
            message: "Failed to login", 
            errorData: error.message 
        });
    }
};

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

const user = await User.findOne({where: {email}},{
            attributes: { exclude: ['password'] }
        });

    const searchedUser = user.dataValues || null;

if(!searchUser){
    return res.status(400).json({message: "User does Not exists",errorData:"User does Not exists"});
}


return res.status(200).json({message: "User exists",searchedUser})
}

export {registerUser,loginUser,updateAccountDetails,updateAvatar,logout,searchUser}