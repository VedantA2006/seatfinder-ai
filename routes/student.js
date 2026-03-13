
const express = require("express")
const ExamFile = require("../models/ExamFile")

const router = express.Router()

router.get("/seat/:exam/:prn",async(req,res)=>{

const exam = await ExamFile.findOne({linkId:req.params.exam})

if(!exam) return res.json({seat:"Not found"})

const seat = exam.parsedData[req.params.prn]

res.json({seat: seat || "PRN not found"})
})

module.exports = router
