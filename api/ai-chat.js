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

function isAllowedModel(id) {
  return AI_MODELS.some((m) => m.id === id);
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

export default async function handler(req, res) {
  const key = process.env.EXPLABS_API_KEY;

  if (req.method === "GET") {
    res.status(200).json({ configured: Boolean(key), models: AI_MODELS, defaultModel: DEFAULT_AI_MODEL });
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: "method_not_allowed" });
    return;
  }
  if (!key) {
    res.status(501).json({
      error: "not_configured",
      message:
        "Chưa cấu hình EXPLABS_API_KEY trên server. Quản trị viên thêm biến môi trường này trong Vercel (Project → Settings → Environment Variables), xem docs/CHATBOT_AI.md.",
    });
    return;
  }
  let body = {};
  try {
    body = typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {};
  } catch { body = {}; }
  const question = String(body.question ?? "").trim().slice(0, 1000);
  const context = String(body.context ?? "").slice(0, 4000);
  const wanted = String(body.model ?? DEFAULT_AI_MODEL);
  const model = isAllowedModel(wanted) ? wanted : DEFAULT_AI_MODEL;
  if (!question) {
    res.status(400).json({ error: "empty_question" });
    return;
  }

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 60000);
    let upstream;
    try {
      upstream = await fetch("https://api.experientiallabs.ai/v1/chat/completions", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
        body: JSON.stringify({ model, messages: buildChatMessages(question, context), temperature: 0.3, max_tokens: 800 }),
        signal: controller.signal,
      });
    } finally {
      clearTimeout(timer);
    }
    if (!upstream.ok) {
      res.status(502).json({ error: "upstream_error", status: upstream.status });
      return;
    }
    const data = await upstream.json();
    const reply = String(data?.choices?.[0]?.message?.content ?? "").trim();
    if (!reply) {
      res.status(502).json({ error: "empty_reply" });
      return;
    }
    res.status(200).json({ reply, model });
  } catch (err) {
    res.status(502).json({ error: "upstream_error", message: err instanceof Error ? err.message : "fetch failed" });
  }
}
