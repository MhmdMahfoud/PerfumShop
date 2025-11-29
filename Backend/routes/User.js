const express=require("express")
const User=require("../models/UserSchema")
const router=express.Router()
const jwt=require("jsonwebtoken")
const bcrypt=require("bcrypt")
//register new user
router.post("/register",async(req,res)=>{
  const { name, email, password, phone, address } = req.body;
  const newUser=new User({name, email, password, phone, address})
  await newUser.save()
  res.status(201).json("All is done")
  
})
module.exports=router