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
