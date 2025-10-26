import express from "express";
import fetch from "node-fetch";

const app = express();
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyDPwuL4X6hK4Nz4inQLX-jXKqRK-m3ywbk";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// 代理端點
app.post("/api/gemini", async (req, res) => {
  try {
    const promptText = req.body.prompt;
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: promptText }] }],
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("Proxy error:", err);
    res.status(500).json({ error: "Gemini proxy failed" });
  }
});

app.listen(3000, () => console.log("🚀 Proxy running on http://localhost:3000"));