---
name: tu-vi-dau-so-research
description: Nghiên cứu và luận giải Tử Vi Đẩu Số Việt Nam theo phương pháp đối chiếu nhiều tầng. Dùng khi cần chuẩn hóa lá số, luận Mệnh–Thân–Cục, tam phương tứ chính, tứ hóa, đại vận/lưu niên, phân tích sự nghiệp–tài chính–hôn nhân–gia đình, hiệu chỉnh giờ sinh, so sánh trường phái, nghiệm lý hoặc phản biện một bản luận. Bắt buộc truy vết chứng cứ, nêu phản chứng và tránh phán theo một sao.
license: MIT
compatibility: Dùng được với các client hỗ trợ chuẩn Agent Skills. Không yêu cầu mạng hoặc công cụ ngoài; Python 3 chỉ cần khi chạy các script kiểm tra tùy chọn.
metadata:
  author: Duan Digi
  version: "1.0.0"
  language: vi
  domain: tu-vi-dau-so
---

# Tử Vi Đẩu Số Research Skill

## Mục đích

Thực hiện nghiên cứu và luận giải Tử Vi Đẩu Số Việt Nam theo hướng cổ điển, có cấu trúc, có đối chiếu và có thể truy vết. Không đóng vai “thầy phán số”. Luôn phân biệt:

- dữ kiện được chép từ lá số;
- quy tắc từ nguồn hoặc trường phái;
- suy luận kết nối của hệ thống;
- dữ kiện thực tế dùng để nghiệm lý;
- phần chưa đủ căn cứ.

Tử Vi là hệ thống diễn giải truyền thống, không phải khoa học thực nghiệm đã được xác nhận. Dùng kết quả để tham khảo và tự quan sát, không thay thế quyết định y tế, pháp lý, tài chính hay hỗ trợ tâm lý.

## Khi nào kích hoạt

Dùng skill này khi người dùng yêu cầu một hoặc nhiều việc sau:

1. Chuẩn hóa dữ liệu sinh hoặc chép cấu trúc 12 cung từ ảnh/PDF/lá số.
2. Luận cấu trúc gốc: Mệnh, Thân, Cục, âm dương, tam phương tứ chính.
3. Luận một chủ đề: sự nghiệp, tài chính, hôn nhân, con cái, cha mẹ, đi xa, sức khỏe theo nghĩa xu hướng truyền thống, Phúc Đức hoặc nội tâm.
4. Luận đại vận, tiểu vận, lưu niên hoặc so sánh nhiều giai đoạn.
5. So sánh hai giờ sinh bằng sự kiện quá khứ.
6. So sánh cách giải giữa sách hoặc trường phái.
7. Phản biện một bản luận, phát hiện câu chung chung, thiếu chứng cứ hoặc mâu thuẫn.
8. Tạo hồ sơ ca nghiệm lý hoặc kho tri thức sao/cách cục.

Không kích hoạt chỉ để trả lời một câu hỏi thuần khoa học, y khoa hoặc pháp lý không liên quan đến Tử Vi.

## Chọn chế độ làm việc

Xác định chế độ trước khi phân tích:

- `INGEST`: chép và chuẩn hóa lá số, chưa luận.
- `CORE`: luận cấu trúc gốc.
- `TOPIC`: luận một chủ đề cụ thể.
- `TIMING`: luận vận hạn và thời điểm.
- `RECTIFY`: hiệu chỉnh giờ sinh.
- `SOURCE_COMPARE`: so sánh nguồn/trường phái.
- `CRITIQUE`: phản biện bản luận.
- `VALIDATE_CASE`: nghiệm lý ca đã khóa dự đoán.

Nếu yêu cầu bao gồm nhiều chế độ, thực hiện theo thứ tự: `INGEST → CORE → TOPIC → TIMING → VALIDATE_CASE`.

## Quy trình bắt buộc

### Bước 1 — Kiểm tra chất lượng đầu vào

Xác minh những gì đã có:

- ngày sinh và loại lịch;
- tháng nhuận nếu dùng âm lịch;
- giờ sinh và khoảng sai số;
- nơi sinh, múi giờ;
- giới tính dùng để an vận;
- nguồn lập lá số và trường phái nếu biết;
- độ rõ của ảnh/PDF hoặc bảng 12 cung.

Gắn mức đầu vào:

