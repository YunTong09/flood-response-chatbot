// 💬 emotion.js
// Handles emotion detection and empathetic tone generation
// Used to make chatbot responses feel more human-centred and supportive.

import { callGemini } from "./gemini_api.js";

/**
 * Try to detect the user's emotion using Gemini.
 * If Gemini fails or is unavailable, fall back to rule-based detection.
 */
export async function detectEmotion(input) {
  
    // --- fallback: keyword detection ---
    const t = input.toLowerCase();
    if (/scared|worried|anxious|afraid|nervous|terrified/.test(t)) return "fear";
    if (/thank|appreciate|grateful/.test(t)) return "gratitude";
    if (/angry|frustrated|mad|upset/.test(t)) return "anger";
    return "neutral";
}

/**
 * Generates an empathetic message based on the detected emotion.
 * Uses Gemini to write natural empathetic responses, with a fallback to rule-based text.
 */
export async function emotionalToneResponse(emotion) {
    

    // --- fallback rule-based empathetic response ---
    switch (emotion) {
        case "fear":
            return "It’s okay to feel scared. You’re not alone — let’s focus on what keeps you safe.";
        case "gratitude":
            return "I’m glad I could help! Remember to stay safe and informed.";
        case "anger":
            return "I can tell this is frustrating. Let’s take it step by step calmly.";
        default:
            return null;
    }
}