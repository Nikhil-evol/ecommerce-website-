import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"


const app=express()
const port = 3000
app.use(express.json())
app.use(cors())
app.get("/",(req,res)=>{
    res.send("api is working")
})
connectDB()
app.use("/api/food",foodRouter)
app.use("/images",express.static('uploads'))

app.listen(port,()=>{
    console.log("server is running on"+ port)
})

