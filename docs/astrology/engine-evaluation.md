# Đánh giá calculation engine

Ngày đọc **21/10/2026**. Chỉ nghiên cứu tài liệu/nguồn công khai, **chưa cài thư viện, chưa chạy benchmark, chưa tính chart thật**. Cần pin exact release/commit, wrapper và ephemeris files sau khi lựa chọn được duyệt. License compatibility dưới đây là technical procurement assessment; phải review điều khoản áp dụng trước phân phối/public service.

| Tiêu chí | Swiss Ephemeris | Astronomy Engine | Skyfield + JPL ephemeris |
| --- | --- | --- | --- |
| Nguồn | [Astrodienst](https://www.astro.com/swisseph/swephinfo_e.htm), [API manual](https://www.astro.com/swisseph/swephprg.htm) | [Repo tác giả](https://github.com/cosinekitty/astronomy) | [Tài liệu](https://rhodesmill.org/skyfield/), [license repo](https://raw.githubusercontent.com/skyfielders/python-skyfield/master/LICENSE) |
| Thế mạnh | Thiên văn và house methods phục vụ astrology, speeds, nhiều flags | JS/TS-compatible, thuật toán astronomy gọn, nhiều ngôn ngữ | Python, JPL data, time scales và coordinate transforms; tốt cho oracle nghiên cứu |
| Accuracy do nguồn mô tả | Compression tái tạo JPL tới 0,001 arcsec; đây không là guarantee mọi output/settings đều đạt vậy | Tác giả nêu khoảng ±1 arcminute và đối chiếu NOVAS/JPL | Tài liệu mô tả agreement cao với chuẩn astronomy; không suy từ đó rằng adapter astrology của dự án đã đúng |
| Houses/aspects | Có Placidus/Whole Sign/Equal; aspect/orb policy vẫn do app định nghĩa | Không coi là astrology house engine hoàn chỉnh; angles/cusps và orbs phải bổ sung, validate độc lập | Không tự cung cấp whole astrology stack; vẫn cần nhà/aspect adapter |
| Dependency/deploy | C core/data files; wrapper Node/Python/WASM phải review riêng. Đề xuất server-side để kiểm soát binary/flags | Không external dependency theo repo; có thể Node/browser nếu adapter phù hợp | Python + numerical/data dependencies, tải ephemeris/time data phải pin; thêm service/process nếu Web TS |
| License | Dual **AGPL hoặc Professional**. Nhà cung cấp yêu cầu chọn trước phân phối/public service | **MIT**; giữ notices. Không có royalty library theo MIT | **MIT cho Skyfield**; kiểm quyền/version của datasets và dependencies riêng |
| Commercial fit | Tốt nếu có Professional phù hợp hoặc thực sự chấp nhận đầy đủ nghĩa vụ AGPL; server-only không tự loại nghĩa vụ network copyleft | Thuận lợi cho proprietary web về license, nhưng chi phí tự xây/kiểm nhà có thể lớn | Thuận lợi về mã MIT, nhưng vận hành Python/house work tăng chi phí |
| Testability | Golden theo flags/exact data version; chú ý fallback ephemeris/house | JS tests nhanh, kiểm angular tolerance phù hợp mức chính xác, không ép 0,001 arcsec | Oracle positions độc lập có cấu hình; không dùng để giả test house không được implement |
| Chi phí | Professional phải xác nhận quote/contract hiện hành; chưa mua. Không dùng giá trong PDF cũ làm báo giá 2026 | $0 library fee theo MIT; engineering/QA vẫn có chi phí | $0 license fee cho thư viện MIT; data/infra/engineering vẫn tính |

### Khuyến nghị có điều kiện

**Primary:** Swiss Ephemeris Professional ở backend cho Tropical + Placidus, phục vụ nhu cầu house data/advanced display mà không tự viết lại toàn bộ nhà. Chỉ được khởi công sau owner duyệt giấy phép/budget và house system; kiểm exact wrapper/data rights ở M2. Không tích hợp bản AGPL vào sản phẩm proprietary rồi coi “để server là đủ”. [Điều kiện nhà cung cấp](https://www.astro.com/swisseph/swephinfo_e.htm).

**Alternative ngân sách:** Astronomy Engine MIT + Whole Sign/Equal sau khi angles/house adapter qua golden. Đây là thay đổi conventions và engineering scope, không là drop-in replacement. Tạm dùng fixture minh họa cho prototype để không incur license decision.

**Oracle nghiên cứu:** Skyfield/JPL Horizons cho planetary coordinates với matching frame/time flags; JPL không cung cấp house/orb interpretation. [Horizons manual](https://ssd.jpl.nasa.gov/horizons/manual.html) yêu cầu xác định observer, coordinate frame và time scale để kết quả so được. Không gửi birth records thật lên dịch vụ oracle.

### Rủi ro cần khóa ở M2

1. Swiss có thể fallback sang model ephemeris khác khi file thiếu: kiểm returned flags/source, chặn khi không khớp profile đã duyệt, không chỉ đọc request flags.
2. Manual ghi Placidus/Koch không tính được ở ngoài vòng cực và có thể trả nhà Porphyry kèm ERR: adapter phải coi là `HOUSE_SYSTEM_UNAVAILABLE`, không gắn nhãn Placidus cho kết quả fallback.
3. Angles/houses nhạy với phút sinh/tọa độ/DST; ưu tiên normalization trước precision mỹ thuật. Không hứa arcsecond accuracy từ một thời gian sinh chỉ biết khoảng.
4. Library API “ecliptic longitude” phải kiểm equinox, apparent/astrometric, geocentric/topocentric; không so số từ hai frame khác nhau rồi kết luận engine sai.
5. Tốc độ, file size và precision công bố chưa được đo trên hosting dự án. Không dùng số benchmark tác giả làm SLA.

Các technical warnings trên tham chiếu [programmer manual](https://www.astro.com/swisseph/swephprg.htm); bản kiểm tra sâu function/wrapper/commit còn phải làm sau chọn engine. Tổng accuracy claims là của nguồn, không phải kết quả test của TUVI STUDIO.