- `A — Cao`: dữ liệu rõ, không sát ranh giờ;
- `B — Khá`: sai số nhỏ, không ảnh hưởng chi giờ;
- `C — Thấp`: gần ranh giờ hoặc nhớ theo khoảng;
- `D — Chưa dùng được`: thiếu dữ liệu cốt lõi hoặc lá số không đọc được.

Không được tự lấp dữ liệu còn thiếu. Khi vẫn có thể phân tích một phần, tiếp tục và đánh dấu giới hạn thay vì dừng toàn bộ.

Xem mẫu chi tiết tại [references/INPUT_AND_CHART_SCHEMA.md](references/INPUT_AND_CHART_SCHEMA.md).

### Bước 2 — Khóa dữ kiện lá số

Trước khi diễn giải:

1. Chép đủ 12 cung.
2. Ghi chính tinh, phụ tinh, sát tinh, tứ hóa, Tuần/Triệt, vòng Tràng Sinh nếu có.
3. Ghi Mệnh, Cục, Thân và chiều vận.
4. Đánh dấu dữ kiện không đọc chắc.
5. Không thay đổi dữ kiện gốc để làm cho phần luận “khớp”.

Nếu người dùng cung cấp ảnh/PDF, ưu tiên đọc chính dữ liệu trên lá số; không tự an sao bằng trí nhớ để thay thế nội dung nhìn thấy.

### Bước 3 — Luận theo chín tầng

Mọi kết luận quan trọng phải đi qua các tầng phù hợp:

1. Chất lượng dữ liệu.
2. Mệnh–Cục–Âm Dương.
3. Mệnh và Thân.
4. Chính cung: chính tinh, trạng thái, phụ tinh đồng cung.
5. Tam phương tứ chính: hai cung tam hợp và cung xung chiếu.
6. Cung giáp và cung chức năng liên quan.
7. Tứ hóa: sao phát, nơi phát, nơi nhận, chiều tác động.
8. Vận hạn: lá số gốc → đại vận → tiểu hạn → lưu niên → lưu nguyệt.
9. Nghiệm lý và phản chứng.

Đọc [references/REASONING_ENGINE.md](references/REASONING_ENGINE.md) khi cần quy trình chi tiết hoặc xử lý tổ hợp mâu thuẫn.

### Bước 4 — Dùng đúng mạng cung theo chủ đề

Không đọc một cung riêng lẻ:

- Sự nghiệp: Mệnh–Thân–Quan–Tài–Di–Nô–Phúc–Điền.
- Tài chính: Tài–Quan–Điền–Phúc–Mệnh–Di và các sao Lộc/Hao.
- Hôn nhân: Phu–Mệnh–Thân–Phúc–Điền–Quan–Di–Tử.
- Con cái: Tử–Phu–Phúc–Điền–Mệnh và vận.
- Cha mẹ: Phụ–Mệnh–Phúc–Điền–Huynh và vận.
- Sức khỏe theo hệ truyền thống: Tật–Mệnh–Phúc–ngũ hành–vận; không chẩn đoán.
- Đi xa/thay đổi môi trường: Di–Mệnh–Thân–Điền–Quan–Thiên Mã–vận.
- Phúc tổ/nội tâm: Phúc–Mệnh–Thân–Điền và dữ kiện gia tộc; không nhận diện người đã khuất cụ thể.

Đọc [references/PALACE_CROSS_REFERENCE.md](references/PALACE_CROSS_REFERENCE.md) khi luận theo chủ đề.

### Bước 5 — Lập ma trận chứng cứ

Mỗi kết luận phải có:

- câu kết luận;
- loại: `cấu trúc`, `kịch bản`, hoặc `thời điểm`;
- chứng cứ thuận;
- phản chứng hoặc yếu tố làm giảm độ mạnh;
- điều kiện biểu hiện;
- vận kích hoạt nếu đang luận thời điểm;
- mức tin cậy;
- câu hỏi nghiệm lý.

Nhãn chứng cứ được phép:

- `TỌA_THỦ`
- `TAM_HỢP`
- `XUNG_CHIẾU`
- `GIÁP_CUNG`
- `TỨ_HÓA`
- `MỆNH_CỤC`
- `VẬN_HẠN`
- `NGHIỆM_LÝ`
- `TRƯỜNG_PHÁI`
- `SUY_LUẬN`

Dùng [assets/templates/evidence-matrix.md](assets/templates/evidence-matrix.md) khi cần bảng chuẩn.

### Bước 6 — Xử lý mâu thuẫn

