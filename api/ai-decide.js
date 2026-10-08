// /api/ai-decide — proxy Decisions API (Experiential Labs) cho ESG Hub.
//   GET  → { configured, defaultModel } (kiểm tra key server đã cấu hình chưa)
//   POST → { input, questions?, model?, apiKey?, action? } → { answers, usage, model }
//
// Decisions API trả câu trả lời có cấu trúc (choice + probabilities + confidence),
// khác với chat completions. Model decisions (vd gpt-6-luna-decisions) CHỈ dùng ở
// endpoint này — gọi /v1/chat/completions với model decisions sẽ trả 503.
// API key nằm trong biến môi trường EXPLABS_API_KEY (server-side); key nhập trong
// app (màn "Cài đặt API") là phương án dự phòng, gửi qua body.apiKey.
//
// LƯU Ý: file này cố ý TỰ CHỨA (không import từ ../src) vì runtime function
// của Vercel không resolve được import tương đối thiếu đuôi file.

const DEFAULT_DECIDE_MODEL = "gpt-6-luna-decisions";

// Tên model hợp lệ: chữ/số và . - _ / : , tối đa 80 ký tự.
const MODEL_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._\-/:]{0,79}$/;

function isAllowedModel(id) {
  return MODEL_ID_RE.test(String(id ?? ""));
}

function validQuestions(qs) {
  if (qs === undefined) return { ok: true, value: undefined };
  if (!Array.isArray(qs) || qs.length === 0 || qs.length > 5) {
    return { ok: false, error: "questions phải là mảng 1–5 câu hỏi." };
  }
  for (const q of qs) {
    if (!q || typeof q !== "object") return { ok: false, error: "mỗi question phải là object." };
    if (q.type !== "choice") return { ok: false, error: "hiện chỉ hỗ trợ question type=\"choice\"." };
    if (!q.name || typeof q.name !== "string" || q.name.length > 80) {
      return { ok: false, error: "mỗi question cần name (chuỗi, ≤80 ký tự)." };
    }
    if (!Array.isArray(q.choices) || q.choices.length < 2 || q.choices.length > 10) {
      return { ok: false, error: `question "${q.name}" cần 2–10 choices.` };
    }
    for (const c of q.choices) {
      if (!c || typeof c.value !== "string" || !c.value) {
        return { ok: false, error: `question "${q.name}" có choice thiếu value.` };
      }
    }
  }
  return { ok: true, value: qs };
}

async function doDecide(key, model, input, questions, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const upstream = await fetch("https://api.experientiallabs.ai/v1/decisions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({ model, input, ...(questions ? { questions } : {}) }),
      signal: controller.signal,
    });
    if (!upstream.ok) {
      let msg = "";
      try {
        const e = await upstream.json();
        msg = e?.error?.message ?? "";
      } catch { /* bỏ qua */ }
      return { ok: false, status: upstream.status, message: msg };
    }
    const data = await upstream.json();
    if (!Array.isArray(data?.answers)) return { ok: false, error: "empty_reply" };
    return { ok: true, answers: data.answers, usage: data.usage ?? null, model: data.model ?? model };
  } catch (err) {
    return { ok: false, message: err instanceof Error ? err.message : "fetch failed" };
  } finally {
    clearTimeout(timer);
  }
}

export default async function handler(req, res) {
  if (req.method === "GET") {
    const key = process.env.EXPLABS_API_KEY;
    res.status(200).json({ configured: Boolean(key), defaultModel: DEFAULT_DECIDE_MODEL });
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
  // Ưu tiên biến môi trường; key nhập trong app là phương án dự phòng.
  const key = process.env.EXPLABS_API_KEY || String(body.apiKey ?? "").trim();
  if (!key) {
    res.status(501).json({
      error: "not_configured",
      message: "Chưa cấu hình EXPLABS_API_KEY. Nhập key tại màn “Cài đặt API” trong app, hoặc quản trị viên thêm biến môi trường trên Vercel (xem docs/CHATBOT_AI.md).",
    });
    return;
  }
  const wanted = String(body.model ?? DEFAULT_DECIDE_MODEL);
  const model = isAllowedModel(wanted) ? wanted : DEFAULT_DECIDE_MODEL;

  if (String(body.action ?? "") === "ping") {
    const out = await doDecide(key, model, "ping", [{
      type: "choice",
      name: "ping",
      instructions: "Nhận được yêu cầu kiểm tra thì chọn 'ok'.",
      choices: [
        { value: "ok", description: "Đã nhận yêu cầu." },
        { value: "fail", description: "Không nhận được." },
      ],
    }], 30000);
    if (out.ok) res.status(200).json({ ok: true, model });
    else res.status(200).json({ ok: false, error: out.error ?? "upstream_error", status: out.status, message: out.message });
    return;
  }

  const input = String(body.input ?? "").trim();
  if (!input) {
    res.status(400).json({ error: "empty_input", message: "Thiếu input (tình huống/đề xuất cần đánh giá)." });
    return;
  }
  if (input.length > 4000) {
    res.status(400).json({ error: "input_too_long", message: "input tối đa 4000 ký tự." });
    return;
  }
  const qv = validQuestions(body.questions);
  if (!qv.ok) {
    res.status(400).json({ error: "bad_questions", message: qv.error });
    return;
  }
  const out = await doDecide(key, model, input, qv.value, 60000);
  if (!out.ok) {
    res.status(502).json({ error: out.error ?? "upstream_error", status: out.status, message: out.message });
    return;
  }
  res.status(200).json({ answers: out.answers, usage: out.usage, model: out.model });
}
