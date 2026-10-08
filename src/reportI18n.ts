// Từ điển 3 ngôn ngữ cho phần báo cáo & biểu đồ (VI / EN / ZH).
// Key → { vi, en, zh }. Mọi key phải có đủ 3 ngôn ngữ (kiểm tra bằng test).

export type ReportLang = "vi" | "en" | "zh";

export const REPORT_LANGS: Array<{ id: ReportLang; label: string }> = [
  { id: "vi", label: "Tiếng Việt" },
  { id: "en", label: "English" },
  { id: "zh", label: "中文" },
];

const STR: Record<string, Record<ReportLang, string>> = {
  // --- Khung chung ---
  langLabel: { vi: "Ngôn ngữ báo cáo", en: "Report language", zh: "报告语言" },
  chartsTitle: { vi: "Biểu đồ báo cáo mẫu", en: "Sample report charts", zh: "示例报告图表" },
  chartsIntro: {
    vi: "Biểu đồ vẽ từ dữ liệu mẫu giả định (Công ty Giày Minh Họa, 2024–2025). Mở “Cách tính” dưới mỗi biểu đồ để xem công thức và số liệu đầu vào.",
    en: "Charts drawn from fictional sample data (Minh Hoa Footwear Co., 2024–2025). Open “How it is calculated” under each chart for formulas and inputs.",
    zh: "图表根据假设示例数据绘制（Minh Hoa 鞋业公司，2024–2025）。点击每张图表下方的“计算方法”查看公式与输入数据。",
  },
  howCalculated: { vi: "Cách tính", en: "How it is calculated", zh: "计算方法" },
  sampleNote: {
    vi: "MẪU GIẢ ĐỊNH — không phải dữ liệu, chữ ký hoặc chứng nhận của doanh nghiệp thật.",
    en: "FICTIONAL SAMPLE — not data, signatures, or certifications of a real company.",
    zh: "假设示例——非真实企业的数据、签字或认证。",
  },
  machineTranslated: {
    vi: "Bản dịch máy — cần soát xét trước khi dùng cho mục đích chính thức.",
    en: "Machine translation — review before official use.",
    zh: "机器翻译——正式使用前请审校。",
  },
  translating: { vi: "Đang dịch", en: "Translating", zh: "翻译中" },
  needAiKey: {
    vi: "Cần key AI (màn “Cài đặt API”) để dịch tự động. Đang hiển thị bản tiếng Việt.",
    en: "An AI key (the “API Settings” screen) is needed for auto-translation. Showing Vietnamese for now.",
    zh: "自动翻译需要 AI 密钥（“API 设置”页面）。暂显示越南语版本。",
  },
  year: { vi: "Năm", en: "Year", zh: "年份" },
  month: { vi: "Tháng", en: "Month", zh: "月份" },
  unit: { vi: "Đơn vị", en: "Unit", zh: "单位" },
  source: { vi: "Nguồn số liệu", en: "Data source", zh: "数据来源" },
  sampleDataMonths: { vi: "Dữ liệu tháng mẫu 2025", en: "2025 sample monthly data", zh: "2025 年示例月度数据" },
  sampleDataYears: { vi: "Dữ liệu năm mẫu", en: "Sample yearly data", zh: "示例年度数据" },

  // --- Biểu đồ 1: điện 12 tháng ---
  chElectricityTitle: { vi: "Điện mua theo tháng — 2025", en: "Monthly purchased electricity — 2025", zh: "2025 年每月购电量" },
  chElectricityY: { vi: "kWh", en: "kWh", zh: "千瓦时" },

  // --- Biểu đồ 2: KNK ---
  chGhgTitle: { vi: "Phát thải KNK theo phạm vi", en: "GHG emissions by scope", zh: "按范围划分的温室气体排放" },
  scope1: { vi: "Phạm vi 1", en: "Scope 1", zh: "范围一" },
  scope2loc: { vi: "Phạm vi 2 (địa điểm)", en: "Scope 2 (location-based)", zh: "范围二（区位法）" },
  unitTco2e: { vi: "tCO₂e", en: "tCO₂e", zh: "吨CO₂当量" },

  // --- Biểu đồ 3: cường độ ---
  chIntensityTitle: { vi: "Cường độ sử dụng tài nguyên", en: "Resource intensities", zh: "资源强度" },
  intElectricity: { vi: "Điện (kWh/đôi)", en: "Electricity (kWh/pair)", zh: "电耗（千瓦时/双）" },
  intGhg: { vi: "KNK (kgCO₂e/đôi)", en: "GHG (kgCO₂e/pair)", zh: "温室气体（千克CO₂当量/双）" },
  intWater: { vi: "Nước (lít/đôi)", en: "Water (litres/pair)", zh: "水耗（升/双）" },

  // --- Biểu đồ 4: chất thải ---
  chWasteTitle: { vi: "Cơ cấu chất thải — 2025", en: "Waste composition — 2025", zh: "2025 年废弃物构成" },
  wasteRecycled: { vi: "Tái chế", en: "Recycled", zh: "回收利用" },
  wasteDisposed: { vi: "Xử lý (chôn lấp)", en: "Disposed (landfill)", zh: "处置（填埋）" },
  wasteHazardous: { vi: "Nguy hại", en: "Hazardous", zh: "有害废弃物" },
  unitTon: { vi: "tấn", en: "tonnes", zh: "吨" },

  // --- Biểu đồ 5: nhân sự ---
  chPeopleTitle: { vi: "Nhân sự & an toàn lao động", en: "Workforce & safety", zh: "人员与安全" },
  femaleShare: { vi: "Tỷ lệ nữ (%)", en: "Female share (%)", zh: "女性比例（%）" },
  female: { vi: "Nữ", en: "Female", zh: "女性" },
  male: { vi: "Nam", en: "Male", zh: "男性" },
  reportSampleTitle: {
    vi: "Báo cáo mẫu ESG — doanh nghiệp giả định",
    en: "Sample ESG report — fictional company",
    zh: "ESG 示例报告——虚拟企业",
  },
  reportSampleIntro: {
    vi: "20 chương để tập biên soạn và nhập liệu, có công thức, bảng đối chiếu và dữ liệu tháng giả định; tách riêng số liệu Eclat.",
    en: "20 chapters for drafting and data-entry practice, with formulas, reconciliation tables and fictional monthly data; Eclat figures kept separate.",
    zh: "20 章用于练习编制与数据录入，含公式、核对表与假设月度数据；Eclat 数据单独列示。",
  },
  pdfExport: { vi: "Xuất PDF (mẫu Eclat)", en: "Export PDF (Eclat-style)", zh: "导出PDF（Eclat样式）" },
  pdfCoverSub: {
    vi: "Báo cáo ESG — Doanh nghiệp giả định",
    en: "ESG Report — Fictional Company",
    zh: "ESG报告——虚拟企业",
  },
  pdfContents: { vi: "Mục lục", en: "Contents", zh: "目录" },
  trainingPerPerson: { vi: "Giờ đào tạo/người", en: "Training hours/person", zh: "人均培训时长" },
  injuryRate: { vi: "Tỷ suất chấn thương (ca/triệu giờ)", en: "Injury rate (cases/million hours)", zh: "工伤率（例/百万工时）" },

  // --- Tên KPI ---
  kpiProd: { vi: "Sản lượng", en: "Production output", zh: "产量" },
  kpiElec: { vi: "Điện mua", en: "Purchased electricity", zh: "购电量" },
  kpiElecI: { vi: "Cường độ điện", en: "Electricity intensity", zh: "单位电耗" },
  kpiEnergy: { vi: "Năng lượng trong tổ chức", en: "Energy within the organization", zh: "组织能耗" },
  kpiGhg1: { vi: "Scope 1", en: "Scope 1", zh: "范围一" },
  kpiGhg2: { vi: "Scope 2 (địa điểm)", en: "Scope 2 (location-based)", zh: "范围二（区位法）" },
  kpiGhgI: { vi: "Cường độ KNK", en: "GHG intensity", zh: "温室气体强度" },
  kpiWater: { vi: "Nước lấy", en: "Water withdrawal", zh: "取水量" },
  kpiWaterI: { vi: "Cường độ nước", en: "Water intensity", zh: "单位水耗" },
  kpiWaste: { vi: "Chất thải phát sinh", en: "Waste generated", zh: "废弃物产生量" },
  kpiRecovery: { vi: "Tỷ lệ tái chế chất thải", en: "Waste recycling rate", zh: "废弃物回收率" },
  kpiMatR: { vi: "Vật liệu tái chế", en: "Recycled materials", zh: "再生材料" },
  kpiHeadcount: { vi: "Nhân viên cuối kỳ", en: "Year-end headcount", zh: "期末员工数" },
  kpiFemale: { vi: "Tỷ lệ nữ", en: "Female share", zh: "女性比例" },
  kpiTrain: { vi: "Giờ đào tạo/người", en: "Training hours/person", zh: "人均培训时长" },
  kpiInjury: { vi: "Tỷ suất chấn thương", en: "Injury rate", zh: "工伤率" },
  kpiSup: { vi: "Nhà cung cấp được đánh giá", en: "Suppliers assessed", zh: "已评估供应商" },
};