Khi dấu hiệu trái chiều:

1. Nêu riêng nhóm thuận và nhóm nghịch.
2. Xác định chúng thuộc lá số gốc, thế chiếu, tứ hóa hay vận hạn.
3. Không xóa sát tinh chỉ vì có cát tinh; không phóng đại sát tinh khi có cơ chế giảm tác động.
4. Phân biệt “có năng lực” với “dễ dùng được năng lực”.
5. Kết luận theo điều kiện: “có xu hướng X, nhưng dễ chuyển thành Y khi Z”.
6. Nếu hai trường phái không thống nhất, giữ giả thuyết A/B và ghi nguồn.

### Bước 7 — Phân loại mức tin cậy

Chỉ dùng bốn mức định tính:

- `Rất mạnh`: ít nhất ba tầng tương đối độc lập cùng xác nhận, không có phản chứng lớn.
- `Mạnh`: hai hoặc ba tầng xác nhận, phản chứng đã được giải thích.
- `Trung bình`: cấu trúc hợp lý nhưng thiếu vận, thiếu dữ kiện hoặc phụ thuộc trường phái.
- `Yếu/Chưa đủ căn cứ`: một dấu hiệu đơn lẻ, đầu vào yếu hoặc mâu thuẫn lớn.

Không dùng phần trăm nếu chưa có bộ dữ liệu thống kê đủ chuẩn.

### Bước 8 — Tách bản chất, khả năng và sự kiện

- `Bản chất`: cấu trúc gốc, có xu hướng lặp dài hạn.
- `Khả năng có điều kiện`: chỉ biểu hiện khi môi trường hoặc lựa chọn phù hợp.
- `Sự kiện`: cần vận hạn kích hoạt và nhiều tầng hội tụ.
- `Thời điểm`: chỉ nêu khi có dữ liệu vận đầy đủ.

Không dùng một sao lưu để phủ định lá số gốc. Không dùng một đại vận tốt để kết luận cả đời tốt.

### Bước 9 — Xuất báo cáo có thể kiểm tra

Mặc định dùng cấu trúc:

1. Độ tin cậy đầu vào.
2. Phạm vi đang luận.
3. Cấu trúc cốt lõi.
4. Bảng chứng cứ chính.
5. Luận giải chủ đề.
6. Đối chiếu cung liên quan.
7. Dấu hiệu thuận và nghịch.
8. Vận kích hoạt, nếu có.
9. Các kịch bản biểu hiện thực tế.
10. Mức tin cậy cho từng kết luận.
11. Câu hỏi nghiệm lý cụ thể.
12. Giới hạn và phần chưa đủ căn cứ.

Dùng [references/OUTPUT_CONTRACT.md](references/OUTPUT_CONTRACT.md) và [assets/templates/analysis-report.md](assets/templates/analysis-report.md) để tạo đầu ra dài.

## Quy tắc theo từng chế độ

### `INGEST`

- Chỉ chép dữ liệu và đánh dấu sai số.
- Chưa luận tính cách hoặc sự kiện.
- Trả bảng 12 cung và danh sách điểm cần xác minh.

### `CORE`

- Bắt đầu từ Mệnh–Cục–Thân.
- Luận Mệnh–Tài–Quan–Di trước khi đi 12 cung.
- Xác định 3–5 cấu trúc chủ lực, không liệt kê rời rạc toàn bộ sao.

### `TOPIC`

- Xác định mạng cung liên quan.
- Tách năng lực, cơ chế, điểm nghẽn và điều kiện biểu hiện.
- Không chỉ định một nghề, một mẫu người hoặc một kết quả duy nhất từ một sao.

### `TIMING`

- Luôn theo thứ tự lá số gốc → đại vận → tiểu hạn → lưu niên → lưu nguyệt.
- So sánh năm trước/năm sau khi cần phân biệt xu hướng với đỉnh kích hoạt.
- Chỉ nâng thành “khả năng sự kiện” khi có nhiều tầng hội tụ.
- Đọc [references/LUCK_CYCLE_ENGINE.md](references/LUCK_CYCLE_ENGINE.md).

### `RECTIFY`

- Lập hai hoặc nhiều giả thuyết giờ sinh.
- Dùng sự kiện có năm/tháng và tính chất rõ.
- Ghi dự đoán của từng lá số trước khi mở toàn bộ dữ kiện thực tế.
- Chấm `khớp rõ`, `khớp một phần`, `không khớp`, `không thể kiểm chứng`.
- Không dùng câu tính cách phổ quát để chốt giờ.

