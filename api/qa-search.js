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

async function doSearch(key, query) {
  const url = "https://api.search.tinyfish.ai?query=" + encodeURIComponent(query) + "&language=vi";
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);
  try {
    const upstream = await fetch(url, { headers: { "X-API-Key": key }, signal: controller.signal });
    if (!upstream.ok) return { ok: false, status: upstream.status };
    const data = await upstream.json();
    return { ok: true, results: normalizeResults(data) };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "fetch failed" };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  } catch { body = {}; }
  // Ưu tiên biến môi trường; key nhập trong app (Cài đặt API) là phương án dự phòng.
  const key = process.env.TINYFISH_API_KEY || String(body.apiKey ?? "").trim();
  if (!key) {
    res.status(501).json({
      error: "not_configured",
      message:
        "Chưa cấu hình TINYFISH_API_KEY. Nhập key tại màn “Cài đặt API” trong app, hoặc quản trị viên thêm biến môi trường trên Vercel (xem docs/CHATBOT_AI.md).",
    });
    return;
  }
  if (String(body.action ?? "") === "ping") {
    const out = await doSearch(key, "kiểm tra kết nối");
    if (out.ok) res.status(200).json({ ok: true, count: out.results.length });
    else res.status(200).json({ ok: false, error: "upstream_error", status: out.status, message: out.message });
    return;
  }
  const query = String(body.query ?? "").trim().slice(0, 300);
  if (!query) {
    res.status(400).json({ error: "empty_query" });
    return;
  }
  const out = await doSearch(key, query);
  if (!out.ok) {
    res.status(502).json({ error: "upstream_error", status: out.status, message: out.message });
    return;
  }
  res.status(200).json({ results: out.results });
}
