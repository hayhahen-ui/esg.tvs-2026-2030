// Dịch máy thân báo cáo mẫu (markdown tiếng Việt → EN/ZH) qua /api/ai-chat,
// chia theo mục "## ", cache localStorage theo hash để chỉ dịch một lần.
import type { ReportLang } from "./reportI18n";

const CACHE_KEY = "esg_report_mt_v1";
const MAX_CACHE = 250;

function fnv1a(s: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16);
}

type Cache = Record<string, string>;

function loadCache(): Cache {
  try {
    return JSON.parse(localStorage.getItem(CACHE_KEY) ?? "{}") as Cache;
  } catch {
    return {};
  }
}

function saveCache(cache: Cache): void {
  try {
    const keys = Object.keys(cache);
    while (keys.length > MAX_CACHE) delete cache[keys.shift()!];
    localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  } catch { /* bỏ qua khi đầy */ }
}

/** Chia markdown thành các đoạn theo tiêu đề "## " (giữ phần mở đầu). */
export function splitSections(md: string): string[] {
  const parts = md.split(/\n(?=## )/g);
  return parts.map((p) => p.trim()).filter(Boolean);
}

const LANG_NAMES: Record<ReportLang, string> = { vi: "tiếng Việt", en: "English", zh: "中文简体" };

async function translateSection(section: string, target: ReportLang, apiKey?: string): Promise<string> {
  const r = await fetch("/api/ai-chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      question:
        `Dịch đoạn markdown tiếng Việt sau sang ${LANG_NAMES[target]}. ` +
        `Giữ nguyên định dạng markdown (tiêu đề, bảng, danh sách). ` +
        `Không dịch tên riêng, mã (DEMO-*, kWh, tCO2e, GJ...), số liệu và đơn vị. ` +
        `Không thêm bớt nội dung, không thêm lời dẫn. Chỉ trả về bản dịch:\n\n${section.slice(0, 6000)}`,
      model: "claude-haiku-5.5",
      ...(apiKey ? { apiKey } : {}),
    }),
  });
  const d = (await r.json().catch(() => ({}))) as { reply?: string; error?: string };
  if (!r.ok || !d.reply) throw new Error(d.error ?? "translate_failed");
  return String(d.reply).trim();
}

/** Dịch toàn bộ markdown; gọi onProgress(done, total) sau mỗi đoạn. Ném lỗi nếu thiếu key AI. */
export async function translateMarkdown(
  md: string,
  target: ReportLang,
  apiKey?: string,
  onProgress?: (done: number, total: number) => void,
): Promise<string> {
  if (target === "vi") return md;
  const sections = splitSections(md);
  const cache = loadCache();
  const out: string[] = [];
  let dirty = false;
  for (let i = 0; i < sections.length; i++) {
    const key = `${target}:${fnv1a(sections[i])}`;
    let tr = cache[key];
    if (!tr) {
      tr = await translateSection(sections[i], target, apiKey);
      cache[key] = tr;
      dirty = true;
    }
    out.push(tr);
    onProgress?.(i + 1, sections.length);
  }
  if (dirty) saveCache(cache);
  return out.join("\n\n");
}

/** Xóa cache dịch (khi muốn dịch lại). */
export function clearTranslateCache(): void {
  try {
    localStorage.removeItem(CACHE_KEY);
  } catch { /* bỏ qua */ }
}
