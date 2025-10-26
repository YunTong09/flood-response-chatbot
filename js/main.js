// 🌧 main.js
// This is the orchestrator: wires together UI, logic, emotion, reasoning, and live alerts.

// - UI interaction (message display, event handling)
// - Emotion layer (detecting user emotions, showing empathy)
// - Knowledge + logic (retrieval + rule-based safety advice)
// - Reasoning transparency (explain why responses were chosen)
import { addMessage, generateReasoning } from "./modules/helpers.js";
import { detectEmotion, emotionalToneResponse } from "./modules/emotion.js";
import { knowledgeBase } from "./modules/knowledge_base.js";
import { getReply } from "./modules/logic.js";
import * as retriever from "./retriever.js";

// ---- 1. Grab DOM elements ----
const chatMessages = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

// ---- 2. Handle sending a user message + bot pipeline ----
async function handleSend() {
    const userText = userInput.value.trim(); // Read text from the input box and remove leading/trailing spaces
    if (!userText) return; // If it's empty (e.g. user just hit Enter on nothing), do nothing.

    // show user bubble
    addMessage(userText, "user");

    // let suggestions.js know what user asked
    window.lastUserInputForSuggestion = userText;

    // step 1: empathy layer

    const emotion = await detectEmotion(userText);
    const tone = await emotionalToneResponse(emotion);
    if (tone) addMessage(tone, "bot");

    // step 2: main answer (rule-based safety logic)
    // First try knowledge base (local retriever)
    //await retriever.loadKB();
    const kbHits = await retriever.getTopK(userText, 1, 0.35);
    // getTopK(query, k=1, threshold=0.35)
    // - We ask for the single best match to the user's question.
    // - We only trust it if the score >= 0.35.
    //   If too low, we treat it as "not confident enough".
    if (kbHits && kbHits.length > 0) {
        // If the retriever found a strong enough match, we treat it as authoritative.
        const top = kbHits[0]; // best match { answer: "...", source: "...", ... }

        // show KB answer and mark source
        // Construct the response with source transparency.
        // We explicitly label where the info came from ("Knowledge base"),
        // instead of pretending it was invented by AI. This is an HCAI design choice.
        const kbReply = `${
            top.answer
        } <div class="source">Source: Knowledge base${
            top.source ? " - " + top.source : ""
        }</div>`;
        setTimeout(async () => {
            // 1. 顯示主要答案 (知識庫回覆)
            addMessage(kbReply, "bot");

            // 2. 產生並顯示 reasoning（這邊要 await 才不會出現 [object Promise]）
            const reasoning = await generateReasoning(userText, top.answer);
            addMessage(
                `<div class="reasoning">🤖 Reasoning: ${reasoning}</div>`,
                "bot"
            );
        }, 300);
    } else {
        // If we did NOT get a confident hit from the retriever,
        // we fall back to rule-based logic in logic.js (getReply).
        // This handles structured intents like:
        // - evacuation ("should I leave?")
        // - "before flood" / "during flood" / "after flood"
        // - "power outage" etc.
        const reply = getReply(userText);

        setTimeout(async () => {
            // 1. 準備回覆內容並加上來源標籤
            const hasSourceInline = /Source:\s*/i.test(reply);
            const sourceLabel = hasSourceInline ? "" : "(AI reasoning)";
            const aiReply = sourceLabel
                ? `${reply} <div class="source">${sourceLabel}</div>`
                : reply;

            // 2. 顯示主回答
            addMessage(aiReply, "bot");

            // 3. 產生並顯示 reasoning
            const reasoning = await generateReasoning(userText, reply);
            const [explanation, suggestion] = reasoning.split("💬");

            let formatted = `<div class="reasoning">🤖 <b>Reasoning:</b> ${explanation.trim()}</div>`;
            if (suggestion) {
                formatted += `<div class="next-action">💡 <b>Next Action:</b> ${suggestion.trim()}</div>`;
            }

            addMessage(formatted, "bot");
        }, 400);

        // 2.5 Clear the input box so the user can type the next message
        userInput.value = "";
    }
}

// ---- 4. Wire events ----
// We hook up UI events so that pressing the button or hitting Enter triggers handleSend().

sendBtn.addEventListener("click", handleSend);
// When user presses Enter in the text box, send the message instead of inserting a newline.
userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSend();
});

// ---- 5. Initial bot intro messages ----
// When the page first loads, we want to greet the user and ALSO
// immediately show the safety disclaimer.
// This is critical: we say “I am not emergency services, call 000 if in danger.”
// This sets correct expectations and is ethically important for crisis tools.

console.log("🟦 Initialising intro messages...");
knowledgeBase.intro.forEach((line) => {
    // Loop through each intro message (usually 2-3 lines)
    console.log("➡ intro line:", line); // Also log to console for debugging
    addMessage(line, "bot"); // Actually show it in the chat UI
});
console.log("🟩 Intro messages displayed successfully");

// ---- 6. Load KB into retriever ----
// Now we populate the retriever with Q&A data so getTopK() can work.
//
// There are two possible sources:
// A. Directly from knowledge_base.qna (hardcoded in JS, ships with the app)
// B. Fallback: fetch("/data/qa_knowledge.json") at runtime
//
// We try A first, then fallback to B.
// This design makes it easy to maintain or update content later without changing logic.

try {
    if (knowledgeBase?.qna?.length > 0) {
        const entries = knowledgeBase.qna.map((it, i) => ({
            id: it.id ?? i,
            question:
                it.question ??
                (Array.isArray(it.keywords) ? it.keywords.join(" ") : ""),
            answer: it.answer ?? it.text ?? "",
            source: it.source ?? "knowledge_base",
        }));

        retriever.loadKBFromObject({ entries });
        console.log(
            "📘 Retriever loaded from knowledge_base.qna:",
            retriever.getKBSize(),
            "entries"
        );
    } else {
        console.warn("⚠️ No Q&A entries found in knowledgeBase.");
    }
} catch (e) {
    console.warn(
        "🔎 Failed to initialise retriever from knowledge_base.js:",
        e
    );
}
