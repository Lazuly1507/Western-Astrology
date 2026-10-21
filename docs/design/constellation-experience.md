# Constellation Experience — thiết kế đề xuất
Cập nhật 21/10/2026. Có trong định hướng chính thức; chi tiết tương tác và phạm vi beta cần duyệt. Prototype chỉ dùng fixture tổng hợp, chưa phải kết quả sinh thật.

## Chart và Constellation dùng cùng dữ liệu
Chart truyền thống là công cụ đọc kinh độ, nhà và góc hợp. Constellation là phép chiếu biểu tượng để tìm hiểu mối liên hệ. Hai tab không gọi lại engine, không thay cấu hình và không tạo kết quả mới. Giữ cùng chartId, revision, selectedFactId, bộ lọc; đổi tab giữ selection. URL chia sẻ công khai không chứa ngày sinh hay ID hồ sơ riêng tư.

| Phần tử | Quy tắc bắt buộc |
| --- | --- |
| Node | ID body/angle có trong artifact. Một node một fact; không tạo “ngôi sao số phận” từ suy đoán |
| Vị trí | Hàm xác định từ kinh độ chart và preset projection được version hóa; không random |
| Edge | Có aspectId cùng hai bodyId, tên góc, góc chính xác và orb; không nối chỉ để đẹp |
| Nhóm | Nếu bật, nhóm theo connected components của các aspect đang lọc; nhãn mô tả, không xếp hạng vận may |
| Ánh sáng | Selection/focus hoặc có bằng chứng tương tác; độ sáng không có nghĩa “mạnh/yếu” nếu chưa định nghĩa metric |
| Trang trí | Dấu chấm nền aria-hidden, không thể chọn, không có tên/ý nghĩa chiêm tinh |

Phép chiếu prototype: góc từ kinh độ hoàng đạo, bán kính định sẵn theo body ID để tránh chồng; edge từ bộ aspect fixture. Đây không phải bản đồ bầu trời 3D, vị trí sao thật, chòm sao IAU hay cây năng lực. Production phải tái tạo được tọa độ từ cùng artifact + projectionVersion. Không kéo node tùy ý rồi hiểu là thay đổi chiêm tinh.

## Luồng sử dụng
1. Nhập ngày, giờ (hoặc “không rõ”), nơi sinh, xem xác nhận timezone và bất định.
2. Xem Big 3. Nếu chưa biết giờ: không có Rising/ASC, MC hoặc nhà; Moon hiển thị khoảng nếu đi qua ranh giới cung.
3. Mặc định chart chuẩn. Chọn “Liên kết sao” để khám phá; chú giải ngay cạnh tên tab.
4. Chạm/click/Tab+Enter một node mở panel: vị trí chính xác, giải thích dễ hiểu, aspect liên quan, nguồn fact.
5. “Hỏi AI về điểm này” chuyển cùng factId sang AI; trả lời có thể quay về chart.
6. Lưu cần tài khoản và sự đồng ý riêng; chưa đăng nhập vẫn xem bản đồ tạm.

Khi không có aspect thuộc bộ lọc, hiển thị các node độc lập và lời giải thích “không có liên kết theo quy tắc đang chọn”, không bịa edge. Khi unknown-time, không vẽ angle/house; aspect thay đổi trong khoảng ngày được đánh dấu không chắc chắn hoặc loại khỏi liên kết chắc chắn.

## Desktop và mobile
Desktop: vùng đồ họa và panel cạnh nhau; zoom/reset, legend, bảng dữ liệu luôn truy cập được. Mobile: đồ họa vuông, pan/zoom trong vùng riêng khi phóng to, cuộn trang ngoài vùng không bị khóa; panel dưới đồ họa, nút trước/sau node và danh sách thay thế. Không dùng hover làm cách đọc duy nhất. Touch target >=44 px; focus ring và label đọc được. Zoom của trình duyệt vẫn hoạt động.

Không tự chạy camera, nhấp nháy, particle loop hoặc âm thanh. Ưu tiên SVG; chuyển opacity/transform ngắn khi có thao tác. prefers-reduced-motion bỏ chuyển động; không tải WebGL/three.js trong MVP. Nếu frame thấp, bỏ hiệu ứng trang trí trước, giữ dữ liệu và tương tác.

## Traceability và AI
Một diễn giải gồm claimId, factIds, ruleIds, uncertainty và text. Endpoint kiểm tra các ID thuộc artifact hiện tại; schema đúng chưa đủ chứng minh nội dung đúng. Hai tone dùng cùng facts và uncertainty. Lời kể không tạo thêm hành tinh/nhà, sự kiện tương lai hay khẳng định khoa học. Bảng dữ liệu chuẩn luôn có thể đối chiếu.

## Acceptance trước beta
- Tất cả node/edge có evidence hợp lệ; selection giữa hai view giữ nguyên.
- Projection ổn định theo revision/version; không dùng Math.random cho semantic geometry.
- Known/unknown/uncertain time, không aspect, dữ liệu lỗi và artifact cũ đều có hành vi xác định.
- Chuột, bàn phím, touch, reduced-motion, trình đọc màn hình và text/table alternative.
- Không overflow trang ở 375/768/1024/1440 px; zoom không mất nút reset.
- So sánh originality và ghi nguồn tài sản; không dùng asset, font hoặc layout độc quyền game.

Các kiểm tra trên là tiêu chí triển khai; kết quả prototype thực chạy ghi tại [báo cáo](../phase-02-report.md).
