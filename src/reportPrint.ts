// Xuất PDF theo template kiểu Eclat: trang bìa, mục lục, chương đánh số,
// bảng phong cách Eclat, chân trang số trang. Mở cửa sổ in → người dùng lưu PDF.
import { documentChapters, escapeHtml, inlineHtml, parseDocument } from "./resourceDocument";
import { t, type ReportLang } from "./reportI18n";

const ECLAT_CSS = `
  :root { --brown: #8a6d4b; --brown-dark: #6b543a; --teal: #3f6b6b; --ink: #2b2620; --muted: #6f675c; --cream: #faf7f1; --line: #e3d9c8; }
  * { box-sizing: border-box; }
  body { margin: 0; color: var(--ink); background: #fff; font: 11pt/1.7 "Segoe UI", system-ui, -apple-system, sans-serif; }
  .cover { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; padding: 60px; background: var(--cream); border-bottom: 6px solid var(--brown); }
  .cover .kicker { letter-spacing: 4px; font-size: 12pt; color: var(--brown-dark); font-weight: 700; margin-bottom: 18px; }
  .cover h1 { font-size: 34pt; line-height: 1.25; margin: 0 0 12px; color: var(--ink); }
  .cover .sub { font-size: 14pt; color: var(--muted); margin-bottom: 30px; }
  .cover .badge { display: inline-block; border: 2px solid var(--brown); color: var(--brown-dark); font-weight: 700; font-size: 10pt; padding: 8px 14px; border-radius: 4px; max-width: 640px; }
  .cover .date { margin-top: 26px; color: var(--muted); font-size: 10pt; }
  .toc { padding: 48px 60px; }
  .toc h2 { font-size: 18pt; color: var(--brown-dark); border-bottom: 3px solid var(--brown); padding-bottom: 10px; }
  .toc ol { list-style: none; padding: 0; margin: 24px 0; }
  .toc li { padding: 7px 0; border-bottom: 1px dotted var(--line); font-size: 11pt; }
  .toc li a { color: var(--ink); text-decoration: none; }
  .toc li .chnum { display: inline-block; min-width: 44px; font-weight: 700; color: var(--brown); }
  .notice { margin: 0 60px 30px; border-left: 5px solid var(--teal); background: #f2f6f6; padding: 14px 18px; font-size: 10pt; }
  .notice strong { color: var(--teal); }
  .chapter { padding: 30px 60px; }
  .chapter .chap-kicker { letter-spacing: 3px; font-size: 10pt; font-weight: 700; color: var(--brown); margin-bottom: 6px; }
  .chapter h2 { font-size: 20pt; margin: 0 0 16px; color: var(--ink); border-bottom: 2px solid var(--line); padding-bottom: 10px; }
  .chapter h3 { font-size: 13pt; color: var(--brown-dark); margin: 22px 0 8px; }
  .chapter p { margin: 10px 0; text-align: justify; }
  .chapter ul, .chapter ol { margin: 10px 0; padding-left: 24px; }
  .chapter li { margin: 4px 0; }
  table { border-collapse: collapse; width: 100%; margin: 14px 0; font-size: 9.5pt; }
  th { background: var(--brown); color: #fff; text-align: left; padding: 9px 10px; font-weight: 600; }
  td { border: 1px solid var(--line); padding: 8px 10px; vertical-align: top; }
  tbody tr:nth-child(even) td { background: #faf8f4; }
  code { font-size: 9pt; background: #f0ece4; padding: 1px 5px; border-radius: 3px; }
  a { color: var(--teal); }
  @page { size: A4; margin: 18mm 15mm 20mm; @bottom-center { content: counter(page); font-size: 9pt; color: #6f675c; } @top-center { content: string(report-title); font-size: 8pt; color: #9a917f; letter-spacing: 1px; } }
  .chapter h2 { string-set: report-title content(); }
  @media print {
    .cover { min-height: auto; height: 100vh; }
    .toc, .chapter { break-before: page; }
    .chapter h2, .chapter h3 { break-after: avoid; }
    tr { break-inside: avoid; }
    thead { display: table-header-group; }
    a { color: inherit; text-decoration: none; }
  }
  @media screen { body { max-width: 900px; margin: 0 auto; box-shadow: 0 0 40px rgba(0,0,0,.15); } .toc, .chapter { break-before: auto; } }
`;

