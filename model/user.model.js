import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
        username: {type: "String",required: true},
        email:{type: "String",required: true,unique: true},
        dob: {type: "String",required: true},
        password: {type: "String",required: true},
        avatar: {type: String,required: true,default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
        isAdmin: {type: Boolean,required: true,default: false}
},{
    timestamps: true
})

userSchema.methods.matchPassword = async function (enterPassword){
    return await bcrypt.compare(enterPassword,this.password);
}

userSchema.pre('save',async function(next){
    if(!this.isModified){
        next;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

export const User = mongoose.model('User',userSchema)