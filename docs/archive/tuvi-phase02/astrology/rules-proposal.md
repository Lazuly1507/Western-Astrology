# Đề xuất ruleset TUVI-VN-A

**DRAFT, chưa được chủ dự án duyệt.** Đây là hợp đồng nghiệp vụ cho M2, không phải engine hoặc tiêu chuẩn Tử Vi duy nhất. Không chạy công thức dưới đây để luận chart cá nhân trước khi có bảng nguồn và fixture được xác nhận. Xem [bảng tranh luận](school-comparison.md) và [kế hoạch xác minh](validation-plan.md).

## Hai phương án để duyệt

| Phương án | Nội dung | Chi phí/rủi ro tương đối |
| --- | --- | --- |
| **A — TUVI-VN-A, khuyến nghị MVP** | Lịch Việt, giờ dân sự, Tam hợp làm lớp đọc cấu trúc, Tứ hóa năm sinh theo bảng được chọn; chưa phi hóa can cung | Phạm vi hẹp, dễ đối chiếu; vẫn phải duyệt toàn bộ bảng và ranh thời gian |
| B — Hai profile Tam hợp/Phi tinh từ đầu | Hai bộ rules có ID khác, UI cho đối chiếu, AI không trộn | Thêm oracle, fixture, explainability và UX; ước tính tăng 30–50% công sức M2/M4 như giả định lập kế hoạch, chưa benchmark |

Không chọn implementation hoặc license bằng sự tương đồng tên phái. Phương án A được đề xuất để kiểm soát phạm vi, không vì có bằng chứng khoa học mạnh hơn B.

## Registry và phạm vi đầu vào

Mỗi quy tắc có: `ruleId`, `profileId`, `version`, tác giả/ấn bản/trang hoặc commit/path, mô tả đầu vào/đầu ra, checksum bảng nếu có, reviewer, fixture IDs, trạng thái `draft/reviewed/approved/retired`. Chỉ ruleset có mọi dependency `approved` mới được dùng cho chart production.

Đề xuất pilot hỗ trợ **sinh tại Việt Nam từ 01/01/1976 đến hiện tại**, kiểm chứng phạm vi này trước; calendar/cycle có thể cần ngày tương lai đến 2099. Không coi 1900–2099 trong form prototype là phạm vi engine đã được chấp thuận. Sinh trước 1976/ngoài Việt Nam trả `UNSUPPORTED_BIRTH_CONTEXT` tới khi profile lịch sử/vùng được duyệt ở V1. Đây là tradeoff sản phẩm cần chủ dự án quyết định; nếu bắt buộc hỗ trợ từ 1900 ngay MVP, tăng hạng mục lịch pháp trước M2.

Input: loại lịch, ngày/tháng/năm, leap flag âm lịch, giờ dân sự và độ chắc chắn, địa điểm/timezone, quy ước giới tính dùng an vận, năm cần xem. Tên hiển thị không tham gia tính. Ngày sinh tương lai bị từ chối theo ngày địa phương được hỗ trợ; ngày-only không được parse thành UTC instant ngầm.

## Đề xuất pipeline tính và tiêu chí duyệt

