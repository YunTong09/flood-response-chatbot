import express from "express";
import fetch from "node-fetch";

//Create an Express application (server).
//Tell the server to handle JSON-formatted request data.
const app = express();
app.use(express.json());

const GEMINI_API_KEY = "AIzaSyDPwuL4X6hK4Nz4inQLX-jXKqRK-m3ywbk";
const GEMINI_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent";

// 🧠 Create a POST endpoint for the Gemini API proxy
// When the frontend sends a POST request to "/api/gemini",
// this route receives the user's prompt and forwards it to Google's Gemini API.
app.post("/api/gemini", async (req, res) => {
  try {
    // 📥 Extract the "prompt" text from the request body
    const promptText = req.body.prompt;

    // 🌐 Send a POST request to the official Gemini API endpoint
    // using your API key and formatted request body
    const response = await fetch(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      method: "POST", // Use POST method to send data
      headers: { "Content-Type": "application/json" }, // Specify JSON format
      body: JSON.stringify({
        // Gemini expects data in this nested "contents → parts → text" structure
        contents: [{ parts: [{ text: promptText }] }],
      }),
    });

    // 📦 Parse the API response as JSON
    const data = await response.json();

    // 📤 Send the Gemini response back to the frontend
    res.json(data);
  } catch (err) {
    // ❌ If any error occurs (e.g., network, API failure), log it for debugging
    console.error("Proxy error:", err);

    // ⚠️ Respond with a 500 error to the frontend
    res.status(500).json({ error: "Gemini proxy failed" });
  }
});

// 🚀 Start the Express server on port 3000
// The proxy will now listen for requests at http://localhost:3000/api/gemini
app.listen(3000, () => console.log("🚀 Proxy running on http://localhost:3000"));
