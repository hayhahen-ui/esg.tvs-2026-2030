# Chatbot hỏi đáp AI (TinyFish Search)

Màn **Hỏi đáp** có thêm khung **"💬 Trợ lý AI hỏi đáp nhanh"** cho cán bộ công nhân viên.

## Cách hoạt động

1. **Thư viện nội bộ trước** — câu hỏi được đối chiếu với thư viện ESG trong app
   (bài viết nền + tài liệu doanh nghiệp). Trả lời ngay, không cần mạng, không tốn chi phí.
2. **Tìm trên web khi cần** — nếu thư viện chưa có, bấm "🔍 Tìm trên web".
   App gọi `/api/qa-search` (serverless function trên Vercel), proxy tới
   **TinyFish Search API**, trả về tối đa 6 kết quả kèm link nguồn.
3. **✨ Diễn giải bằng AI** — bấm để LLM (qua Experiential Labs, OpenAI-compatible)
   diễn giải câu trả lời tự nhiên dựa trên ngữ cảnh thư viện/kết quả web vừa tìm.
   Có **dropdown chọn model** (danh sách do server cung cấp, hiện tại: Claude Haiku 5.5).
4. Mọi kết quả web/AI đều gắn nhãn **"cần chuyên gia soát xét trước khi áp dụng"**
   và không thay thế quy định pháp luật.

## Kiến trúc & bảo mật

```
Trình duyệt ──POST /api/qa-search──▶ Vercel serverless ──X-API-Key──▶ api.search.tinyfish.ai
     ▲                                     │
     └──── chỉ nhận { results[] } ─────────┘
```

- **API key KHÔNG bao giờ nằm ở frontend.** Key chỉ sống trong biến môi trường
  `TINYFISH_API_KEY` phía server. Không đưa key vào `VITE_*`, không commit vào repo.
- File proxy: `api/qa-search.ts`. Vercel tự nhận diện `/api/*.ts` thành serverless function.
- `vercel.json` đã loại `/api/` khỏi rewrite SPA để request không bị trả về `index.html`.
- Nếu chưa cấu hình key: API trả `501`, giao diện hiện hướng dẫn thay vì lỗi khó hiểu.

## Cài đặt (quản trị viên)

> ⚠️ **Nếu API key từng bị lộ (dán vào chat, commit nhầm…): vào dashboard của nhà cung cấp
> (TinyFish → API Keys; Experiential Labs → API Keys) → thu hồi key cũ và tạo key mới
> TRƯỚC khi làm các bước dưới.**

**Cách nhanh (không cần Vercel):** mở màn **"Cài đặt API"** trong app (menu bên trái):
chọn **model AI**, dán key, bấm **"Kiểm tra kết nối"** rồi **"Lưu key"**.
Key và model lưu trên trình duyệt này; chatbot dùng ngay không cần redeploy.

**Cách chuẩn cho nhiều người dùng:** Vercel → Project `esg-tvs-2026-2030` →
**Settings → Environment Variables** → thêm `TINYFISH_API_KEY` / `EXPLABS_API_KEY` →
**Save** → **Redeploy**. Biến môi trường được ưu tiên hơn key nhập trong app.

## Giới hạn hiện tại & lộ trình

- Thêm model mới: bổ sung vào `AI_MODELS` trong `src/ai.ts` (server tự kiểm tra
  allowlist, client tự hiện trong dropdown).
- Theo dõi hạn mức/chi phí trong dashboard của từng nhà cung cấp.
- Không gửi dữ liệu nội bộ nhạy cảm (lương, bí mật kinh doanh) vào ô chat —
  câu hỏi được gửi tới dịch vụ AI thứ ba.

## Lưu ý model (08/10/2026)
- Model mặc định `claude-haiku-5.5` chỉ chấp nhận `temperature=1.0` → proxy không gửi `temperature`.
- Một số route (vd họ `gpt-6-*`) yêu cầu `max_tokens` tối thiểu 16 → ping kiểm tra dùng `max_tokens=16`.
- Tên model có trong `/v1/models` nhưng route chat chưa triển khai sẽ trả 503 `unavailable_route` — lỗi phía gateway, thử lại sau hoặc hỏi nhà cung cấp.

