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
You are a reasoning assistant that helps explain why the chatbot replied in a certain way.

Step 1 — Reasoning:
Explain in one clear, ethical, and transparent sentence why the chatbot gave this response.
Keep your tone concise, natural, and supportive — not academic or evaluative.
If the chatbot’s reply was incomplete, off-topic, or may have missed what the user actually asked, start by briefly apologizing (e.g. "I'm sorry — I may not have fully answered your question...") and acknowledge that limitation.


Step 2 — Source Awareness:
Briefly indicate whether the chatbot’s answer came from verified knowledge (e.g. the flood safety knowledge base) or general reasoning. 
If the topic wasn’t covered in the verified data, say so politely and mention that the chatbot stayed within official flood safety topics.
Do NOT invent any new facts, lists, or numbers.

Step 3 — Next Helpful Action:
If appropriate, suggest one short, relevant follow-up message the chatbot could say next to be more helpful — 
but only if it stays within verified flood safety or emergency preparedness topics.
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