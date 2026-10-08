import type { Sheet } from "./xlsx";
import { t, type ReportLang } from "./reportI18n";
import { cells, fill, rp } from "./reportProse";
export const SAMPLE_WARNING = "MẪU GIẢ ĐỊNH — không phải dữ liệu, chữ ký hoặc chứng nhận của doanh nghiệp thật.";
export const exampleYears = [
  { year: 2024, pairs: 2000000, electricityKwh: 7200000, dieselLitres: 60000, lpgKg: 40000, waterM3: 100000, dischargeM3: 80000, wasteRecycledT: 260, wasteDisposedT: 80, wasteHazardousT: 40, materialsT: 5400, recycledMaterialsT: 1080, employees: 1100, women: 715, men: 385, trainingHours: 22000, workHours: 2200000, injuries: 5, suppliers: 90, assessedSuppliers: 54, revenue: 800, distributed: 756 },
  { year: 2025, pairs: 2400000, electricityKwh: 6000000, dieselLitres: 48000, lpgKg: 36000, waterM3: 90000, dischargeM3: 72000, wasteRecycledT: 300, wasteDisposedT: 60, wasteHazardousT: 40, materialsT: 6000, recycledMaterialsT: 1440, employees: 1200, women: 780, men: 420, trainingHours: 28800, workHours: 2400000, injuries: 3, suppliers: 100, assessedSuppliers: 80, revenue: 960, distributed: 905 },
] as const;
export type ExampleYear = typeof exampleYears[number];
export const illustrativeFactors = { electricity: 0.5, diesel: 2.68, lpg: 3, dieselGJ: 0.036, lpgGJ: 0.046 };
export function sampleMetrics(data: ExampleYear) {
  const scope1 = (data.dieselLitres * illustrativeFactors.diesel + data.lpgKg * illustrativeFactors.lpg) / 1000;
  const scope2Location = data.electricityKwh * illustrativeFactors.electricity / 1000;
  const wasteTotal = data.wasteRecycledT + data.wasteDisposedT + data.wasteHazardousT;
  return { scope1, scope2Location, ghgTotal: scope1 + scope2Location, ghgKgPerPair: (scope1 + scope2Location) * 1000 / data.pairs, electricityPerPair: data.electricityKwh / data.pairs,
    energyGJ: data.electricityKwh * 0.0036 + data.dieselLitres * illustrativeFactors.dieselGJ + data.lpgKg * illustrativeFactors.lpgGJ,
    waterLitresPerPair: data.waterM3 * 1000 / data.pairs, waterConsumedM3: data.waterM3 - data.dischargeM3,
    wasteTotal, wasteKgPerPair: wasteTotal * 1000 / data.pairs, recoveryPct: data.wasteRecycledT / wasteTotal * 100, recycledMaterialsPct: data.recycledMaterialsT / data.materialsT * 100,
    womenPct: data.women / data.employees * 100, trainingHoursPerEmployee: data.trainingHours / data.employees, injuryRate: data.injuries * 1000000 / data.workHours, supplierCoveragePct: data.assessedSuppliers / data.suppliers * 100, retainedValue: data.revenue - data.distributed };
}
// All monthly data is illustrative. A fixed monthly production denominator makes weighted intensities auditable.
export const sampleMonths = [480000, 420000, 510000, 490000, 520000, 530000, 540000, 520000, 510000, 500000, 490000, 490000].map((electricityKwh, index) => ({ period: `2025-${String(index + 1).padStart(2, "0")}`, pairs: 200000, electricityKwh, dieselLitres: 4000, lpgKg: 3000, waterM3: 7500, dischargeM3: 6000 }));
export const evidenceRegistry = [
  ["DEMO-PROD", "Sản lượng thành phẩm 12 tháng", "Sản xuất / QA", "Đối chiếu nhập kho; loại hàng lỗi, quy tắc đôi giày"],
  ["DEMO-ELEC", "Hóa đơn điện + chỉ số đồng hồ 12 tháng", "Cơ điện / tài chính", "Đối chiếu mua điện, tránh cộng đồng hồ nhánh hai lần"],
  ["DEMO-FUEL", "Phiếu nhiên liệu diesel và LPG", "Kho / cơ điện", "Tồn đầu + mua − tồn cuối; nhiên liệu dùng trong ranh giới"],
  ["DEMO-FACTOR", "Sổ hệ số minh họa", "EHS", "Hệ số GIẢ ĐỊNH, không dùng cho kiểm kê thực"],
  ["DEMO-WATER", "Đồng hồ nước / nước thải 12 tháng", "EHS / cơ điện", "Kiểm phạm vi đồng hồ, cân bằng nước"],
  ["DEMO-WASTE", "Phiếu cân và chứng từ xử lý", "EHS", "Phân loại nguy hại, cân bằng phát sinh/xử lý/tồn"],
  ["DEMO-MAT", "Sổ mua vật liệu và xác nhận tái chế", "Mua hàng / kho", "Khối lượng vật liệu đầu vào, cùng phạm vi"],
  ["DEMO-HR", "Tổng hợp nhân sự, giờ làm và đào tạo", "Nhân sự", "Ẩn danh; danh sách cuối kỳ, không cộng headcount tháng"],
  ["DEMO-OHS", "Nhật ký tai nạn và điều tra", "EHS / nhân sự", "Số sự kiện và giờ làm cùng phạm vi; không bỏ tai nạn nhẹ"],
  ["DEMO-SUP", "Sổ nhà cung cấp và CAPA", "Mua hàng", "Nhà cung cấp hoạt động và hồ sơ được đánh giá"],
  ["DEMO-FIN", "Tổng hợp phân phối giá trị kinh tế", "Tài chính", "Đối chiếu sổ cái, tránh cộng lại chi phí"],
  ["DEMO-GOV", "Biên bản Ban ESG / chính sách", "Thư ký / pháp chế", "Hồ sơ phê duyệt và công khai giới hạn"],
] as const;
const fmt = (value: number, digits = 2) => new Intl.NumberFormat("vi-VN", { maximumFractionDigits: digits }).format(value);
const table = (headers: string[], rows: (string | number)[][]) => `| ${headers.join(" | ")} |\n| ${headers.map(() => "---").join(" | ")} |\n${rows.map(row => `| ${row.join(" | ")} |`).join("\n")}`;
const old = exampleYears[0], current = exampleYears[1], previous = sampleMetrics(old), metrics = sampleMetrics(current);
const change = (a: number, b: number) => `${fmt((b / a - 1) * 100)}%`;
export const exampleKpis = [
  ["PROD", "Sản lượng", "đôi", old.pairs, current.pairs, "Cộng", "DEMO-PROD"],
  ["ELEC", "Điện mua", "kWh", old.electricityKwh, current.electricityKwh, "Cộng", "DEMO-ELEC"],
  ["ELEC-I", "Cường độ điện", "kWh/đôi", previous.electricityPerPair, metrics.electricityPerPair, "Tổng điện / tổng đôi", "DEMO-ELEC + DEMO-PROD"],
  ["ENERGY", "Năng lượng trong tổ chức", "GJ", previous.energyGJ, metrics.energyGJ, "Quy đổi rồi cộng", "DEMO-ELEC + DEMO-FUEL + DEMO-FACTOR"],
  ["GHG-1", "Scope 1", "tCO2e", previous.scope1, metrics.scope1, "Cộng nguồn", "DEMO-FUEL + DEMO-FACTOR"],
  ["GHG-2L", "Scope 2 địa điểm", "tCO2e", previous.scope2Location, metrics.scope2Location, "Cộng nguồn", "DEMO-ELEC + DEMO-FACTOR"],
  ["GHG-I", "Cường độ Scope 1 + 2 địa điểm", "kgCO2e/đôi", previous.ghgKgPerPair, metrics.ghgKgPerPair, "Tổng KNK × 1000 / tổng đôi", "DEMO-PROD + DEMO-FACTOR"],
  ["WATER", "Nước lấy", "m³", old.waterM3, current.waterM3, "Cộng", "DEMO-WATER"],
  ["WATER-I", "Cường độ nước lấy", "lít/đôi", previous.waterLitresPerPair, metrics.waterLitresPerPair, "Tổng m³ × 1000 / tổng đôi", "DEMO-WATER + DEMO-PROD"],
  ["WASTE", "Chất thải phát sinh", "tấn", previous.wasteTotal, metrics.wasteTotal, "Cộng", "DEMO-WASTE"],
  ["RECOVERY", "Chất thải chuyển tái chế", "%", previous.recoveryPct, metrics.recoveryPct, "Tấn tái chế / tổng phát sinh × 100", "DEMO-WASTE"],
  ["MAT-R", "Vật liệu đầu vào tái chế", "%", previous.recycledMaterialsPct, metrics.recycledMaterialsPct, "Khối lượng tái chế / tổng vật liệu × 100", "DEMO-MAT"],
  ["HEADCOUNT", "Nhân viên cuối kỳ", "người", old.employees, current.employees, "Cuối kỳ", "DEMO-HR"],
  ["FEMALE", "Tỷ lệ nữ cuối kỳ", "%", previous.womenPct, metrics.womenPct, "Nữ / nhân viên cuối kỳ × 100", "DEMO-HR"],
  ["TRAIN", "Giờ đào tạo / người cuối kỳ", "giờ/người", previous.trainingHoursPerEmployee, metrics.trainingHoursPerEmployee, "Tổng giờ / nhân viên cuối kỳ", "DEMO-HR"],
  ["INJURY", "Tỷ suất chấn thương ghi nhận", "ca/triệu giờ", previous.injuryRate, metrics.injuryRate, "Ca × 1.000.000 / giờ làm", "DEMO-OHS + DEMO-HR"],
  ["SUP-COVER", "Nhà cung cấp được đánh giá", "%", previous.supplierCoveragePct, metrics.supplierCoveragePct, "Số đánh giá / tổng hoạt động × 100", "DEMO-SUP"],
] as const;
export function exampleSheets(): Sheet[] {
  return [
    { name: "DOC_TRUOC", rows: [[SAMPLE_WARNING], ["Doanh nghiệp", "Công ty Giày Minh Họa (giả định)"], ["Kỳ", 2025], ["Hệ số", "Chỉ để minh họa tính toán; không dùng kiểm kê thực"], ["Bằng chứng", "Mã DEMO là hồ sơ giả định, không có tài liệu nguồn thật"], ["Scope 2 thị trường", "THIẾU — không phải số 0"], ["Scope 3", "Ước tính một phần; không phải toàn bộ Scope 3"]] },
    { name: "KPI_mau", rows: [["Mã", "Tên", "Đơn vị", 2024, 2025, "Tổng hợp", "Mã bằng chứng GIẢ ĐỊNH"], ...exampleKpis.map(row => [...row])] },
    { name: "Du_lieu_thang", rows: [["Kỳ", "Sản lượng đôi", "Điện kWh", "Diesel lít", "LPG kg", "Nước lấy m³", "Nước thải m³"], ...sampleMonths.map(row => [row.period, row.pairs, row.electricityKwh, row.dieselLitres, row.lpgKg, row.waterM3, row.dischargeM3])] },
    { name: "Bang_chung_GIA_DINH", rows: [["Mã", "Tài liệu cần có", "Chủ dữ liệu", "Kiểm tra"], ...evidenceRegistry.map(row => [...row])] },
    { name: "He_so_GIA_DINH", rows: [["Nguồn", "Hệ số", "Đơn vị", "Trạng thái"], ["Điện", illustrativeFactors.electricity, "kgCO2e/kWh", "GIẢ ĐỊNH"], ["Diesel", illustrativeFactors.diesel, "kgCO2e/lít", "GIẢ ĐỊNH"], ["LPG", illustrativeFactors.lpg, "kgCO2e/kg", "GIẢ ĐỊNH"], ["Diesel nhiệt trị", illustrativeFactors.dieselGJ, "GJ/lít", "GIẢ ĐỊNH"], ["LPG nhiệt trị", illustrativeFactors.lpgGJ, "GJ/kg", "GIẢ ĐỊNH"]] },
  ];
}

