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

    // 🛑 High-risk decision queries (evacuation / stay-or-leave):
    // For these, we DO NOT use retriever. We answer with a responsibility-safe message.
    if (
        /(should i leave|should i leave my house|should i leave my place|do i need to leave|do we need to leave|should i evacuate|do i have to evacuate|is it safe to stay|is it safe to stay here|can i stay home|can i stay here|is it safe here|can i stay or should i go|water .* (get|gets|getting) in)/i.test(
            userText
        )
    ) {
        const safeReply =
            "⚠️ I can’t decide evacuation actions for you, but here’s what official sources recommend:<br><br>" +
            "🌐 <a href='https://www.bom.gov.au/qld/warnings/' target='_blank' rel='noopener noreferrer'>Bureau of Meteorology (BoM)</a><br>" +
            "📢 <a href='https://www.brisbane.qld.gov.au/beprepared' target='_blank' rel='noopener noreferrer'>Brisbane Emergency Dashboard</a><br><br>" +
            "If authorities issue an evacuation order, please follow their instructions immediately.<br><br>" +
            "If you feel unsafe, move to higher ground and call emergency services (000).";

        // 顯示主要回答
        addMessage(safeReply, "bot");

        // 顯示 reasoning
        const reasoning = await generateReasoning(userText, safeReply);
        addMessage(
            `<div class="reasoning">🤖 Reasoning: ${reasoning}</div>`,
            "bot"
        );

        userInput.value = "";

        // ⛔ stop here so retriever doesn't run
        return;
    }

    // step 2: main answer (rule-based safety logic)
    // First try knowledge base (local retriever)
    // 🚀 Skip retriever for quick shortcuts (1️⃣ / 2️⃣ / 3️⃣)
    if (/^\s*[123]\s*$/.test(userText)) {
        const reply = getReply(userText);

        // show bot reply + reasoning
        setTimeout(async () => {
            addMessage(reply, "bot");
            // clear input box
            userInput.value = "";
            // generate and show reasoning
            const reasoning = await generateReasoning(userText, reply);
            addMessage(
                `<div class="reasoning">🤖 Reasoning: ${reasoning}</div>`,
                "bot"
            );
        }, 300);

        return; // stop here so retriever won't override shortcut responses
    }
   

    // 💰 Financial / recovery-related questions should skip retriever
    if (
        /(financial|money|grant|fund|claim|insurance|apply.*help|apply.*support|apply.*assistance|compensation)/i.test(
            userText
        )
    ) {
        const reply =
            "💰 <b>Financial and Recovery Assistance</b><br><br>" +
            "If your home was damaged by the flood, you can apply for disaster recovery payments and grants from the Queensland Government.<br><br>" +
            "👉 <a href='https://www.qld.gov.au/community/disasters-emergencies' target='_blank' rel='noopener noreferrer'>Queensland Disaster Assistance Portal</a><br><br>" +
            "You may also contact your local council for community recovery services.<br><br>" +
            "If you also feel stressed, you can reach Lifeline (13 11 14) for emotional support.";

        addMessage(reply, "bot");

        const reasoning = await generateReasoning(userText, reply);
        addMessage(
            `<div class="reasoning">🤖 Reasoning: ${reasoning}</div>`,
            "bot"
        );

        userInput.value = "";
        return; // ❗STOP retriever — only use this rule-based answer
    }

    // step 3: use retriever to find best KB answer
    const kbHits = await retriever.getTopK(userText, 1, 0.35);

    // ✅ 若使用者問的是準備階段的問題，直接用 rule-based 回覆
    if (/(prepare|get ready|before flood)/i.test(userText)) {
        const reply = getReply(userText);
        addMessage(reply, "bot");

        const reasoning = await generateReasoning(userText, reply);
        addMessage(
            `<div class="reasoning">🤖 Reasoning: ${reasoning}</div>`,
            "bot"
        );
        return; // ← 不讓 retriever 處理
    }
    // step 4: decide whether to use KB answer or fallback to rule-based logic
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

            // ✅ 立刻清空輸入框（最關鍵的地方！）
            userInput.value = "";

            // 2. 產生並顯示 reasoning
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
            const sourceLabel =
                //這行是如果回覆裡已經有來源標籤，或是回覆是預設的「I can help with...」，就不加標籤；否則就加上「(AI reasoning)」標籤。
                hasSourceInline || /I can help with/i.test(reply)
                    ? ""
                    : "(AI reasoning)";
            const aiReply = sourceLabel
                //如果有來源標籤，就把它加在回覆後面，否則就直接用回覆內容。
                ? `${reply} <div class="source">${sourceLabel}</div>`
                : reply;

            // 2. 顯示主回答
            addMessage(aiReply, "bot");

            // 3. 產生並顯示 reasoning
            const reasoning = await generateReasoning(userText, reply);
            //拆解 reasoning 成兩部分：解釋原因 和 建議下一步
            const [explanation, suggestion] = reasoning.split("💬");

            let formatted = `<div class="reasoning">🤖 <b>Reasoning:</b> ${explanation.trim()}</div>`;
            //如果有建議下一步，就把它加在回覆後面
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
    // Load from knowledgeBase.qna if available
    if (knowledgeBase?.qna?.length > 0) {
        // Transform knowledgeBase.qna into retriever's expected format
        const entries = knowledgeBase.qna.map((it, i) => ({
            id: it.id ?? i,
            question:
            //如果 it.keywords 是一個陣列 → 用 join(" ") 把裡面的字串合併成一句文字；否則 → 回傳空字串 ""。
                it.question ??
                (Array.isArray(it.keywords) ? it.keywords.join(" ") : ""),
            answer: it.answer ?? it.text ?? "",
            source: it.source ?? "knowledge_base",
        }));
        
        // Load into retriever
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
        //無法載入知識庫時的錯誤處理
        "🔎 Failed to initialise retriever from knowledge_base.js:",
        e
    );
}
