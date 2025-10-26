// 💡 suggestions.js
// Handles follow-up quick-reply chips that appear after bot answers.
// Compatible with the modular chatbot (main.js exports window.getBOMAlert)

(function () {
    console.log("✅ suggestions.js loaded");

    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    if (!chatMessages || !userInput || !sendBtn) {
        console.warn("❌ suggestions.js: chat elements not found.");
        return;
    }

    // --- 1️⃣ Define topic → suggested follow-ups ---
    const followUpMap = {
        before: [
            "What should I put in my kit?",
            "How much water do I need?",
            "Where can I get alerts?",
            "How do I plan an evacuation route?",
            "Where can I get sandbags?",
            "How to lay sandbags?",
            "How to make a plan?",
        ],
        during: [
            "Is it safe to drive?",
            "Where can I get live updates?",
            "What if the power goes out?",
            "What should I do during a flood?",
            "How do I know where is the shelter?",
        ],
        after: [
            "How to clean up safely?",
            "Where to get recovery assistance?",
            "My home is damaged—what now?",
            "I feel anxious after the flood. Who can I talk to?",
        ],
        kit: [
            "How much water do I need?",
            "Do I need supplies for pets?",
            "Where should I store the kit?",
        ],
        alerts: [
            "Show live alerts",
            "How do I sign up for alerts?",
            "What do warning levels mean?",
        ],
        evacuation: [
            "Where can I shelter?",
            "What should I take with me?",
            "How do I plan a route?",
        ],
        default: [
            "What should I put in my kit?",
            "How much water do I need?",
            "Show live alerts",
            "What should I do during a flood?",
            "My home is damaged—what now?",
        ],
    };

    // --- 2️⃣ Helpers ---
    function clearSuggestions() {
        document.querySelectorAll(".suggestions").forEach((el) => el.remove());
    }

    function detectTopic(rawText = "") {
        const t = rawText.toLowerCase().trim();

        if (!t) return "default";
        if (t === "1" || t === "before" || t.includes("before flood")) return "before";
        if (t === "2" || t === "during" || t.includes("during flood")) return "during";
        if (
            t === "3" ||
            /(after|recover|recovery|mould|clean|damaged|damage|repair|help|support|anxious)/.test(t)
        )
            return "after";
        if (/(kit|prepare|pack|checklist|items)/.test(t)) return "kit";
        if (/(alert|warning|sms|live|road closures|updates)/.test(t)) return "alerts";
        if (/(evacuate|leave|escape|stay home|safe to stay|go outside)/.test(t))
            return "evacuation";
        return "default";
    }

    function getSuggestions(rawText) {
        const topic = detectTopic(rawText);
        return followUpMap[topic] || followUpMap.default;
    }

    function renderSuggestions(items) {
        clearSuggestions();
        if (!items || !items.length) return;

        const box = document.createElement("div");
        box.className = "suggestions";

        items.forEach((label) => {
            const chip = document.createElement("button");
            chip.type = "button";
            chip.className = "suggestion-chip";
            chip.textContent = label;
            chip.addEventListener("click", () => {
                userInput.value = label;
                sendBtn.click();

                // ✅ trigger live alert if chip says "Show live alerts"
                if (
                    /show live alerts/i.test(label) &&
                    typeof window.getBOMAlert === "function"
                ) {
                    window.getBOMAlert();
                }
            });
            box.appendChild(chip);
        });

        chatMessages.appendChild(box);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- 3️⃣ Watch for new bot messages ---
    let pendingUserText = "";

    sendBtn.addEventListener("click", () => {
        pendingUserText = userInput.value.trim();
        clearSuggestions();
    });

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            pendingUserText = userInput.value.trim();
            clearSuggestions();
        }
    });

    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type !== "childList") continue;
            m.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node.classList.contains("bot")) {
                    // ✅ read last user input from window or fallback
                    const latestInput =
                        window.lastUserInputForSuggestion || pendingUserText;
                    renderSuggestions(getSuggestions(latestInput));
                }
            });
        }
    });
    observer.observe(chatMessages, { childList: true, subtree: true });

    // --- 4️⃣ Show default chips on page load ---
    window.addEventListener("DOMContentLoaded", () => {
        renderSuggestions(getSuggestions(""));
    });
})();
