// Lưu API key trên trình duyệt (localStorage) — tiện cho quản trị viên nhập nhanh
// mà không cần vào Vercel. Key chỉ dùng để gọi proxy cùng origin; môi trường
// production cho nhiều người dùng vẫn nên đặt biến môi trường trên Vercel.

export interface ApiKeySet { tinyfish: string; explabs: string }

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
      try {
        const raw = storage.getItem(STORAGE_KEY);
        if (!raw) return { tinyfish: "", explabs: "" };
        const p = JSON.parse(raw) as Partial<ApiKeySet>;
        return { tinyfish: String(p.tinyfish ?? ""), explabs: String(p.explabs ?? "") };
      } catch {
        return { tinyfish: "", explabs: "" };
      }
    },
    save(keys: ApiKeySet): void {
      storage.setItem(STORAGE_KEY, JSON.stringify({ tinyfish: keys.tinyfish.trim(), explabs: keys.explabs.trim() }));
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
