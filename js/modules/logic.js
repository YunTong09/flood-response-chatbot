// 🧠 logic.js
// Chatbot logic module — determines which response to return
// Imports the static knowledge base for decision-making.

import { knowledgeBase } from "./knowledge_base.js";

export function getReply(input) {
    const text = input.toLowerCase().trim();

    // 🩵 During a disaster: prioritise safety and provide "during" guidance
    if (
        (/during|right now|currently/.test(text) &&
            /(what\s+should|what\s+to\s+do|what\s+now|how\s+to|help|scared)/.test(
                text
            )) ||
        /(flood(ing)?\s+happening|in\s+the\s+middle\s+of\s+a\s+flood|during\s+a\s+flood)/.test(
            text
        )
    ) {
        return (
            "Take a breath—you’re not alone. Prioritise safety:\n" +
            knowledgeBase.replies.during
        );
    }
    

    // 💧 After a disaster / home damaged: provide recovery guidance
    if (
        (/after|post[-\s]?flood/.test(text) &&
            /(what\s+should|what\s+to\s+do|what\s+now|how\s+to|clean\s*up)/.test(
                text
            )) ||
        /(house|home).*(damaged|destroyed|unsafe|flooded)/.test(text)
    ) {
        return (
            "I’m sorry you’re dealing with damage. Here’s what helps next:\n" +
            knowledgeBase.replies.after +
            "<br><br>For recovery and assistance, see " +
            "<a href='https://www.qld.gov.au/community/disasters-emergencies' " +
            "target='_blank' rel='noopener noreferrer'>Queensland Government Disaster Assistance</a>."
        );
    }

    // ⚙️ Quick topic shortcuts (1️⃣ / 2️⃣ / 3️⃣)
    if (text === "1" || text.includes("before"))
        return knowledgeBase.replies.before;
    if (text === "2" || text.includes("during"))
        return knowledgeBase.replies.during;
    if (text === "3" || text.includes("after"))
        return knowledgeBase.replies.after;

    // ✅ Handle general preparation queries first
    if (
        /(prepare|get ready|how to prepare|what to do before|before flood|flood preparation|plan ahead)/i.test(
            text
        )
    ) {
        return knowledgeBase.replies.before;
    }

    // 💬 General Q&A matches from the knowledge base
    for (const item of knowledgeBase.qna) {
        for (const kw of item.keywords) {
            const useBoundary = /[A-Za-z0-9]/.test(kw);
            const pattern = useBoundary
                ? new RegExp(`\\b${kw}\\b`, "i")
                : new RegExp(kw, "i");

            if (pattern.test(text)) {
                return item.answer;
            }
        }
    }


    // 🛑 Stop further matching for evacuation queries
    if (
        /(leave|evacuate|escape|go outside|stay home|safe to stay|should i leave)/i.test(
            text
        )
    ) {
        return ""; // ← return 空值可阻止繼續匹配 qna
    }

    // 🧾 Default fallback if no matches
    return (
        "I can help with:\n" +
        "1️⃣ Before a flood\n" +
        "2️⃣ During a flood\n" +
        "3️⃣ After a flood\n"
    );
}
