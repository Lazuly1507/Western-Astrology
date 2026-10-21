# TUVI STUDIO — Product Requirements

Trạng thái **đề xuất chờ phê duyệt**, 21/10/2026. **Nền tảng Web-only đã được chủ dự án quyết định chính thức.** Nguồn bài toán: yêu cầu chủ dự án; [nghiên cứu đối thủ](../research/competitor-analysis.md). Chưa có phỏng vấn, số liệu hành vi hoặc kết luận phù hợp thị trường.

## Mục tiêu và đối tượng

Website Tử Vi Việt Nam responsive trên PC, laptop, tablet và điện thoại: lập chart nhất quán, đọc dễ hiểu và hỏi AI có dữ kiện truy vết. Ưu tiên mobile-first; không phát triển ứng dụng native hoặc quy trình store. PWA chỉ xem xét trong tương lai. Đề xuất phục vụ người trưởng thành; “người mới”, “người đã có lá số”, “người nghiên cứu” là nhóm giả thuyết, chưa phải persona được xác thực. Không định vị là công cụ dự báo khoa học hoặc thay chuyên gia y tế/pháp lý/tài chính.

**North star đề xuất:** tỷ lệ phiên mà người dùng xem được một cung và mở được nguồn dữ kiện của một nhận xét. Mục tiêu thử nghiệm: ≥80% người thử hoàn thành nhập dữ liệu và tìm cung không trợ giúp; ≥90% phân biệt dữ kiện với lời diễn giải. Cỡ mẫu ban đầu 8–12, chỉ phục vụ phát hiện vấn đề, không suy rộng dân số.

## Phân kỳ

- **MVP:** pilot được nghiệm thu sau M4 và kiểm tra M6; chart engine, tài khoản/lưu đồng bộ, giải thích nền và chat AI giới hạn. M3 là bản nội bộ chưa có AI, chưa gọi là sản phẩm AI hoàn chỉnh.
- **Version 1:** báo cáo sâu, Premium, lịch sử phân tích và admin nội dung/thanh toán tại M5, trước phát hành thương mại.
- **Version 2:** so sánh profile nâng cao, nhiều kịch bản giờ sinh, công cụ nghiên cứu và trải nghiệm chuyên sâu.
- **Future:** marketplace chuyên gia, cộng đồng, multi-language, ngoại suy chưa được nghiên cứu. Không tự đưa vào roadmap cam kết.

## Ranh giới hệ thống hiện tại và mở rộng

**Quyết định chủ dự án:** MVP chỉ triển khai Tử Vi Đẩu Số Việt Nam (`systemId=tuvi-vn`). Tương lai có thể có chuyên mục chiêm tinh phương Tây, lịch âm/Can Chi/phong thủy và AI theo từng hệ. Hiện chỉ thiết kế ranh giới, không viết engine, bảng quy tắc, nội dung luận hay giao diện chức năng cho các hệ đó.

| Khái niệm | Nghĩa trong sản phẩm | Điều kiện nghiệm thu ranh giới |
| --- | --- | --- |
| 12 cung Tử Vi | Vai trò Mệnh, Phụ Mẫu, Quan Lộc… phân bố trên bàn 12 địa chi | Không gọi chúng là 12 zodiac signs; star placements chỉ đến từ engine Tử Vi |
| 12 cung hoàng đạo | Hệ cung/signs chiêm tinh phương Tây, ngoài MVP | Không dùng enum/diễn giải/bảng của Tử Vi; API MVP từ chối `systemId` này |
| 12 con giáp / địa chi | Tý…Hợi; có thể là năm con giáp hoặc tọa độ địa chi trong Tử Vi theo ngữ cảnh | Trường `birthYearBranch` khác `palace.branchId`, không đồng nghĩa zodiac sign |
| Lịch âm và Can Chi | Dữ liệu lịch pháp có quy ước/phiên bản; có thể được engine Tử Vi dùng qua hợp đồng hẹp | Dùng chung thuật toán lịch chỉ khi timezone/quy ước tương thích; phong thủy không kế thừa phép luận Tử Vi |

