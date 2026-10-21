# Brand direction — Fate / Constellation
Cập nhật 21/10/2026. Định hướng ba lớp được chủ dự án yêu cầu; tên công khai, concept và copy dưới đây là đề xuất, chưa duyệt. TUVI STUDIO vẫn là tên dự án nội bộ.

## Lời hứa thương hiệu
“Khám phá bản đồ sao, hiểu thêm chính mình.” Dùng cảm giác bí ẩn của các vì sao để mời khám phá; giữ quyền lựa chọn của người dùng. “Bản đồ vận mệnh” là ẩn dụ văn hóa, không phải bằng chứng khoa học về số phận hay lời hứa dự đoán chắc chắn.

| Lớp | Người dùng nhận được | Nguồn sự thật |
| --- | --- | --- |
| A — Khởi đầu | 12 cung hoàng đạo, Big 3, nội dung tính cách/tình yêu/công việc dễ hiểu | Nội dung biên tập; placement đã tính, có bất định |
| B — Đào sâu | Vòng natal, hành tinh, nhà, góc hợp, bảng số liệu và phương pháp | Artifact bất biến từ engine, phiên bản quy tắc |
| C — Khám phá | Điểm sao, liên kết và lời kể biểu tượng trên cùng hồ sơ | Tham chiếu body/angle/aspect từ chính artifact B |

A và B là hai mức độ trình bày, C là một view bổ sung; không tạo ba engine hoặc ba bộ hồ sơ. Người mới mặc định thấy Big 3 và một giải thích ngắn; nút “Xem dữ liệu chiêm tinh” luôn sẵn. Người chuyên sâu có bảng và bộ lọc, không phải đi qua hoạt cảnh.

## Ngôn ngữ thị giác nguyên bản
Lấy cảm hứng ở cấp cảm giác: chiều sâu bầu trời, điểm sáng có ý nghĩa, nét nối mảnh, chuyển động khám phá chậm. Tự thiết kế vòng quỹ đạo lệch tâm, dấu mốc hình tròn và hệ chữ của sản phẩm. Không dùng hình dáng constellation nhân vật, cây mở khóa, thứ tự sáu nút, khung cửa sổ, biểu tượng, font, artwork, hiệu ứng hay tên gọi đặc hữu của Genshin.

Prototype sử dụng HTML/CSS/SVG do dự án tạo và font hệ thống. Glyph chiêm tinh Unicode là ký hiệu quy ước, không lấy từ bộ icon game. Không có ảnh game/reference asset được nhập. Trước phát hành: kiểm tra nguồn gốc từng tài sản, font/license và đánh giá mức tương đồng toàn trang bằng người thiết kế; đây là quy trình giảm rủi ro, không phải kết luận pháp lý về IP.

## Đề xuất tên
| Tên | Cách dùng | Đánh giá |
| --- | --- | --- |
| Tinh Đồ | Thương hiệu công khai được khuyến nghị | Ngắn, gợi bản đồ sao, bao quát giáo dục lẫn công cụ; cần thử đọc và tra cứu nhãn hiệu/domain |
| Quỹ Đạo | Phương án thay thế | Gợi hành trình, ít gắn bói đoán; có thể bị hiểu là thiên văn thuần túy |
| TUVI STUDIO | Giữ tên hiện tại | Không tốn đổi tên nhưng dễ nhầm với Tử Vi Đẩu Số; nên có mô tả Western Astrology rõ |

Chưa tra cứu khả dụng tên miền hay đăng ký nhãn hiệu, chưa mua tên. Không coi tên đề xuất là đã được bảo hộ.

| Tính năng | Tên đề xuất | Giải thích trong UI |
| --- | --- | --- |
| Natal Chart | Bản đồ sao | Vòng chiêm tinh chuẩn |
| Constellation View | Liên kết sao | Biểu đồ biểu tượng từ các góc hợp, không phải chòm sao thiên văn thực |
| Fate Profile | Hồ sơ sao | Tổng hợp natal và nội dung đã lưu; không chấm điểm “định mệnh” |
| AI | Người đồng hành / AI Astrologer | Chế độ Dễ hiểu và Kể chuyện sao; luôn gắn bằng chứng |

## Giọng điệu
Dễ hiểu: “Mặt Trời ở Kim Ngưu thường được liên hệ với nhu cầu ổn định.”
Kể chuyện sao: “Trong ngôn ngữ biểu tượng, Mặt Trời Kim Ngưu gợi hình ảnh một nền đất vững.” Cả hai cùng body:sun, cùng quy ước, cùng mức bất định. Tránh “bạn chắc chắn”, “sẽ giàu”, “chữa bệnh”, “ngày định mệnh” và khơi lo âu để bán thêm.

## Các trang chủ đạo
- Homepage: thông điệp ngắn, một constellation nguyên bản có nhãn demo, CTA lập chart, Big 3 giải thích bằng tiếng Việt, kiến thức và phương pháp.
- Chart page: tóm tắt Big 3 → Chart / Liên kết sao → panel chi tiết và bảng; cấu hình, độ chính xác thời gian và nguồn engine ở cạnh kết quả.
- AI page: chọn hồ sơ, xem nguồn dữ liệu và những gì chưa biết, chọn giọng kể; dẫn chứng đưa về đúng node trên chart.
- Dashboard: Hồ sơ sao đã lưu, độ đầy đủ dữ liệu, tiếp tục cuộc trò chuyện, sửa/xóa/xuất hồ sơ; nội dung khám phá không lấn át nhiệm vụ chính.

Không có “mở khóa ngôi sao” trả phí hoặc fake progression. Premium ngoài MVP, không cài paywall giả trong luồng hiện tại. Xem [experience](../design/constellation-experience.md), [concepts](../design/design-directions.md) và [quyết định](decision-recommendations.md).
