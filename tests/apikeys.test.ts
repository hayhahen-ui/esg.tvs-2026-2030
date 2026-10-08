import { describe, expect, it } from "vitest";
import { apiKeyStore, createKeyStore, createModelStore, maskKey, DEFAULT_DECIDE_MODEL } from "../src/apiKeys";
import { DEFAULT_AI_MODEL } from "../src/ai";

function memStore() {
  const m = new Map<string, string>();
  return {
    getItem: (k: string) => m.get(k) ?? null,
    setItem: (k: string, v: string) => { m.set(k, v); },
    removeItem: (k: string) => { m.delete(k); },
  };
}

describe("apiKeyStore", () => {
  it("lưu / đọc / xóa key", () => {
    const store = createKeyStore(memStore());
    expect(store.load()).toEqual({ tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL, decideModel: DEFAULT_DECIDE_MODEL });
    store.save({ tinyfish: "  sk-tf-1234  ", explabs: "xpl-9999", model: "claude-haiku-5.5", decideModel: "gpt-6-luna-decisions" });
    expect(store.load()).toEqual({ tinyfish: "sk-tf-1234", explabs: "xpl-9999", model: "claude-haiku-5.5", decideModel: "gpt-6-luna-decisions" });
    store.clear();
    expect(store.load()).toEqual({ tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL, decideModel: DEFAULT_DECIDE_MODEL });
  });
  it("chịu được dữ liệu hỏng", () => {
    const s = memStore();
    s.setItem("esg_api_keys_v1", "không phải json{{{");
    expect(createKeyStore(s).load()).toEqual({ tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL, decideModel: DEFAULT_DECIDE_MODEL });
  });
  it("model lạ → fallback về mặc định", () => {
    const s = memStore();
    s.setItem("esg_api_keys_v1", JSON.stringify({ tinyfish: "", explabs: "", model: "gpt-xxx", decideModel: "xấu!" }));
    expect(createKeyStore(s).load().decideModel).toBe(DEFAULT_DECIDE_MODEL);
    expect(createKeyStore(s).load().model).toBe(DEFAULT_AI_MODEL);
  });
  it("maskKey che phần đầu, chừa 4 ký tự cuối", () => {
    expect(maskKey("")).toBe("");
    expect(maskKey("sk-tinyfish-1g0lLloQ")).toBe("••••••LloQ");
  });
  it("apiKeyStore mặc định không ném lỗi khi không có window", () => {
    expect(() => apiKeyStore.load()).not.toThrow();
  });
});

describe("customModelStore", () => {
  it("thêm / liệt kê / xóa model", () => {
    const store = createModelStore(memStore());
    expect(store.load()).toEqual([]);
    expect(store.add({ id: "claude-sonnet-4.5", label: "Sonnet" }).ok).toBe(true);
    expect(store.load()).toEqual([{ id: "claude-sonnet-4.5", label: "Sonnet" }]);
    store.remove("claude-sonnet-4.5");
    expect(store.load()).toEqual([]);
  });
  it("từ chối tên không hợp lệ và trùng", () => {
    const store = createModelStore(memStore());
    expect(store.add({ id: "bad model!", label: "" }).ok).toBe(false);
    expect(store.add({ id: "", label: "" }).ok).toBe(false);
    expect(store.add({ id: "claude-haiku-5.5", label: "" }, ["claude-haiku-5.5"]).ok).toBe(false);
    store.add({ id: "m1", label: "" });
    expect(store.add({ id: "m1", label: "" }).ok).toBe(false);
  });
  it("lọc bỏ model hỏng khi đọc", () => {
    const s = memStore();
    s.setItem("esg_custom_models_v1", JSON.stringify([{ id: "ok-model", label: "OK" }, { id: "xấu!", label: "X" }, "chuỗi"]));
    expect(createModelStore(s).load()).toEqual([{ id: "ok-model", label: "OK" }]);
  });
});
