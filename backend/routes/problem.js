const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey : process.env.GROQ_API_KEY,
});

router.get("/problem", async (req, res) => {
    try {
            const response = await groq.chat.completions.create({
                model: "llama-3.1-8b-instant",
                messages: [
                    {
                        role: "user",
                        content: `
You are an API that returns ONLY VALID JSON.

Generate a DSA problem strictly in this format:

{
  "title": "string",
  "problem": "string",
  "input": "Example:\nInput: nums = [1,2,3]\n",
  "output": "Example:\nOutput: 6\n",
  "constraints": ["constraint1", "constraint2"]
}

Rules:
- Always include input and output separately
- Use \\n for new lines
- Do NOT merge input and output
- Do NOT add explanation
- Return ONLY JSON
`
                    }
                ],
            });

        const raw = response.choices[0].message.content;

        console.log("RAW RESPONSE:\n", raw); // 🔥 DEBUG

        const start = raw.indexOf("{");
        const end = raw.lastIndexOf("}") + 1;

        if (start === -1 || end === -1) {
            return res.status(500).json({ error: "Invalid JSON format from AI" });
        }

        const cleanJson = raw.substring(start, end);

        const data = JSON.parse(cleanJson);

        res.json(data);

    } catch (err) {
        console.error("BACKEND ERROR:", err);
        res.status(500).json({ error: "failed to fetch problem" });
    }
});

module.exports = router;