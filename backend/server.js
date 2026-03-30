const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


const problemRoute = require("./routes/problem");
app.use("/api",problemRoute);

const reviewRoute = require("./routes/review");
app.use("/api",reviewRoute);

mongoose.connect("mongodb://127.0.0.1:27017/userDB")
.then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err));


const userSchema = new mongoose.Schema({
    name:String,
    email:{type:String,unique:true},
    username:{type:String,unique:true},
    password:String
});

const User = mongoose.model("User",userSchema);

app.post("/register", async (req,res)=>{
    try{
        const {name,username,email,password} = req.body;

        if(!name||!email||!username||!password){
            return res.json({message:"All Fields are required"});
        }

        const emailexists = await User.findOne({email});

        if(emailexists){
            return res.json({message:"Email already Exists"});
        }

        const usernameExists = await User.findOne({username});
        if(usernameExists){
            return res.json({message:"Username alresy exist"});
        }

        const newUser = new User({
            name,
            email,
            username,
            password
        });

        await newUser.save();

        res.json({message:"user registerd sucessfully"})
    }catch(error){
        res.status(500).json({message:error.message});
    }
});

app.post("/login",async (req,res)=>{
    try{
        const {email, password} = req.body;

        if(!email || !password){
            return res.json({message:"All fields are required"});
        }

        const user = await User.findOne({email});
        if(!user){
            return res.json({message:"the email is not present"});
        }

        if(user.password !== password){
            return res.json({message:"password is invalid"});
        }

        res.json({message:"Login Sucessful"});
    }catch(error){
        res.status(500).json({message:error.message});
    }
})

app.listen(5000, ()=>{
    console.log("Server Running at port 5000");
});