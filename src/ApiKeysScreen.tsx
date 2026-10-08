import { useEffect, useState } from "react";
import { apiKeyStore, customModelStore, maskKey } from "./apiKeys";
import { AI_MODELS, DEFAULT_AI_MODEL, type ChatModel } from "./ai";

type Which = "tinyfish" | "explabs";

const FIELDS: Array<{ id: Which; label: string; desc: string; endpoint: string }> = [
  { id: "tinyfish", label: "TinyFish API Key", desc: "Dùng cho nút “🔍 Tìm trên web” trong chatbot. Search API hiện miễn phí.", endpoint: "/api/qa-search" },
  { id: "explabs", label: "Experiential Labs API Key", desc: "Dùng cho nút “✨ Diễn giải bằng AI” (model Claude Haiku 5.5).", endpoint: "/api/ai-chat" },
];

export default function ApiKeysScreen() {
  const [keys, setKeys] = useState(apiKeyStore.load());
  const [savedTick, setSavedTick] = useState(false);
  const [testing, setTesting] = useState<Which | null>(null);
  const [testMsg, setTestMsg] = useState<Record<string, string>>({});
  const [models, setModels] = useState<ChatModel[]>(AI_MODELS);
  const [customModels, setCustomModels] = useState(() => customModelStore.load());
  const [newModelId, setNewModelId] = useState("");
  const [newModelLabel, setNewModelLabel] = useState("");
  const [modelMsg, setModelMsg] = useState("");

  useEffect(() => {
    fetch("/api/ai-chat")
      .then((r) => r.json())
      .then((d: { models?: ChatModel[] }) => {
        if (Array.isArray(d.models) && d.models.length) setModels(d.models);
      })
      .catch(() => { /* dùng danh sách mặc định */ });
  }, []);

  const allModels: ChatModel[] = [
    ...models,
    ...customModels.filter((c) => !models.some((m) => m.id === c.id)),
  ];

  const addModel = () => {
    const r = customModelStore.add(
      { id: newModelId, label: newModelLabel },
      models.map((m) => m.id),
    );
    if (!r.ok) {
      setModelMsg(`❌ ${r.error}`);
      return;
    }
    setCustomModels(customModelStore.load());
    setKeys((k) => ({ ...k, model: newModelId.trim() }));
    setNewModelId("");
    setNewModelLabel("");
    setModelMsg("✅ Đã thêm model.");
  };

  const removeModel = (id: string) => {
    customModelStore.remove(id);
    setCustomModels(customModelStore.load());
    setKeys((k) => (k.model === id ? { ...k, model: DEFAULT_AI_MODEL } : k));
  };

  const save = () => {
    apiKeyStore.save(keys);
    setSavedTick(true);
    setTimeout(() => setSavedTick(false), 2500);
  };
  const clearAll = () => {
    apiKeyStore.clear();
    setKeys({ tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL });
    setTestMsg({});
  };

  const test = async (which: Which) => {
    const field = FIELDS.find((f) => f.id === which)!;
    const apiKey = keys[which].trim();
    if (!apiKey) {
      setTestMsg((m) => ({ ...m, [which]: "Chưa nhập key." }));
      return;
    }
    setTesting(which);
    try {
      const payload = which === "explabs"
        ? { action: "ping", apiKey, model: keys.model }
        : { action: "ping", apiKey };
      const r = await fetch(field.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; count?: number; model?: string; error?: string; status?: number };
      if (d.ok) {
        setTestMsg((m) => ({ ...m, [which]: `✅ Kết nối OK${d.count !== undefined ? ` (thử tìm: ${d.count} kết quả)` : ""}${d.model ? ` · model ${d.model}` : ""}` }));
      } else {
        const hint = d.status === 503
          ? "model này chưa được triển khai phía nhà cung cấp — thử model khác hoặc hỏi nhà cung cấp."
          : d.status === 401 || d.status === 403
            ? "kiểm tra lại key."
            : d.status === 429
              ? "bị giới hạn tốc độ — đợi một lúc rồi thử lại."
              : "kiểm tra lại key.";
        setTestMsg((m) => ({ ...m, [which]: `❌ Lỗi: ${d.error ?? "không rõ"}${d.status ? ` (mã ${d.status})` : ""} — ${hint}` }));
      }
    } catch {
      setTestMsg((m) => ({ ...m, [which]: "❌ Không kết nối được server, thử lại sau." }));
    } finally {
      setTesting(null);
    }
  };

  return (
    <section className="screen">
      <header className="screen-head">
        <div>
          <h2>Cài đặt API</h2>
          <p className="text-secondary">Nhập API key để bật “Tìm trên web” và “Diễn giải bằng AI” trong chatbot hỏi đáp. Key chỉ lưu trên trình duyệt này.</p>
        </div>
      </header>

      <div className="card sandbox-banner" role="note">
        <strong>Lưu ý bảo mật</strong>
        <p>Key lưu trong bộ nhớ trình duyệt của máy này (localStorage) — không dùng trên máy dùng chung.
        Muốn mọi người dùng chung dùng được: quản trị viên đặt biến môi trường <code>TINYFISH_API_KEY</code> / <code>EXPLABS_API_KEY</code> trên Vercel (xem docs/CHATBOT_AI.md). Key nhập ở đây được ưu tiên thấp hơn biến môi trường.</p>
      </div>

      <div className="card">
        <h3 style={{ margin: "0 0 4px" }}>Model AI</h3>
        <p className="text-small text-secondary" style={{ margin: "0 0 10px" }}>Model dùng cho nút “✨ Diễn giải bằng AI” trong chatbot. Danh sách do server cung cấp; bạn có thể tự thêm model khác bên dưới.</p>
        <label className="field" style={{ maxWidth: 360 }}>
          <span className="text-label">Chọn model</span>
          <select className="input" value={keys.model} onChange={(e) => setKeys((k) => ({ ...k, model: e.target.value }))} aria-label="Chọn model AI">
            {allModels.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </label>
        <div className="row wrap gap" style={{ marginTop: 10 }}>
          <input
            className="input" style={{ maxWidth: 280 }} placeholder="Nhập tên model, vd: claude-sonnet-4.5"
            value={newModelId} onChange={(e) => setNewModelId(e.target.value)} aria-label="Tên model tùy chỉnh"
          />
          <input
            className="input" style={{ maxWidth: 220 }} placeholder="Tên hiển thị (tùy chọn)"
            value={newModelLabel} onChange={(e) => setNewModelLabel(e.target.value)} aria-label="Tên hiển thị model"
          />
          <button className="button" disabled={!newModelId.trim()} onClick={addModel}>+ Thêm model</button>
        </div>
        {modelMsg && <p className="text-small" role="status" style={{ marginTop: 8 }}>{modelMsg}</p>}
        {customModels.length > 0 && (
          <div className="row wrap gap chips" style={{ marginTop: 8 }}>
            {customModels.map((c) => (
              <span key={c.id} className="chip" title={c.id}>{c.label}
                <button
                  onClick={() => removeModel(c.id)} aria-label={`Xóa model ${c.id}`}
                  style={{ background: "none", border: 0, cursor: "pointer", marginLeft: 6, color: "inherit" }}>✕</button>
              </span>
            ))}
          </div>
        )}
      </div>

      {FIELDS.map((f) => {
        const stored = apiKeyStore.load()[f.id];
        return (
          <div className="card" key={f.id}>
            <h3 style={{ margin: "0 0 4px" }}>{f.label}</h3>
            <p className="text-small text-secondary" style={{ margin: "0 0 10px" }}>{f.desc}</p>
            <label className="field">
              <span className="text-label">API key {stored ? `(đã lưu: ${maskKey(stored)})` : "(chưa nhập)"}</span>
              <input
                className="input" type="password" autoComplete="off" spellCheck={false}
                placeholder={stored ? "Nhập key mới để thay thế…" : "Dán API key vào đây…"}
                value={keys[f.id]}
                onChange={(e) => setKeys((k) => ({ ...k, [f.id]: e.target.value }))}
              />
            </label>
            <div className="row wrap gap" style={{ marginTop: 10 }}>
              <button className="button" disabled={testing !== null || !keys[f.id].trim()} onClick={() => test(f.id)}>
                {testing === f.id ? "Đang kiểm tra…" : "Kiểm tra kết nối"}
              </button>
            </div>
            {testMsg[f.id] && <p className="text-small" role="status" style={{ marginTop: 8 }}>{testMsg[f.id]}</p>}
          </div>
        );
      })}

      <div className="row wrap gap">
        <button className="button button-primary" onClick={save}>{savedTick ? "Đã lưu ✓" : "Lưu key"}</button>
        <button className="button" onClick={clearAll}>Xóa hết key đã lưu</button>
      </div>
    </section>
  );
}
