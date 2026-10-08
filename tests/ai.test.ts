import { describe, expect, it } from "vitest";
import { AI_DISCLAIMER, normalizeTinyfishResults } from "../src/ai";

describe("normalizeTinyfishResults", () => {
  it("trích results dạng chuẩn", () => {
    const data = { results: [{ title: "A", url: "https://a.vn/x", snippet: "mô tả" }] };
    expect(normalizeTinyfishResults(data)).toEqual([{ title: "A", url: "https://a.vn/x", snippet: "mô tả" }]);
  });
  it("chịu được các shape khác nhau và giới hạn 6 kết quả", () => {
    const items = Array.from({ length: 10 }, (_, i) => ({ name: `T${i}`, link: `https://x.vn/${i}`, description: "d" }));
    const out = normalizeTinyfishResults({ items });
    expect(out).toHaveLength(6);
    expect(out[0]).toEqual({ title: "T0", url: "https://x.vn/0", snippet: "d" });
  });
  it("bỏ qua item thiếu url hợp lệ", () => {
    const out = normalizeTinyfishResults({ results: [{ title: "x" }, { title: "y", url: "nota-url" }] });
    expect(out).toEqual([]);
  });
  it("trả về mảng rỗng khi dữ liệu lạ", () => {
    expect(normalizeTinyfishResults(null)).toEqual([]);
    expect(normalizeTinyfishResults("chuỗi")).toEqual([]);
    expect(normalizeTinyfishResults({})).toEqual([]);
  });
  it("có câu miễn trừ trách nhiệm cho kết quả web", () => {
    expect(AI_DISCLAIMER).toContain("soát xét");
  });
});
