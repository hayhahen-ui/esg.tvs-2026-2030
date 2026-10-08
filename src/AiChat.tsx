import { useMemo, useRef, useState } from "react";
import { ARTICLES, QUICK_QUESTIONS } from "./content";
import { AI_DISCLAIMER, type WebResult } from "./ai";

interface ArticleLike { id: string; title: string; summary: string; content: string; category: string; source: string }
interface ChatMsg {
  id: number;
  role: "user" | "bot";
  text: string;
  tag?: "local" | "web" | "info";
  results?: WebResult[];
  webQuery?: string;
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
    text: "Chào bạn! Tôi trả lời nhanh từ thư viện ESG nội bộ. Với câu hỏi thư viện chưa có, bạn có thể bấm “🔍 Tìm trên web” để tôi tra cứu thêm. Câu trả lời từ web cần chuyên gia soát xét trước khi áp dụng.",
  }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [webBusyId, setWebBusyId] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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
          text: `Tìm thấy ${hits.length} tài liệu liên quan trong thư viện nội bộ:\n\n${hits.map((h, i) => `${i + 1}. ${h.title} — ${h.summary}\n   Nguồn: ${h.source}`).join("\n\n")}`,
        }
      : {
          id: nextId++, role: "bot", tag: "info", webQuery: text,
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
        body: JSON.stringify({ query }),
      });
      const data = await r.json().catch(() => ({})) as { results?: WebResult[]; message?: string };
      if (r.status === 501) {
        setMsgs((m) => [...m, {
          id: nextId++, role: "bot", tag: "info",
          text: "Chưa đấu nối tìm kiếm web. Quản trị viên cần thêm biến môi trường TINYFISH_API_KEY trên Vercel (xem docs/CHATBOT_AI.md), sau đó deploy lại.",
        }]);
      } else if (!r.ok) {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Tìm kiếm web tạm thời lỗi, bạn thử lại sau ít phút." }]);
      } else if (!data.results?.length) {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Không tìm thấy kết quả web phù hợp. Bạn gửi câu hỏi cho chuyên gia ở ô bên dưới nhé." }]);
      } else {
        setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "web", text: `Tìm thấy ${data.results!.length} kết quả trên web cho “${query}”:`, results: data.results }]);
      }
    } catch {
      setMsgs((m) => [...m, { id: nextId++, role: "bot", tag: "info", text: "Không kết nối được dịch vụ tìm kiếm, bạn thử lại sau." }]);
    } finally {
      setWebBusyId(null);
      scrollDown();
    }
  };

  return (
    <div className="card">
      <h3 style={{ margin: "0 0 4px" }}>💬 Trợ lý AI hỏi đáp nhanh</h3>
      <p className="text-small text-secondary" style={{ margin: "0 0 12px" }}>
        Trả lời từ thư viện nội bộ trước; tra cứu web khi cần. Không thay thế chuyên gia và quy định pháp luật.
      </p>
      <div className="chat-thread" role="log" aria-label="Hội thoại trợ lý AI">
        {msgs.map((m) => (
          <div key={m.id} className={`chat-msg ${m.role}`}>
            {m.role === "bot" && m.tag === "local" && <span className="src-tag">📚 Thư viện nội bộ</span>}
            {m.role === "bot" && m.tag === "web" && <span className="src-tag">🌐 Kết quả web (TinyFish)</span>}
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
            {m.role === "bot" && m.webQuery && m.tag !== "web" && (
              <div style={{ marginTop: 8 }}>
                <button className="button" disabled={webBusyId !== null} onClick={() => searchWeb(m)}>
                  {webBusyId === m.id ? "Đang tìm…" : "🔍 Tìm trên web"}
                </button>
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