function renderBlocks(blocks: ReturnType<typeof parseDocument>): string {
  return blocks.map((block) => {
    if (block.kind === "heading") {
      if (block.level <= 2) return "";
      return `<h3>${inlineHtml(block.text)}</h3>`;
    }
    if (block.kind === "paragraph") return `<p>${inlineHtml(block.text)}</p>`;
    if (block.kind === "list") {
      const tag = block.ordered ? "ol" : "ul";
      return `<${tag}>${block.items.map((x) => `<li>${inlineHtml(x)}</li>`).join("")}</${tag}>`;
    }
    return `<table><thead><tr>${block.headers.map((x) => `<th>${inlineHtml(x)}</th>`).join("")}</tr></thead><tbody>${block.rows.map((r) => `<tr>${r.map((x) => `<td>${inlineHtml(x)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
  }).join("\n");
}

export function buildEclatPrintHtml(lang: ReportLang, title: string, markdown: string): string {
  const chapters = documentChapters(parseDocument(markdown));
  const [preamble, ...rest] = chapters;
  const tocItems = rest.map((ch, i) => {
    const m = /^(\d+)\.\s*(.*)$/.exec(ch.title);
    const num = m ? m[1] : String(i + 1);
    const name = m ? m[2] : ch.title;
    return `<li><a href="#chap-${i}"><span class="chnum">${num}</span>${escapeHtml(name)}</a></li>`;
  }).join("\n");
  const notice = preamble.blocks
    .filter((b) => b.kind === "paragraph")
    .map((b) => `<p>${inlineHtml((b as { text: string }).text)}</p>`)
    .join("\n");
  const chapterHtml = rest.map((ch, i) => {
    const m = /^(\d+)\.\s*(.*)$/.exec(ch.title);
    const num = m ? m[1] : String(i + 1);
    const name = m ? m[2] : ch.title;
    const chapLabel = lang === "zh" ? `第 ${num} 章` : `CHAPTER ${num}`;
    return `<section class="chapter" id="chap-${i}"><div class="chap-kicker">${chapLabel}</div><h2>${escapeHtml(name)}</h2>${renderBlocks(ch.blocks)}</section>`;
  }).join("\n");

  return `<!doctype html><html lang="${lang}"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title><style>${ECLAT_CSS}</style></head><body>
<div class="cover">
  <div class="kicker">ESG REPORT · 2025</div>
  <h1>${escapeHtml(title)}</h1>
  <div class="sub">${escapeHtml(t(lang, "pdfCoverSub"))}</div>
  <div><span class="badge">${escapeHtml(t(lang, "sampleNote"))}</span></div>
  <div class="date">08/10/2026 · v1.0</div>
</div>
<nav class="toc"><h2>${escapeHtml(t(lang, "pdfContents"))}</h2><ol>${tocItems}</ol></nav>
<div class="notice"><strong>${escapeHtml(t(lang, "sampleNote"))}</strong>${notice}</div>
${chapterHtml}
</body></html>`;
}

/** Mở cửa sổ in với template Eclat — người dùng chọn "Lưu thành PDF". */
export function printEclatPdf(lang: ReportLang, title: string, markdown: string): void {
  const html = buildEclatPrintHtml(lang, title, markdown);
  const w = window.open("", "_blank", "width=1000,height=800");
  if (!w) return;
  w.document.write(html);
  w.document.close();
  w.focus();
  window.setTimeout(() => { w.print(); }, 500);
}