### `SOURCE_COMPARE`

- Ghi tác giả, sách, ấn bản, chương/trang nếu có.
- Tách phần đồng thuận và phần riêng của trường phái.
- Không tự hòa giải mâu thuẫn nguồn.
- Đọc [references/SOURCE_POLICY.md](references/SOURCE_POLICY.md).

### `CRITIQUE`

Tìm và sửa các lỗi:

- một sao phán một việc;
- bỏ tam phương tứ chính;
- không có phản chứng;
- nhầm bản chất với sự kiện;
- nói tuyệt đối;
- câu Barnum/chung chung;
- thiếu nguồn;
- bẻ dữ kiện sau khi biết kết quả;
- dùng vận hạn để phủ định toàn bộ cấu trúc gốc.

### `VALIDATE_CASE`

- Ẩn danh dữ liệu cá nhân.
- Khóa dự đoán trước khi mở kết quả.
- Không sửa dự đoán cũ; chỉ thêm phiên bản mới và lý do.
- Ghi cả kết quả không khớp.
- Đọc [references/CASE_VALIDATION_PROTOCOL.md](references/CASE_VALIDATION_PROTOCOL.md).

## Điều cấm và giới hạn

- Không khẳng định chắc chắn ngày chết, tai nạn, bệnh nặng, ly hôn, ngoại tình, phá sản hoặc phạm pháp.
- Không nhận diện vong, người âm, lời nguyền hoặc người đã khuất cụ thể từ lá số.
- Không gán đạo đức xấu vì sát tinh, đào hoa hoặc Hóa Kỵ.
- Không dùng Tử Vi để chẩn đoán hoặc trì hoãn khám chữa bệnh.
- Không hướng dẫn người dùng đưa ra quyết định tài chính/pháp lý quan trọng chỉ dựa trên lá số.
- Không sao chép dài nguyên văn sách có bản quyền.
- Không giả vờ đã đọc nguồn hoặc lá số khi dữ liệu chưa được cung cấp.

Khi người dùng yêu cầu kết luận tuyệt đối, chuyển thành: dấu hiệu, điều kiện, phản chứng, vận kích hoạt và giới hạn.

## Tài nguyên

Chỉ mở tài liệu cần cho nhiệm vụ hiện tại:

- Chuẩn đầu vào: [references/INPUT_AND_CHART_SCHEMA.md](references/INPUT_AND_CHART_SCHEMA.md)
- Động cơ luận: [references/REASONING_ENGINE.md](references/REASONING_ENGINE.md)
- Kho tri thức sao: [references/STAR_KNOWLEDGE_BASE.md](references/STAR_KNOWLEDGE_BASE.md)
- Đối chiếu cung: [references/PALACE_CROSS_REFERENCE.md](references/PALACE_CROSS_REFERENCE.md)
- Vận hạn: [references/LUCK_CYCLE_ENGINE.md](references/LUCK_CYCLE_ENGINE.md)
- Hợp đồng đầu ra: [references/OUTPUT_CONTRACT.md](references/OUTPUT_CONTRACT.md)
- Nghiệm lý: [references/CASE_VALIDATION_PROTOCOL.md](references/CASE_VALIDATION_PROTOCOL.md)
- Chính sách nguồn: [references/SOURCE_POLICY.md](references/SOURCE_POLICY.md)
- Thư viện tác vụ: [references/PROMPT_LIBRARY.md](references/PROMPT_LIBRARY.md)
- Schema máy đọc: [assets/schemas/case.schema.json](assets/schemas/case.schema.json)

## Kiểm tra cuối trước khi trả lời

- [ ] Đã ghi độ tin cậy đầu vào.
- [ ] Không có kết luận quan trọng dựa trên một sao.
- [ ] Đã dùng đúng tam phương và cung liên đới.
- [ ] Đã tách dữ kiện khỏi diễn giải.
- [ ] Có phản chứng hoặc điều kiện làm kết luận yếu đi.
- [ ] Đã tách bản chất khỏi sự kiện và thời điểm.
- [ ] Mỗi kết luận có mức tin cậy.
- [ ] Không có ngôn ngữ hù dọa hoặc tuyệt đối.
- [ ] Có câu hỏi nghiệm lý cụ thể khi phù hợp.
- [ ] Đã nêu giới hạn của hệ thống.
