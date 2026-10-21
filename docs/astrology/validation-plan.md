# Validation plan — Western Astrology
21/10/2026. Kế hoạch acceptance, không phải chứng nhận engine đã pass. Giai đoạn này chỉ kiểm tra tài liệu/skills/prototype; chưa cài engine, không có kết quả số học production.

## Numerical fixtures sau duyệt
Tạo fixture có source/license, local date/time, coordinates, IANA tzdb version, UTC/TT, observer/frame/flags, expected output, tolerance và reviewer. Oracle hành tinh [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/manual.html) hoặc Skyfield/JPL đối chiếu đúng frame/time; không dùng oracle nhà từ JPL. Nhà/ASC/MC so Swiss và công cụ độc lập đã match settings; cùng Swiss upstream không được gọi là kiểm chứng số học độc lập.

Đề xuất ít nhất 40 golden cases có known/unknown/interval time, nhiều vùng/vĩ độ, trước và sau 1975 tại VN, DST gap/fold, leap year, qua ngày UTC, 0°/360°, station/retrograde, cusp boundaries, polar failure. Giá trị tolerance phải dựa frame và engine: mục tiêu thử nghiệm hành tinh <=1 arcminute cho MIT alternative và <=1 arcsecond khi matched Swiss/JPL flags là **đề xuất**, không bảo đảm đã đo. ASC/houses có tolerance riêng sau spike, không dùng tolerance hành tinh che sai timezone.

Vitest unit: normalization, calendar validity, circular difference, sign/rounding carry, inclusive orb boundary, house wrapping, hashing deterministic, unknown intervals và rejection. Property checks: longitudes [0,360), 12 cusps khi available, aspect references valid, không NaN; không dùng property để thay expected fixtures. Rounding chỉ ở UI.

## Integration/security/privacy
Provider error/returned flags/fallback, missing ephemeris file, unsupported date/pole. Auth userA/B/anon RLS CRUD và spoof owner/FK. Guest không ghi DB/log payload, cache isolation. AI prompt injection, invalid fact/rule IDs, contradictory placements, uncertain-time, refusal/incomplete/quota/timeout/retries. Cả hai tone phải giữ facts/uncertainty, không chứng minh đúng chỉ bằng schema.

Retention/xóa/backup, export access, CSRF, sanitized content/XSS, rate limits, secrets không trong bundle. Không đưa birth/chat vào analytics hoặc test artifact công khai.

## E2E và UX
Playwright Chromium/Firefox/WebKit sau scaffold; phone/tablet/laptop/desktop 375/768/1024/1440. Newcomer flow guest→form→Big3→details→save auth; expert flow chart/table/config; unknown time; chart/constellation selection cùng revision; AI evidence navigation; deletion/cancel/empty/error. Test keyboard, focus/error summary, zoom/pan/reset, screen reader manual và reduced-motion. Accessibility automated scan + manual, không claim WCAG đầy đủ từ một tool.

Public canonical/sitemap/metadata/Article phù hợp, không fake rating; private page auth/noindex/no-store. Performance kiểm tra CWV trên dữ liệu thực, p75 field sau đủ traffic; prototype screenshot không chứng minh CWV.

## Gate
M2 chỉ kết thúc khi reviewer domain + kỹ thuật ký fixture/tolerance/license. M5 không beta nếu còn lỗi cross-owner, thiếu dữ liệu bị gán chắc chắn, house fallback âm thầm hoặc AI bịa placements. Báo cáo ghi số test, môi trường, failures, ngoại lệ và những gì chưa chạy. [Phase 02](../phase-02-report.md).
