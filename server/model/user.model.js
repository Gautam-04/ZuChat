import mongoose from "mongoose";
import bcrypt from "bcrypt"
import { DataTypes } from "sequelize";
import { sequelize } from "../config/Sequelize.js";

// const userSchema = mongoose.Schema({
//         username: {type: "String",required: true,unique: true},
//         email:{type: "String",required: true,unique: true},
//         dob: {type: "String",required: true},
//         password: {type: "String",required: true},
//         avatarUrl: {type: "String", default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
//         isAdmin: {type: Boolean,required: true,default: false}
// },{
//     timestamps: true
// })

// userSchema.pre('save',async function(next){
//     if(!this.isModified("password")) return next();

//     this.password = await bcrypt.hash(this.password,10);
//     next();
// })

// userSchema.methods.matchPassword = async function (password){
//     return await bcrypt.compare(password,this.password);
// }

// export const User = mongoose.model('User',userSchema)

const User = sequelize.define('User', {
id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
dob: {
    type: DataTypes.STRING,
    allowNull: false
  },
password: {
    type: DataTypes.STRING,
    allowNull: false
  },
avatarUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
  },
isAdmin: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
})

export {User}