export function t(lang: ReportLang, key: string): string {
  return STR[key]?.[lang] ?? STR[key]?.vi ?? key;
}

/** true nếu key tồn tại trong từ điển. */
export function hasKey(key: string): boolean {
  return key in STR;
}

/** Tất cả key — dùng cho test bao phủ. */
export function allKeys(): string[] {
  return Object.keys(STR);
}

const LOCALES: Record<ReportLang, string> = { vi: "vi-VN", en: "en-US", zh: "zh-CN" };

/** Định dạng số theo ngôn ngữ. */
export function fmtNum(lang: ReportLang, value: number, digits = 2): string {
  return new Intl.NumberFormat(LOCALES[lang], { maximumFractionDigits: digits }).format(value);
}

/** Tên tháng rút gọn theo ngôn ngữ (index 0–11). */
export function monthName(lang: ReportLang, index: number): string {
  if (lang === "en") return ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index] ?? "";
  if (lang === "zh") return `${index + 1}月`;
  return `T${index + 1}`;
}

/** Đọc/ghi ngôn ngữ báo cáo (localStorage). */
const LANG_KEY = "esg_report_lang_v1";
export function loadReportLang(): ReportLang {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "en" || v === "zh" ? v : "vi";
  } catch {
    return "vi";
  }
}
export function saveReportLang(lang: ReportLang): void {
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch { /* bỏ qua */ }
}
