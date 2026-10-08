# Chatbot hỏi đáp AI (TinyFish Search)

Màn **Hỏi đáp** có thêm khung **"💬 Trợ lý AI hỏi đáp nhanh"** cho cán bộ công nhân viên.

## Cách hoạt động

1. **Thư viện nội bộ trước** — câu hỏi được đối chiếu với thư viện ESG trong app
   (bài viết nền + tài liệu doanh nghiệp). Trả lời ngay, không cần mạng, không tốn chi phí.
2. **Tìm trên web khi cần** — nếu thư viện chưa có, bấm "🔍 Tìm trên web".
   App gọi `/api/qa-search` (serverless function trên Vercel), proxy tới
   **TinyFish Search API**, trả về tối đa 6 kết quả kèm link nguồn.
3. Mọi kết quả web đều gắn nhãn **"cần chuyên gia soát xét trước khi áp dụng"**
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

> ⚠️ **Nếu API key từng bị lộ (dán vào chat, commit nhầm…): vào TinyFish Dashboard
> → API Keys → thu hồi key cũ và tạo key mới TRƯỚC khi làm các bước dưới.**

1. TinyFish Dashboard → **API Keys** → tạo key mới (Search API hiện miễn phí).
2. Vercel → Project `esg-tvs-2026-2030` → **Settings → Environment Variables** →
   thêm `TINYFISH_API_KEY` = key mới → **Save**.
3. **Redeploy** (Deployments → … → Redeploy) để biến môi trường có hiệu lực.
4. Kiểm tra: màn Hỏi đáp → hỏi câu thư viện chưa có → "🔍 Tìm trên web" → có kết quả.

Không cấu hình key: chatbot vẫn chạy ở chế độ thư viện nội bộ, không lỗi.

## Giới hạn hiện tại & lộ trình

- TinyFish **không có LLM riêng**: hiện tại bot "tìm và trích nguồn", chưa phải bot
  "viết câu trả lời trôi chảy". Muốn bot diễn giải tự nhiên: thêm LLM (OpenAI-compatible)
  phía sau proxy — kiến trúc đã chừa sẵn (`api/qa-search.ts` là nơi duy nhất gọi ra ngoài).
- Search API miễn phí tại thời điểm viết (dashboard báo $0.00); theo dõi hạn mức trong
  TinyFish Dashboard → Search.
- Không gửi dữ liệu nội bộ nhạy cảm (lương, bí mật kinh doanh) vào ô tìm web —
  query được gửi tới dịch vụ thứ ba.
