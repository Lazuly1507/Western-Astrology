# Chi phí và công sức — Web Western MVP
21/10/2026. Ước lượng lập kế hoạch, chưa báo giá/duyệt/mua dịch vụ. Không phát sinh API token từ prototype; không cần key thật. Premium/forecasting/native ngoài các tổng dưới đây.

## Công sức
[Roadmap](../roadmap.md) M0–M5 khoảng 15.5–25.5 person-weeks kỹ thuật; biên tập/nội dung/chuyên gia domain thêm 3–5 = 18.5–30.5 person-weeks. Giả định nội bộ 8–15 triệu VND/person-week → 148–457.5 triệu; cộng 20% dự phòng → khoảng **178–549 triệu VND**. Không phải báo giá thị trường hoặc lịch một người chắc chắn. Làm tuần tự một người sẽ dài hơn; chỉ song song sau khi có hợp đồng dữ liệu/thiết kế.

Constellation SVG tối giản đã dự trù trong M3; bản 3D/game riêng không có trong tổng. Chi phí xin license Swiss chưa biết, cộng riêng sau báo giá. Domain, thuế, pháp lý, tuyển người khảo sát, paid content/assets và nhân sự hỗ trợ dài hạn chưa nằm trong tổng.

## Vận hành minh họa, USD/tháng
Nguồn giá chính chủ xem 21/10/2026: [Supabase](https://supabase.com/pricing) Pro từ $25/tháng, compute/usage và project bổ sung có thể tính thêm. Các khoản host/email/monitoring dưới đây là **phân bổ nội bộ**, chưa chọn nhà cung cấp, không phải giá niêm yết.

| Kịch bản | DB/auth allocation | Host/engine/email/monitor allocation | AI turns/tháng | Tổng dự trù |
| --- | ---: | ---: | ---: | ---: |
| Beta nhỏ | 25 | 50 | 1,000 | 91.58 |
| MVP tăng trưởng | 50 | 115 | 10,000 | 330.75 |
| Tải lớn cần benchmark | 150 | 300 | 100,000 | 2,107.50 |

AI benchmark dùng [GPT-5.4 mini](https://developers.openai.com/api/docs/models/gpt-5.4-mini), chưa chọn model production: $0.75/M input và $4.50/M output. Một turn giả định 8,000 input + 1,500 **billed output** = $0.01275, thêm30% retries/variance=$0.016575. 1k/10k/100k turns=$16.575/$165.75/$1,657.50. Không đảm bảo tokens reasoning hoặc hội thoại dài luôn nằm trong giả định; đo usage thật rồi điều chỉnh. Giá có thể đổi; kiểm tra lại trước enable real API. Không quy đổi VND bằng tỷ giá chưa xác minh.

## Kiểm soát
Budget cap hàng tháng + quota/user/ngày, context giới hạn, output cap, no auto retry không giới hạn, alert theo usage thực. Guest calculation cũng có CPU/geocoding quota. Geocoder/timezone datasets, license Swiss, data egress và legal review có thể thay đổi phương án nên cần báo giá trước M2. M6 Premium/advanced có business case riêng; không đưa doanh thu giả vào bù chi phí.
