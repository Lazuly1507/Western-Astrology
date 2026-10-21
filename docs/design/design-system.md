# Design system — candidate
21/10/2026, chờ duyệt concept. Prototype HTML/CSS/SVG độc lập, không phải code Next.js sản phẩm.

## Token và component
Concept A: background #080f20, surface #111d32, text #eeeae1, muted #b4bdce, accent #e5ca89, border #35455c. B: #f4efe4/#fffaf1/#282538/#62596f/#714734. C: #090e1b/#141d34/#edf4ff/#a8bbd3/#92e6e0. Tất cả dùng token semantic background/surface/text/muted/accent/border; kiểm tra từng cặp contrast trước production, không mặc định mọi tổ hợp đều đạt.

Font offline prototype: Georgia cho heading A/B, Segoe UI/Arial cho UI, monospace cho tọa độ. Production đánh giá font hỗ trợ tiếng Việt, giấy phép và self-host/subset sau duyệt, không tải font bên ngoài trong prototype.

Spacing 4/8/12/16/24/32/48/64; body 16px, line-height khoảng 1.6; text kỹ thuật không thay body bằng chữ siêu nhỏ. Desktop content max khoảng 1200px, mobile padding16px. Breakpoint theo nội dung 700/1000px.

Components: header/nav, review bar riêng khỏi UI sản phẩm, button primary/secondary, labeled field/error summary, segmented control, Big3 summary, chart stage, fact panel, data table, disclosure, message/source, profile row và empty state. Không lồng nhiều card không cần thiết.

## Trạng thái
Form: untouched/invalid/unknown-time/timezone confirmation/submitting/partial/success. Chart: loading/known/uncertain/unavailable house/no aspects/error. AI: mock/streaming/refusal/incomplete/quota/timeout/retry, không silently thay real bằng mock. Auth: guest/login/save consent/expired. Dashboard: empty/list/delete confirmation/export. Demo chỉ thể hiện một phần các trạng thái, acceptance production ở validation plan.

## Đồ họa chart
Vòng ngoài 12 signs, vòng trong 12 houses khi đủ dữ liệu; glyph và marker từ artifact, đường nối từ aspectId. Có chú giải ASC/MC, retrograde, độ/orb và frame/house system. Phân biệt sign và nhà bằng nhãn, đường và text, không chỉ màu. Dữ liệu chưa rõ giờ không dùng midpoint giả như kết quả chắc chắn. Standard Chart và Constellation cùng fact IDs.

## Accessibility và motion
Visible focus, semantic landmarks/labels, lỗi gần field và summary có focus. Node tương tác có tên và keyboard, panel text/tables là đường đọc tương đương. Touch target44px, browser zoom không bị chặn; chart pan chỉ trong stage khi zoom. Reduced-motion tắt animation; không nhấp nháy hay auto camera. Đường/nhãn có contrast riêng; color không mã hóa ý nghĩa duy nhất.

## Asset provenance
index.html/styles.css/prototype.js: dự án tự tạo; glyph Unicode quy ước; system fonts không đóng gói font; không remote image/font/library. Không tài sản hay template Genshin. Trước phát hành kiểm tra toàn bộ license mới, nội dung, lỗi tiếng Việt và similarity với game UI. [Brand](../product/brand-direction.md).
