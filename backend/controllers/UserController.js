const bcrypt = require("bcrypt");
const User = require("../models/UserModel");
const jwt = require('jsonwebtoken')

const JWT_SECRET = process.env.JWT_SECRET || "saajriwaaj@2025"; 

const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userExists = await User.findOne({ email });
   if (userExists) {
      return res.status(400).json({
        message: `User already exists with the email "${userExists.email}".`,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });
   
     return res.status(201).json({
      message: "User created successfully",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error("Signup Error: ", err);
    res.status(500).json({ message: "Server Error" });
  }
};

const login = async (req,res)=>{
    const {email, password} = req.body;
    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"Invalid Email and Password"})
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return res.status(400).json({message:"Invalid Credentials"})
            const token =jwt.sign ({id:user._id},process.env.JWT_SECRET, { expiresIn: "7d"});
        res.status(200).cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          }).json({message:"Login Successful", token,user:{name:user.name, email: user.email}})
    }catch(err){
        console.error('Login Failed: ',err)
        res.status(500).json({message:"Server Error"})
    }
}

const logout = (req,res)=>{
  res.clearCookie('token').json({message:"Logged out Successfully."})
}

const getUser = async (req,res)=>{
  if(!req.user) return res.status(400).json({message:"Not logged in"})
    res.status(200).json({
    user: {
      name: req.user.name,
      email: req.user.email,
    },
  })
}

module.exports = { signup, login, logout, getUser };
