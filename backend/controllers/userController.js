import userModel from "../models/userModel.js"
import fs from "fs"
import jwt from "jsonwebtoken"
import bcrypt, { compare } from "bcrypt"
import validator from "validator"
import { error } from "console"
import dotenv from 'dotenv'
dotenv.config()


const loginUser = async(req,res)=>{
    const {email,password}=req.body
    const user = await userModel.findOne({email})
    try{
    if(!user) {return res.json({success:false, message:"user not registered"})}
    const isMatch = await bcrypt.compare(password,user.password)
    if(!isMatch) {return res.json({success:false , message:"wrong password"})}
    const token = createToken(user._id)
    res.json({success:true,token,message:"login succesfully"})
    }
    catch(error)
    {
        console.log(error)
        res.json({success:false,message:"error caught"})
    }



}
const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

const registerUser = async(req,res)=>{
    const {name,email,password}=req.body
    try{
    const exist = await userModel.findOne({email})
    if(exist) {return res.json({success:false , message:"user already exist"})}
    if(!validator.isEmail(email)){return res.json({success:false,message:"enter valid email"})}
    if(password.length<8) {return res.json({success:false,message:"password should be strong"})}
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password,salt)
    const newUser = new userModel({
        name:name,
        email:email,
        password:hashedPassword
    })
    const user = await newUser.save()
    const token = createToken(user._id)
    res.json({success:true,token,message:"user register succesfully"})
    }
    catch(error){
        console.log(error)
        res.json({success:false,message:"error caught"})
    }
    


}


export {loginUser,registerUser}