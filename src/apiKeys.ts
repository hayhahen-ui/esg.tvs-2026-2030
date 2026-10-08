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

// --- Model tùy chỉnh do người dùng tự nhập ---

export interface CustomModel { id: string; label: string }

const MODELS_KEY = "esg_custom_models_v1";

/** Tên model hợp lệ: chữ/số và . - _ / : , tối đa 80 ký tự. Server kiểm tra lại bằng regex này. */
export const MODEL_ID_RE = /^[A-Za-z0-9][A-Za-z0-9._\-/:]{0,79}$/;

export function createModelStore(storage: SimpleStorage) {
  const api = {
    load(): CustomModel[] {
      try {
        const raw = storage.getItem(MODELS_KEY);
        if (!raw) return [];
        const arr: unknown = JSON.parse(raw);
        if (!Array.isArray(arr)) return [];
        return arr
          .filter((m): m is Record<string, unknown> => !!m && typeof m === "object" && MODEL_ID_RE.test(String((m as Record<string, unknown>).id ?? "")))
          .map((m) => ({ id: String(m.id), label: String(m.label || m.id) }));
      } catch {
        return [];
      }
    },
    add(model: CustomModel, reservedIds: string[] = []): { ok: boolean; error?: string } {
      const id = model.id.trim();
      if (!MODEL_ID_RE.test(id)) {
        return { ok: false, error: "Tên model không hợp lệ (chỉ gồm chữ, số và . - _ / : , tối đa 80 ký tự)." };
      }
      if (reservedIds.includes(id)) return { ok: false, error: "Model này đã có sẵn trong danh sách." };
      const list = api.load();
      if (list.some((m) => m.id === id)) return { ok: false, error: "Model đã có trong danh sách." };
      list.push({ id, label: model.label.trim() || id });
      storage.setItem(MODELS_KEY, JSON.stringify(list));
      return { ok: true };
    },
    remove(id: string): void {
      storage.setItem(MODELS_KEY, JSON.stringify(api.load().filter((m) => m.id !== id)));
    },
  };
  return api;
}

export const customModelStore = createModelStore(browserStorage());
