// POST /api/qa-search — proxy TinyFish Search API cho chatbot hỏi đáp.
// API key nằm trong biến môi trường TINYFISH_API_KEY (server-side), KHÔNG bao giờ
// gửi về trình duyệt. Chưa cấu hình key → trả 501, giao diện web tự hạ cấp.
//
// LƯU Ý: file này cố ý TỰ CHỨA (không import từ ../src) vì runtime function
// của Vercel không resolve được import tương đối thiếu đuôi file.

function normalizeResults(data) {
  if (!data || typeof data !== "object") return [];
  const root = data;
  let candidates = [];
  for (const key of ["results", "items", "data", "organic_results", "web_results"]) {
    if (Array.isArray(root[key])) { candidates = root[key]; break; }
  }
  if (!candidates.length && Array.isArray(data)) candidates = data;
  const out = [];
  for (const item of candidates) {
    if (!item || typeof item !== "object") continue;
    const url = String(item.url ?? item.link ?? "");
    if (!/^https?:\/\//.test(url)) continue;
    out.push({
      title: String(item.title ?? item.name ?? url).slice(0, 200),
      url,
      snippet: String(item.snippet ?? item.description ?? item.summary ?? item.text ?? "").slice(0, 500),
    });
    if (out.length >= 6) break;
  }
  return out;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  const key = process.env.TINYFISH_API_KEY;
  if (!key) {
    res.status(501).json({
      error: "not_configured",
      message:
        "Chưa cấu hình TINYFISH_API_KEY trên server. Quản trị viên thêm biến môi trường này trong Vercel (Project → Settings → Environment Variables), xem docs/CHATBOT_AI.md.",
    });
    return;
  }
  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  } catch { body = {}; }
  const query = String(body.query ?? "").trim().slice(0, 300);
  if (!query) {
    res.status(400).json({ error: "empty_query" });
    return;
  }
  try {
    const url = "https://api.search.tinyfish.ai?query=" + encodeURIComponent(query) + "&language=vi";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    let upstream;
    try {
      upstream = await fetch(url, { headers: { "X-API-Key": key }, signal: controller.signal });
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) {
      res.status(502).json({ error: "upstream_error", status: upstream.status });
      return;
    }
    const data = await upstream.json();
    res.status(200).json({ results: normalizeResults(data) });
  } catch (err) {
    res.status(502).json({ error: "upstream_error", message: err instanceof Error ? err.message : "fetch failed" });
  }
}
