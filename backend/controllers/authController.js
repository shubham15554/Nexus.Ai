const mongoose = require('mongoose');
const User = require("../models/user");
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");
module.exports.registerUser = async (req , res) => {

    try{
        let {username, email, password} = req.body;

        if(!username || !email || !password){
            return res.status(400).json({msg : "Please fill all the fields" , success : false});
        }
        const userAlreadyExists = await User.findOne({email});

        if(userAlreadyExists){
            return res.status(400).json({msg : "User already exists" , success : false});
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const newUser = new User({
            username,
            email,
            password : hashedPassword
        });

        await newUser.save();
        let token = generateToken(newUser._id);
        res.cookie("token", token, {
            httpOnly: true,         
            secure: true,           
            sameSite: "none",       
            maxAge: 24 * 60 * 60 * 1000, 
        });
        
        return res.status(201).json({msg : "User registered successfully", user: newUser , success : true});

    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({msg : "Internal server error" , success : false});
    }
}



module.exports.login = async (req , res)=>{

    try{
        console.log("Logging in user with data:", req.body);
        let {email , password} = req.body;  
        if(!email || !password){  
            return res.status(400).json({msg : "Please fill all the fields", success : false});
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({msg : "Invalid credentials" ,  success : false});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({msg : "Invalid credentials" , success : false});
        }

        let token = generateToken(user._id);
        res.cookie("token", token, {
            httpOnly: true,         
            secure: true,           
            sameSite: "none",       
            maxAge: 24 * 60 * 60 * 1000, 
        });

        return res.status(200).json({msg : "Login successful", user: user , success : true});
    }
    catch(err){
        console.error('Error logging in user:', err);
        return res.status(500).json({msg : "Internal server error" , success : false});
    }
}


module.exports.getProfile =   async (req, res) => {
  try {
    const token = req.cookies.token;
    console.log("taken " , token);
    if (!token) return res.status(401).json({ message: "No token found in cookies" });


    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    console.log("Decoded Payload:", decoded);

    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found in DB" });

    res.status(200).json({ user });
  } catch (error) {
   
    console.log("JWT VERIFY ERROR:", error.message); 
    res.status(401).json({ 
      message: "Invalid token", 
      reason: error.message 
    });
  }
};
