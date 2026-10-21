# PRD — Western Astrology Web MVP
21/10/2026. Đã xác nhận: chỉ website, chuyển từ Tử Vi sang Western Astrology, thương hiệu Fate/Constellation. Chưa duyệt: cấu hình tính toán, tên thương hiệu, concept, cách đăng nhập, nhà cung cấp và chi phí. Giữ TUVI STUDIO là tên nội bộ.

## Vấn đề và mục tiêu
Người mới cần hiểu Big 3; người chuyên sâu cần chart có thể kiểm chứng. Website tiếng Việt kết hợp hai mức đọc trên cùng dữ liệu, AI có dẫn chứng và constellation nguyên bản. Nhà chiêm tinh, cung hoàng đạo, cung Tử Vi và con giáp là các khái niệm khác nhau. Dữ liệu thiên văn có thể tính và kiểm chứng; ý nghĩa chiêm tinh là quy ước diễn giải, không phải khoa học dự đoán đã được chứng minh.

## Người dùng và hành trình
- Mới: đọc cung/kiến thức → lập chart tạm (đề xuất không bắt đăng nhập) → Big 3 → khám phá node → tự chọn lưu.
- Chuyên sâu: xác nhận timezone → natal/bảng thông số → cấu hình/nguồn → hỏi AI dựa vào facts.
- Quay lại: đăng nhập → hồ sơ đã lưu → tiếp tục AI → sửa tạo revision mới hoặc xóa.

Beginner/Advanced đổi mật độ thông tin. Chart/Liên kết sao đổi cách nhìn cùng artifact, không thay engine.

## MVP và tiêu chí chấp nhận
| Tính năng | Kết quả yêu cầu |
| --- | --- |
| Landing | Responsive, CTA rõ, minh bạch demo/phương pháp |
| 12 Zodiac Signs | 12 trang biên tập tiếng Việt; không khẳng định Sun tại ranh giới chỉ từ lịch ngày |
| Thư viện | Big 3, hành tinh, nhà, góc hợp và giới hạn, có người biên tập |
| Big 3 | Sun/Moon/Rising từ engine; không rõ giờ thì không có Rising |
| Form sinh | Ngày/giờ/nơi, mức chắc chắn, xác nhận timezone và DST |
| Natal | Chart chuẩn, 10 body, 12 nhà khi đủ dữ liệu, aspects, zoom/chọn và bảng |
| Diễn giải | Hành tinh/nhà/góc hợp với factId/ruleId |
| AI | Mock-first, hai tone cùng grounding, quota và lỗi rõ |
| Tài khoản | Đề xuất yêu cầu khi lưu/sync/AI quota, không chặn nội dung công khai |
| Dashboard | Hồ sơ sao, revision, sửa/xóa/xuất và quyền riêng tư |
| Constellation | View tối giản song song, node/edge có evidence, không thay chart chuẩn |

Phạm vi Constellation tối giản cần duyệt công sức trước M2; không biến thành trò chơi. Bài tình yêu/công việc là nội dung khám phá chung, không thêm synastry/dự báo cá nhân.

## Ngoài MVP
Transits, synastry, solar return, progressions, personalized daily horoscope, Premium/subscription, advanced reports. PWA tùy chọn tương lai. Không native/Expo/RN/EAS/Maestro/app store, không tích hợp thanh toán. Admin sản phẩm đầy đủ không thuộc MVP mới; chỉ xác định quyền quản trị nội dung tối thiểu ở M1, không tự xây dashboard quản trị lớn.

## Chất lượng và dữ liệu
Mobile-first, mục tiêu WCAG 2.2 AA, keyboard/touch, reduced-motion và bảng thay thế. Mục tiêu CWV p75: LCP<=2.5s, INP<=200ms, CLS<=0.1; chưa đo sản phẩm. Public SEO SSR/SSG; chart/chat/dashboard noindex, private/no-store.

Không yêu cầu tên thật/giới tính nếu không cần. Giải thích mục đích trước khi gửi ngày giờ/nơi sinh. Đề xuất guest không ghi DB/raw input vào log; tài khoản không tự đồng ý AI/marketing. RLS owner, tối thiểu dữ liệu AI; thời hạn lưu, backup deletion và khu vực hosting chờ duyệt.

Đo aggregate opt-in: hoàn tất form, lỗi trường, Big3→chi tiết→lưu, mở dẫn chứng AI, lỗi engine/quota. Không gửi dữ liệu sinh/chart/chat vào analytics. Chưa có baseline hay cam kết conversion.

## Gate
Chưa lập trình sản phẩm chính trước duyệt kiến trúc + thiết kế. Engine phải có oracle/fixtures; không dùng AI thay kiểm chứng số học. [Quyết định](decision-recommendations.md), [architecture](../architecture/system-design.md), [roadmap](../roadmap.md), [brand](brand-direction.md). Tài liệu Tử Vi giữ trong [archive](../archive/tuvi-phase02/README.md).
