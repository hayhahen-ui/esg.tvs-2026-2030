import { useEffect, useState } from "react";
import { apiKeyStore, maskKey } from "./apiKeys";
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

  useEffect(() => {
    fetch("/api/ai-chat")
      .then((r) => r.json())
      .then((d: { models?: ChatModel[] }) => {
        if (Array.isArray(d.models) && d.models.length) setModels(d.models);
      })
      .catch(() => { /* dùng danh sách mặc định */ });
  }, []);

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
      const r = await fetch(field.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ping", apiKey }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; count?: number; model?: string; error?: string; status?: number };
      if (d.ok) {
        setTestMsg((m) => ({ ...m, [which]: `✅ Kết nối OK${d.count !== undefined ? ` (thử tìm: ${d.count} kết quả)` : ""}${d.model ? ` · model ${d.model}` : ""}` }));
      } else {
        setTestMsg((m) => ({ ...m, [which]: `❌ Lỗi: ${d.error ?? "không rõ"}${d.status ? ` (mã ${d.status})` : ""} — kiểm tra lại key.` }));
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
        <p className="text-small text-secondary" style={{ margin: "0 0 10px" }}>Model dùng cho nút “✨ Diễn giải bằng AI” trong chatbot. Danh sách do server cung cấp.</p>
        <label className="field" style={{ maxWidth: 360 }}>
          <span className="text-label">Chọn model</span>
          <select className="input" value={keys.model} onChange={(e) => setKeys((k) => ({ ...k, model: e.target.value }))} aria-label="Chọn model AI">
            {models.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
          </select>
        </label>
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
