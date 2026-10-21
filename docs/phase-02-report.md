# Giai đoạn 2 — Western Astrology Web / Fate Experience
Ngày 21/10/2026. Tài liệu nghiên cứu, kiến trúc và prototype để chủ dự án đánh giá; **chưa triển khai sản phẩm chính**, không API key thật, không gọi model tính phí, không mua license/hosting hoặc publish.

## Trạng thái quyết định
Đã được xác nhận: Web-only, Western Astrology MVP, trải nghiệm người mới + chuyên sâu và lớp Fate/Constellation nguyên bản. Tropical/Sidereal, hệ nhà, engine, concept, login/retention, tên công khai, host và ngân sách đều vẫn là đề xuất. Việc chuyển Western đã được chủ dự án xác nhận trực tiếp, không còn dùng nghiệp vụ Tử Vi cho MVP.

## Web-only Scope Update
Kiến trúc mới: Next.js/React/TypeScript, Tailwind/component primitives, Supabase PostgreSQL/Auth/RLS, deterministic natal server adapter và AI server-only Mock-first. Responsive PC/laptop/tablet/phone, mobile-first. Không Expo, React Native, EAS Build, Maestro, native builds hoặc App Store/Google Play pipeline; PWA chỉ tùy chọn tương lai. Chưa có native dependency phải gỡ khỏi ứng dụng vì chưa scaffold sản phẩm.

Giữ general engineering/UI skills, kiến thức privacy/testing/CI và các tài liệu phù hợp. Bảo toàn [snapshot Tử Vi](archive/tuvi-phase02/README.md) gồm tài liệu, schema và prototype cũ. Cập nhật active PRD/schema/rules/UI theo Western, không xóa lịch sử.

## Kết quả nghiên cứu và tài liệu
| Hạng mục | Deliverable |
| --- | --- |
| Sản phẩm | [PRD](product/PRD.md), [scope migration](western-astrology-scope-update.md) |
| Quyết định có căn cứ | [Decision recommendations](product/decision-recommendations.md), 9 quyết định có phương án/đánh đổi/nguồn/khuyến nghị/impact/gate |
| Thị trường | [6 sản phẩm chính chủ](research/competitor-analysis.md); Astro-Seek bị 403, không suy đoán chi tiết |
| Domain | [Domain spec](astrology/domain-spec.md), [engine evaluation](astrology/engine-evaluation.md), [calculation rules](astrology/calculation-rules.md), [validation plan](astrology/validation-plan.md) |
| Brand/UX | [Brand direction](product/brand-direction.md), [Constellation experience](design/constellation-experience.md), [3 concepts](design/design-directions.md), [design system](design/design-system.md) |
| Kiến trúc/repository/deployment | [System design](architecture/system-design.md), [candidate schema](architecture/chart.schema.json) |
| Công sức/chi phí | [Roadmap M0–M6](roadmap.md), [cost estimates](architecture/cost-estimates.md) |
| Trực quan | [Prototype](design/prototype/index.html), [hướng dẫn chạy](design/prototype/README.md) |

