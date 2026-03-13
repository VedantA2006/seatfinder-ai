
const mongoose = require("mongoose")

const Teacher = new mongoose.Schema({
 email:String,
 password:String
})

module.exports = mongoose.model("Teacher",Teacher)
