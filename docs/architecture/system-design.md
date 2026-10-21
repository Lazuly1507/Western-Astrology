# Web system architecture — Western Astrology
21/10/2026. Đề xuất chờ duyệt; chưa dựng app/backend/database hoặc tích hợp dịch vụ thật. Giữ dự án web-only, mock-first.

## Hệ thống
~~~mermaid
flowchart LR
  Browser[Responsive Web] --> Public[Next public SSR/SSG]
  Browser --> Private[Next authenticated pages]
  Browser --> API[Server API: validate / rate limit]
  API --> Engine[Deterministic natal engine adapter]
  Engine --> Eph[Approved ephemeris and timezone data]
  API --> DB[Supabase Postgres + owner RLS]
  Private --> Auth[Supabase Auth]
  API --> AI[Mock provider by default]
  AI -. after approval .-> OpenAI[OpenAI server API]
~~~
Next.js/React/TypeScript + Tailwind + shadcn primitives là khuyến nghị. Modular monolith đủ cho MVP; Swiss binding/ephemeris packaging cần spike trước chọn host. Không giả định chạy C/native binding ở Edge runtime. Dùng Node/container khi cần; chỉ tách worker nếu test runtime/latency chứng minh cần.

Public /, /zodiac/[slug], /learn/[slug], /methodology SSR/SSG. /create guest, /chart temporary và /app/charts/[id], /app/ai, /account private/no-store/noindex. Không đưa birth input/ID vào URL, analytics, sitemap, cache hoặc error tracker. robots/noindex không thay authentication.

## Luồng tính
API nhận birth input đã validate và đồng ý mục đích; resolve nơi→tọa độ→IANA zone→DST lựa chọn→instant hoặc interval. Đừng dùng zone hiện tại thay lịch sử. Engine version + flags + data hashes + rules tạo immutable artifact. Kiểm tra ephemeris flags và house failure, không silent fallback. UI chỉ vẽ/format; AI không tính placement. Known/unknown-time có contract riêng; xem [schema](chart.schema.json) và [rules](../astrology/calculation-rules.md).

Đề xuất guest: server tính tạm, không persist input/chart. Giới hạn payload/rate/CPU, không cache cross-user birth data. Không hứa “không lưu bất cứ đâu” nếu hạ tầng/provider có log; cấu hình và privacy notice phải kiểm tra trước beta. Save yêu cầu session và consent, tạo bản thuộc owner; tài khoản mới không tự nhập guest data.

## Data model đề xuất, chưa migration
- profiles: auth user reference, settings; không lưu ngày sinh vào profile chung mặc định.
- birth_records: owner, encrypted-at-rest trên hạ tầng, input/zone resolution và uncertainty; quyền truy cập tối thiểu.
- natal_charts: owner, birth_record_id, immutable artifact JSONB, rules/provider/data versions, content hash, revision linkage.
- conversations/messages: owner, chart revision, tone, structured answer/evidence; không duplicate raw birth input.
- content_articles: editorial public content, review status/version/sources.
- usage_events: owner or minimized pseudonymous bucket, token budget; không chart/chat payload.
Không bảng billing, synastry/transit hoặc “generic everything” schema trong MVP.

RLS SELECT/INSERT/UPDATE/DELETE owner=auth.uid(), kiểm tra ownership qua FK và API; test userA/userB/anon, INSERT owner spoof và relationship mismatch. Service role không đưa client, không dùng để bỏ qua quyền trong API thường. Public content chỉ read published. Role quản trị tối thiểu do server xác thực; không tin claim role từ form.

## AI contract
POST /api/interpretations nhận chartId/revision, question, tone; kiểm tra owner/quota/consent. Server nạp artifact, chỉ gửi positions/facts cần thiết, không tên/ngày giờ/nơi nếu không cần. Structured output claimId/text/factIds/ruleIds/uncertainty; kiểm tra ID thật, body không tồn tại, nội dung mâu thuẫn và refusal/incomplete. Câu hỏi/reference là dữ liệu không phải chỉ thị hệ thống. Tone thay ngôn ngữ, không thay facts hay mức chắc chắn.

Mock mặc định, fixture version rõ; real cần env server + cờ cấu hình + duyệt sử dụng. Không silent mock fallback khi real lỗi. Hạn chế tokens/context và retries, timeout/cancellation, quota trước call + reconcile usage; idempotency khi retry tránh double charge. store:false là đề xuất data minimization, không tuyên bố zero retention. [OpenAI data controls](https://developers.openai.com/api/docs/guides/your-data).

## Frontend state
Chart standard và Constellation dùng chartRevision + selectedFactId + filters; mapping chỉ từ artifact. Mode beginner/advanced chỉ đổi presentation. Dashboard dùng data server kiểm tra owner. Không persist birth fields/chat trong localStorage mặc định. Prototype chỉ memory, refresh xóa; synthetic fixture không đại diện input.

## Repository đề xuất
~~~text
apps/web/
  app/(public)/{zodiac,learn,methodology}/
  app/(tools)/create/
  app/(private)/app/{charts,ai}/
  app/api/{charts,interpretations}/
  components/{ui,chart,constellation,forms}/
  lib/{auth,db,privacy}/
packages/
  astrology/{contracts,normalization,providers,rules}/
  interpretation/{schemas,grounding,mock}/
  design-tokens/
supabase/{migrations,tests}/
tests/{fixtures,numerical,e2e}/
docs/{product,design,astrology,architecture,research}/
.github/workflows/
~~~
Đây là bản vẽ folder; chưa tạo các package trống hoặc framework plugin. Tương lai Western forecasting, Tu Vi, lịch âm/phong thủy có namespaces/rules/data riêng nếu được duyệt; có thể chia sẻ auth/UI/usage nhưng không tái dùng engine hay đánh đồng ontology.

## Deployment và CI
M0/M1 chỉ local prototype. Sau duyệt: dev/staging/production riêng; GHA least privilege, pinned dependencies/actions, untrusted PR không nhận secrets. CI lint/typecheck/unit/numerical/schema/RLS, Playwright Chromium/Firefox/WebKit, secret/dependency checks; migration staging + backup/restore drill trước prod. Approvals cho deploy thật theo quyền repo. [Next deployment](https://nextjs.org/docs/app/getting-started/deploying), [GHA secure use](https://docs.github.com/en/actions/reference/security/secure-use).

Host Node/container + Supabase cùng region phù hợp sau xem residency/latency/giá; preview không trỏ DB prod. Env schema server-only, logs redact, CSP/CSRF/origin checks, secure cookies, request limits, sanitized rich text, quota/abuse và monitoring không payload. Rollback app image/config, migration expand-contract, không destructive schema rollback; version rules/data cho chart cũ.

## Mở để duyệt
Engine/license/binding, vùng hosting và retention, auth email/OAuth, guest quota, content admin tối thiểu, ngưỡng AI và ngân sách. [Decisions](../product/decision-recommendations.md), [costs](cost-estimates.md), [validation](../astrology/validation-plan.md).
