
const express = require("express")
const multer = require("multer")
const {v4:uuidv4} = require("uuid")

const extractText = require("../utils/ocr")
const parseAI = require("../utils/gemini")
const ExamFile = require("../models/ExamFile")

const router = express.Router()

const storage = multer.diskStorage({
 destination:"uploads/",
 filename:(req,file,cb)=>cb(null,Date.now()+file.originalname)
})

const upload = multer({storage})

router.post("/upload",upload.single("file"),async(req,res)=>{

const text = await extractText(req.file.path)
const parsed = await parseAI(text)

const linkId = uuidv4()

await ExamFile.create({
 linkId,
 parsedData:parsed
})

res.json({
 link:`/student.html?exam=${linkId}`
})

})

module.exports = router
