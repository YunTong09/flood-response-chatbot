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
    // Utility functions that handle suggestion chip logic

    function clearSuggestions() {
        // Remove all existing suggestion chip containers from the chat
        // querySelectorAll() selects every element with class "suggestions"
        // forEach() loops through each element found, naming each as 'el'
        // el.remove() deletes that element from the DOM
        document.querySelectorAll(".suggestions").forEach((el) => el.remove());
    }

    function detectTopic(rawText = "") {
        // Normalize user input to lowercase and remove surrounding spaces
        const t = rawText.toLowerCase().trim();

        // Determine which topic category the text fits into
        if (!t) return "default"; // Empty input → default topic
        if (t === "1" || t === "before" || t.includes("before flood"))
            return "before";
        if (t === "2" || t === "during" || t.includes("during flood"))
            return "during";
        if (
            t === "3" ||
            // Use a regular expression to match post-flood related words
            /(after|recover|recovery|mould|clean|damaged|damage|repair|help|support|anxious)/.test(
                t
            )
        )
            return "after";
        // Match words related to emergency kits
        if (/(kit|prepare|pack|checklist|items)/.test(t)) return "kit";
        // Match words related to alerts or updates
        if (/(alert|warning|sms|live|road closures|updates)/.test(t))
            return "alerts";
        // Match words related to evacuation or safety
        if (/(evacuate|leave|escape|stay home|safe to stay|go outside)/.test(t))
            return "evacuation";

        // If no match found, return "default"
        return "default";
    }

    function getSuggestions(rawText) {
        // Detect the topic based on the user's text
        const topic = detectTopic(rawText);
        // Return the corresponding follow-up suggestions from followUpMap
        // If no specific topic is found, return default suggestions
        return followUpMap[topic] || followUpMap.default;
    }

    function renderSuggestions(items) {
        // First, clear any old suggestion chips
        clearSuggestions();

        // If there are no suggestions to display, stop here
        if (!items || !items.length) return;

        // Create a container for all the suggestion buttons
        const box = document.createElement("div");
        box.className = "suggestions"; // Assign CSS class for styling

        // Loop through each suggestion label and create a button for it
        items.forEach((label) => {
            const chip = document.createElement("button");
            chip.type = "button"; // Prevent form submission behavior
            chip.className = "suggestion-chip"; // Apply CSS style
            chip.textContent = label; // Display suggestion text

            // When the user clicks a suggestion chip:
            chip.addEventListener("click", () => {
                // Put the chip's text into the input box
                userInput.value = label;
                // Simulate a click on the send button
                sendBtn.click();

            });

            // Add the chip button to the suggestion container
            box.appendChild(chip);
        });

        // Append the full suggestion container below the chat messages
        chatMessages.appendChild(box);

        // Automatically scroll to the bottom so the new chips are visible
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // --- 3️⃣ Watch for new bot messages ---
    // This section ensures that new suggestion chips appear automatically
    // after the bot sends a response

    let pendingUserText = ""; // Temporarily stores the last user input

    // When the send button is clicked:
    sendBtn.addEventListener("click", () => {
        pendingUserText = userInput.value.trim(); // Save current user input
        clearSuggestions(); // Remove old suggestions before showing new ones
    });

    // When the Enter key is pressed inside the input box:
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            pendingUserText = userInput.value.trim();
            clearSuggestions();
        }
    });

    // Create a MutationObserver to monitor the chat container
    // It listens for new messages (child elements) being added
    const observer = new MutationObserver((mutations) => {
        for (const m of mutations) {
            // Only process new child elements
            if (m.type !== "childList") continue;

            m.addedNodes.forEach((node) => {
                // Skip non-HTML elements (like text nodes)
                //如果這筆變化不是新增/刪除子節點類型，那就跳過不處理
                if (!(node instanceof HTMLElement)) return;

                // If the newly added element is a bot message:
                if (node.classList.contains("bot")) {
                    // ✅ Determine which suggestions to show based on
                    // the latest user input (stored globally or locally)
                    const latestInput =
                        window.lastUserInputForSuggestion || pendingUserText;

                    // Generate and display the new suggestion chips
                    renderSuggestions(getSuggestions(latestInput));
                }
            });
        }
    });

    // Start observing the chat container for new elements
    observer.observe(chatMessages, { childList: true, subtree: true });

    // --- 4️⃣ Show default chips on page load ---
    // When the page first loads, show default suggestion chips
    window.addEventListener("DOMContentLoaded", () => {
        renderSuggestions(getSuggestions("")); // Empty string triggers default topic
    });
})();
