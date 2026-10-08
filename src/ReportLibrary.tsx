import { useMemo, useState } from "react";
import ResourceScreen from "./ResourceScreen";
import ReportCharts from "./ReportCharts";
import auditMarkdown from "../docs/AUDIT.md?raw";
import outlineMarkdown from "../docs/ESG_REPORT_OUTLINE.md?raw";
import { buildExampleReport, exampleSheets } from "./reportExample";
import { buildEclatReport, eclatSheets, ECLAT_SOURCE, ECLAT_WARNING } from "./eclatReference";
import { downloadXlsx } from "./xlsx";
import { REPORT_LANGS, loadReportLang, saveReportLang, t, type ReportLang } from "./reportI18n";
import { printEclatPdf } from "./reportPrint";

/** Tab "Mẫu giả định": biểu đồ + báo cáo 20 chương, chuyển ngữ VI/EN/ZH tức thì. */
function FictionalReport() {
  const [lang, setLang] = useState<ReportLang>(() => loadReportLang());
  const shownMd = useMemo(() => buildExampleReport(lang), [lang]);
  const title = t(lang, "reportSampleTitle");

  const changeLang = (l: ReportLang) => {
    saveReportLang(l);
    setLang(l);
  };

  return (
    <>
      <div className="card">
        <div className="row wrap gap" role="group" aria-label={t(lang, "langLabel")} style={{ alignItems: "center" }}>
          <span className="text-small"><strong>{t(lang, "langLabel")}:</strong></span>
          {REPORT_LANGS.map((l) => (
            <button key={l.id} className={`button ${lang === l.id ? "button-primary" : ""}`}
              aria-pressed={lang === l.id} onClick={() => changeLang(l.id)}>{l.label}</button>
          ))}
          <span style={{ flex: 1 }} />
          <button className="button" onClick={() => printEclatPdf(lang, title, shownMd)}>🖨️ {t(lang, "pdfExport")}</button>
        </div>
      </div>
      <ReportCharts lang={lang} />
      <div style={{ height: 16 }} />
      <ResourceScreen
        title={title}
        intro={t(lang, "reportSampleIntro")}
        markdown={shownMd}
        filename={`ESG_Hub_bao_cao_GIA_DINH_2025${lang === "vi" ? "" : "_" + lang.toUpperCase()}`}
        notice={t(lang, "sampleNote")}
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
