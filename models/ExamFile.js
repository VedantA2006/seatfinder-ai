
const mongoose = require("mongoose")

const ExamFile = new mongoose.Schema({
 linkId:String,
 parsedData:Object,
 createdAt:{type:Date,default:Date.now}
})

module.exports = mongoose.model("ExamFile",ExamFile)
