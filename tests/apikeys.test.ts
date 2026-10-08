import { describe, expect, it } from "vitest";
import { apiKeyStore, createKeyStore, maskKey } from "../src/apiKeys";

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
    expect(store.load()).toEqual({ tinyfish: "", explabs: "" });
    store.save({ tinyfish: "  sk-tf-1234  ", explabs: "xpl-9999" });
    expect(store.load()).toEqual({ tinyfish: "sk-tf-1234", explabs: "xpl-9999" });
    store.clear();
    expect(store.load()).toEqual({ tinyfish: "", explabs: "" });
  });
  it("chịu được dữ liệu hỏng", () => {
    const s = memStore();
    s.setItem("esg_api_keys_v1", "không phải json{{{");
    expect(createKeyStore(s).load()).toEqual({ tinyfish: "", explabs: "" });
  });
  it("maskKey che phần đầu, chừa 4 ký tự cuối", () => {
    expect(maskKey("")).toBe("");
    expect(maskKey("sk-tinyfish-1g0lLloQ")).toBe("••••••LloQ");
  });
  it("apiKeyStore mặc định không ném lỗi khi không có window", () => {
    expect(() => apiKeyStore.load()).not.toThrow();
  });
});
