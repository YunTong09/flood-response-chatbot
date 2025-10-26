// Follow-up suggestions: render quick-reply chips after bot answers
(function () {
    const chatMessages = document.getElementById("chat-messages");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");

    if (!chatMessages || !userInput || !sendBtn) return;

    // 🧩 定義主題對應的建議
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
            "How do I know where is the shelter?"
        ],
        after: [
            "How to clean up safely?",
            "Where to get recovery assistance?",
            "How to prevent mould?",
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

    // 🧹 清除舊 chips
    function clearSuggestions() {
        document.querySelectorAll(".suggestions").forEach((el) => el.remove());
    }

    // 🔍 偵測主題
    function detectTopic(rawText = "") {
        const t = rawText.toLowerCase().trim();
        console.log("🧠 detectTopic input =", t);

        if (!t) return "default";
        if (t === "1" || t === "before" || t.includes("before flood"))
            return "before";
        if (t === "2" || t === "during" || t.includes("during flood"))
            return "during";
        if (
            t === "3" ||
            t.includes("after") ||
            /(recover|recovery|mould|clean|clean up|damaged|damage|repair|help|support|anxious)/.test(
                t
            )
        )
            return "after";
        if (/(kit|prepare|pack|checklist|items)/.test(t)) return "kit";
        if (/(alert|warning|sms|live|road closures|updates)/.test(t))
            return "alerts";
        if (/(evacuate|leave|escape|stay home|safe to stay|go outside)/.test(t))
            return "evacuation";
        return "default";
    }

    function getSuggestions(rawText) {
        const topic = detectTopic(rawText);
        console.log("💡 Detected topic:", topic, "| user said:", rawText);
        return followUpMap[topic] || followUpMap.default;
    }

    // 💬 渲染建議
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

    // 💾 記錄使用者輸入
    let pendingUserText = "";

    sendBtn.addEventListener("click", () => {
        pendingUserText = userInput.value.trim();
        console.log("📝 User input recorded:", pendingUserText);
        clearSuggestions();
    });

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            pendingUserText = userInput.value.trim();
            console.log("📝 (Enter) User input recorded:", pendingUserText);
            clearSuggestions();
        }
    });

    // 👀 偵測新訊息（bot 回覆時顯示 chips）
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            if (m.type !== "childList") continue;
            m.addedNodes.forEach((node) => {
                if (!(node instanceof HTMLElement)) return;
                if (node.classList.contains("bot")) {
                    // ✅ 從 chatbot.js 拿最新輸入（防止被清空）
                    const latestInput =
                        window.lastUserInputForSuggestion || pendingUserText;
                    console.log(
                        "💬 Bot message detected. last input =",
                        latestInput
                    );
                    renderSuggestions(getSuggestions(latestInput));
                }
            });
        }
    });
    observer.observe(chatMessages, { childList: true, subtree: true });

    // 🟢 頁面載入時預設 chips
    window.addEventListener("DOMContentLoaded", () => {
        renderSuggestions(getSuggestions(""));
        console.log("✅ suggestion.js initialized");
    });
})();
