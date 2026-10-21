# Trường phái và khác biệt quy tắc

Trạng thái nghiên cứu sơ bộ, **chưa phê duyệt ruleset**, 21/10/2026. Nguồn đọc trực tiếp: [eTuvi — Nam/Bắc phái](https://www.etuvi.vn/kien-thuc/nam-phai-va-bac-phai/), [iztro — thuật ngữ](https://iztro.com/vi_VN/learn/basis), [iztro — API lịch/giờ](https://iztro.com/vi_VN/quick-start). Đây là tài liệu của người triển khai/thực hành, không chứng minh một phái đúng hơn hoặc phổ biến hơn bằng số liệu.

## Phân biệt ba lớp

1. **Lịch pháp và thời gian:** chuyển lịch, timezone, ranh ngày/giờ. Lỗi ở đây có thể làm thay đổi đầu vào cho mọi phái.
2. **Quy tắc lập chart:** Mệnh/Thân/Cục, sao, hóa, vòng sao, vận. Phải có bảng và thuật toán phiên bản hóa.
3. **Cách luận:** trọng số của quan hệ cung/sao, quan niệm và diễn giải. Không để cách luận tự thay dữ liệu chart.

## Các hướng được nhắc đến tại Việt Nam

| Hướng gọi | Trọng tâm được nguồn mô tả | Phạm vi cần làm rõ | Định hướng sản phẩm đề xuất |
| --- | --- | --- | --- |
| Tam hợp, thường gọi Nam phái | Cấu trúc tinh hệ và các cung liên quan | Bảng độ sáng, cách cục, phụ tinh và cách dùng Tứ hóa không đồng nhất giữa tác giả | Profile nền có bảng nguồn cụ thể; không lấy tên “Nam phái” thay bộ quy tắc |
| Tứ hóa/Phi tinh, thường gọi Bắc phái | Quan hệ hóa và biến động giữa cung | Hóa năm sinh, can cung, tự hóa, lưu hóa phải được phân biệt | V2: profile/overlay riêng; tránh gộp toàn bộ vào MVP |
| Thiên Lương và các cách luận Việt hóa theo tác giả | Tên hướng thực hành xuất hiện trong tài liệu [Cổ Học](https://tuvi.cohoc.net/lap-la-so-tu-vi.html) | Chưa đọc được ấn bản gốc để xác nhận hệ thống công thức đầy đủ; không suy ra một bộ bảng từ tên tác giả | Thu thập sách/ấn bản hợp pháp và chuyên gia review trước khi hỗ trợ |
| Các bản phối hợp | Nhà cung cấp có thể kết hợp lớp cấu trúc và lớp động | Đó là lựa chọn của sản phẩm/tác giả, không phải tiêu chuẩn chung | Chỉ ghép khi chỉ rõ nguồn mỗi lớp và không có rule conflict |

Nguồn eTuvi cũng ghi nhận ranh giới tên gọi Nam/Bắc không tuyệt đối. Không suy luận rằng người theo Tam hợp không dùng Tứ hóa, hoặc mọi implementation có nhãn giống nhau sẽ cho chart giống nhau. Nhãn “phổ biến” trong nguồn là mô tả của tác giả, chưa có thống kê độc lập trong nghiên cứu này.

## Ma trận tranh luận và cách phân xử

| Rule ID | Lựa chọn cần so sánh | Vì sao quan trọng | Phép thử phân biệt | Khuyến nghị trình duyệt |
| --- | --- | --- | --- | --- |
| TIME-01 | Đổi ngày 00:00 hay xử lý Tý muộn từ 23:00 theo ngày kế | Có thể đổi ngày âm dùng an sao | Cùng ngày 22:59, 23:00, 23:59, 00:00 và 00:59 | Civil midnight, ghi Tý sớm/muộn rõ; vẫn chờ duyệt |
| TIME-02 | Giờ đồng hồ địa phương hay giờ Mặt Trời thực | Có thể đổi chi giờ khi gần biên | Cùng phút gần 2 biên giờ, khác kinh độ | Giờ dân sự; giờ Mặt Trời thực ngoài MVP |
| CAL-01 | Lịch Việt UTC+7 hay dùng nguyên thư viện lịch UTC+8 | Sóc gần nửa đêm có thể khác ngày/tháng | Ca sóc sát ranh 2 timezone, giữ nguồn thiên văn | Lịch Việt có adapter riêng; không dùng bảng HKO làm oracle VN mặc định |
| LEAP-01 | Giữ số tháng nhuận hay quy đổi theo nửa tháng | Đổi tháng dùng an Mệnh/Thân/sao | Ngày 1, 15, 16, 29/30 của tháng nhuận thực | Giữ số tháng là candidate A; candidate B chia nửa tháng phải có ID khác |
| STAR-01 | Bảng Tứ hóa khác nhau tại một số can | Đổi sao nhận hóa và lời luận | Chạy đủ 10 can, so sánh từng tuple 4 hóa | Chốt bảng duy nhất có nguồn trong profile; chưa chép bảng chưa thẩm định |
| STAR-02 | Bảng miếu/vượng/đắc/hãm và phụ tinh khác nhau | Khác nhãn sức mạnh hoặc placement | 12 vị trí × sao có trạng thái, theo từng bản sách | Không gộp nhãn thành số điểm chung; mỗi bảng có version |
| CYCLE-01 | Tuổi mụ/dương lịch, khởi hạn và giao vận | Khác năm bắt đầu/kết thúc | Tuổi Cục−1, Cục, Cục+9, Cục+10 và Tết/sinh nhật | Khoảng tuổi mụ có cận rõ; người duyệt xác nhận cách đổi tuổi ra ngày |
| CYCLE-02 | Tiểu hạn, lưu Thái Tuế, lưu niên đại hạn | Thuật ngữ có thể chỉ lớp khác nhau | Yêu cầu source chỉ ra output từng lớp cho 12 chi năm | Schema đặt ID riêng, không alias các lớp thành một trường |
| REGION-01 | Áp một timezone thành phố cho mọi sinh trước 1976 | Có thể sai ngữ cảnh lịch sử miền | Đối chiếu địa điểm và mốc offset thực | Không tự tính giai đoạn lịch sử chưa có profile vùng |

[Tài liệu iztro](https://iztro.com/vi_VN/quick-start) có tham số Tý sớm/muộn và `fixLeap` điều chỉnh tháng nhuận. Đó là bằng chứng lựa chọn implementation tồn tại, không phải xác nhận mặc định của thư viện là quy tắc Việt Nam. [IANA asia](https://data.iana.org/time-zones/tzdb/asia) ghi nhiều offset lịch sử cho miền Nam và cảnh báo chất lượng nguồn lịch sử; không đủ để gán `Asia/Ho_Chi_Minh` cho mọi miền/thời kỳ.

## Nguồn còn thiếu

- Chưa có sách/ấn bản/trang hợp pháp được chuyên gia ký xác nhận cho bộ bảng chính/phụ tinh, Tứ hóa, độ sáng và tiểu hạn.
- URL lịch của Hồ Ngọc Đức tại `informatik.uni-leipzig.de/~duc/amlich/` không đọc được trong phiên; không tuyên bố đã xác minh thuật toán/giấy phép từ đó.
- Hai repo thiếu license đã nêu ở [báo cáo setup](../agent-setup-report.md) không được dùng làm nguồn sao chép implementation.

Việc tiếp theo là duyệt **profile theo từng rule ID**, không bỏ phiếu tên phái rồi coi mọi chi tiết đã được quyết định.
