
export async function callGemini(promptText) {
  try {
    const res = await fetch("http://localhost:3000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText }),
    });

    const data = await res.json();
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (err) {
    console.error("Gemini API proxy failed:", err);
    return "Error contacting Gemini.";
  }
}