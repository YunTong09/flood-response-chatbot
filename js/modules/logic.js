// 🧠 logic.js
// Chatbot logic module — determines which response to return
// Imports the static knowledge base for decision-making.

import { knowledgeBase } from "./knowledge_base.js";

export function getReply(input) {
    const text = input.toLowerCase().trim();

    // 🩵 During a disaster: prioritise safety and provide "during" guidance
    if (
        (/during|right now|currently/.test(text) &&
            /(what\s+should|what\s+to\s+do|what\s+now|how\s+to|help|scared)/.test(text)) ||
        /(flood(ing)?\s+happening|in\s+the\s+middle\s+of\s+a\s+flood|during\s+a\s+flood)/.test(text)
    ) {
        return (
            "Take a breath—you’re not alone. Prioritise safety:\n" +
            knowledgeBase.replies.during
        );
    }

    // 💧 After a disaster / home damaged: provide recovery guidance
    if (
        (/after|post[-\s]?flood/.test(text) &&
            /(what\s+should|what\s+to\s+do|what\s+now|how\s+to|clean\s*up)/.test(text)) ||
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

    // 🚨 Evacuation-related questions
    const evacuationWords = [
        "leave", "evacuate", "escape", "run", "get out", "go out",
        "should i leave", "should we leave", "go outside",
        "stay home", "safe to stay"
    ];

    for (const kw of evacuationWords) {
        const pattern = new RegExp(`\\b${kw}\\b`, "i");
        if (pattern.test(text)) {
            return (
                "I’m not able to decide evacuation actions.<br><br>" +
                "Please check the latest official warnings or updates before making any decisions.<br><br>" +
                "🌐 <a href='https://www.bom.gov.au/qld/warnings/' target='_blank' rel='noopener noreferrer'>Bureau of Meteorology (BoM)</a><br>" +
                "📢 <a href='https://www.brisbane.qld.gov.au/beprepared' target='_blank' rel='noopener noreferrer'>Brisbane Emergency Dashboard</a><br><br>" +
                "If authorities issue an evacuation order, please follow their official instructions immediately.<br><br>" +
                "If you ever feel unsafe, move to higher ground and contact emergency services (000)."
            );
        }
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

    // 🧾 Default fallback if no matches
    return (
        "I can help with:\n" +
        "1️⃣ Before a flood\n" +
        "2️⃣ During a flood\n" +
        "3️⃣ After a flood\n" +
        "Or type 'BOM alert' to check live warnings."
    );
}