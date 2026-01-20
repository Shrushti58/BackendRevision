import express from 'express'
import { configDotenv } from 'dotenv';
import connectDB from './config/db.js';

configDotenv();
connectDB();

const app=express();

app.get('/',(req,res)=>{
    res.send("Server Working");
})

app.listen(3000,()=>{
    console.log("Server Running");
})