import { describe, expect, it } from "vitest";
import { allKeys, fmtNum, hasKey, monthName, t, type ReportLang } from "../src/reportI18n";
import { splitSections } from "../src/reportTranslate";
import { exampleYears, sampleMetrics, sampleMonths } from "../src/reportExample";

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

describe("reportTranslate.splitSections", () => {
  it("chia theo tiêu đề ##", () => {
    const md = "# Tiêu đề\nMở đầu.\n\n## Chương 1\nNội dung 1.\n\n## Chương 2\nNội dung 2.";
    const parts = splitSections(md);
    expect(parts).toHaveLength(3);
    expect(parts[1]).toMatch(/^## Chương 1/);
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
