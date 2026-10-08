import { describe, expect, it } from "vitest";
import {
  AI_DISCLAIMER, AI_GENERATED_DISCLAIMER, AI_MODELS, AI_SYSTEM_PROMPT,
  DEFAULT_AI_MODEL, buildChatMessages, isAllowedModel, normalizeTinyfishResults,
} from "../src/ai";

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

describe("AI model allowlist", () => {
  it("chỉ cho phép model trong danh sách", () => {
    expect(isAllowedModel("claude-haiku-5.5")).toBe(true);
    expect(isAllowedModel("gpt-4")).toBe(false);
    expect(isAllowedModel("")).toBe(false);
  });
  it("model mặc định nằm trong danh sách", () => {
    expect(AI_MODELS.length).toBeGreaterThan(0);
    expect(isAllowedModel(DEFAULT_AI_MODEL)).toBe(true);
  });
});

describe("buildChatMessages", () => {
  it("ghép system prompt + ngữ cảnh + câu hỏi", () => {
    const msgs = buildChatMessages("scope 3 là gì?", "Scope 3: phát thải gián tiếp chuỗi giá trị.");
    expect(msgs[0]).toEqual({ role: "system", content: AI_SYSTEM_PROMPT });
    expect(msgs[1].role).toBe("user");
    expect(msgs[1].content).toContain("scope 3 là gì?");
    expect(msgs[1].content).toContain("Scope 3: phát thải gián tiếp");
  });
  it("chịu được ngữ cảnh rỗng", () => {
    const msgs = buildChatMessages("xin chào", "");
    expect(msgs).toHaveLength(2);
    expect(msgs[1].content).toContain("xin chào");
  });
  it("có câu miễn trừ cho nội dung AI tạo", () => {
    expect(AI_GENERATED_DISCLAIMER).toContain("soát xét");
  });
});

describe("isDecisionsModel", () => {
  it("nhận diện model decisions theo đuôi -decisions", async () => {
    const { isDecisionsModel } = await import("../src/ai");
    expect(isDecisionsModel("gpt-6-luna-decisions")).toBe(true);
    expect(isDecisionsModel("GPT-6-LUNA-DECISIONS")).toBe(true);
    expect(isDecisionsModel("claude-haiku-5.5")).toBe(false);
    expect(isDecisionsModel("qwen3.8-27b-uncensored")).toBe(false);
    expect(isDecisionsModel("")).toBe(false);
  });
});

describe("decisions helpers", () => {
  it("buildDecideQuestion trả 1 câu hỏi choice hợp lệ", async () => {
    const { buildDecideQuestion } = await import("../src/ai");
    const qs = buildDecideQuestion();
    expect(qs).toHaveLength(1);
    expect(qs[0].type).toBe("choice");
    expect(qs[0].choices.length).toBeGreaterThanOrEqual(2);
  });
  it("formatDecideAnswers định dạng verdict + xác suất", async () => {
    const { buildDecideQuestion, formatDecideAnswers } = await import("../src/ai");
    const qs = buildDecideQuestion();
    const text = formatDecideAnswers([{
      name: "danhgia", choice: "can_kiem_chung", confidence: 0.8,
      probabilities: [
        { value: "dang_tham_khao", probability: 0.15 },
        { value: "can_kiem_chung", probability: 0.8 },
        { value: "khong_phu_hop", probability: 0.05 },
      ],
    }], qs, "gpt-6-luna-decisions");
    expect(text).toContain("⚖️ Đánh giá bằng AI (gpt-6-luna-decisions)");
    expect(text).toContain("80%");
    expect(text).toContain("Chưa đủ cơ sở");
  });
});
