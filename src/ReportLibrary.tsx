import { useEffect, useMemo, useState } from "react";
import ResourceScreen from "./ResourceScreen";
import ReportCharts from "./ReportCharts";
import auditMarkdown from "../docs/AUDIT.md?raw";
import outlineMarkdown from "../docs/ESG_REPORT_OUTLINE.md?raw";
import { buildExampleReport, exampleSheets, SAMPLE_WARNING } from "./reportExample";
import { buildEclatReport, eclatSheets, ECLAT_SOURCE, ECLAT_WARNING } from "./eclatReference";
import { downloadXlsx } from "./xlsx";
import { apiKeyStore } from "./apiKeys";
import { REPORT_LANGS, loadReportLang, saveReportLang, t, type ReportLang } from "./reportI18n";
import { translateMarkdown } from "./reportTranslate";

/** Tab "Mẫu giả định": biểu đồ + báo cáo 20 chương, chuyển ngữ VI/EN/ZH. */
function FictionalReport() {
  const [lang, setLang] = useState<ReportLang>(() => loadReportLang());
  const [translated, setTranslated] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState("");
  const [error, setError] = useState("");
  const sourceMd = useMemo(() => buildExampleReport(), []);

  useEffect(() => {
    saveReportLang(lang);
    if (lang === "vi") {
      setTranslated(null); setError(""); setBusy(false);
      return;
    }
    const apiKey = apiKeyStore.load().explabs;
    if (!apiKey) {
      setTranslated(null); setBusy(false);
      setError(t(lang, "needAiKey"));
      return;
    }
    let cancelled = false;
    setBusy(true); setError(""); setProgress("");
    translateMarkdown(sourceMd, lang, apiKey, (done, total) => {
      if (!cancelled) setProgress(`${t(lang, "translating")} ${done}/${total}…`);
    })
      .then((md) => { if (!cancelled) { setTranslated(md); setBusy(false); } })
      .catch(() => { if (!cancelled) { setError(t(lang, "needAiKey")); setBusy(false); } });
    return () => { cancelled = true; };
  }, [lang, sourceMd]);

  const shownMd = translated ?? sourceMd;
  const notice = lang === "vi"
    ? SAMPLE_WARNING
    : `${t(lang, "sampleNote")} ${t(lang, "machineTranslated")}`;

  return (
    <>
      <div className="card">
        <div className="row wrap gap" role="group" aria-label={t(lang, "langLabel")} style={{ alignItems: "center" }}>
          <span className="text-small"><strong>{t(lang, "langLabel")}:</strong></span>
          {REPORT_LANGS.map((l) => (
            <button key={l.id} className={`button ${lang === l.id ? "button-primary" : ""}`}
              aria-pressed={lang === l.id} onClick={() => setLang(l.id)}>{l.label}</button>
          ))}
          {(busy || error) && <span className="text-small text-secondary" role="status">{busy ? progress : error}</span>}
        </div>
      </div>
      <ReportCharts lang={lang} />
      <div style={{ height: 16 }} />
      <ResourceScreen
        title={t(lang, "reportSampleTitle")}
        intro={t(lang, "reportSampleIntro")}
        markdown={shownMd}
        filename={`ESG_Hub_bao_cao_GIA_DINH_2025${lang === "vi" ? "" : "_" + lang.toUpperCase()}`}
        notice={notice}
        actions={<button className="button" onClick={() => downloadXlsx("ESG_Hub_phu_luc_GIA_DINH_2025", exampleSheets())}>Tải phụ lục mẫu (.xlsx)</button>}
      />
    </>
  );
}

export default function ReportLibrary({ kind, go }: { kind: string; go: (route: string) => void }) {
  const [example, setExample] = useState<"eclat" | "fictional">("eclat");
  if (kind === "project-audit") return <ResourceScreen title="Audit & Kaizen dự án" intro="Toàn bộ phát hiện từ mã nguồn ZIP, biện pháp cải tiến và giới hạn đã kiểm tra." markdown={auditMarkdown} filename="ESG_Hub_Audit_Kaizen" notice="Audit kỹ thuật và chất lượng quy trình của ứng dụng; không phải kiểm toán dữ liệu ESG của doanh nghiệp." actions={<a className="button" href="https://github.com/hayhahen-ui/esg.tvs-2026-2030/blob/main/docs/AUDIT.md" target="_blank" rel="noreferrer">Đọc trên GitHub</a>} />;
  if (kind === "report-kit") return <ResourceScreen title="Khung báo cáo ESG hoàn chỉnh" intro="19 phần biên soạn, trách nhiệm, nguồn bằng chứng và chỉ mục nội dung để doanh nghiệp chuẩn bị báo cáo." markdown={outlineMarkdown} filename="ESG_Hub_khung_bao_cao" notice="Khung tham khảo cần xác lập phạm vi, đối chiếu yêu cầu và phê duyệt trước khi công bố." actions={<button className="button" onClick={() => go("report-example")}>Xem báo cáo tham chiếu</button>} />;
  const choose = <div className="row wrap gap resource-actions" role="group" aria-label="Chọn báo cáo mẫu"><button className={`button ${example === "eclat" ? "button-primary" : ""}`} aria-pressed={example === "eclat"} onClick={() => setExample("eclat")}>Mẫu theo Eclat 2024</button><button className={`button ${example === "fictional" ? "button-primary" : ""}`} aria-pressed={example === "fictional"} onClick={() => setExample("fictional")}>Mẫu giả định để tập nhập</button></div>;
  return <>{choose}{example === "eclat" ? <ResourceScreen title="Báo cáo tham chiếu ESG — Eclat 2024" intro="21 phần biên soạn tiếng Việt từ báo cáo nguồn, 25 KPI có đơn vị/phạm vi/số trang, và các điểm cần làm rõ trong tài liệu." markdown={buildEclatReport()} filename="ESG_Hub_tham_chieu_Eclat_2024" notice={ECLAT_WARNING} actions={<><button className="button" onClick={() => downloadXlsx("ESG_Hub_Eclat_2024_KPI_NGUON", eclatSheets())}>Tải KPI Eclat và ngoại lệ (.xlsx)</button><a className="button" href={ECLAT_SOURCE} target="_blank" rel="noreferrer">Mở PDF Eclat 2024 nguồn</a></>} /> : <FictionalReport />}</>;
}
