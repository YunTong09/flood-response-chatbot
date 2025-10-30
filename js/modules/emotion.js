// 💬 emotion.js
// Handles emotion detection and empathetic tone generation
// Used to make chatbot responses feel more human-centred and supportive.

import { callGemini } from "./gemini_api.js";

/**
 * Try to detect the user's emotion using Gemini.
 * If Gemini fails or is unavailable, fall back to rule-based detection.
 */
export async function detectEmotion(input) {
  try {
    const prompt = `Identify the user's dominant emotion from this message: "${input}". 
    Respond with only one word: fear, anger, gratitude, or neutral.`;

    const emotion = await callGemini(prompt);
    return emotion.trim().toLowerCase();
  } catch (err) {
    // fallback
    const t = input.toLowerCase();
    if (/scared|worried|anxious|afraid|nervous|terrified/.test(t)) return "fear";
    if (/thank|appreciate|grateful/.test(t)) return "gratitude";
    if (/angry|frustrated|mad|upset/.test(t)) return "anger";
    return "neutral";
  }
}

/**
 * Generates an empathetic message based on the detected emotion.
 * Uses Gemini to write natural empathetic responses, with a fallback to rule-based text.
 */
export async function emotionalToneResponse(emotion) {
  try {
    const prompt = `Write one short, empathetic message to someone feeling ${emotion}
    during a flood. Keep it supportive and calm.`;
    return await callGemini(prompt);
  } catch {
    // fallback rule-based
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
}