Tài khoản, primitive UI, billing/entitlement và vận hành có thể dùng chung. Content, chart artifact, rules và AI session phải mang `systemId`, `schemaVersion`, `rulesetVersion`; một session không lấy dữ kiện của hệ khác. Nghiệm thu MVP có test gửi `western-astrology`/hệ không hỗ trợ → lỗi rõ ràng, không tự fallback sang Tử Vi. [Kiến trúc](../architecture/system-design.md) mô tả namespace và phụ thuộc tối thiểu, không xây framework plugin tổng quát.

## Luồng chính và trạng thái

Khách → chọn lịch/nhập sinh → xác nhận các giả định → tính chart → chọn cung → đọc dữ kiện/giải thích → chọn đăng nhập để lưu → đồng ý gửi dữ liệu tối thiểu để hỏi AI. AI không phải điều kiện để xem chart. Mạng lỗi: giữ dữ liệu trong phiên, cho retry có idempotency; không làm mất form. Không biết giờ: lưu draft nếu muốn, không hiển thị chart cá nhân duy nhất. AI bị giới hạn/lỗi: chart vẫn đọc được.

Lưu nhiều thiết bị dùng revision/ETag: xung đột phải cho chọn bản hoặc nhân bản; không âm thầm ghi đè dữ liệu sinh. Chỉnh ngày/giờ tạo chart revision mới, không biến báo cáo cũ thành báo cáo của chart mới. Đăng xuất xóa nội dung riêng tư khỏi bộ nhớ/cache UI; offline lâu dài chưa thuộc MVP.

## Danh mục yêu cầu và tiêu chí nghiệm thu

Mỗi dòng là một yêu cầu có thể kiểm chứng. Hạn mức là **đề xuất**, cần duyệt ở M1/M5; test dùng cấu hình entitlement đã duyệt, không hardcode trong client.