Nguồn chính: [Swiss](https://www.astro.com/swisseph/swephinfo_e.htm), [Astronomy Engine](https://github.com/cosinekitty/astronomy), [Skyfield](https://rhodesmill.org/skyfield/), các website thật trong research. Thư viện chỉ được đánh giá tài liệu/repository; **chưa cài, benchmark hoặc kiểm chứng numerical engine**. Không coi phổ biến là bằng chứng hiệu lực dự đoán.

## Gói khuyến nghị
Tropical + Placidus, Swiss Professional trên server nếu license/quote được chấp nhận; không silent fallback tại vĩ độ không hỗ trợ. MIT alternative cần spike riêng. Không rõ giờ: không ASC/MC/nhà, planet/sign intervals phải tính có kiểm chứng.

Guest chart tạm, tài khoản khi lưu/sync/AI quota, consent riêng; không mặc định lưu dữ liệu sinh. Concept A Observatory Nocturne được khuyến nghị, B Celestial Editorial và C Orbital Atlas là hai lựa chọn trực quan khác. Tinh Đồ/Hồ sơ sao/Liên kết sao là tên thử nghiệm, chưa clearance domain/nhãn hiệu.

AI hai tone Dễ hiểu/Kể chuyện sao, cùng facts và bất định; không đoán placement. Constellation là phép chiếu có evidence song song chart chuẩn, cùng revision/selection. Nodes theo body/angle, edges theo aspect, không tạo ngẫu nhiên hoặc cây mở khóa. Cảm hứng chỉ ở chiều sâu/điểm sáng/đường mảnh; SVG, glyph, bố cục và CSS tự tạo, không tài sản/font/layout game. Xem brand docs về kiểm tra originality trước launch.

## Agent Skills
19 thư mục dự án: 5 general, 8 astrology và 6 Tu Vi deprecated.
- Giữ: writing-plans, test-driven-development, systematic-debugging, verification-before-completion, ui-ux-pro-max (route sang astrology-ui).
- Thêm: astrology-domain, chart-engine, interpretation, content-seo, ui, qa, release và astrology-brand-experience (tất cả có tiền tố astrology-).
- Sáu tuvi-* giữ nguyên tài nguyên lịch sử, có notice deprecated và allow_implicit_invocation:false; không dùng cho Western.
- AGENTS.md đã route theo scope mới. Manifest gốc giữ riêng installed-skills-phase01.json, manifest hiện tại lưu provenance/checksums mới. Không thay global config.

## Prototype và giới hạn
Bảy màn chính: home, form, chart (hai view), AI, dashboard, 12 signs và knowledge; ba concept khác bố cục/typography/palette. SVG vòng natal, aspect fixture, chọn node/panel, zoom/reset, bảng, unknown-time, hai tone mock, login/save/delete memory. Nội dung/10 body/3 aspects là dữ liệu tổng hợp, form không tính chart thật; Whole Sign chỉ là fixture, không phải chốt hệ nhà. Không thư viện nội dung thật, auth/RLS/backend hay AI thật. Ảnh cũ không tiền tố western là lịch sử, không đại diện thiết kế mới.

## Kiểm tra
Kết quả thực chạy ngày 21/10/2026:

| Kiểm tra | Kết quả / bằng chứng |
| --- | --- |
| Skill YAML/checksums | 19 skill, 116 file, không lỗi — [validation](agent-checks/validation.json) |
| Codex CLI discovery | Nhận đủ19, không thiếu/trùng/lỗi — [discovery](agent-checks/codex-discovery.json) |
| Tu Vi explicit-only | 6 policy YAML hợp lệ; không route cho Western — [document checks](agent-checks/phase02-docs.json) |
| Link tài liệu/schema | Các link local tồn tại; JSON parse/systemId đúng; không phải schema semantic/numerical validation |
| Prototype Chrome | 12 nhóm hành vi quan sát đạt, 39 render observations ở375/768/1024/1280/1440px, không page horizontal overflow — [browser record](agent-checks/western-prototype.json) |
| Ảnh review | 27 ảnh Western, [so sánh trực quan](design/design-directions.md); chart/constellation/mobile tách rõ |
| Syntax | node --check cho prototype.js và scripts/check-phase02.cjs không báo lỗi |
| Secret scan | Không candidate key trong phạm vi text workspace — [scope/limitations](agent-checks/security.json) |

12 nhóm hành vi: keyboard node, selection liên view, zoom/reset, skip link, lỗi form, unknown-time, AI bất định/escaping, advanced table, hai tone, guest/auth/save/delete memory, mobile chart và reduced-motion. Đã sửa lỗi skip link và text presentation của zodiac glyph trong vòng review; nhánh unknown không khẳng định Big3/aspect. Ảnh phản ánh prototype, không phải chứng minh thuật toán.

Không lấy kết quả prototype Tử Vi trước đó làm kết quả Western. Chưa có numerical fixtures production, engine accuracy, cross-browser E2E sản phẩm, thiết bị touch thật/screen-reader audit, WCAG toàn diện hoặc CWV thực. Workspace hiện không có Git repository nên không có commit/diff/CI run; kiểm chứng bằng file/checksums và browser. Không kết luận “không có secrets tuyệt đối” từ pattern scan.

## Roadmap, chi phí và nội dung cần duyệt
M0 migration và M1 tài liệu/prototype hoàn tất để review; đang chờ gate duyệt kiến trúc + thiết kế, chưa bắt đầu M2. M2 engine → M3 web MVP → M4 AI → M5 QA/SEO/security/beta. M6 Premium/forecasting/advanced là scope riêng, không có billing MVP.

Ước lượng M0–M5 + domain/content 18.5–30.5 person-weeks, khoảng178–549 triệu VND với giả định đơn giá/dự phòng trong cost doc. Vận hành minh họa $91.58/$330.75/$2,107.50 mỗi tháng theo ba mức tải, chưa gồm Swiss license/thuế và các khoản ngoài phạm vi đã ghi. Đây là mô hình kế hoạch, chưa phải báo giá hoặc cam kết.

Chủ dự án cần duyệt gói phương pháp + engine/license; concept và Constellation tối giản; tên thử nghiệm; guest/auth/privacy/retention/region; stack/runtime/host và ngân sách. Đọc [decision recommendations](product/decision-recommendations.md) để duyệt bằng ngôn ngữ thông thường, không cần tự chọn thuật ngữ chưa được giải thích. Chưa có phê duyệt thì giữ các lựa chọn ở mức đề xuất.
