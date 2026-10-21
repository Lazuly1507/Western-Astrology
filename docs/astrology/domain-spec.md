# Western Astrology — Đặc tả nghiệp vụ

21/10/2026. **Phương Tây là phạm vi đã duyệt; cấu hình tính toán còn là khuyến nghị.** Không dùng công thức Tử Vi/Can Chi để tính natal chart. Nội dung bằng tiếng Việt, hai lớp đọc Beginner/Advanced và một lớp thương hiệu biểu tượng Constellation/Fate.

## Phân biệt dữ kiện, quy ước và lời diễn giải

- **Dữ kiện thiên văn:** vị trí/chuyển động thiên thể tại một thời điểm theo ephemeris và hệ tọa độ được xác định. Có thể kiểm chứng số học.
- **Quy ước chiêm tinh:** chọn zodiac, hệ nhà, orb, đối tượng và cách gán nhà. Nhiều lựa chọn hợp lệ trong thực hành; không tồn tại một bộ mặc định được chủ dự án duyệt chỉ vì từng được nhắc trong prompt.
- **Diễn giải:** ý nghĩa biểu tượng theo nguồn/trường phái, không được coi là khoa học dự báo đã xác nhận. Độ chính xác của tọa độ không chứng minh lời luận đúng đời sống.

## Thuật ngữ và phạm vi

| Khái niệm | Đặc tả cho sản phẩm |
| --- | --- |
| Tropical Zodiac | 12 đoạn 30° gắn với điểm xuân phân theo frame đã chọn; **khuyến nghị**, chưa phê duyệt. Không đồng nhất với ranh giới các chòm sao thiên văn |
| Sidereal Zodiac | Zodiac có tham chiếu sao; phải nêu ayanamsha/phương pháp và version. Không dùng offset cố định tùy ý. Là lựa chọn nghiên cứu; không bật như tính năng MVP trước khi duyệt |
| Zodiac sign | Aries/Bạch Dương…Pisces/Song Ngư, index 0–11, lấy từ kinh độ của body. Không phải 12 nhà, 12 cung Tử Vi hay 12 con giáp |
| Sun/Moon/Rising | Sun và Moon từ vị trí geocentric đã xác định; Rising là sign của Ascendant. Big 3 không được dùng để thay mọi thông tin của natal chart |
| Bodies | Candidate MVP: Sun, Moon, Mercury, Venus, Mars, Jupiter, Saturn, Uranus, Neptune, Pluto. “Planets” là nhãn UI chung bao gồm hai luminary; nodes/Chiron/asteroids để sau nếu chưa duyệt |
| Longitude | Kinh độ hoàng đạo [0,360), kèm sign, độ trong sign; lưu số đầy đủ, làm tròn chỉ để hiển thị |
| Latitude/observer | Vĩ/kinh địa lý nơi sinh khác kinh độ/vĩ độ hoàng đạo của body; tọa độ địa lý dùng cho angles/houses |
| Ascendant | Giao điểm hoàng đạo và chân trời phía Đông theo instant/location; cần giờ/địa điểm đáng tin |
| Midheaven (MC) | Điểm kinh tuyến trên hoàng đạo, không mặc nhiên là cusp nhà 10 trong mọi hệ nhà |
| Twelve houses | Phân vùng chart theo hệ nhà, thường đánh số 1–12; một sign có thể không trùng một house trong Placidus |
| Aspects | Quan hệ góc giữa các longitude được tính deterministic và đánh giá bằng orb policy phiên bản hóa |
| Retrograde | Dấu vận tốc kinh độ geocentric theo frame và convention; không suy ra nghịch hành bằng biểu tượng hoặc ý nghĩa hành tinh |