| ID | Yêu cầu | Bản | Tiêu chí nghiệm thu |
| --- | --- | --- | --- |
| A01 | Đăng nhập email OTP hoặc magic link | MVP | Link hết hạn/đã dùng bị từ chối; đăng xuất không đọc lại dữ liệu riêng qua Back; lỗi gửi không lộ tài khoản tồn tại. Chọn phương thức cuối ở M1. |
| A02 | Hồ sơ cá nhân | MVP | Tên hiển thị tùy chọn, sửa được; không bắt nhập ngày sinh của chủ tài khoản để chỉ dùng app. |
| A03 | Tạo/lưu/đổi tên/xóa lá số | MVP | Chỉ owner truy cập; xóa có xác nhận, dữ liệu đang bị xóa không thể mở báo cáo mới; hạn mức thử 3 hồ sơ miễn phí. |
| A04 | Đồng bộ và revision | MVP | Hai client sửa cùng revision nhận 409; dữ liệu server không bị last-write-wins; load lại đúng phiên bản. |
| A05 | Xuất và xóa dữ liệu tài khoản | MVP | Người dùng yêu cầu được export riêng tư; xóa khóa truy cập ngay, purge active data trong 30 ngày đề xuất, backup theo lịch lưu giữ đã công bố. |
| B01 | Form âm/dương lịch | MVP | Từ chối ngày dương không tồn tại; âm lịch bắt buộc month/leap flag và xác nhận bằng bộ lịch; đổi loại lịch không đổi nghĩa dữ liệu ngầm. |
| B02 | Giờ sinh, múi giờ, bất định | MVP | Input local time và timezone tách biệt; không biết giờ trả trạng thái chưa đủ; preview normalization trước xác nhận; ngoài phạm vi được duyệt không tính. |
| B03 | An 12 cung, Mệnh/Thân/Cục | MVP | 100% fixture được ký duyệt khớp; đủ 12 branch và 12 role duy nhất; provenance/ruleset version đi kèm. |
| B04 | Chính tinh và phụ tinh | MVP | Đủ danh mục sao đã duyệt; không lặng lẽ bỏ sao chưa có rule; mỗi placement có rule ID và multiplicity hợp lệ. |
| B05 | Đại hạn, tiểu hạn, lưu niên | MVP | Hiển thị riêng từng lớp, tuổi và năm; biên giao vận có fixture; lớp chưa tính trả unavailable, không thành mảng rỗng giả. |
| B06 | Zoom, chọn cung, list view | MVP | 12 vị trí được giữ nguyên; ở 375px thấy overview, đọc chi tiết ≥16px; keyboard truy cập mọi cung, không phụ thuộc màu. |
| B07 | Nhiều giờ/profile song song | V2 | Mỗi kết quả có profile/input riêng; màn so sánh chỉ ra khác biệt placement, không dùng AI để chọn “giờ đúng”. |
| C01 | Tổng quan và từ điển | MVP | Mô tả thuật ngữ có source/version, phân biệt dữ kiện với văn hóa; không suy luận từ dữ liệu vắng mặt. |
| C02 | Đọc từng cung | MVP | Chọn một trong 12 cung mở dữ kiện và giải thích có rule/fact pointers; bản thiếu nguồn hiện chưa đủ dữ liệu. |
| C03 | Quan hệ sao/cung | MVP | Chỉ xét quan hệ đã tính/được rule chấp thuận; không tự thêm sao hoặc trộn bản mệnh với lưu niên. |
| C04 | Luận vận hạn có điều kiện | MVP | Không nhận xét thời điểm nếu cycle unavailable; mỗi claim chỉ rõ kỳ, rule và giới hạn. |
| C05 | Báo cáo chuyên sâu và PDF | V1 | Job có trạng thái/retry; PDF dùng chart revision cố định; link tải có hạn và phân quyền, không URL public mặc định. |
| D01 | Chat theo lá số đã chọn, Mock trước | MVP | Không cần API key để kiểm thử; Mock deterministically trả schema và báo rõ chế độ. Khi bật Real, server kiểm owner và chart revision mỗi request; đổi chart tạo session mới; không gửi tên/ngày giờ/nơi sinh nếu task không cần. |
| D02 | Giải thích vị trí sao | MVP | Claim chỉ sao có trong chart; nhấp evidence đi đúng cung; thiếu placement phải nói thiếu. |
| D03 | Kết quả có cấu trúc | MVP | JSON qua schema + kiểm tham chiếu; refusal/incomplete/timeout có trạng thái riêng; không render bản chưa kiểm. |
| D04 | Kiểm soát suy diễn | MVP | Bộ adversarial 100 ca có 0 bịa placement được chấp nhận; thiếu evidence bị chặn; đầu ra không gọi xác suất định mệnh là xác suất khoa học. |
| D05 | Hạn mức và phản hồi | MVP | Quota server atomic, retry không trừ hai lần; hiển thị còn lượt; phản hồi sai cho phép gắn cờ mà không gửi toàn bộ birth record. |
| D06 | Lịch sử phân tích nhiều kỳ | V1 | Lọc đúng chart revision/model/prompt version; xóa chat không xóa chart khi người dùng không yêu cầu. |
| E01 | Xem gói và quyền lợi | V1 | Mọi quyền lợi, lượt, thời hạn, tự gia hạn và thuế/phí áp dụng được hiển thị trước mua; chưa có giá được duyệt thì không mở checkout. |
| E02 | Mua và quản lý gói trên Web | V1 | Provider Web được duyệt; webhook/chữ ký xác minh server; đăng nhập lại khôi phục đúng quyền; hủy qua kênh mua được chỉ dẫn; client không tự nâng quyền. |
| E03 | Credit AI và báo cáo | V1 | Ledger append-only; webhook duplicate/out-of-order không cấp hai lần; hoàn tiền/cancel/expiry có test. |
| E04 | Quyền sau hết gói | V1 | Đề xuất giữ quyền đọc báo cáo đã mua, ngừng tạo job Premium mới; điều khoản cuối phải duyệt và test trước mở bán. |
| F01 | Admin người dùng tối thiểu | MVP | Chỉ role server, MFA cho admin; xem trạng thái tài khoản/usage, không xem raw birth/chat mặc định; mọi thao tác audit. |
| F02 | Admin gói và giao dịch | V1 | Sửa giá tạo price version mới; không đổi giao dịch lịch sử; cấp quyền thủ công có lý do và audit, không sửa ledger cũ. |
| F03 | Nội dung và rules registry | V1 | Draft → review → published; rule table/prompt có version; admin nội dung không tự sửa engine đã phát hành. |
| F04 | Theo dõi lỗi/hoạt động | MVP | Dashboard chỉ request ID, code, latency, usage; không log raw DOB/chat; có kill switch AI và cảnh báo ngân sách. |
| F05 | Công cụ hỗ trợ mở rộng | V2 | Truy cập hỗ trợ theo case có hạn, phạm vi tối thiểu và audit; được chủ tài khoản cho phép khi cần nội dung riêng. |
| X01 | Cộng đồng/chuyên gia/đa ngôn ngữ | Future | Chỉ mở khi có PRD, moderation, quyền nội dung và đánh giá riêng; không thuộc nghiệm thu MVP. |

