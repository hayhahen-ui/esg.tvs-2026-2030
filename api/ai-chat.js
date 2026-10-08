// /api/ai-chat — proxy LLM (Experiential Labs, OpenAI-compatible) cho chatbot.
//   GET  → { configured, models, defaultModel } (client lấy danh sách model)
//   POST → { question, model?, context? } → { reply, model }
// API key nằm trong biến môi trường EXPLABS_API_KEY (server-side). Chưa cấu hình → 501.
//
// LƯU Ý: file này cố ý TỰ CHỨA (không import từ ../src) vì runtime function
// của Vercel không resolve được import tương đối thiếu đuôi file.

const AI_MODELS = [
  { id: "claude-haiku-5.5", label: "Claude Haiku 5.5 (nhanh)" },
];
const DEFAULT_AI_MODEL = AI_MODELS[0].id;

// Model hợp lệ: có trong danh sách built-in, hoặc tên tùy chỉnh đúng định dạng
// (chữ/số và . - _ / : , tối đa 80 ký tự) — khớp MODEL_ID_RE phía client.
const MODEL_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._\-/:]{0,79}$/;

function isAllowedModel(id) {
  return AI_MODELS.some((m) => m.id === id) || MODEL_ID_RE.test(String(id ?? ""));
}

const AI_SYSTEM_PROMPT = [
  "Bạn là trợ lý ESG cho cán bộ công nhân viên nhà máy giày (Việt Nam).",
  "Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu với công nhân.",
  "Ưu tiên dùng NGỮ CẢNH được cung cấp; không bịa số liệu, không nêu con số cụ thể nếu ngữ cảnh không có.",
  "Nếu không chắc chắn, nói rõ và khuyên hỏi chuyên gia ESG nội bộ.",
  "Không thay thế quy định pháp luật hiện hành.",
].join(" ");

function buildChatMessages(question, context) {
  const user =
    (String(context ?? "").trim() ? `Ngữ cảnh tham khảo:\n${String(context).trim().slice(0, 4000)}\n\n` : "") +
    `Câu hỏi: ${String(question).trim().slice(0, 1000)}`;
  return [
    { role: "system", content: AI_SYSTEM_PROMPT },
    { role: "user", content: user },
  ];
}

async function doChat(key, model, messages, maxTokens, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const upstream = await fetch("https://api.experientiallabs.ai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      // LƯU Ý: model claude-haiku-5.5 qua route này chỉ hỗ trợ temperature=1.0 → không gửi temperature.
      body: JSON.stringify({ model, messages, max_tokens: maxTokens }),
      signal: controller.signal,
    });
    if (!upstream.ok) return { ok: false, status: upstream.status };
    const data = await upstream.json();
    const reply = String(data?.choices?.[0]?.message?.content ?? "").trim();
    if (!reply) return { ok: false, error: "empty_reply" };
    return { ok: true, reply };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "fetch failed" };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const key = process.env.EXPLABS_API_KEY;
    res.status(200).json({ configured: Boolean(key), models: AI_MODELS, defaultModel: DEFAULT_AI_MODEL });
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  } catch { body = {}; }
  // Ưu tiên biến môi trường; key nhập trong app (Cài đặt API) là phương án dự phòng.
  const key = process.env.EXPLABS_API_KEY || String(body.apiKey ?? "").trim();
  if (!key) {
    res.status(501).json({
      error: "not_configured",
      message:
        "Chưa cấu hình EXPLABS_API_KEY. Nhập key tại màn “Cài đặt API” trong app, hoặc quản trị viên thêm biến môi trường trên Vercel (xem docs/CHATBOT_AI.md).",
    });
    return;
  }
  const wanted = String(body.model ?? DEFAULT_AI_MODEL);
  const model = isAllowedModel(wanted) ? wanted : DEFAULT_AI_MODEL;
  if (String(body.action ?? "") === "ping") {
    const out = await doChat(key, model, [{ role: "user", content: "Trả lời đúng một từ: OK" }], 5, 30000);
    if (out.ok) res.status(200).json({ ok: true, model });
    else res.status(200).json({ ok: false, error: out.error ?? "upstream_error", status: out.status, message: out.message });
    return;
  }
  const question = String(body.question ?? "").trim().slice(0, 1000);
  const context = String(body.context ?? "").slice(0, 4000);
  if (!question) {
    res.status(400).json({ error: "empty_question" });
    return;
  }
  const out = await doChat(key, model, buildChatMessages(question, context), 800, 60000);
  if (!out.ok) {
    res.status(502).json({ error: out.error ?? "upstream_error", status: out.status, message: out.message });
    return;
  }
  res.status(200).json({ reply: out.reply, model });
}