const UNIT_I18N: Record<string, Record<ReportLang, string>> = {
  "đôi": { vi: "đôi", en: "pairs", zh: "双" },
  "kWh": { vi: "kWh", en: "kWh", zh: "kWh" },
  "kWh/đôi": { vi: "kWh/đôi", en: "kWh/pair", zh: "千瓦时/双" },
  "GJ": { vi: "GJ", en: "GJ", zh: "GJ" },
  "tCO2e": { vi: "tCO2e", en: "tCO2e", zh: "tCO₂e" },
  "kgCO2e/đôi": { vi: "kgCO2e/đôi", en: "kgCO2e/pair", zh: "kgCO₂e/双" },
  "m³": { vi: "m³", en: "m³", zh: "m³" },
  "lít/đôi": { vi: "lít/đôi", en: "litres/pair", zh: "升/双" },
  "tấn": { vi: "tấn", en: "tonnes", zh: "吨" },
  "%": { vi: "%", en: "%", zh: "%" },
  "người": { vi: "người", en: "persons", zh: "人" },
  "giờ/người": { vi: "giờ/người", en: "hours/person", zh: "小时/人" },
  "ca/triệu giờ": { vi: "ca/triệu giờ", en: "cases/million hours", zh: "例/百万工时" },
};
const AGG_I18N: Record<string, Record<ReportLang, string>> = {
  "Cộng": { vi: "Cộng", en: "Sum", zh: "加总" },
  "Tổng điện / tổng đôi": { vi: "Tổng điện / tổng đôi", en: "Total electricity / total pairs", zh: "总电量/总双数" },
  "Quy đổi rồi cộng": { vi: "Quy đổi rồi cộng", en: "Convert then sum", zh: "换算后加总" },
  "Cộng nguồn": { vi: "Cộng nguồn", en: "Sum of sources", zh: "各源加总" },
  "Tổng KNK × 1000 / tổng đôi": { vi: "Tổng KNK × 1000 / tổng đôi", en: "Total GHG × 1000 / total pairs", zh: "温室气体总量×1000/总双数" },
  "Tổng m³ × 1000 / tổng đôi": { vi: "Tổng m³ × 1000 / tổng đôi", en: "Total m³ × 1000 / total pairs", zh: "总m³×1000/总双数" },
  "Tấn tái chế / tổng phát sinh × 100": { vi: "Tấn tái chế / tổng phát sinh × 100", en: "Recycled tonnes / total generated × 100", zh: "回收吨数/产生总量×100" },
  "Khối lượng tái chế / tổng vật liệu × 100": { vi: "Khối lượng tái chế / tổng vật liệu × 100", en: "Recycled mass / total materials × 100", zh: "再生质量/材料总量×100" },
  "Cuối kỳ": { vi: "Cuối kỳ", en: "Year-end", zh: "期末" },
  "Nữ / nhân viên cuối kỳ × 100": { vi: "Nữ / nhân viên cuối kỳ × 100", en: "Women / year-end headcount × 100", zh: "女性/期末员工×100" },
  "Tổng giờ / nhân viên cuối kỳ": { vi: "Tổng giờ / nhân viên cuối kỳ", en: "Total hours / year-end headcount", zh: "总课时/期末员工" },
  "Ca × 1.000.000 / giờ làm": { vi: "Ca × 1.000.000 / giờ làm", en: "Cases × 1,000,000 / hours worked", zh: "例×1,000,000/工时" },
  "Số đánh giá / tổng hoạt động × 100": { vi: "Số đánh giá / tổng hoạt động × 100", en: "Assessed / total active × 100", zh: "已评估数/活跃总数×100" },
};
export function buildExampleReport_placeholder(): string {
  return "";
}
export function buildExampleReport(lang: ReportLang = "vi"): string {
  const locale = lang === "en" ? "en-US" : lang === "zh" ? "zh-CN" : "vi-VN";
  const f = (value: number, digits = 2) => new Intl.NumberFormat(locale, { maximumFractionDigits: digits }).format(value);
  const changeL = (a: number, b: number) => `${f((b / a - 1) * 100)}%`;
  const tableL = (headers: string[], rows: (string | number)[][]) => table(headers, rows);
  const H2 = (key: string) => `## ${rp(lang, key)}`;
  const H3 = (key: string) => `### ${rp(lang, key)}`;
  const crow = (key: string, vars: Record<string, string | number> = {}) => fill(rp(lang, key), vars).split("|");
  const warn = t(lang, "sampleNote");

  const kpiNameKey = (code: string) => `ex_kpi_${code.replace(/-/g, "_")}`;
  const kpiRows = exampleKpis.map((row) => [
    row[0], rp(lang, kpiNameKey(row[0])), UNIT_I18N[row[2]]?.[lang] ?? row[2],
    f(row[3]), f(row[4]), AGG_I18N[row[5]]?.[lang] ?? row[5], row[6],
  ]);

  const profileRows = [1, 2, 3, 4, 5, 6, 7, 8].map((n) =>
    fill(rp(lang, `rpt_11_prow${n}`), { emp: f(current.employees, 0), pairs: f(current.pairs, 0) }).split("|"));

  return `# ${rp(lang, "ex_title")}

**${warn}** ${rp(lang, "ex_intro")}

${H2("rpt_about_h")}

${rp(lang, "rpt_about_welcome")}

${rp(lang, "rpt_about_cycle")}

${rp(lang, "rpt_about_boundary")}

${rp(lang, "rpt_about_period")}

${rp(lang, "ex_01_p3")}

${rp(lang, "rpt_about_restate")}

${rp(lang, "rpt_about_contact")}

${H2("rpt_msg_h")}

${rp(lang, "ex_02_p1")}

${rp(lang, "ex_02_p2")}

${H2("rpt_00_h")}

${rp(lang, "rpt_00_intro")}

${tableL(cells("ex_02_th", lang), [
 [rp(lang, "ex_02_c1"), f(old.pairs, 0), f(current.pairs, 0), rp(lang, "ex_02_r1")],
 [rp(lang, "ex_02_c2"), f(previous.electricityPerPair), f(metrics.electricityPerPair), `${rp(lang, "ex_02_r2_prefix")} ${changeL(previous.electricityPerPair, metrics.electricityPerPair)}`],
 [rp(lang, "ex_02_c3"), f(previous.waterLitresPerPair), f(metrics.waterLitresPerPair), rp(lang, "ex_02_r3")],
 [rp(lang, "ex_02_c4"), f(previous.ghgTotal), f(metrics.ghgTotal), `${rp(lang, "ex_02_r2_prefix")} ${changeL(previous.ghgTotal, metrics.ghgTotal)}; ${rp(lang, "ex_02_r4_suffix")}`],
 [rp(lang, "ex_02_c5"), f(previous.injuryRate), f(metrics.injuryRate), rp(lang, "ex_02_r5")],
 [rp(lang, "ex_02_c6"), "60%", "80%", rp(lang, "ex_02_r6")],
])}

${H2("rpt_1_h")}

${H3("rpt_11_h")}

${tableL(cells("rpt_11_profile_th", lang), profileRows)}

${fill(rp(lang, "ex_03_p1"), { pairs: f(current.pairs, 0), emp: f(current.employees, 0) })}

${rp(lang, "ex_03_p2")}

${fill(rp(lang, "ex_03_p3"), { mat: f(current.materialsT, 0), rmat: f(current.recycledMaterialsT, 0), rpct: f(metrics.recycledMaterialsPct, 0) })}

${rp(lang, "rpt_11_history").split(" | ").map((x) => `- ${x}`).join("\n")}

${H3("rpt_12_h")}

${rp(lang, "rpt_12_strategy")}

${rp(lang, "ex_07_p1")}

${rp(lang, "ex_08_p2")}

${rp(lang, "ex_08_p1")}

${H3("rpt_13_h")}

${rp(lang, "ex_14_p1")}

${rp(lang, "ex_14_p2")}

${rp(lang, "ex_07_p2")}

${rp(lang, "ex_07_p3")}

${rp(lang, "ex_14_p3")}

${H3("rpt_14_h")}

${rp(lang, "ex_06_p1")}

${tableL(cells("ex_06_th", lang), [1, 2, 3, 4, 5, 6, 7].map((n) => [
  rp(lang, `ex_06_t${n}`), rp(lang, `ex_06_t${n}_i`), rp(lang, `ex_06_t${n}_m`), rp(lang, `ex_06_t${n}_e`),
]))}

${rp(lang, "ex_06_p2")}

${H3("rpt_15_h")}

${rp(lang, "ex_05_p1")}

${rp(lang, "ex_05_p2")}

${rp(lang, "ex_05_p3")}

${H2("rpt_2_h")}

${H3("rpt_21_h")}

${tableL(cells("ex_11_th", lang), [
 crow("ex_11_r1"), crow("ex_11_r2"), crow("ex_11_r3"), crow("ex_11_r4"),
 crow("ex_11_r5"), crow("ex_11_r6"),
 crow("ex_11_r7", { a: f(old.trainingHours, 0), b: f(current.trainingHours, 0) }),
 crow("ex_11_r8"),
])}

${H3("rpt_22_h")}

${rp(lang, "rpt_22_text")}

${rp(lang, "ex_11_p1")}

${H3("rpt_23_h")}

${rp(lang, "ex_12_p1")}

${rp(lang, "ex_12_p2")}

${rp(lang, "ex_12_p3")}

${H3("rpt_24_h")}

${rp(lang, "ex_11_p2")}

${H2("rpt_3_h")}

${H3("rpt_31_h")}

${rp(lang, "rpt_31_text")}

${H3("rpt_32_h")}

${rp(lang, "ex_13_p1")}

${rp(lang, "ex_13_p2")}

${H3("rpt_33_h")}

${rp(lang, "rpt_33_text")}

${H2("rpt_4_h")}

${H3("rpt_41_h")}

${rp(lang, "rpt_41_text")}

${H3("rpt_42_h")}

${fill(rp(lang, "ex_09_p1"), { kwh: f(current.electricityKwh, 0), d: f(current.dieselLitres, 0), l: f(current.lpgKg, 0), gj: f(metrics.energyGJ), gj24: f(previous.energyGJ) })}

${tableL(cells("ex_09_th", lang), [
 crow("ex_09_r1"),
 crow("ex_09_r2"),
 crow("ex_09_r3", { a: f(previous.scope1), b: f(metrics.scope1) }),
 crow("ex_09_r4", { a: f(previous.scope2Location), b: f(metrics.scope2Location) }),
 crow("ex_09_r5", { a: f(previous.ghgTotal), b: f(metrics.ghgTotal) }),
 crow("ex_09_r6"),
])}

${fill(rp(lang, "ex_09_p2"), { i: f(metrics.ghgKgPerPair) })}

${rp(lang, "ex_09_p3")}

${tableL(cells("ex_09_s3th", lang), Array.from({ length: 15 }, (_, i) => crow(`ex_09_s3_${i + 1}`)))}

${rp(lang, "ex_09_p4")}

${H3("rpt_43_h")}

${fill(rp(lang, "ex_10_p1"), { w: f(current.waterM3, 0), d: f(current.dischargeM3, 0), c: f(metrics.waterConsumedM3, 0) })}

${fill(rp(lang, "ex_10_p2"), { i: f(metrics.waterLitresPerPair, 1) })}

${tableL(cells("ex_10_th", lang), [
 crow("ex_10_r1"), crow("ex_10_r2"), crow("ex_10_r3"),
 crow("ex_10_r4", { a: f(previous.wasteTotal, 0), b: f(metrics.wasteTotal, 0) }),
])}

${fill(rp(lang, "ex_10_p3"), { chg: changeL(previous.wasteTotal, metrics.wasteTotal), i24: f(previous.wasteKgPerPair, 4), i25: f(metrics.wasteKgPerPair, 4) })}

${rp(lang, "ex_10_p4")}

${rp(lang, "ex_10_p5")}

${H2("rpt_5_h")}

${H3("rpt_51_h")}

${rp(lang, "rpt_51_intro")}

${tableL(cells("ex_08_th", lang), [
 crow("ex_08_r1", { v: f(metrics.electricityPerPair) }),
 crow("ex_08_r2", { v: f(metrics.waterLitresPerPair) }),
 crow("ex_08_r3", { b: f(previous.recoveryPct) }),
 crow("ex_08_r4"),
 crow("ex_08_r5"),
])}

${rp(lang, "ex_08_p3")}

${tableL(cells("ex_16_th", lang), [1, 2, 3, 4, 5].map((n) => crow(`ex_16_r${n}`)))}

${rp(lang, "ex_16_p1")}

${H3("rpt_52_h")}

${rp(lang, "ex_15_p1")}

${tableL(cells("ex_15_th", lang), [1, 2, 3, 4, 5, 6].map((n) => crow(`ex_15_r${n}`)))}

${rp(lang, "ex_15_p2")}

${rp(lang, "ex_15_p3")}

${rp(lang, "ex_15_p4")}

${rp(lang, "ex_04_p2")}

${rp(lang, "ex_04_p3")}

${tableL(cells("ex_04_th", lang), ["ex_04_r1", "ex_04_r2", "ex_04_r3", "ex_04_r4", "ex_04_r5", "ex_04_r6"].map((k) => crow(k)))}

${rp(lang, "ex_04_p4")}

${H2("rpt_pa_h")}

**${warn}** ${rp(lang, "ex_17_p1")}

${tableL(cells("ex_17_th", lang), kpiRows)}

${rp(lang, "ex_17_p2")}

${H2("rpt_pb_h")}

${tableL(cells("ex_18_th", lang), sampleMonths.map((row) => [row.period, f(row.pairs, 0), f(row.electricityKwh, 0), f(row.dieselLitres, 0), f(row.lpgKg, 0), f(row.waterM3, 0), f(row.dischargeM3, 0)]))}

${fill(rp(lang, "ex_18_p1"), { pairs: f(current.pairs, 0), kwh: f(current.electricityKwh, 0), d: f(current.dieselLitres, 0), l: f(current.lpgKg, 0), w: f(current.waterM3, 0), dw: f(current.dischargeM3, 0) })}

${tableL(cells("ex_18_eth", lang), Array.from({ length: 12 }, (_, i) => crow(`ex_ev_${i + 1}`)))}

${rp(lang, "ex_18_p2")}

${H2("rpt_pc_h")}

${rp(lang, "ex_19_p1")}

${tableL(cells("ex_19_th", lang), Array.from({ length: 18 }, (_, i) => crow(`ex_19_${i + 1}`)))}

${rp(lang, "ex_19_p2")}

${H2("rpt_pd_h")}

1. ${rp(lang, "ex_20_l1")}
2. ${rp(lang, "ex_20_l2")}
3. ${rp(lang, "ex_20_l3")}
4. ${rp(lang, "ex_20_l4")}
5. ${rp(lang, "ex_20_l5")}

${rp(lang, "ex_20_src")}

**${warn}**
`;
}
