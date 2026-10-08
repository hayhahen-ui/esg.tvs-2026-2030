// Lưu API key trên trình duyệt (localStorage) — tiện cho quản trị viên nhập nhanh
// mà không cần vào Vercel. Key chỉ dùng để gọi proxy cùng origin; môi trường
// production cho nhiều người dùng vẫn nên đặt biến môi trường trên Vercel.

import { DEFAULT_AI_MODEL, isAllowedModel } from "./ai";

export interface ApiKeySet { tinyfish: string; explabs: string; model: string }

const STORAGE_KEY = "esg_api_keys_v1";

export function maskKey(key: string): string {
  if (!key) return "";
  return `••••••${key.slice(-4)}`;
}

export interface SimpleStorage {
  getItem: (k: string) => string | null;
  setItem: (k: string, v: string) => void;
  removeItem: (k: string) => void;
}

export function createKeyStore(storage: SimpleStorage) {
  return {
    load(): ApiKeySet {
      const empty = { tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL };
      try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return empty;
        const p = JSON.parse(raw) as Partial<ApiKeySet>;
        const model = String(p.model ?? DEFAULT_AI_MODEL);
        return {
          tinyfish: String(p.tinyfish ?? ""),
          explabs: String(p.explabs ?? ""),
          model: isAllowedModel(model) ? model : DEFAULT_AI_MODEL,
        };
      } catch {
        return empty;
      }
    },
    save(keys: ApiKeySet): void {
      const model = isAllowedModel(keys.model) ? keys.model : DEFAULT_AI_MODEL;
      storage.setItem(STORAGE_KEY, JSON.stringify({ tinyfish: keys.tinyfish.trim(), explabs: keys.explabs.trim(), model }));
    },
    clear(): void {
      storage.removeItem(STORAGE_KEY);
    },
  };
}

function browserStorage(): SimpleStorage {
  if (typeof window !== "undefined" && window.localStorage) return window.localStorage;
  const mem = new Map<string, string>();
  return {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => { mem.set(k, v); },
    removeItem: (k) => { mem.delete(k); },
  };
}

export const apiKeyStore = createKeyStore(browserStorage());
