// server_sdk.js
import express from "express";
import cors from "cors";
import { GoogleGenerativeAI } from "@google/generative-ai";

const app = express();
app.use(cors());
app.use(express.json());

// ⚠️ 換成你的實際 Gemini API key
const GEMINI_API_KEY = "AIzaSyDPwuL4X6hK4Nz4inQLX-jXKqRK-m3ywbk";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);

// ✅ 這裡直接用 gemini-2.5-flash
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

app.post("/api/gemini", async (req, res) => {
    try {
        const promptText = req.body.prompt;
        console.log("📩 Received prompt:", promptText);

        const result = await model.generateContent(promptText);
        const text = result.response.text();
        console.log("📤 Gemini SDK response:", text);

        res.json({
            candidates: [
                {
                    content: {
                        parts: [{ text }],
                    },
                },
            ],
        });
    } catch (err) {
        console.error("❌ Gemini SDK error:", err);
        res.status(500).json({ error: "Gemini SDK failed" });
    }
});

app.listen(3000, () => {
    console.log("🚀 SDK proxy running on http://localhost:3000");
});
