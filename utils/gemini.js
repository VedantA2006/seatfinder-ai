
const {GoogleGenerativeAI} = require("@google/generative-ai")

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)

async function parseAI(text){

const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro-latest" })

const prompt = `
You are an AI that extracts exam seating arrangements.

Return ONLY JSON.

Format:
{
"PRN":"Room A101 Seat 12"
}

Rules:
- Detect PRN numbers
- Detect room numbers
- Detect seat numbers
- Ignore other text
- Ensure valid JSON

Text:
${text}
`

const result = await model.generateContent(prompt)

let out = result.response.text()

try{
return JSON.parse(out)
}catch{
return {}
}

}

module.exports = parseAI
