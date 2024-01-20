


//requirements

import express from 'express'
const cors = require('cors');
import jwt from 'jsonwebtoken'
import mongoose, { ConnectOptions, Mongoose } from "mongoose";
const path = require('path')

const userRouter = require("./Routes/user")

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user",userRouter);
app.use(express.static("public"));

app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})


// const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
const options:any = { useNewUrlParser: true, useUnifiedTopology: true }
mongoose.connect('mongodb+srv://root:root@cluster0.pphcshu.mongodb.net/MINDFUL',options
 );


 //listener 
 app.listen(3000,()=>{
    console.log("backend started")
 })



