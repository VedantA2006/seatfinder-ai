
const express = require("express")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Teacher = require("../models/Teacher")

const router = express.Router()

router.post("/register",async(req,res)=>{

const hash = await bcrypt.hash(req.body.password,10)

await Teacher.create({
 email:req.body.email,
 password:hash
})

res.json({msg:"created"})
})

router.post("/login",async(req,res)=>{

const user = await Teacher.findOne({email:req.body.email})

if(!user) return res.status(400).json({msg:"invalid"})

const match = await bcrypt.compare(req.body.password,user.password)

if(!match) return res.status(400).json({msg:"invalid"})

const token = jwt.sign({id:user._id},process.env.JWT_SECRET)

res.json({token})
})

module.exports = router
