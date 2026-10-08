// Helpers cho chatbot hỏi đáp AI (TinyFish Search).
// Pure functions — dùng được cả ở client (src) và serverless proxy (api/).

export interface WebResult {
  title: string;
  url: string;
  snippet: string;
}

/** Trích danh sách kết quả từ response của TinyFish Search API (nhiều dạng shape). */
export function normalizeTinyfishResults(data: unknown): WebResult[] {
  if (!data || typeof data !== "object") return [];
  const root = data as Record<string, unknown>;
  const candidates: unknown[] = [];
  for (const key of ["results", "items", "data", "organic_results", "web_results"]) {
    const v = root[key];
    if (Array.isArray(v)) { candidates.push(...v); break; }
  }
  if (!candidates.length && Array.isArray(data)) candidates.push(...data);
  const out: WebResult[] = [];
  for (const item of candidates) {
    if (!item || typeof item !== "object") continue;
    const r = item as Record<string, unknown>;
    const url = String(r.url ?? r.link ?? "");
    if (!/^https?:\/\//.test(url)) continue;
    out.push({
      title: String(r.title ?? r.name ?? url).slice(0, 200),
      url,
      snippet: String(r.snippet ?? r.description ?? r.summary ?? r.text ?? "").slice(0, 500),
    });
    if (out.length >= 6) break;
  }
  return out;
}

export const AI_DISCLAIMER =
  "Kết quả web do AI tìm tự động — cần chuyên gia nội bộ soát xét trước khi áp dụng. Không thay thế quy định pháp luật hiện hành.";

// --- LLM (Experiential Labs, OpenAI-compatible) ---

export interface ChatModel { id: string; label: string }

/** Danh sách model được phép — server kiểm tra lại, client chỉ hiển thị. */
export const AI_MODELS: ChatModel[] = [
  { id: "claude-haiku-5.5", label: "Claude Haiku 5.5 (nhanh)" },
];

export const DEFAULT_AI_MODEL = AI_MODELS[0].id;

export function isAllowedModel(id: string): boolean {
  return AI_MODELS.some((m) => m.id === id);
}

export const AI_SYSTEM_PROMPT = [
  "Bạn là trợ lý ESG cho cán bộ công nhân viên nhà máy giày (Việt Nam).",
  "Trả lời bằng tiếng Việt, ngắn gọn, dễ hiểu với công nhân.",
  "Ưu tiên dùng NGỮ CẢNH được cung cấp; không bịa số liệu, không nêu con số cụ thể nếu ngữ cảnh không có.",
  "Nếu không chắc chắn, nói rõ và khuyên hỏi chuyên gia ESG nội bộ.",
  "Không thay thế quy định pháp luật hiện hành.",
].join(" ");

export function buildChatMessages(question: string, context: string): Array<{ role: string; content: string }> {
  const user = (context.trim() ? `Ngữ cảnh tham khảo:\n${context.trim().slice(0, 4000)}\n\n` : "") + `Câu hỏi: ${question.trim().slice(0, 1000)}`;
  return [
    { role: "system", content: AI_SYSTEM_PROMPT },
    { role: "user", content: user },
  ];
}

export const AI_GENERATED_DISCLAIMER =
  "Nội dung do AI tạo — cần chuyên gia nội bộ soát xét trước khi áp dụng.";
