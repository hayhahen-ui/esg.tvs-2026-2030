import { describe, expect, it } from "vitest";
import { allKeys, fmtNum, hasKey, monthName, t, type ReportLang } from "../src/reportI18n";
import { allProseKeys, cells, fill, hasProseKey, rp } from "../src/reportProse";
import { exampleYears, sampleMetrics, sampleMonths, buildExampleReport } from "../src/reportExample";

const LANGS: ReportLang[] = ["vi", "en", "zh"];

describe("reportI18n", () => {
  it("mọi key có đủ 3 ngôn ngữ, không rỗng", () => {
    for (const key of allKeys()) {
      for (const lang of LANGS) {
        const v = t(lang, key);
        expect(v, `${key}/${lang}`).toBeTruthy();
        expect(v).not.toBe(key);
      }
    }
  });
  it("hasKey hoạt động", () => {
    expect(hasKey("chGhgTitle")).toBe(true);
    expect(hasKey("khong_co_key_nay")).toBe(false);
  });
  it("t() fallback về tiếng Việt khi key lạ", () => {
    expect(t("en", "key_khong_ton_tai_xyz")).toBe("key_khong_ton_tai_xyz");
  });
  it("monthName 3 ngôn ngữ", () => {
    expect(monthName("vi", 0)).toBe("T1");
    expect(monthName("en", 0)).toBe("Jan");
    expect(monthName("zh", 11)).toBe("12月");
  });
  it("fmtNum định dạng theo locale", () => {
    expect(fmtNum("vi", 1234567.89, 2)).toContain("1.234.567");
    expect(fmtNum("en", 1234567.89, 2)).toContain("1,234,567");
  });
});

describe("reportProse", () => {
  it("mọi key văn bản có đủ 3 ngôn ngữ, không rỗng", () => {
    for (const key of allProseKeys()) {
      for (const lang of LANGS) {
        const v = rp(lang, key);
        expect(v, `${key}/${lang}`).toBeTruthy();
        expect(v).not.toBe(key);
      }
    }
  });
  it("hasProseKey hoạt động", () => {
    expect(hasProseKey("ex_01_h")).toBe(true);
    expect(hasProseKey("khong_co")).toBe(false);
  });
  it("fill() điền placeholder", () => {
    expect(fill("a {x} b {y}", { x: 1, y: "z" })).toBe("a 1 b z");
  });
  it("cells() tách hàng bảng", () => {
    expect(cells("ex_02_th", "vi")).toEqual(["Chỉ tiêu", "2024", "2025", "Nhận xét"]);
    expect(cells("ex_02_th", "en")).toEqual(["Indicator", "2024", "2025", "Remarks"]);
  });
});

describe("buildExampleReport đa ngôn ngữ", () => {
  const langs: ReportLang[] = ["vi", "en", "zh"];
  it("3 bản đều đủ 12 chương Eclat, không sót placeholder/key", () => {
    for (const lang of langs) {
      const md = buildExampleReport(lang);
      expect(md.split("\n## ").length - 1, lang).toBe(12);
      expect(md, lang).not.toMatch(/\{[a-z]+\}/);
      expect(md, lang).not.toContain("ex_");
      expect(md, lang).toContain("SUP-COVER");
      expect(md, lang).toContain("2025-12");
    }
  });
  it("tiêu đề và số theo locale", () => {
    expect(buildExampleReport("en")).toContain("2025 ESG Report");
    expect(buildExampleReport("zh")).toContain("2025年ESG报告");
    expect(buildExampleReport("en")).toContain("2,400,000");
    expect(buildExampleReport("vi")).toContain("2.400.000");
  });
  it("mặc định là tiếng Việt (tương thích cũ)", () => {
    expect(buildExampleReport()).toBe(buildExampleReport("vi"));
  });
});

describe("dữ liệu mẫu cho biểu đồ", () => {
  it("sampleMetrics nhất quán", () => {
    const [y24, y25] = exampleYears;
    const m24 = sampleMetrics(y24);
    const m25 = sampleMetrics(y25);
    expect(m24.ghgTotal).toBeCloseTo(m24.scope1 + m24.scope2Location, 6);
    expect(m25.ghgTotal).toBeCloseTo(m25.scope1 + m25.scope2Location, 6);
    // mẫu 2025 cải thiện so với 2024
    expect(m25.electricityPerPair).toBeLessThan(m24.electricityPerPair);
    expect(m25.ghgKgPerPair).toBeLessThan(m24.ghgKgPerPair);
  });
  it("12 tháng dữ liệu điện", () => {
    expect(sampleMonths).toHaveLength(12);
    expect(sampleMonths.every((m) => m.electricityKwh > 0)).toBe(true);
  });
});

describe("buildEclatPrintHtml", () => {
  it("tạo HTML in kiểu Eclat đủ 3 ngôn ngữ", async () => {
    const { buildEclatPrintHtml } = await import("../src/reportPrint");
    for (const lang of ["vi", "en", "zh"] as const) {
      const html = buildEclatPrintHtml(lang, "Test", buildExampleReport(lang));
      expect(html).toContain("@page");
      expect(html).toContain("chap-0");
      expect(html).toContain("chap-11");
      expect(html).toContain("<table>");
    }
    const zh = buildEclatPrintHtml("zh", "T", buildExampleReport("zh"));
    expect(zh).toContain("第 1 章");
    const en = buildEclatPrintHtml("en", "T", buildExampleReport("en"));
    expect(en).toContain("CHAPTER 1");
  });
});
