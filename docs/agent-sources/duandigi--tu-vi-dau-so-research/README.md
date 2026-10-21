# Tử Vi Đẩu Số Research Skill

Một Agent Skill mã nguồn mở để **nghiên cứu và luận giải Tử Vi Đẩu Số Việt Nam có đối chiếu**, thay vì đọc từng sao rời rạc hoặc phán định mệnh.

## Điểm khác biệt

- Luận theo **Mệnh–Thân–Cục → tam phương tứ chính → tứ hóa → vận hạn → nghiệm lý**.
- Mỗi kết luận có **chứng cứ thuận, phản chứng, điều kiện biểu hiện và mức tin cậy**.
- Tách rõ **dữ kiện lá số, quy tắc nguồn, suy luận AI và dữ kiện thực tế**.
- Hỗ trợ luận cấu trúc gốc, chủ đề, vận hạn, hiệu chỉnh giờ sinh, so sánh trường phái và phản biện bản luận.
- Không cho phép “một sao phán một việc”.
- Không khẳng định chắc chắn tai họa, bệnh tật, ly hôn, ngoại tình, người âm hay ngày chết.

> Đây là công cụ nghiên cứu một hệ thống diễn giải truyền thống, không phải công cụ khoa học dự đoán tương lai và không thay thế chuyên gia y tế, pháp lý hoặc tài chính.

## Chuẩn đóng gói

Repo tuân theo chuẩn mở **Agent Skills**:

```text
tu-vi-dau-so-research/
├── SKILL.md
├── references/
├── assets/
├── scripts/
├── examples/
└── tests/
```

`SKILL.md` giữ quy trình cốt lõi; kiến thức chi tiết nằm trong `references/` và chỉ được nạp khi cần.

## Cài đặt

### Claude Code — cá nhân

```bash
git clone https://github.com/duandigi/tu-vi-dau-so-research.git
cd tu-vi-dau-so-research
bash scripts/install.sh --scope personal
```

Skill sẽ được cài vào:

```text
~/.claude/skills/tu-vi-dau-so-research/
```

Sau đó có thể gọi trực tiếp:

```text
/tu-vi-dau-so-research Hãy chuẩn hóa và luận cấu trúc Mệnh–Thân của lá số này.
```

Hoặc mô tả yêu cầu tự nhiên để agent tự chọn skill.

### Claude Code — theo project

```bash
bash scripts/install.sh --scope project --project /duong-dan/toi/project
```

Skill sẽ nằm tại:

```text
<project>/.claude/skills/tu-vi-dau-so-research/
```

### Client Agent Skills khác

Sao chép toàn bộ thư mục repo vào thư mục skills mà client đó hỗ trợ. Mức tích hợp và cách gọi lệnh phụ thuộc từng client.

## Các chế độ

| Chế độ | Mục đích |
|---|---|
| `INGEST` | Chép và chuẩn hóa lá số, chưa luận |
| `CORE` | Luận Mệnh–Thân–Cục và cấu trúc gốc |
| `TOPIC` | Luận sự nghiệp, tài chính, hôn nhân, gia đình… |
| `TIMING` | Luận đại vận, tiểu hạn, lưu niên |
| `RECTIFY` | So sánh và hiệu chỉnh giờ sinh |
| `SOURCE_COMPARE` | So sánh sách hoặc trường phái |
| `CRITIQUE` | Phản biện một bản luận |
| `VALIDATE_CASE` | Nghiệm lý ca đã khóa dự đoán |

## Ví dụ sử dụng

### Chuẩn hóa lá số

```text
Hãy dùng chế độ INGEST. Chép chính xác 12 cung từ ảnh tôi gửi, đánh dấu phần khó đọc và chưa luận cho đến khi bảng dữ kiện hoàn chỉnh.
```

### Luận sự nghiệp

```text
Phân tích sự nghiệp theo Mệnh–Quan–Tài–Di, bổ sung Thân, Nô Bộc, Phúc Đức và Điền Trạch. Mỗi kết luận phải có phản chứng và mức tin cậy.
```

### Hiệu chỉnh giờ sinh

```text
Tôi có hai giờ sinh khả dĩ là giờ Thìn và giờ Tỵ. Lập hai giả thuyết, khóa dự đoán rồi đối chiếu các sự kiện có mốc năm.
```

### Phản biện

```text
Kiểm tra bản luận này: phát hiện chỗ một sao phán một việc, câu Barnum, thiếu tam phương, thiếu phản chứng và nhầm bản chất với sự kiện.
```

Xem thêm tại [`examples/`](examples/) và [`references/PROMPT_LIBRARY.md`](references/PROMPT_LIBRARY.md).

## Dữ liệu có cấu trúc

Tạo hồ sơ mẫu:

```bash
python3 scripts/new_case.py --case-id TV-1990-001 --output my-case.json
```

Kiểm tra hồ sơ:

```bash
python3 scripts/validate_case.py my-case.json
```

Kiểm tra toàn bộ skill:

```bash
python3 scripts/validate_skill.py .
python3 -m unittest discover -s tests -v
```

Có thể dùng bộ kiểm tra chính thức của Agent Skills nếu môi trường đã cài:

```bash
skills-ref validate .
```

## Cấu trúc repo

```text
SKILL.md                         Quy trình agent phải tuân thủ
references/INPUT_AND_CHART...   Chuẩn dữ liệu đầu vào
references/REASONING_ENGINE.md  Động cơ luận giải chín tầng
references/PALACE...            Mạng đối chiếu 12 cung
references/LUCK...              Đại vận và lưu niên
references/SOURCE_POLICY.md     Chính sách nguồn và trường phái
assets/schemas/                 JSON Schema cho hồ sơ ca
assets/templates/               Mẫu báo cáo và ma trận chứng cứ
scripts/                        Cài đặt, tạo ca, kiểm tra
examples/                       Ví dụ đầu vào/đầu ra
```

## Nguyên tắc đóng góp

Một quy tắc mới chỉ nên được thêm khi có:

1. nguồn hoặc nhãn trường phái rõ;
2. điều kiện áp dụng;
3. giới hạn hoặc phản chứng;
4. ví dụ kiểm thử;
5. không tạo ngôn ngữ định mệnh tuyệt đối.

Đọc [`CONTRIBUTING.md`](CONTRIBUTING.md) trước khi gửi Pull Request.

## Lộ trình

- [ ] Kho tri thức 14 chính tinh có nguồn theo ấn bản.
- [ ] Bộ dữ liệu nghiệm lý ẩn danh, khóa dự đoán trước khi mở kết quả.
- [ ] Bộ kiểm thử chống câu Barnum và “một sao phán một việc”.
- [ ] Chuẩn hóa khác biệt giữa các trường phái an sao.
- [ ] Báo cáo song ngữ Việt–Anh.

## Tác giả

**Duan Digi**  
Website: `duandigi.com`  
GitHub: `@duandigi`

## Giấy phép

MIT License. Xem [`LICENSE`](LICENSE).
