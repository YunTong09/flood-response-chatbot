
export async function callGemini(promptText) {
  try {
    const res = await fetch("http://localhost:3000/api/gemini", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ prompt: promptText }),
    });

    //這行把伺服器回傳的結果（response）
    //轉換成 JavaScript 物件（JSON 格式）方便存取。
    const data = await res.json();
    // 整個 JSON 回傳
    //從 Gemini 回傳的資料裡，拿出『第一個候選答案 (candidate[0])裡面『第一個部分 (parts[0])』的文字內容 (text)。如果找不到，顯示『No response.』。
    return data?.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
  } catch (err) {
    console.error("Gemini API proxy failed:", err);
    return "Error contacting Gemini.";
  }
}