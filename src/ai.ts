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

/** Model decisions (tên kết thúc bằng -decisions) chỉ dùng cho Decisions API
 *  (/api/ai-decide), không dùng cho chat (/api/ai-chat). */
export function isDecisionsModel(id: string): boolean {
  return /-decisions$/i.test(String(id ?? "").trim());
}

// --- Decisions API: câu hỏi đánh giá mặc định cho chatbot ---

export interface DecideChoice { value: string; description?: string }
export interface DecideQuestion { type: "choice"; name: string; instructions?: string; choices: DecideChoice[] }
export interface DecideAnswer {
  type?: string; name?: string; choice?: string;
  probabilities?: Array<{ value: string; probability: number }>;
  confidence?: number;
}

/** Câu hỏi đánh giá mặc định khi dùng model decisions trong chatbot:
 *  nội dung trả lời có đáng tin để tham khảo không? */
export function buildDecideQuestion(): DecideQuestion[] {
  return [{
    type: "choice",
    name: "danhgia",
    instructions: "Dựa vào ngữ cảnh được cung cấp, nội dung trả lời cho câu hỏi có đáng tin để tham khảo không?",
    choices: [
      { value: "dang_tham_khao", description: "Có cơ sở trong ngữ cảnh, đáng tham khảo (vẫn cần chuyên gia nội bộ soát xét)." },
      { value: "can_kiem_chung", description: "Chưa đủ cơ sở, cần kiểm chứng thêm trước khi áp dụng." },
      { value: "khong_phu_hop", description: "Không phù hợp hoặc không có cơ sở trong ngữ cảnh." },
    ],
  }];
}

/** Định dạng kết quả decisions thành văn bản hiển thị trong chat. */
export function formatDecideAnswers(answers: DecideAnswer[], questions: DecideQuestion[], modelLabel: string): string {
  const desc = (q: DecideQuestion | undefined, v?: string) =>
    q?.choices.find((c) => c.value === v)?.description ?? v ?? "?";
  const pct = (p?: number) => (p === undefined || Number.isNaN(p) ? "?" : `${Math.round(p * 100)}%`);
  const lines = [`⚖️ Đánh giá bằng AI (${modelLabel}):`];
  for (const a of answers) {
    const q = questions.find((qq) => qq.name === a.name);
    lines.push(`→ Kết luận: ${desc(q, a.choice)} (độ tin cậy ${pct(a.confidence)})`);
    if (a.probabilities?.length) {
      lines.push(`Xác suất: ${a.probabilities.map((p) => `${desc(q, p.value)} ${pct(p.probability)}`).join(" · ")}`);
    }
  }
  lines.push("", AI_GENERATED_DISCLAIMER);
  return lines.join("\n");
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
