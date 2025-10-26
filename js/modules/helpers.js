import { callGemini } from "./gemini_api.js";

// ⚙️ helpers.js
// Shared utility functions for displaying messages and reasoning explanations

export function addMessage(text, sender = "bot") {
    const chatMessages = document.getElementById("chat-messages");
    const msg = document.createElement("div");
    msg.classList.add("message", sender);
    msg.innerHTML = String(text || "").replace(/\n/g, "<br>");
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}


export async function generateReasoning(userInput, botReply) {
  try {
    // 🧠 Prompt：要求模型先「解釋原因」再「建議下一步」
    const prompt = `
Explain in one clear, ethical, and transparent sentence why the chatbot gave this response.
Then, suggest the next most helpful message the chatbot could say to the user.
User message: "${userInput}"
Chatbot reply: "${botReply}"
Focus on reasoning transparency and supportive tone.
`;

    // 呼叫 Gemini
    const reasoning = await callGemini(prompt);

    // 回傳結果
    return reasoning;
  } catch (err) {
    console.error("⚠️ Reasoning generation failed:", err);
    return "No reasoning generated.";
  }
}