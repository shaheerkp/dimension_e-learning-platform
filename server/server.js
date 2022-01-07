import express from "express";
import cors from "cors"
import fs from "fs" 
import mongoose from "mongoose"
const morgan =require("morgan")
const router=require('./routes/auth')
require("dotenv").config(); 


const app=express() 
 
mongoose.connect(process.env.DATABASE).then(()=>{
    console.log("Data base connected succesfully");
}).catch((err)=>{
    console.log("ERRRR",err); 
})
   
app.use(cors()) 
app.use(express.json())
app.use(morgan("dev"))



app.use('/api',router)
// fs.readdirSync("./routes").map(r=>{
//     app.use(`/api`,require(`./routes/${r}`))
// }) 

 


const port=process.env.PORT||8000
app.listen(port,()=>{
    console.log(`listen to ${port}`);
})