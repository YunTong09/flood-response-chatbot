// 🌐 Local Retriever (simplified version)
// Loads Q&A directly from knowledge_base.js instead of external JSON.

//建立全域變數 kb（knowledge base）和 loaded（是否已載入）。
let kb = [];
let loaded = false;

// --- Normalize Q&A into a consistent structure ---
function normalize(data) {
    if (!Array.isArray(data)) return [];
    return data.map((item, i) => ({
        id: item.id ?? i,
        question: item.question ?? item.q ?? "",
        answer: item.answer ?? item.a ?? item.text ?? "",
        source: item.source ?? "knowledge_base",
    }));
}

// --- Split text into lowercase tokens ---
function tokenize(text) {
    if (!text) return [];
    //這行會把文字轉成小寫，然後用正規表達式 \w+ 抓出所有的單字（字母、數字、底線組成的字串），最後回傳一個包含這些單字的陣列。如果沒有抓到任何單字，則回傳一個空陣列。
    return text.toLowerCase().match(/\w+/g) || [];
}

// --- Compute similarity score between query and text ---
function score(query, text) {
    // 🔤 Remove common stopwords before matching
    const stopwords = [
        "where",
        "can",
        "get",
        "do",
        "i",
        "my",
        "what",
        "how",
        "the",
        "a",
        "in",
        "of",
        "for",
        "to",
        "is",
        "are",
        "was",
        "it",
        "on",
        "at",
        "by",
    ];

    // Tokenize both query and text
    const q = tokenize(query).filter((tok) => !stopwords.includes(tok));
    const t = tokenize(text).filter((tok) => !stopwords.includes(tok));

    //任一方沒有詞，就沒有可比對內容，相似度 0。
    if (!q.length || !t.length) return 0;

    const set = new Set(t);
    const matches = q.filter((tok) => set.has(tok)).length;

    return matches / q.length;
}

// --- Load KB directly from imported object ---
export function loadKBFromObject(data) {
    kb = normalize(data?.qna || data?.entries || []);
    loaded = true;
    console.log("✅ Knowledge base loaded:", kb.length, "entries");
}

// --- Find the top K most relevant answers ---
export function getTopKSync(query, k = 1, threshold = 0.35) {
    if (!loaded) return [];
    const results = kb
        .map((entry) => {
            const s = Math.max(
                score(query, entry.question),
                score(query, entry.answer)
            );
            return { ...entry, score: s };
        })
        .filter((r) => r.score >= threshold)
        .sort((a, b) => b.score - a.score)
        .slice(0, k);
    return results;
}

// --- Async wrapper (for use in main.js) ---
export async function getTopK(query, k = 1, threshold = 0.35) {
    return getTopKSync(query, k, threshold);
}

// --- For debug / info ---
export function getKBSize() {
    return kb.length;
}
