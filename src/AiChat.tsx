import { useEffect, useMemo, useRef, useState } from "react";
import { ARTICLES, QUICK_QUESTIONS } from "./content";
import { AI_DISCLAIMER, AI_GENERATED_DISCLAIMER, DEFAULT_AI_MODEL, type ChatModel, type WebResult } from "./ai";
import { apiKeyStore } from "./apiKeys";

interface ArticleLike { id: string; title: string; summary: string; content: string; category: string; source: string }
interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
  tag?: "local" | "web" | "ai" | "info";
  results?: WebResult[];
  webQuery?: string;
  aiContext?: string;
}

let nextId = 1;

export default function AiChat({ knowledge }: {
  knowledge: Array<{ _id: string; title: string; summary: string; content: string; category: string; source: string }> | undefined;
}) {
  const articles: ArticleLike[] = useMemo(() => [
    ...ARTICLES.map((a) => ({ id: a.id, title: a.title, summary: a.summary, content: a.content, category: a.category, source: a.source })),
    ...(knowledge ?? []).map((k) => ({ id: k._id, title: k.title, summary: k.summary, content: k.content, category: k.category, source: k.source })),
  ], [knowledge]);
  const [msgs, setMsgs] = useState<ChatMsg[]>([{
    id: nextId++, role: "bot", tag: "info",
    text: "Chào bạn! Tôi trả lời nhanh từ thư viện ESG nội bộ. Với câu hỏi thư viện chưa có, bạn có thể bấm “🔍 Tìm trên web”. Muốn câu trả lời diễn giải tự nhiên, bấm “✨ Diễn giải bằng AI”.",
  }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [webBusyId, setWebBusyId] = useState<number | null>(null);
  const [aiBusyId, setAiBusyId] = useState<number | null>(null);
  const [models, setModels] = useState<ChatModel[]>([]);
  const [aiReady, setAiReady] = useState(false);
  const [model, setModel] = useState<string>(() => apiKeyStore.load().model || DEFAULT_AI_MODEL);
  const [localKeys, setLocalKeys] = useState(() => apiKeyStore.load());
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stored = apiKeyStore.load();
    setLocalKeys(stored);
    fetch("/api/ai-chat").then((r) => r.json()).then((d: { configured?: boolean; models?: ChatModel[]; defaultModel?: string }) => {
      const serverModels = Array.isArray(d.models) ? d.models : [];
      if (serverModels.length) {
        setModels(serverModels);
        // model đã lưu không còn được server hỗ trợ → dùng mặc định của server
        if (!serverModels.some((m) => m.id === stored.model) && d.defaultModel) {
          setModel(d.defaultModel);
        } else {
          setModel(stored.model);
        }
      }
      if (d.configured || stored.explabs) setAiReady(true);
    }).catch(() => {
      if (stored.explabs) setAiReady(true);
    });
  }, []);

  const changeModel = (id: string) => {
    setModel(id);
    apiKeyStore.save({ ...apiKeyStore.load(), model: id });
  };

  const scrollDown = () => setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" }), 50);

  const findLocal = (query: string): ArticleLike[] => {
    const words = query.trim().toLowerCase().split(/\s+/).filter((w) => w.length > 1);
    if (!words.length) return [];
    return articles
      .map((a) => ({ a, score: words.filter((w) => `${a.title} ${a.summary} ${a.content}`.toLowerCase().includes(w)).length }))
      .filter((it) => it.score > 0)
      .sort((x, y) => y.score - x.score)
      .slice(0, 3)
      .map((it) => it.a);
  };

  const send = () => {
    const text = input.trim();
    if (!text || busy) return;
    setBusy(true);
    const userMsg: ChatMsg = { id: nextId++, role: "user", text };
    const hits = findLocal(text);
    const botMsg: ChatMsg = hits.length
      ? {
          id: nextId++, role: "bot", tag: "local", webQuery: text,
          aiContext: hits.map((h) => `${h.title}: ${h.summary}`).join("\n"),
          text: `Tìm thấy ${hits.length} tài liệu liên quan trong thư viện nội bộ:\n\n${hits.map((h, i) => `${i + 1}. ${h.title} — ${h.summary}\n   Nguồn: ${h.source}`).join("\n\n")}`,
        }
      : {
          id: nextId++, role: "bot", tag: "info", webQuery: text, aiContext: "",
          text: "Thư viện nội bộ chưa có tài liệu phù hợp. Bạn có thể bấm “🔍 Tìm trên web” để tôi tra cứu thêm, hoặc gửi câu hỏi cho chuyên gia ở ô bên dưới.",
        };
    setMsgs((m) => [...m, userMsg, botMsg]);
    setInput("");
    setBusy(false);
    scrollDown();
  };

  const searchWeb = async (msg: ChatMsg) => {
    const query = msg.webQuery ?? "";
    if (!query || webBusyId !== null) return;
    setWebBusyId(msg.id);
    try {
      const r = await fetch("/api/qa-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query, apiKey: localKeys.tinyfish || undefined }),
      });
      const data = await r.json().catch(() => ({})) as { results?: WebResult[] };
      if (r.status === 501) {
        setMsgs((m) => [...m, {
          id: nextId++, role: "bot", tag: "info",
          text: "Chưa có key tìm kiếm web. Nhập key tại màn “Cài đặt API” (menu bên trái), hoặc quản trị viên thêm biến môi trường TINYFISH_API_KEY trên Vercel.",
        }]);
      } else if (!r.ok) {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Tìm kiếm web tạm thời lỗi, bạn thử lại sau ít phút." }]);
      } else if (!data.results?.length) {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Không tìm thấy kết quả web phù hợp. Bạn gửi câu hỏi cho chuyên gia ở ô bên dưới nhé." }]);
      } else {
        setMsgs((m) => [...m, {
          id: nextId++, role: "bot", tag: "web", webQuery: query,
          text: `Tìm thấy ${data.results!.length} kết quả trên web cho “${query}”:`,
          results: data.results,
          aiContext: data.results!.map((x) => `${x.title}: ${x.snippet} (${x.url})`).join("\n"),
        }]);
      }
    } catch {
      setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Không kết nối được dịch vụ tìm kiếm, bạn thử lại sau." }]);
    } finally {
      setWebBusyId(null);
      scrollDown();
    }
  };

  const askAi = async (msg: ChatMsg) => {
    const question = msg.webQuery ?? "";
    if (!question || aiBusyId !== null) return;
    setAiBusyId(msg.id);
    try {
      const r = await fetch("/api/ai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question, model, context: msg.aiContext ?? "", apiKey: localKeys.explabs || undefined }),
      });
      const data = await r.json().catch(() => ({})) as { reply?: string; message?: string };
      if (r.status === 501) {
        setMsgs((m) => [...m, {
          id: nextId++, role: "bot", tag: "info",
          text: "Chưa có key AI. Nhập key tại màn “Cài đặt API” (menu bên trái), hoặc quản trị viên thêm biến môi trường EXPLABS_API_KEY trên Vercel.",
        }]);
      } else if (!r.ok || !data.reply) {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "AI tạm thời không trả lời được, bạn thử lại sau ít phút." }]);
      } else {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "ai", text: data.reply! }]);
      }
    } catch {
      setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Không kết nối được dịch vụ AI, bạn thử lại sau." }]);
    } finally {
      setAiBusyId(null);
      scrollDown();
    }
  };

  return (
    <div className="card">
      <div className="row between wrap" style={{ marginBottom: 4 }}>
        <h3 style={{ margin: 0 }}>💬 Trợ lý AI hỏi đáp nhanh</h3>
        {aiReady && models.length > 0 && (
          <label className="field" style={{ minWidth: 220 }}>
            <span className="text-small">Model AI</span>
            <select className="input" value={model} onChange={(e) => changeModel(e.target.value)} aria-label="Chọn model AI">
              {models.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </label>
        )}
      </div>
      <p className="text-small text-secondary" style={{ margin: "0 0 12px" }}>
        Trả lời từ thư viện nội bộ trước; tra cứu web và diễn giải AI khi cần. Không thay thế chuyên gia và quy định pháp luật.
      </p>
      <div className="chat-thread" role="log" aria-label="Hội thoại trợ lý AI">
        {msgs.map((m) => (
          <div key={m.id} className={`chat-msg ${m.role}`}>
            {m.role === "bot" && m.tag === "local" && <span className="src-tag">📚 Thư viện nội bộ</span>}
            {m.role === "bot" && m.tag === "web" && <span className="src-tag">🌐 Kết quả web (TinyFish)</span>}
            {m.role === "bot" && m.tag === "ai" && <span className="src-tag">✨ AI diễn giải</span>}
            <div style={{ whiteSpace: "pre-wrap" }}>{m.text}</div>
            {m.results && (
              <ul className="web-results">
                {m.results.map((r) => (
                  <li key={r.url}>
                    <a href={r.url} target="_blank" rel="noopener noreferrer">{r.title}</a>
                    {r.snippet && <div className="text-small text-secondary">{r.snippet}</div>}
                  </li>
                ))}
              </ul>
            )}
            {m.tag === "web" && <div className="disclaimer">⚠️ {AI_DISCLAIMER}</div>}
            {m.tag === "ai" && <div className="disclaimer">⚠️ {AI_GENERATED_DISCLAIMER}</div>}
            {m.role === "bot" && m.webQuery && (m.tag === "local" || m.tag === "info" || m.tag === "web") && (
              <div className="row wrap gap" style={{ marginTop: 8 }}>
                {m.tag !== "web" && (
                  <button className="button" disabled={webBusyId !== null} onClick={() => searchWeb(m)}>
                    {webBusyId === m.id ? "Đang tìm…" : "🔍 Tìm trên web"}
                  </button>
                )}
                {aiReady && (
                  <button className="button" disabled={aiBusyId !== null} onClick={() => askAi(m)}>
                    {aiBusyId === m.id ? "AI đang trả lời…" : "✨ Diễn giải bằng AI"}
                  </button>
                )}
              </div>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="row wrap gap chips" style={{ marginTop: 10 }}>
        {QUICK_QUESTIONS.slice(0, 4).map((t) => (
          <button key={t} className="chip" onClick={() => setInput(t)}>{t}</button>
        ))}
      </div>
      <div className="chat-input-row">
        <input
          className="input" value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") send(); }}
          placeholder="Hỏi nhanh về ESG… (vd: scope 3 gồm những gì?)"
          aria-label="Câu hỏi cho trợ lý AI"
        />
        <button className="button button-primary" disabled={busy || !input.trim()} onClick={send}>Gửi</button>
      </div>
    </div>
  );
}
