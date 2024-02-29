
import express from "express";
import mongoose  from "mongoose";
import authRouter from "./routes/auth.route.js"
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("MongoDB connected");
    }).catch((err)=>{
        console.log(err);
});
const app = express();
app.use(express.json());

app.get( "/", (req, res) => {
    res.send("Hello World!");
});

app.use("/api/auth", authRouter);
 

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode  || 500;
    const message= err.message ||'Internal Server Error';
    return  res.status(statusCode).json({
        success: false ,
        statusCode,
        message
    })
 })

app.listen( 3000, () => { console.log('Listening on port 3000') } );