[Swiss Ephemeris programmer manual](https://www.astro.com/swisseph/swephprg.htm) mô tả flags/frame, modes sidereal và các house methods. Đây là reference kỹ thuật, không phải bằng chứng khoa học cho hệ diễn giải. [Astrodienst overview](https://www.astro.com/cgi/h.cgi?f=gch&h=gchhouse&lang=e) là nguồn đối chiếu house choices; một số Astrowiki URL bị browser-check trong phiên, không claim đã đọc nội dung bị chặn.

## Hệ nhà để so sánh, chưa chốt

| Hệ | Cách hiểu dễ hình dung | Ưu/nhược và cách hiển thị |
| --- | --- | --- |
| **Placidus** | Chia theo quy tắc thời gian/quadrant; kích thước nhà thường không bằng nhau | Phù hợp đối chiếu nhiều công cụ Western; cần thư viện đáng tin, lỗi ở vùng cực phải xử lý. Không fallback âm thầm |
| **Whole Sign** | Sign chứa Ascendant là toàn nhà 1; tiếp theo mỗi sign một nhà | Dễ giải thích và test; ASC nằm trong nhà 1, MC có thể không ở cusp 10. Không phải bản “ít đúng” của Placidus mà là quy ước khác |
| **Equal House** | Bắt đầu nhà 1 đúng độ Ascendant, các cusp cách nhau 30° | Công thức rõ; khác Whole Sign vì không bắt đầu ở 0° sign; MC giữ riêng |

**Khuyến nghị Codex:** Tropical + Placidus cho mặc định sản phẩm phục vụ người dùng Western phổ thông và chuyên sâu, **nếu** được duyệt engine/license và bộ golden. Whole Sign là phương án tiết kiệm triển khai với Astronomy Engine + mô-đun angles/houses đã xác minh; phải phê duyệt như cấu hình khác, không thay âm thầm. Nhu cầu người dùng chưa được phỏng vấn nên “phù hợp” là suy luận sản phẩm từ công cụ được đối chiếu, không số liệu thị phần.

## Thời gian, địa điểm và bất định

- Nhập ngày dương lịch, giờ local, nơi sinh; ưu tiên chọn thành phố thay yêu cầu nhập kinh/vĩ độ. Hiển thị tọa độ/timezone đã resolve để xác nhận; không cần GPS/vị trí hiện tại của người dùng.
- Timezone ID + tzdb version, UTC offset thực áp dụng ngày sinh và DST resolution phải được ghi. Không dùng offset hiện tại cho ngày sinh lịch sử. [IANA asia](https://data.iana.org/time-zones/tzdb/asia) còn có caveat về nguồn lịch sử; phạm vi trước 1970 cần review riêng theo zone.
- Giờ không tồn tại lúc đổi DST: trả lỗi và đề nghị kiểm tra, không tự nhảy giờ. Giờ lặp: cho chọn hai khả năng với giải thích giờ mùa hè/giờ tiêu chuẩn; chưa chọn thì chưa có full chart.
- Không biết giờ: xử lý toàn khoảng ngày local sau quy đổi timezone. Không có ASC/MC/houses; Sun/Moon hoặc body đổi sign trong khoảng phải hiện có thể A/B. Không coi noon chart là dữ kiện cá nhân. Moon có thể thay đổi đáng kể, không công bố Big 3 đầy đủ.
- Không chắc phút: lưu uncertainty interval; nếu ảnh hưởng nhà/ASC hoặc aspect thì cảnh báo/partial thay vì độ chính xác giả. Mọi giá trị cần biết giờ phải có availability state.

## Hai lối đọc, một dữ liệu

Beginner: Big 3, giải thích sign/planet/house/aspect bằng ngôn ngữ ngắn, không bắt học thuật ngữ trước khi bắt đầu. Advanced: longitude, cusps, speed/Rx, orb, calculation flags và phiên bản; cùng artifact, không “tính lại bí mật” khi đổi chế độ. Constellation View là projection biểu tượng có mapping ổn định tới bodies/aspects, không phải actual IAU constellation map.

## Ngoài MVP

Transits, synastry, Solar Return, progressions, personalized daily horoscope, Premium Subscription và advanced reports đều ở M6 **chờ phạm vi/phê duyệt riêng**. Đừng dùng thương hiệu Fate để lén đưa dự đoán tương lai hoặc compatibility score vào MVP.
