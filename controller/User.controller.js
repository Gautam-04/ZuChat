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

const localFileCopy = req.files?.avatar[0]?.path;

const response = await UploadToCloudinary(localFileCopy);

if(!response){
    return res.status(400).json({message: 'Cannot upload image currently',errorData: 'Cannot upload image currently'});
}

const user = await User.create({
    username,
    email,
    dob,
    password,
    avatar: response.url
})

const createdUser = await User.findById(user._id).select(
    "-password"
);

if(!createdUser){
    return res.status(400).json({message: 'User not created',errorData: 'User not created'});
}

const options = {
        httpOnly: true,
        secure: true,
    };

const accessToken = generateToken(user._id);


return res.status(200).cookie("accessToken",accessToken,options).json({message: "User created succesfully",createdUser})

}

export {registerUser}