## Yêu cầu phi chức năng

- **Đúng chart:** mọi golden fixture đã được duyệt phải khớp 100%; tỷ lệ này đo tính toán theo profile, không đo khả năng dự báo đời sống.
- **Hiệu năng mục tiêu, chưa đo:** tính chart warm p95 ≤500ms trên thiết bị tham chiếu; màn chart usable ≤2 giây sau có dữ liệu; AI response kiểm xong p95 ≤20 giây trong tải pilot. Không streaming prose chưa kiểm chỉ để cải thiện số đo.
- **Khả dụng:** mục tiêu beta 99,5%/tháng, chưa là SLA; AI lỗi không ngăn đọc chart. Không vận hành paid tier nếu chưa có alert/backup/restore.
- **Accessibility:** mục tiêu WCAG 2.2 AA cho Web, kiểm tra keyboard, screen reader và trình duyệt điện thoại; contrast chữ thường ≥4,5:1, target tối thiểu 44 CSS px cho điều khiển chính; không chứng nhận chỉ bằng static scan.
- **SEO và Web performance:** SSR/SSG cho trang công khai, title/canonical/sitemap và nội dung thật; chart/chat/account/admin `noindex`, không có dữ liệu riêng trong metadata hoặc cache public. Mục tiêu Core Web Vitals p75: LCP ≤2,5s, INP ≤200ms, CLS ≤0,1 trên dữ liệu đo khi có sản phẩm; đây chưa là kết quả kiểm tra.
- **Riêng tư:** consent riêng cho AI, không public chart mặc định, không quảng cáo nhắm theo sinh; dữ liệu người khác cần quyền phù hợp. Kiểm tra pháp lý theo thị trường trước release, không coi PRD là kết luận tuân thủ.
- **Quan sát:** đo event tên luồng, trạng thái và latency; không email/DOB/tin nhắn trong analytics. Opt-in cho nghiên cứu trải nghiệm.

## Định giá để thử nghiệm, chưa mở bán

| Phương án | Giả thuyết | Cần duyệt/thử |
| --- | --- | --- |
| Free | Chart, giải thích nền, tối đa 3 hồ sơ; thử 5 lượt AI/tháng có hard cap | Có đủ giá trị và chịu được chi phí/abuse? |
| Plus đề xuất | 79.000–129.000đ/tháng; giả định 60 lượt chat và 2 báo cáo/tháng | Phỏng vấn giá, chi phí token thực, phí store và quyền sau hết gói |
| Mua từng báo cáo | 39.000–69.000đ/bản | Có làm mua lẻ rõ hơn subscription? Không trộn credit nếu chưa có nghiên cứu |

Các con số là phạm vi thử nghiệm nội bộ, không được quảng cáo như giá đã phê duyệt. Đánh giá billing Web theo [system design](../architecture/system-design.md); không đưa phí App Store/Google Play vào mô hình.

## Quyết định M1

Chủ dự án cần duyệt đối tượng, phạm vi ruleset, concept, lưu giữ dữ liệu, provider thanh toán Web và mức ngân sách. Không hỏi lại lựa chọn nền tảng: Website đã chốt. Có thể duyệt thiết kế/kiến trúc trước, nhưng không khởi công engine hoặc mở bán khi rule tables/nguồn dữ liệu chưa qua cổng nghiệm thu. Danh sách rủi ro và lịch nghiệm thu ở [roadmap](../roadmap/implementation-plan.md).
