// /api/ai-chat — proxy LLM (Experiential Labs, OpenAI-compatible) cho chatbot.
//   GET  → { configured, models, defaultModel } (client lấy danh sách model)
//   POST → { question, model?, context? } → { reply, model }
// API key nằm trong biến môi trường EXPLABS_API_KEY (server-side). Chưa cấu hình → 501.

import { AI_MODELS, DEFAULT_AI_MODEL, buildChatMessages, isAllowedModel } from "../src/ai";

interface HandlerReq {
  method?: string;
  body?: unknown;
}
interface HandlerRes {
  status: (code: number) => HandlerRes;
  json: (data: unknown) => void;
}

export default async function handler(req: HandlerReq, res: HandlerRes) {
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
  let body: Record<string, unknown> = {};
  try {
    body = (typeof req.body === "string" ? JSON.parse(req.body) : req.body ?? {}) as Record<string, unknown>;
  } catch {
    body = {};
  }
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
    let upstream: Response;
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
    const data = (await upstream.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const reply = String(data.choices?.[0]?.message?.content ?? "").trim();
    if (!reply) {
      res.status(502).json({ error: "empty_reply" });
      return;
    }
    res.status(200).json({ reply, model });
  } catch (err) {
    res.status(502).json({
      error: "upstream_error",
      message: err instanceof Error ? err.message : "fetch failed",
    });
  }
}
