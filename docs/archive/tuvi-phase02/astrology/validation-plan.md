# Kế hoạch xác minh nghiệp vụ và engine

Trạng thái: kế hoạch cho M2–M6; **0 golden chart được xác nhận** tại thời điểm bàn giao Phase 02. Dữ liệu trong prototype là fixture giao diện tự tạo, không phải oracle. Kết quả kiểm tra tài liệu/prototype không chứng nhận thuật toán.

## Nguồn oracle và hồ sơ ca

Mỗi ca có `fixtureId`, loại synthetic/consented, input đầy đủ, profile và toàn bộ phiên bản; nguồn độc lập, ảnh/bảng được phép dùng, reviewer A/B, ngày ký, expected calendar/Mệnh/Thân/Cục/placements/cycles và lý do chọn. Dữ liệu thật chỉ khi có quyền; kho test ưu tiên synthetic. Không tải lá số cá nhân công khai rồi mặc nhiên dùng làm dataset.

Hai website cho cùng kết quả chưa đủ nếu cùng dùng một thư viện. Đề xuất: một chuyên gia lập tay từ nguồn hợp pháp, người thứ hai đối chiếu độc lập; thêm một implementation ngoài dự án có cấu hình rõ. Khi không khớp, khóa fixture `disputed`, ghi cả expected A/B, không chọn đa số hoặc sửa expected theo code mới.

[Bảng HKO](https://www.hko.gov.hk/en/gts/time/conversion.htm) có 1901–2100 nhưng là lịch Trung Quốc/Hong Kong: chỉ đối chiếu ca mà quy ước ngày/timezone tương ứng; không coi là oracle lịch Việt toàn dải. [IANA asia](https://data.iana.org/time-zones/tzdb/asia) là nguồn offset kỹ thuật có caveat lịch sử. Tài liệu Hồ Ngọc Đức chưa đọc được trong phiên, nên license/algorithm cần thẩm định riêng.

## Bộ ca mục tiêu

| Nhóm | Tối thiểu đề xuất | Expected lấy từ đâu / assertion |
| --- | --- | --- |
| Input không hợp lệ | 30 | Ngày 31/4, 29/2 không nhuận, tháng 0/13, âm ngày 31, leap không tồn tại, future birth, sai timezone; mã lỗi stable, không tạo chart |
| Lịch và nhuận | 40 | Oracle lịch VN được duyệt; đầu/cuối tháng, ngày 29/30, tháng 11/12, năm nhuận âm, ngày gần sóc; cả hai chiều |
| Biên giờ/ngày | 36 | Tý sớm/muộn, mỗi giờ trước/đúng/sau biên; đổi ngày/năm âm; verified fixture chứ không lấy LLM tính |
| Mệnh/Thân | 144 tổ hợp | Mỗi tháng × giờ theo rule được ký; 2 reviewer xác nhận quy tắc rồi generator test exhaustively |
| Cục/can cung | Đủ 60 tổ hợp can-chi hợp lệ và Cục | Nạp âm/table version đã duyệt; lưu bảng expected có checksum |
| Golden chart tổng hợp | **100 chart** | Phân tầng đủ 10 can, 12 chi, 5 Cục, 2 quy ước giới tính, leap, 12 giờ; không cần full Cartesian nhưng có coverage matrix |
| Sao và Tứ hóa | Toàn manifest + 10 tuple hóa | Đủ14 chính tinh, tất cả sao hỗ trợ, multiplicity và scope; thiếu rule phải fail rõ |
| Vận | 24 ca biên trở lên | Trước/đúng/sau giao đại hạn, Tết/ranh năm, tiểu hạn khác lưu niên; dates/age bounds rõ |
| Phiên bản và determinism | 20 | Cùng input+rules trả cùng hash; đổi metadata thời gian không đổi hash; đổi rule tạo revision |
| Profile lịch sử mở rộng | Chưa thuộc pilot hẹp | Ngày trước/sau transition theo vùng, UTC offsets và nguồn khác tzdb khi cần; không test giả bằng UTC+7 cố định |

Các nhóm có thể chia sẻ cùng fixture; số lượng là mục tiêu độ phủ chứ chưa phải số test đã viết. Bảng test phải ghi mọi rule ID ít nhất một ca phân biệt, và boundary rules ít nhất trước/đúng/sau biên.

## Test layers

1. **Unit/Vitest:** validation, normalization, từng công thức và bảng, star multiplicity; red-green cho bug. Property tests kiểm round-trip và uniqueness nhưng không thay oracle.
2. **Integration:** input → base chart → cycle overlay → AI fact projection. Đổi raw input không được làm báo cáo gắn nhầm chart revision.
3. **Contract:** Chart JSON valid vẫn phải kiểm uniqueness/rule references/hash và quyền sở hữu. JSON Schema không chứng minh sao đặt đúng.
4. **AI offline eval:** tối thiểu 100 tình huống, gồm 30 thiếu dữ kiện, 20 prompt injection, 20 trộn chart/profile, 20 yêu cầu kết luận quá mức, 10 refusal/timeout. Người duyệt chấm evidence đúng, hallucination placement, thái độ/giới hạn; máy chặn fact IDs không tồn tại. Chưa gọi API để chạy bộ này trong Phase 02.
5. **Web E2E/Playwright:** nhập lịch/giờ, lỗi form, xem/chọn cung/list/zoom, auth/save/sync conflict, consent AI, quota, khôi phục quyền Web sau đăng nhập, export/delete; Chromium/Firefox/WebKit và browser điện thoại/tablet. Test Mock AI không cần key; dùng fake transport cho hợp đồng Real trong CI. Không có test native hoặc store.
6. **Security/privacy:** owner A/B cross-access cả file và job; RLS + API; giả mạo webhook; replay/refund; prompt injection trong trường người dùng; log redaction; xóa account, retry job khi user đã bị xóa.

## Cổng nghiệm thu

- **Trước M2:** ruleset và nguồn bảng hợp pháp được ký, phạm vi birth/timezone rõ.
- **Ra M2:** 100% golden chart được duyệt khớp, không case disputed còn chặn phạm vi; performance đo trên target; export golden không chứa birth record chưa cho phép.
- **Ra M4:** 0 fabricated placement được chấp nhận trong tập eval; ≥95% claim có evidence đúng theo rubric, chưa phải chỉ số đúng khoa học; refusal/incomplete được xử lý. Giới hạn tập eval được công bố.
- **Ra M6:** không lỗi P0/P1, restore drill thành công, payment replay không nhân quyền, purge/backup retention được kiểm chứng, accessibility review và store policy review có biên bản.

Mỗi lần thay rule/calendar/tzdb/model/prompt phải chạy bộ liên quan và ghi diff. Không sửa snapshot/golden chỉ để “làm test xanh”. Rollback cả artifact engine/rule và chọn cách hiển thị chart cũ; không tái tính ngầm.
