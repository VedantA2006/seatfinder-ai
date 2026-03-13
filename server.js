
require("dotenv").config()
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const path = require("path")

const uploadRoute = require("./routes/upload")
const studentRoute = require("./routes/student")
const authRoute = require("./routes/auth")

const app = express()

app.use(cors({
  origin: "*",
  methods: ["GET","POST"],
  allowedHeaders: ["Content-Type"]
}))
app.use(express.json())
app.use(express.static("public"))

mongoose.connect(process.env.MONGO_URI).then(()=>{
console.log("MongoDB Connected")
})

app.use("/api", uploadRoute)
app.use("/api", studentRoute)
app.use("/api", authRoute)

app.get("/",(req,res)=>{
res.sendFile(path.join(__dirname,"public","index.html"))
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log("Server running on port " + PORT)
})
