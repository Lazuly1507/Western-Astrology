# Chi phí dự kiến — Web-only

21/10/2026. **Ước tính để duyệt ngân sách, không phải báo giá hoặc chi phí đã phát sinh.** USD; nếu cần quy đổi dùng giả định lập kế hoạch **26.000đ/USD**, không phải tỷ giá được xác minh. Chưa gồm VAT/thuế, pháp lý, marketing, nội dung mua bản quyền hoặc phí thanh toán theo hợp đồng.

## Đơn giá nguồn và khoản phân bổ

| Khoản | Căn cứ | Cách sử dụng trong dự toán |
| --- | --- | --- |
| Supabase Pro | [Trang giá](https://supabase.com/pricing) ghi từ $25/tháng, project bổ sung và overage có thể tính thêm | Dùng $25 baseline một production project, thêm staging/compute theo scenario; không xem MAU miễn phí là giới hạn toàn bộ chi phí |
| OpenAI benchmark | [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini) tại thời điểm đọc: $0,75/1M input, $4,50/1M output | Chỉ là model benchmark cho tính chi phí, **chưa duyệt model**, chưa xác minh account/quality; không dùng GPT-5 mini cũ đã thấy nhãn deprecated để lập kế hoạch mới |
| Hosting, worker, email, monitoring, domain | Khoản phân bổ kỹ thuật nội bộ, **chưa phải giá nhà cung cấp được chốt** | Đặt envelope và chọn host bằng báo giá thật trước M3/M6 |
| Payment gateway | Provider/merchant chưa chốt | Không giả định miễn phí hoặc recurring; sensitivity 1–5% gross là giả định tài chính, không báo giá payOS |

AI standard turn giả định trung bình **8.000 input + 1.500 output token tính phí**: `8.000×0,75/1e6 + 1.500×4,50/1e6 = $0,01275`. Cộng **30% dự phòng** retry/safety/usage variance → **$0,016575/lượt**. Output budget phải bao gồm reasoning token nếu model có tính phí; dùng `usage` thực để hiệu chỉnh. Không giả định cached input, Batch discount hoặc tool miễn phí. Context tăng theo lịch sử làm chi phí tăng; giới hạn context theo evidence.

Báo cáo sâu giả định 20.000 input + 8.000 output → $0,051; thêm 30% → **$0,0663/bản**. Chất lượng/Vietnamese token ratio chưa benchmark nên không coi đây là COGS cam kết.

## Scenarios vận hành/tháng

Các mức MAU chỉ mô tả đối tượng ngân sách, không dự báo nhu cầu hoặc bảo đảm capacity. Real AI chỉ chiếm số lượt ghi dưới; Mock không có phí token nhà cung cấp.

| Scenario | Pilot 500 MAU | Beta 2.000 MAU | Tăng trưởng 10.000 MAU |
| --- | ---: | ---: | ---: |
| Real AI standard turns | 1.000 | 10.000 | 100.000 |
| Báo cáo sâu | 100 | 500 | 3.000 |
| AI chat, gồm buffer | $16,58 | $165,75 | $1.657,50 |
| Báo cáo, gồm buffer | $6,63 | $33,15 | $198,90 |
| Supabase production/staging/overage allocation | $35 | $60 | $150 |
| Web host + job worker allocation | $30 | $70 | $200 |
| Email/monitoring/domain allocation | $15 | $35 | $100 |
| **Tổng envelope** | **$103,21** | **$363,90** | **$2.306,40** |
| Quy đổi theo giả định | khoảng **2,68 triệu đ** | **9,46 triệu đ** | **59,97 triệu đ** |

Không cộng buffer lần hai vào tổng vì chi phí AI đã cộng 30%; phần hạ tầng là envelope phải điều chỉnh theo đo tải. Peak traffic, egress/export PDF, database size, support và fraud có thể làm tăng đáng kể. Mock-only giai đoạn local hiện tại không gọi dịch vụ; nếu tạo staging trả phí về sau phải được duyệt.

## Unit economics sơ bộ

Gói giả định 99.000đ/30 ngày ≈$3,81 theo giả định tỷ giá; 60 lượt + 2 báo cáo dùng hết ≈$1,1271 token budget có buffer. Nếu phí gateway giả định 3%, còn khoảng $2,57 trước hạ tầng, thuế, support, hoàn tiền và nội dung. Đây chưa là lợi nhuận hoặc bằng chứng giá bán khả thi. Nếu chi phí/lượt gấp 3, mô hình gần như mất phần đệm; cần eval, quota, hard budget và chống account abuse trước mở bán. Không hứa AI “không giới hạn”.

Free 5 lượt/người/tháng dùng hết có thể tốn khoảng $0,082875/người chỉ tiền chat; 10.000 người dùng hết là $828,75 trước khoản khác. Chủ dự án có thể duyệt quota thấp hơn, invite-only hoặc không Free AI khi mở public.

## Công sức xây dựng

Roadmap Web: **16–26 person-weeks engineering/design/QA**, cộng **3–5 person-weeks chuyên gia và biên tập quy tắc**, tổng **19–31 person-weeks**. Giả định 8–15 triệu đ/person-week (phân bổ nội bộ, không báo giá thị trường): **152–465 triệu đ**, cộng dự phòng 20% → **182–558 triệu đ**. Với 2 người kỹ thuật và hỗ trợ domain/design/QA bán thời gian, dự kiến **10–16 tuần lịch** khi quyết định/nguồn đến đúng hạn; không cam kết nếu bị chặn về ruleset.

Đây là ngân sách cho phạm vi hoàn chỉnh Web, AI bounded, Premium và admin trong PRD. Pilot không billing có thể cắt M5 trước, nhưng giảm bao nhiêu phải re-estimate theo các requirement bỏ đi. Chi phí nghiên cứu/kiểm thử chart không giảm chỉ vì bỏ native. Không có chi phí Expo/EAS, máy build native, signing hoặc store. Bảng milestone chi tiết ở [implementation-plan.md](../roadmap/implementation-plan.md).

## Quyết định chi phí cần duyệt

Giới hạn tháng pilot (đề xuất hard cap $150 với alert ở 50/80/100%), giá bán/thời hạn, free quota, provider/merchant, nội dung có bản quyền và định mức chuyên gia. 100% budget: chặn job AI mới ở server, vẫn cho đọc chart; không tự nâng plan hoặc mua thêm credit. Không yêu cầu API key ở Phase 02.
