const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");
const mongoose = require("mongoose");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

// ✅ create model here (or import if separate file)
const solvedSchema = new mongoose.Schema({
    title: String,
    code: String,
    isCorrect: Boolean,
    createdAt: { type: Date, default: Date.now }
});

const Solved = mongoose.model("Solved", solvedSchema);

router.post("/review", async (req, res) => {
    const { code, problem } = req.body;

    try {
        const response = await groq.chat.completions.create({
            model: "llama-3.1-8b-instant",
            messages: [
                {
                    role: "user",
                    content: `
Problem:
${problem.problem}

User Code:
${code}

Tell:
1. Is it correct? (Yes/No)
2. Time Complexity
3. Space Complexity
4. Approach (Brute/Optimal)
5. If brute, give optimized approach
6. Provide optimized C++ code
`
                }
            ],
        });

        const review = response.choices[0].message.content;

        // ✅ CHECK correctness
        const isCorrect = review.toLowerCase().includes("yes");

        // ✅ SAVE only if correct
        if (isCorrect) {
            await Solved.create({
                title: problem.title,
                code,
                isCorrect: true
            });
        }

        res.json({ review });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Review failed" });
    }
});

module.exports = router;