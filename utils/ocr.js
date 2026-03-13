
const Tesseract = require("tesseract.js")
const fs = require("fs")
const pdf = require("pdf-parse")

async function extractText(file){

if(file.endsWith(".pdf")){
 const data = await pdf(fs.readFileSync(file))
 return data.text
}

const {data:{text}} = await Tesseract.recognize(file,"eng",{
 logger:m=>console.log(m)
})

return text

}

module.exports = extractText