## Smart routing trong chatbot (08/10/2026)

Chatbot tự chọn endpoint theo model đang chọn (dấu ⚖️ trong dropdown):
- Model chat (vd `claude-haiku-5.5`) → nút "✨ Diễn giải bằng AI" gọi `/api/ai-chat`, trả lời diễn giải tự nhiên.
- Model decisions (tên kết thúc bằng `-decisions`, vd `gpt-6-luna-decisions`) → nút "⚖️ Đánh giá bằng AI"
  gọi `/api/ai-decide` với câu hỏi đánh giá mặc định (nội dung có đáng tin để tham khảo không?),
  hiển thị kết luận + độ tin cậy + xác suất từng phương án.
- Nút "Kiểm tra kết nối" ở thẻ Experiential Labs cũng route theo model đang chọn nên test đúng endpoint.

## API Decisions — `/api/ai-decide` (08/10/2026)

Proxy cho **Decisions API** của Experiential Labs (`POST /v1/decisions`): nhận một
tình huống/đề xuất (`input`) và các câu hỏi lựa chọn (`questions`), trả về đáp án
có cấu trúc gồm `choice`, `probabilities` và `confidence` cho từng câu hỏi.

**Quan trọng:** model decisions (vd `gpt-6-luna-decisions`) CHỈ dùng ở endpoint này.
Gọi `/v1/chat/completions` (proxy `/api/ai-chat`) với model decisions sẽ bị 503
`unavailable_route`. Ngược lại, model chat (vd `claude-haiku-5.5`) không dùng ở đây.

Key: ưu tiên biến môi trường `EXPLABS_API_KEY`; nếu chưa cấu hình, gửi `apiKey`
trong body (key nhập tại màn "Cài đặt API").

### GET `/api/ai-decide`
`{ configured: boolean, defaultModel: "gpt-6-luna-decisions" }`

### POST `/api/ai-decide`
| Trường | Bắt buộc | Mô tả |
| --- | --- | --- |
| `input` | có | Tình huống/đề xuất cần đánh giá, tối đa 4000 ký tự |
| `questions` | không | Mảng 1–5 câu hỏi; mỗi câu: `{ type: "choice", name, instructions?, choices: [{ value, description? }, ...] }` (2–10 choices) |
| `model` | không | Tên model decisions, mặc định `gpt-6-luna-decisions`; kiểm tra định dạng an toàn (chữ/số + `. - _ / :`, ≤80 ký tự) |
| `apiKey` | nếu chưa có env | Key dự phòng nhập trong app |
| `action: "ping"` | — | Kiểm tra kết nối (thay cho input/questions) |

Thành công: `{ answers: [{ type, name, choice, probabilities: [{ value, probability }], confidence }], usage, model }`
Lỗi: `{ error, status?, message? }` — `status` là mã HTTP từ upstream (503 = route model
chưa triển khai phía nhà cung cấp; 429 = bị giới hạn tốc độ).

Ví dụ:
```bash
curl -X POST https://esg-tvs-2026-2030.vercel.app/api/ai-decide \
  -H "Content-Type: application/json" \
  -d '{"action":"ping","apiKey":"xpl_..."}'
# {"ok":true,"model":"gpt-6-luna-decisions"}
```

```js
const r = await fetch("/api/ai-decide", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    input: "Đề xuất: ghi nhận điện tháng 9 là 0 kWh vì công tơ hỏng, không có số liệu thay thế.",
    questions: [{
      type: "choice", name: "soatxet",
      instructions: "Số liệu 0 kWh không có nguồn chứng minh có chấp nhận được không?",
      choices: [
        { value: "chapnhan", description: "Chấp nhận ghi nhận 0 kWh." },
        { value: "tuchoi", description: "Từ chối, yêu cầu ước tính có phương pháp hoặc để trống kèm lý do." },
      ],
    }],
  }),
});
const { answers } = await r.json();
// answers[0] → { choice: "tuchoi", probabilities: [...], confidence: 1 }
```

Lưu ý chi phí: mỗi request tính token theo `usage`; timeout không đồng nghĩa với không bị tính phí.
Kết quả AI chỉ mang tính tham khảo — quyết định cuối cùng thuộc về chuyên gia nội bộ.
