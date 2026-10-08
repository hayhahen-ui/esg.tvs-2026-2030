// POST /api/qa-search  — proxy TinyFish Search API cho chatbot hỏi đáp.
// API key nằm trong biến môi trường TINYFISH_API_KEY (server-side), KHÔNG bao giờ
// gửi về trình duyệt. Chưa cấu hình key → trả 501, giao diện web tự hạ cấp.

import { normalizeTinyfishResults } from "../src/ai";

interface HandlerReq {
  method?: string;
  body?: unknown;
}
interface HandlerRes {
  status: (code: number) => HandlerRes;
  json: (data: unknown) => void;
}

export default async function handler(req: HandlerReq, res: HandlerRes) {
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
  let body: Record<string, unknown> = {};
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as Record<string, unknown>;
  } catch {
    body = {};
  }
  const query = String(body.query ?? "").trim().slice(0, 300);
  if (!query) {
    res.status(400).json({ error: "empty_query" });
    return;
  }
  try {
    const url =
      "https://api.search.tinyfish.ai?query=" +
      encodeURIComponent(query) +
      "&language=vi";
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    let upstream: Response;
    try {
      upstream = await fetch(url, {
        headers: { "X-API-Key": key },
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) {
      res.status(502).json({ error: "upstream_error", status: upstream.status });
      return;
    }
    const data: unknown = await upstream.json();
    res.status(200).json({ results: normalizeTinyfishResults(data) });
  } catch (err) {
    res.status(502).json({
      error: "upstream_error",
      message: err instanceof Error ? err.message : "fetch failed",
    });
  }
}
