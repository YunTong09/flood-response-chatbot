// 💬 emotion.js
// Handles emotion detection and empathetic tone generation
// Used to make chatbot responses feel more human-centred and supportive.

import { callGemini } from "./gemini_api.js";

/**
 * Try to detect the user's emotion using Gemini.
 * If Gemini fails or is unavailable, fall back to rule-based detection.
 */
export async function detectEmotion(input) {
    /**try {
        const prompt = `
Detect the user's emotion based on this text.
Respond with one word only: fear, gratitude, anger, or neutral.
Text: "${input}"
`;
        const result = await callGemini(prompt);
        const clean = result?.toLowerCase().trim();

        // Validate output
        if (["fear", "gratitude", "anger", "neutral"].includes(clean)) {
            return clean;
        }
    } catch (err) {
        console.warn("⚠️ Gemini emotion detection failed, using fallback:", err);
    }*/

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
    /**try {
        // Skip if neutral
        if (emotion === "neutral") return null;

        const prompt = `
Write a short empathetic one-sentence message for someone feeling ${emotion}.
Style: calm, kind, and supportive.
`;
        const tone = await callGemini(prompt);
        if (tone && tone.length > 0) return tone.trim();
    } catch (err) {
        console.warn("⚠️ Gemini empathy generation failed, using fallback:", err);
    }*/

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