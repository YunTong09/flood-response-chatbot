// 🌐 Local Retriever (simplified version)
// Loads Q&A directly from knowledge_base.js instead of external JSON.

//建立全域變數 kb（knowledge base）和 loaded（是否已載入）。
let kb = []; // ← global variable
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

    //automatically removes duplicates
    const set = new Set(t);
    //計算有多少個詞在兩者中都出現過
    const matches = q.filter((tok) => set.has(tok)).length;

    //相似度分數 = 共同詞數 / 查詢詞數
    return matches / q.length;
}

// --- Load KB directly from imported object ---
export function loadKBFromObject(data) {
    //?. 這行會檢查 data 是否為 null 或 undefined。如果是，則回傳 true，否則回傳 false。
    kb = normalize(data?.qna || data?.entries || []);
    loaded = true;
    //在瀏覽器的開發者控制台中顯示已載入的知識庫大小。
    console.log("✅ Knowledge base loaded:", kb.length, "entries");
}

// --- Find the top K most relevant answers ---
//query：使用者的查詢字串。
//k = 1：最多取回幾筆（預設 1 筆）。
//threshold = 0.35：最低相關分數門檻（預設 0.35）。
export function getTopKSync(query, k = 1, threshold = 0.35) {
    if (!loaded) return [];
    const results = kb
        .map((entry) => {
            const s = Math.max(
                score(query, entry.question),
                score(query, entry.answer)
            );
            //Expand the original entry (...entry) and add a score field to store the calculated score.
            return { ...entry, score: s };
        })
        //filter out the entries whose score is exceed the threshold
        .filter((r) => r.score >= threshold)
        //Sort the remaining entries in descending order based on their score, and take the top k entries.
        .sort((a, b) => b.score - a.score)
        //Only return the top k results
        .slice(0, k);
    return results;
}

//like getTopKSync, but async
//Currently wraps the sync function but future-proof for remote API use.
export async function getTopK(query, k = 1, threshold = 0.35) {
    return getTopKSync(query, k, threshold);
}

//Returns the current number of knowledge base entries (for debugging or display).
// --- For debug / info ---
export function getKBSize() {
    return kb.length;
}