| Rule | Candidate trình duyệt | Chứng cứ/đầu việc còn lại |
| --- | --- | --- |
| CAL-BASE | Chuyển lịch âm dương theo sóc/trung khí và ngày dân sự tại timezone lịch Việt; lưu raw input và kết quả cả hai lịch | [HKO](https://www.hko.gov.hk/en/gts/time/calendarinfo.htm) giải thích hệ âm dương/sóc, **không xác nhận bảng lịch Việt**. Phải chọn thư viện có license, khảo sát độ chính xác và oracle VN trước viết engine |
| TZ-BASE | Tách timezone ngày sinh và timezone lịch dùng đổi ngày âm; profile pilot ghi rõ cả hai; không cộng/trừ UTC+7 lần nữa sau normalization | [IANA](https://data.iana.org/time-zones/tzdb/asia); chốt phiên bản tzdb và nguồn bổ sung nếu phạm vi mở rộng |
| DAY-BASE | Đổi ngày dân sự ở 00:00; 23:00–23:59 thuộc ngày dân sự hiện tại, đồng thời hour branch Tý. Không suy ra cùng quy tắc ngày với mọi phái | Lựa chọn dự án, **chưa duyệt**; đặc biệt cần fixture ngày 23h và 00h |
| LEAP-BASE | Calendar giữ `isLeapMonth`; tháng dùng an cung theo đúng số tháng của tháng nhuận, không tự chia nửa | Lựa chọn A, không kế thừa `fixLeap=true` mặc định [iztro](https://iztro.com/vi_VN/quick-start); cần hai chuyên gia đối chiếu ca ngày 15/16 |
| MENH-THAN | Candidate branch index: Tý=0, Sửu=1,…; `h=0` là Tý, `m=1..12`; `menh=mod(2+(m-1)-h,12)`, `than=mod(2+(m-1)+h,12)` | Đây là cách đặc tả quy tắc đếm khởi Dần/tháng Giêng để chuyên gia duyệt, không claim công thức đã nghiệm thu. Chạy đủ 12×12 cặp và so bản nguồn được chọn |
| PALACE-ROLES | Từ Mệnh, giảm branch index: Mệnh → Huynh Đệ → Phu Thê → Tử Tức → Tài Bạch → Tật Ách → Thiên Di → Nô Bộc → Quan Lộc → Điền Trạch → Phúc Đức → Phụ Mẫu | Duyệt hướng và alias tên. Nhân bàn role khác địa chi; mọi UI dùng IDs, không tự an lại |
| CUC | Xác định can/chi cung Mệnh bằng bảng can cung của nguồn đã chọn; tra nạp âm rồi Cục. Mapping candidate: Thủy 2, Mộc 3, Kim 4, Thổ 5, Hỏa 6 | [iztro basis](https://iztro.com/vi_VN/learn/basis) mô tả Cục và tuổi khởi; **bảng can cung/nạp âm chưa có bản được ký duyệt** |
| MAJOR-STARS | Tử Vi từ ngày âm/Cục theo bảng hoặc công thức đã duyệt; Thiên Phủ và hai hệ chính tinh theo rule riêng | Khóa danh mục 14 chính tinh và offset/direction theo nguồn; 14 placements và tổ hợp phải qua golden chart. Không dùng LLM lập bảng |
| AUX-STARS | Tách nhóm theo năm/can/chi, tháng, ngày, giờ và tổ hợp; vòng sao, Tuần/Triệt có schema riêng | Phải có manifest sao bắt buộc, điều kiện lặp/vắng và rule dependency. Không có con số “100+ sao” cam kết khi danh mục chưa duyệt |
| FOUR-TRANSFORMS | Chỉ lớp năm sinh MVP; lookup 10 can × 4 hóa từ bảng riêng, mỗi hóa chỉ sao đích và scope | Chưa có bảng được xác nhận; không lấy prose marketing thành bảng. Phi hóa can cung/tự hóa không bật ngầm |
| DECADE | Candidate khởi theo số Cục, mỗi đoạn 10 tuổi mụ; chiều âm/dương–quy ước giới tính lấy rule riêng; khoảng cận tuổi ghi rõ | Cần duyệt bảng chiều và ngày quy đổi tuổi; `startAge` inclusive, `endAgeExclusive=startAge+10` |
| ANNUAL | Tiểu hạn và lưu niên tính riêng theo bảng rule; năm truy vấn explicit, không dùng năm máy chủ ngầm | Duyệt cách gọi/chiều/bảng, năm bắt đầu theo Tết hay quy tắc khác; phải xuất `period.start/end` và `scope` riêng |
| INTERPRET | Dùng chart immutable + rule text có license; claim có dữ kiện thuận/nghịch, điều kiện và giới hạn | Không biến nhãn độ sáng thành xác suất, không chỉnh chart để phù hợp câu chuyện |

`mod` phải trả số 0–11 kể cả biểu thức âm. Công thức giờ phải phân biệt các biên 01,03,…,23h; với candidate ngày 00:00, Tý sớm/muộn không đồng nghĩa cùng ngày. Mệnh/Thân là index, không phải luận giải hoặc “mệnh nạp âm năm sinh”.

## Hợp đồng dữ liệu và bất biến

Chart có schema/engine/ruleset/calendar/tzdb versions; 12 địa chi duy nhất, 12 roles duy nhất; Mệnh/Thân/Cục và mọi sao có rule provenance. Không tính được phải trả error/unavailable, không điền 0 hoặc mảng rỗng để giả thành chart hoàn chỉnh. Bản base và overlay vận hạn có content hash riêng; generated timestamp không tham gia hash deterministic.

Không công bố chart sau thay đổi ruleset mà không tạo revision. Không tự gộp Tứ hóa bản mệnh và năm xem. AI chỉ dùng trường thực sự có; scope không có `computed` bị loại khỏi claim về thời điểm.

## Nghiệm thu trước khi code engine

Chủ dự án duyệt các rule choices; chuyên gia nghiệp vụ duyệt **bảng can cung/nạp âm, 14 chính tinh, danh mục phụ tinh, Tứ hóa, độ sáng, vòng sao và vận** kèm nguồn được phép sử dụng. Không có các bảng này thì M2 chỉ được làm nghiên cứu/đặc tả và test harness, chưa được phát hành bộ tính. Các nội dung chưa duyệt ở trên là blocker được chỉ tên, không được coi là “chi tiết triển khai” để agent tự quyết.
