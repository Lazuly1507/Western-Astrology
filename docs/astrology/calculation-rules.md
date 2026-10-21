# Calculation profile — đề xuất, chưa phê duyệt

Profile nghiên cứu `western-natal-proposal-1`, không phải thuật toán đã triển khai. Engine/library, zodiac, house system và orbs đều cần duyệt theo [decision-recommendations.md](../product/decision-recommendations.md).

## Candidate mặc định và phương án thay thế

| Quy tắc | Codex khuyến nghị | Cần duyệt / phương án khác |
| --- | --- | --- |
| Zodiac | Tropical, geocentric apparent ecliptic longitude of date; engine flags phải ghi cụ thể | Sidereal chỉ khi có ayanamsha/version được duyệt, không hardcode trừ 24° |
| Houses | Placidus khi giờ/vị trí đủ, engine/license phù hợp | Whole Sign hoặc Equal là lựa chọn khác được giải thích; không tự fallback. Unknown time không có nhà |
| Bodies MVP | Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto | Nodes, asteroids, Chiron ngoài bộ khởi đầu nếu chưa được duyệt |
| Dates | Gregorian, candidate 1900 đến hiện tại; cycles tương lai ngoài MVP | Historical tz/source coverage phải xác minh theo zone; BCE không hỗ trợ ở MVP |
| Geographic input | Latitude −90..90, longitude −180..180, east positive, altitude mặc định 0 cho candidate geocentric | Không suy vị trí sinh từ IP hoặc GPS hiện tại; extreme latitudes xử lý explicit |
| Time | Local date+time + IANA zone/version → UTC instant + UTC offset/fold decision; library handles TT/ΔT theo version | Không cộng offset hai lần; gap/fold unresolved không full chart |
| Sidereal time vs sidereal zodiac | Hai khái niệm tách biệt: thời gian sao dùng dựng local angles không có nghĩa zodiac Sidereal được chọn | UI không dùng nhãn mơ hồ “Sidereal” cho hai trường |
| Retrograde | Từ speed kinh độ, `retrograde` khi speed<−ε, `direct` khi >ε, còn lại `stationary`; candidate ε=0,0001°/ngày | Ngưỡng hiển thị là policy, chưa duyệt; lưu speed gốc, không đổi kết quả theo số làm tròn |

## Longitudes, houses và boundary

Chuẩn hóa `L=((raw % 360)+360)%360`; sign index `floor(L/30)`, degree-in-sign `L−30×index`. So trước khi round; nếu UI làm tròn tới 30° thì carry sang sign kế, không hiển thị “30° Bạch Dương” như kinh độ nằm trong sign cũ. So angular error bằng shortest circular distance.

Whole Sign candidate: cusp1=`floor(ASC/30)×30`; cusp i=`mod(cusp1+30×(i−1),360)`. Equal candidate: cusp1=ASC, cusp i=ASC+30×(i−1) normalized. MC tính độc lập và không ép thành cusp10. Placidus lấy từ library đã duyệt, không dùng một công thức Equal dưới nhãn Placidus. House assignment policy theo longitude sector trên ecliptic và cusp start-inclusive/end-exclusive; nếu cần mô hình house position 3D khác, là profile khác.

## Major aspects và orbs candidate

| Aspect | Exact angle | Orb nghiên cứu |
| --- | ---: | ---: |
| Conjunction | 0° | 8° |
| Sextile | 60° | 4° |
| Square | 90° | 6° |
| Trine | 120° | 6° |
| Opposition | 180° | 8° |

Đây là **policy đề xuất**, không bảng chuẩn khoa học hoặc phê duyệt. Dùng cùng orb theo aspect ở MVP để dễ kiểm; luminary-specific orb, minor aspects và applying/separating để sau nếu chưa duyệt. Với hai longitude, `d=min(abs(L1−L2),360−abs(L1−L2))`, chấp nhận khi `abs(d−target)≤orb`. Không double-count pair, không self-aspect. Dùng full precision và exact boundary tests; orb displayed không thay orb calculation. Angles excluded khỏi aspect pairs mặc định cho tới khi duyệt riêng.

## Unknown/uncertain birth time

Known-time chart và partial unknown-time chart là **hai output variants**. Unknown time chỉ biết date/location/zone: lấy khoảng ngày local [00:00,next 00:00) với timezone lịch sử, độ dài có thể 23/25h. Không tạo ASC/MC/cusps/body-house assignment. Planet intervals phải được engine tính với conservative bounds/root finding phù hợp, không chỉ endpoint khi có turning point. Một body có thể đổi sign trong khoảng; UI hiện các khả năng. Aspects chỉ `stable` khi chứng minh trong toàn interval; nếu không thì `possible` hoặc unavailable và không được AI kể như fact.

Không dùng noon as actual birth time. Nếu dùng một instant tham chiếu nội bộ để xây interval, không trả nó dưới `birthUtc` của người dùng. Nếu chưa implement được interval chính xác, trả partial availability và bỏ dữ kiện nhạy theo giờ thay vì invent precision.

## Determinism và provenance

Lưu engine/version, wrapper, files+checksum, profile/zodiac/house/orbs, flags requested+returned, tzdb/geocoder versions, coordinates, UTC offset/fold resolution và input-quality. Hash canonical chart content, tách generated timestamp/ID khỏi hash. Không đổi house/frame chỉ bằng theme hoặc Beginner/Advanced. Constellation View chỉ projection từ cùng fact IDs/aspect IDs.

Nguồn kỹ thuật đã đọc: [Swiss API](https://www.astro.com/swisseph/swephprg.htm), [IANA](https://data.iana.org/time-zones/tzdb/asia), [JPL Horizons](https://ssd.jpl.nasa.gov/horizons/manual.html). Công thức chuẩn hóa/góc và orb table là đặc tả kỹ thuật/policy của đề xuất; chưa có engine test hoặc ý nghĩa dự báo được xác nhận.
