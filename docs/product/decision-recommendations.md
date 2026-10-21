# Decision recommendations — research first
21/10/2026. Chỉ Web + Western Astrology + hướng thương hiệu ba lớp đã được xác nhận. Các khuyến nghị dưới đây **chưa được phê duyệt**; prototype không chốt cấu hình production. Phân biệt: dữ kiện kỹ thuật = có thể kiểm tra; quy ước chiêm tinh = lựa chọn hệ thống; ý kiến thiết kế = giả thuyết cần usability.

## D01 — Zodiac mặc định
1. **Vấn đề:** mốc chia 12 cung theo mùa hay theo nền sao?
2. **Phương án:** Tropical (xuân phân làm gốc); Sidereal (cần ayanamsha cụ thể).
3. **Ưu/nhược:** Tropical phù hợp nhiều công cụ Western tham chiếu, ít lựa chọn ban đầu; Sidereal phục vụ nhóm riêng nhưng nhiều offset, không tương đương chòm sao IAU không đều.
4. **Nghiên cứu:** [Swiss manual](https://www.astro.com/swisseph/swephprg.htm) mô tả các mode; đây là quy ước, không có lựa chọn “đúng số phận” được khoa học chứng minh.
5. **Khuyến nghị:** Tropical mặc định; ghi rõ trên chart. Sidereal không bật trong MVP.
6. **Lý do:** giảm nhầm lẫn, dễ đối chiếu Western và nội dung tiếng Việt nhất quán.
7. **Đổi sau:** vừa; version lại rules/artifact, không diễn giải lại âm thầm chart cũ.
8. **Phê duyệt:** có, cùng gói phương pháp.

## D02 — Hệ thống nhà
1. **Vấn đề:** chia khu vực đời sống trên chart theo cách nào?
2. **Phương án:** Placidus (nhà không đều theo thời gian); Whole Sign (mỗi cung một nhà, cung chứa ASC là nhà 1); Equal (mỗi nhà 30° bắt đầu tại ASC).
3. **Ưu/nhược:** Placidus quen thuộc ở Astrodienst nhưng không tính được ở một số vĩ độ cao; Whole Sign đơn giản, rõ khi học nhưng cho kết quả nhà khác; Equal đơn giản nhưng MC không mặc nhiên là cusp10. Cả ba cần giờ sinh để có ASC.
4. **Nghiên cứu:** [Astrodienst houses](https://www.astro.com/cgi/h.cgi?f=gch&h=gchhouse&lang=e), [đánh giá engine](../astrology/engine-evaluation.md). Sự phổ biến không chứng minh tính dự đoán.
5. **Khuyến nghị:** Tropical + Placidus nếu chọn Swiss; khi Placidus bất khả dụng, thông báo và cho chọn Whole Sign rõ ràng, không silently fallback. Unknown-time không có nhà.
6. **Lý do:** khớp công cụ đối chiếu Western, giữ lối học phổ biến; tránh tự viết công thức khó ở MVP.
7. **Đổi sau:** vừa/cao; nhà và diễn giải thay đổi, tạo revision và giải thích khác biệt.
8. **Phê duyệt:** có. Prototype dùng fixture Whole Sign để minh họa, không phải quyết định thay khuyến nghị.

## D03 — Engine và license
1. **Vấn đề:** độ tin cậy, phạm vi nhà và quyền thương mại.
2. **Phương án:** Swiss Professional trên server; Swiss AGPL với phương án tuân thủ phù hợp; Astronomy Engine MIT + tự triển khai/kiểm chứng angles và Whole Sign/Equal; Skyfield làm oracle nghiên cứu.
3. **Ưu/nhược:** Swiss đầy đủ nghiệp vụ nhưng license/packaging cần xem; MIT giảm ràng buộc license nhưng tăng công số học/QA và không có sẵn bộ nhà tương đương; Skyfield cần Python/JPL, không phải giải pháp UI natal sẵn.
4. **Nguồn:** [Swiss licensing](https://www.astro.com/swisseph/swephinfo_e.htm), [Astronomy Engine repo](https://github.com/cosinekitty/astronomy), [Skyfield](https://rhodesmill.org/skyfield/). Chưa cài/benchmark các engine.
5. **Khuyến nghị:** Swiss Professional server cho sản phẩm thương mại nếu báo giá/điều khoản được chấp nhận. Lựa chọn dự phòng MIT phải qua spike xác minh riêng, không drop-in.
6. **Lý do:** giảm tự xây thuật toán khó; license là gate trước public service, chạy server không tự loại AGPL.
7. **Đổi sau:** cao; cần đối chiếu lại flags, frames, houses, fixtures, deployment và dữ liệu cũ.
8. **Phê duyệt:** bắt buộc trước mua/cài triển khai/public service; chưa có phí license xác nhận.

## D04 — Giờ sinh không rõ
1. **Vấn đề:** cân bằng dễ dùng với dữ liệu thiếu.
2. **Phương án:** bắt buộc giờ; giả định trưa/sunrise; khoảng thời gian có bất định.
3. **Ưu/nhược:** bắt buộc loại người dùng; giả định dễ tạo Rising/nhà sai; khoảng cần tính nhiều hơn nhưng trung thực.
4. **Nguồn:** [TimePassages form](https://astrograph.com/birth-chart) cho thấy nhu cầu nhánh unknown; cách xử lý khoảng là đề xuất kỹ thuật riêng, không sao chép mặc định sunrise.
5. **Khuyến nghị:** cho chọn không rõ/khoảng; không ASC/MC/nhà khi không thể xác định. Moon/placement vượt ranh giới phải ghi khả năng, không gán chắc chắn từ noon chart.
6. **Lý do:** không biến dữ liệu thiếu thành thông tin cá nhân giả.
7. **Đổi sau:** cao nếu đã lưu kết quả chắc chắn sai; phải thiết kế từ schema.
8. **Phê duyệt:** có, gồm khoảng ngày hỗ trợ và UX lỗi.

## D05 — Guest và tài khoản
1. **Vấn đề:** lúc nào cần danh tính?
2. **Phương án:** login-first; guest tất cả; guest chart + account khi lưu/AI quota.
3. **Ưu/nhược:** login-first quản lý dễ nhưng gây ma sát; guest tất cả khó chống abuse và sync; hybrid thêm bước chuyển trạng thái nhưng tách rõ mục đích.
4. **Nguồn:** [Astrodienst](https://www.astro.com/horoscope), TimePassages có cửa vào chart công khai; chưa đo conversion và không khẳng định mọi bước đều không login.
5. **Khuyến nghị:** nội dung/chart tạm không đăng nhập; tài khoản khi lưu/sync và dùng AI cá nhân có quota. Không tự lưu guest hay gộp hồ sơ khi chưa xác nhận.
6. **Lý do:** trải nghiệm giá trị trước; dữ liệu sinh tối thiểu.
7. **Đổi sau:** vừa; ảnh hưởng funnel/session/abuse, không đổi engine.
8. **Phê duyệt:** có, cùng retention/AI consent.

## D06 — Concept và Fate UX
1. **Vấn đề:** cosmic premium có thể khó đọc hoặc giống game.
2. **Phương án:** A Observatory Nocturne; B Celestial Editorial; C Orbital Atlas. Có [prototype](../design/prototype/index.html) và [so sánh](../design/design-directions.md).
3. **Ưu/nhược:** A cân bằng bí ẩn/premium nhưng cần kiểm tra contrast; B đọc lâu tốt nhưng ít kịch tính; C khám phá dữ liệu mạnh nhưng có thể làm người mới ngợp.
4. **Nguồn:** [nghiên cứu đối thủ](../research/competitor-analysis.md), UI UX Pro Max dataset, [WCAG 2.2](https://www.w3.org/TR/WCAG22/). Không có khảo sát chứng minh concept thắng.
5. **Khuyến nghị:** A, bố cục dễ đọc và progressive disclosure; SVG tĩnh tương tác, không WebGL. Chart chuẩn mặc định, Constellation là tab biểu tượng.
6. **Lý do:** hợp hướng Fate mới, hiệu suất tốt, cả hai nhóm dùng cùng dữ liệu.
7. **Đổi sau:** thấp/vừa khi có tokens; projection đổi phải version và không làm đổi facts.
8. **Phê duyệt:** có, chọn sau khi xem cả ba bản trực quan.

## D07 — Brand và tone AI
1. **Vấn đề:** tên TUVI dễ nhầm hệ thống; “fate” có thể bị hiểu là tiên đoán.
2. **Phương án:** giữ TUVI STUDIO; Tinh Đồ; Quỹ Đạo. AI dễ hiểu hoặc kể chuyện biểu tượng.
3. **Ưu/nhược:** giữ tên tiết kiệm nhưng dễ nhầm; Tinh Đồ hợp sản phẩm nhưng chưa tra cứu nhãn hiệu/domain; tone huyền bí hấp dẫn nhưng phải giữ bất định.
4. **Nguồn:** [brand brief](brand-direction.md); đánh giá ngôn ngữ của Codex, không phải clearance pháp lý.
5. **Khuyến nghị:** Tinh Đồ làm working name trong prototype; “Hồ sơ sao”, “Liên kết sao”, hai tone cùng facts.
6. **Lý do:** gợi khám phá mà không khẳng định số phận tất định.
7. **Đổi sau:** vừa/cao sau launch SEO/domain; thấp ở prototype.
8. **Phê duyệt:** có; chưa đổi tên dự án chính thức, chưa mua tài sản.

## D08 — Stack, deployment và dữ liệu riêng tư
1. **Vấn đề:** vận hành web/AI/engine với chi phí kiểm soát.
2. **Phương án:** Next.js Node modular monolith + Supabase; frontend static + backend riêng; tách nhiều services.
3. **Ưu/nhược:** monolith ít vận hành nhưng Swiss binding cần runtime phù hợp; static hạn chế API; nhiều services tăng deployment/observability.
4. **Nguồn:** [Next deployment](https://nextjs.org/docs/app/getting-started/deploying), [Supabase RLS](https://supabase.com/docs/guides/database/postgres/row-level-security).
5. **Khuyến nghị:** Next/React/TS/Tailwind/shadcn + Supabase; engine server adapter, đóng gói Node/container sau spike; tránh microservices ban đầu. Region, retention, email provider và host chờ chọn.
6. **Lý do:** phù hợp stack ưu tiên và quyền sở hữu dữ liệu; RLS cần policy/test thật.
7. **Đổi sau:** cao cho dữ liệu/auth/engine runtime; thấp cho UI tokens.
8. **Phê duyệt:** bắt buộc kiến trúc, region, lưu giữ và ngân sách trước dựng sản phẩm.

## D09 — AI và thương mại
1. **Vấn đề:** chất lượng/chi phí và đổi dữ liệu sinh lấy lời giải thích.
2. **Phương án:** mock; real AI giới hạn; không AI.
3. **Ưu/nhược:** mock không tốn token nhưng chưa đo chất lượng; real có giá trị nhưng cần eval, consent và quota; không AI không đáp ứng hướng sản phẩm.
4. **Nguồn:** [Structured Outputs](https://developers.openai.com/api/docs/guides/structured-outputs), [data controls](https://developers.openai.com/api/docs/guides/your-data), [costs](../architecture/cost-estimates.md).
5. **Khuyến nghị:** Mock trong discovery; real server-only sau duyệt, output kiểm tra fact/rule IDs, từ chối khi thiếu dữ liệu. Premium M6, không triển khai billing MVP.
6. **Lý do:** không cần key thật để duyệt UX; structured output không tự đảm bảo nội dung đúng. store:false không đồng nghĩa zero retention.
7. **Đổi sau:** vừa/cao với consent, model eval và ngân sách; provider interface giữ nhỏ.
8. **Phê duyệt:** có trước real API/billing/spending, chưa duyệt model production.

## Gói duyệt dễ đánh giá
Đề nghị duyệt: phương pháp Tropical/Placidus có fallback chủ động; engine theo điều kiện license; guest chart + account khi lưu/AI; concept A và Constellation tối giản; working name; stack/retention/region/ngân sách. Có thể duyệt thiết kế riêng trong khi license/hosting còn mở. Mọi lựa chọn chưa trả lời giữ trạng thái đề xuất; không coi im lặng là đồng ý.
