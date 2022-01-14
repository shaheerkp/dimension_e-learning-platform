import express from "express";
import cors from "cors";
import fs from "fs";
import csrf from "csurf";
import cookieParser from "cookie-parser";
require("dotenv").config();


import mongoose from "mongoose";
const morgan = require("morgan");
// const router = require("./routes/auth");

const csrfProtection = csrf({ cookie: true });

const app = express();
app.use(cookieParser())

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Data base connected succesfully");
  })
  .catch((err) => {
    console.log("ERRRR", err);
  });

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

fs.readdirSync("./routes").map(r=>{
    app.use(`/api`,require(`./routes/${r}`))
})
// app.use("/api", router); 
//csrf 
app.use(csrfProtection); 

app.get('/api/csrf-token',(req,res)=>{
  console.log("csrfff");
  res.json({csrfToken:req.csrfToken()}) 
})   

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`listen to ${port}`) 
});
