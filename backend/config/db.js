import mongoose from "mongoose";

export const connectDB=async()=>{
    (await mongoose.connect("mongodb://localhost:27017/ecom").then(()=>{
        console.log("db connected succesfully")
    }))
}