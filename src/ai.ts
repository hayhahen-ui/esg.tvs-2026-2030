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
