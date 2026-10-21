# Local design review
Bản mẫu Western Astrology độc lập, không phải sản phẩm chính. Mở [index.html](index.html) bằng trình duyệt hoặc chạy từ root workspace:

~~~powershell
& 'C:/Users/lazul/AppData/Local/Python/pythoncore-3.15-64/python.exe' -m http.server 8765 --bind 127.0.0.1 --directory docs/design/prototype
~~~

Sau đó vào http://127.0.0.1:8765/#home. Chỉ bind loopback, không publish. Ctrl+C dừng server. Đổi Concept A/B/C ở thanh review; dùng menu để xem form/chart/AI/dashboard/zodiac/knowledge.

Fixture synthetic-01 tự tạo để thử giao diện, không được tính từ ngày giờ trong form, không phải ngày sinh thực. Có 10 body, 12 nhà Whole Sign minh họa khi known-time và chỉ ba aspect mẫu. Nhánh unknown không tính khoảng thật, chỉ minh họa unavailable state; production cần engine interval. Chat là text soạn sẵn, đăng nhập/lưu/xóa chỉ memory; reload xóa state. Không API, email, billing, DB, localStorage hoặc tài sản/font bên ngoài.

Tên Tinh Đồ và các concept chưa được duyệt. [Decisions](../../product/decision-recommendations.md), [chart experience](../constellation-experience.md). Prototype Tử Vi cũ ở archive, ảnh không có tiền tố western là lịch sử.
