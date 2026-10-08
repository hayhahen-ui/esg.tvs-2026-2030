import { useEffect, useState } from "react";
import { apiKeyStore, customModelStore, maskKey, DEFAULT_DECIDE_MODEL } from "./apiKeys";
import { AI_MODELS, DEFAULT_AI_MODEL, isDecisionsModel, type ChatModel } from "./ai";

type Which = "tinyfish" | "explabs";

const FIELDS: Array<{ id: Which; label: string; desc: string; endpoint: string }> = [
  { id: "tinyfish", label: "TinyFish API Key", desc: "Dùng cho nút “🔍 Tìm trên web” trong chatbot. Search API hiện miễn phí.", endpoint: "/api/qa-search" },
  { id: "explabs", label: "Experiential Labs API Key", desc: "Dùng cho nút AI trong chatbot. Model decisions (⚖️) tự gọi Decisions API.", endpoint: "/api/ai-chat" },
];

/** Gợi ý theo mã lỗi khi kiểm tra kết nối thất bại. */
function hintFor(d: { error?: string; status?: number }): string {
  if (d.error === "decisions_model") return "model decisions chỉ dùng ở thẻ Decisions API bên dưới (/api/ai-decide), không dùng cho chat.";
  if (d.status === 503) return "model này chưa được triển khai phía nhà cung cấp — thử model khác hoặc hỏi nhà cung cấp.";
  if (d.status === 401 || d.status === 403) return "kiểm tra lại key.";
  if (d.status === 429) return "bị giới hạn tốc độ — đợi một lúc rồi thử lại.";
  if (d.error === "empty_reply") return "máy chủ trả về rỗng — thử lại.";
  return "kiểm tra lại key.";
}

/** Các model decisions đã biết (dùng cho gợi ý ở thẻ Decisions API). */
const KNOWN_DECIDE_MODELS = ["gpt-6-luna-decisions"];

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
  const [decideTesting, setDecideTesting] = useState(false);
  const [decideMsg, setDecideMsg] = useState("");

  useEffect(() => {
    fetch("/api/ai-chat")
      .then((r) => r.json())
      .then((d: { models?: ChatModel[] }) => {
        if (Array.isArray(d.models) && d.models.length) setModels(d.models);
      })
      .catch(() => { /* dùng danh sách mặc định */ });
  }, []);

  // Tất cả model (chat + decisions) đều chọn được; model decisions (⚖️) sẽ gọi Decisions API.
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
    setKeys({ tinyfish: "", explabs: "", model: DEFAULT_AI_MODEL, decideModel: DEFAULT_DECIDE_MODEL });
    setTestMsg({});
    setDecideMsg("");
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
      // Smart routing: model decisions → test qua Decisions API, model chat → qua chat API.
      const useDecide = which === "explabs" && isDecisionsModel(keys.model);
      const endpoint = useDecide ? "/api/ai-decide" : field.endpoint;
      const payload = which === "tinyfish"
        ? { action: "ping", apiKey }
        : { action: "ping", apiKey, model: keys.model };
      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; count?: number; model?: string; error?: string; status?: number };
      if (d.ok) {
        setTestMsg((m) => ({ ...m, [which]: `✅ Kết nối OK${d.count !== undefined ? ` (thử tìm: ${d.count} kết quả)` : ""}${d.model ? ` · model ${d.model}` : ""}` }));
      } else {
        setTestMsg((m) => ({ ...m, [which]: `❌ Lỗi: ${d.error ?? "không rõ"}${d.status ? ` (mã ${d.status})` : ""} — ${hintFor(d)}` }));
      }
    } catch {
      setTestMsg((m) => ({ ...m, [which]: "❌ Không kết nối được server, thử lại sau." }));
    } finally {
      setTesting(null);
    }
  };

  const testDecide = async () => {
    const apiKey = keys.explabs.trim();
    if (!apiKey) {
      setDecideMsg("Chưa nhập Experiential Labs API key ở trên.");
      return;
    }
    const model = keys.decideModel.trim() || DEFAULT_DECIDE_MODEL;
    setDecideTesting(true);
    setDecideMsg("");
    try {
      const r = await fetch("/api/ai-decide", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "ping", apiKey, model }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean; model?: string; error?: string; status?: number };
      if (d.ok) {
        setDecideMsg(`✅ Kết nối OK · model ${d.model ?? model}`);
      } else {
        setDecideMsg(`❌ Lỗi: ${d.error ?? "không rõ"}${d.status ? ` (mã ${d.status})` : ""} — ${hintFor(d)}`);
      }
    } catch {
      setDecideMsg("❌ Không kết nối được server, thử lại sau.");
    } finally {
      setDecideTesting(false);
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
        <p className="text-small text-secondary" style={{ margin: "0 0 10px" }}>Model dùng cho nút AI trong chatbot. Model có ⚖️ là model decisions — nút AI sẽ gọi Decisions API để đánh giá có cấu trúc thay vì diễn giải chat.</p>
        <label className="field" style={{ maxWidth: 360 }}>
          <span className="text-label">Chọn model</span>
          <select className="input" value={keys.model} onChange={(e) => setKeys((k) => ({ ...k, model: e.target.value }))} aria-label="Chọn model AI">
            {allModels.map((m) => <option key={m.id} value={m.id}>{m.label}{isDecisionsModel(m.id) ? " ⚖️" : ""}</option>)}
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

      <div className="card">
        <h3 style={{ margin: "0 0 4px" }}>Decisions API</h3>
        <p className="text-small text-secondary" style={{ margin: "0 0 10px" }}>
          Kiểm tra proxy <code>/api/ai-decide</code> (endpoint <code>/v1/decisions</code> — ra quyết định có cấu trúc).
          Dùng chung key Experiential Labs ở trên. Model decisions (vd <code>gpt-6-luna-decisions</code>) chỉ chạy ở đây, không dùng cho chat.
        </p>
        <label className="field" style={{ maxWidth: 360 }}>
          <span className="text-label">Model decisions</span>
          <input
            className="input" placeholder={DEFAULT_DECIDE_MODEL} list="decide-models"
            value={keys.decideModel}
            onChange={(e) => setKeys((k) => ({ ...k, decideModel: e.target.value }))}
            aria-label="Model decisions" spellCheck={false}
          />
          <datalist id="decide-models">
            {KNOWN_DECIDE_MODELS.map((m) => <option key={m} value={m} />)}
          </datalist>
        </label>
        {keys.decideModel.trim() && !isDecisionsModel(keys.decideModel) && (
          <p className="text-small" style={{ marginTop: 6, color: "var(--warn, #e8a33d)" }}>
            ⚠️ Model này có vẻ không phải model decisions — nếu test báo 503, hãy kiểm tra lại tên model.
          </p>
        )}
        <div className="row wrap gap" style={{ marginTop: 10 }}>
          <button className="button" disabled={decideTesting || !keys.explabs.trim()} onClick={testDecide}>
            {decideTesting ? "Đang kiểm tra…" : "Kiểm tra kết nối"}
          </button>
        </div>
        {decideMsg && <p className="text-small" role="status" style={{ marginTop: 8 }}>{decideMsg}</p>}
      </div>

      <div className="row wrap gap">
        <button className="button button-primary" onClick={save}>{savedTick ? "Đã lưu ✓" : "Lưu key"}</button>
        <button className="button" onClick={clearAll}>Xóa hết key đã lưu</button>
      </div>
    </section>
  );
}
