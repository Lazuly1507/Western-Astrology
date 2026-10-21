# Báo cáo thiết lập Agent Skills

> Báo cáo lịch sử Giai đoạn 1. Phạm vi hiện tại đã chuyển sang Western Astrology; danh sách skill và kiểm tra cập nhật nằm tại [Giai đoạn 2](phase-02-report.md). Các số liệu 11 skill bên dưới ghi nhận tại thời điểm cài ban đầu.

Ngày kiểm tra: **21/10/2026**, múi giờ **Asia/Saigon**. Workspace: `E:/lazul/Desktop/New Project`.

Đã cài **11 skill trong phạm vi dự án**, gồm 6 skill Tử Vi tự viết và 5 skill chọn lọc từ upstream. Codex CLI thực tế nhận diện cả 11 skill, bật sử dụng, không có lỗi manifest hoặc tên trùng trong kết quả discovery. Chưa viết code ứng dụng Tử Vi, chưa gọi thêm mô hình trả phí, chưa triển khai hoặc thay đổi cấu hình toàn cục.

## 1. Môi trường thực tế

| Thành phần | Kết quả |
| --- | --- |
| OS/terminal | Windows; Windows PowerShell 5.1, build 26100.9711 |
| Codex CLI | `codex-cli 0.132.0`, qua `codex.cmd` |
| Git | `2.51.0.windows.2` |
| Node.js | `v24.19.0` |
| npm | `11.13.0`, qua `npm.cmd` |
| pnpm | Không tìm thấy trên PATH; không cần cho bộ skill hiện tại |
| Python | `3.15.0`, có tại `C:/Users/lazul/AppData/Local/Python/pythoncore-3.15-64/python.exe` |
| Python trên PATH | Alias WindowsApps không chạy được; `py` không tìm thấy. Đã tìm được interpreter thật và chạy thành công bằng đường dẫn trực tiếp |
| PowerShell policy | `Restricted`: launcher `.ps1` bị chặn. Dùng `.cmd`; không đổi execution policy |
| Cấu hình Codex | `C:/Users/lazul/.codex/config.toml`; `CODEX_HOME` không được đặt trong shell kiểm tra |
| Workspace ban đầu | Trống; chưa có app, Git repository hay cấu hình dự án cần ghi đè |

Chỉ đọc tên mục và các trường cấu hình liên quan để tránh xuất giá trị secret. Không đọc file đăng nhập/credential. Network trực tiếp trong sandbox bị chặn; các lần tải GitHub công khai và dependency validator được thực hiện qua quyền công cụ được chấp nhận, giữ nguyên cấu hình sandbox. Thư mục `.agents` được môi trường bảo vệ ghi; thao tác cài/sao chép đã được cấp quyền công cụ và chỉ ghi vào workspace.

## 2. Cơ chế khám phá và cấu hình

Đã đọc [Build skills của OpenAI](https://learn.chatgpt.com/docs/build-skills): skill cục bộ dùng `.agents/skills/<name>/SKILL.md`; metadata được dùng để chọn skill và nội dung được đọc khi cần. Đã xác minh cơ chế này bằng **CLI 0.132.0 thực tế**, không chỉ suy luận từ tài liệu.

Đã tạo `AGENTS.md` với các nguyên tắc người dùng đưa ra, bảng điều phối theo nhiệm vụ, bảo vệ dữ liệu sinh, ranh giới chart engine/AI và lệnh kiểm tra. Không cần thêm feature flag, hook, registry hoặc sửa `config.toml` để các skill này hoạt động. Vì vậy **không tạo `.codex/config.toml` với các thiết lập không cần thiết**, không đổi model, trust level hoặc quyền toàn cục. Quyền sandbox/approval hiện hành tiếp tục do môi trường quản lý.

Đã kiểm tra thư mục skill cá nhân `~/.agents/skills` và `~/.codex/skills/.system`, cùng danh sách skill/plugin được phiên làm việc cung cấp. Có nhiều skill thiết kế, tài liệu, cài skill và tạo skill sẵn có. Không cài thêm các bản tương đương. Các skill thiết kế hiện có vẫn có thể chồng phạm vi kích hoạt; `AGENTS.md` chỉ định `tuvi-ui` + `ui-ux-pro-max` cho tác vụ UI Tử Vi, và ưu tiên lựa chọn rõ ràng của người dùng nếu họ yêu cầu skill khác. Không tự tắt các skill cá nhân.

Không phát hiện tên trùng hoặc lỗi parse trong toàn bộ kết quả `skills/list` trả về cho workspace. Đây là kiểm tra theo CLI và cwd này, không phải chứng nhận mọi plugin hay phiên bản Codex khác.

## 3. Danh sách skill đã cài

| Skill | Đường dẫn | Nguồn | License |
| --- | --- | --- | --- |
| writing-plans | `.agents/skills/writing-plans/` | obra/superpowers, bản điều chỉnh cho dự án | MIT |
| test-driven-development | `.agents/skills/test-driven-development/` | obra/superpowers | MIT |
| systematic-debugging | `.agents/skills/systematic-debugging/` | obra/superpowers, điều chỉnh tên tham chiếu | MIT |
| verification-before-completion | `.agents/skills/verification-before-completion/` | obra/superpowers | MIT |
| ui-ux-pro-max | `.agents/skills/ui-ux-pro-max/` | nextlevelbuilder/ui-ux-pro-max-skill, bản điều chỉnh đường dẫn | MIT |
| tuvi-domain | `.agents/skills/tuvi-domain/` | Tự viết; có 1 reference từ Duan Digi | Chưa đặt giấy phép phân phối cho phần tự viết; reference MIT riêng |
| tuvi-chart-engine | `.agents/skills/tuvi-chart-engine/` | Tự viết | Chưa đặt giấy phép phân phối |
| tuvi-interpretation | `.agents/skills/tuvi-interpretation/` | Tự viết | Chưa đặt giấy phép phân phối |
| tuvi-ui | `.agents/skills/tuvi-ui/` | Tự viết | Chưa đặt giấy phép phân phối |
| tuvi-qa | `.agents/skills/tuvi-qa/` | Tự viết | Chưa đặt giấy phép phân phối |
| tuvi-release | `.agents/skills/tuvi-release/` | Tự viết | Chưa đặt giấy phép phân phối |

Mỗi skill tự viết có YAML `name`/`description`, phạm vi kích hoạt, workflow và tiêu chí nghiệm thu. Hai tài liệu bổ sung có mục đích cụ thể: chính sách nguồn cho `tuvi-domain`, hợp đồng dữ liệu cho `tuvi-chart-engine`. Các nguyên tắc phối hợp chung nằm trong `AGENTS.md`, không sao chép vào từng skill.

Commit đầy đủ, đường dẫn và SHA-256 của **102 file đã cài** nằm trong [`agent-sources/installed-skills.json`](agent-sources/installed-skills.json). Manifest hash mô tả **bản cài sau điều chỉnh**, không phải khẳng định mọi file giống nguyên trạng upstream. Giấy phép upstream được giữ tại từng skill liên quan.

## 4. Thẩm định 8 repository

Thông tin metadata/commit được đọc trực tiếp qua GitHub API; README, giấy phép hiện có và danh mục file được lưu trong `docs/agent-sources/`. `pushed` chỉ là dấu hiệu hoạt động gần đây, không chứng minh chất lượng. Tất cả tám repo được API báo `archived=false` khi kiểm tra; tree không bị cắt ngắn.

| Repository và commit đã kiểm tra | Hoạt động push gần nhất (UTC) | Phân loại, license và quyết định |
| --- | --- | --- |
| [obra/superpowers](https://github.com/obra/superpowers/tree/bb92a77741419a4ab5f06e711a283343f1ada0c3) — `bb92a77741419a4ab5f06e711a283343f1ada0c3` | 2026-10-20 | Framework/phương pháp phát triển có skill và plugin; MIT. README hiện hướng dẫn Codex dùng marketplace plugin. Dự án chỉ cần bốn skill portable nên dùng helper chính thức Codex với `--ref` và `--dest`, không cài plugin/hook/bootstrap toàn cục. Discovery thực tế đạt. |
| [anthropics/skills](https://github.com/anthropics/skills/tree/dbd4588f9e1033efb41dad4bef2f7947c8993d44) — `dbd4588f9e1033efb41dad4bef2f7947c8993d44` | 2026-10-09 | Bộ skill mẫu, README nêu license hỗn hợp: nhiều skill Apache-2.0, bộ document có điều khoản source-available riêng. Đã đọc manifest/license của ứng viên `webapp-testing` và `skill-creator`. Không cài: creator/document/design trùng khả năng sẵn có; web testing cần app và Playwright chưa có. Không kết luận cả repo dùng một license. |
| [affaan-m/ECC](https://github.com/affaan-m/ECC/tree/07971588f8ac7a60080ba8c1b7920c9e8e733e7d) — `07971588f8ac7a60080ba8c1b7920c9e8e733e7d` | 2026-10-20 | Hệ thống harness gồm skill, cấu hình, hook và tích hợp nhiều client; MIT, có hỗ trợ Codex. Đã đọc README, cấu hình Codex được lấy và ứng viên `security-review`. Không cài cả bộ hoặc nhập cấu hình của họ: chồng quy trình với Superpowers/tuvi-qa, chưa có app/stack; tránh áp cấu hình và hook ngoài nhu cầu. |
| [nextlevelbuilder/ui-ux-pro-max-skill](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill/tree/56ea9cf174ed86786187daa9de0e6247cb0747e4) — `56ea9cf174ed86786187daa9de0e6247cb0747e4` | 2026-10-15 | Skill + dữ liệu CSV + Python search; MIT. Cài riêng `ui-ux-pro-max`, không cài các skill brand/design/slides khác hoặc npm installer. Dùng runtime Python chuẩn, không cần pip dependency; đã chạy data validation, smoke và 68 test. |
| [vercel-labs/skills](https://github.com/vercel-labs/skills/tree/a80e4c9d12d607631249d4d7d059f835d4b2f13a) — `a80e4c9d12d607631249d4d7d059f835d4b2f13a` | 2026-10-19 | CLI quản lý skill, không phải tất cả là skill; package đọc được là 1.7.4, MIT. `find-skills` đã tồn tại ở phạm vi cá nhân. Không cài CLI hoặc chạy `npx`: helper chính thức và project-local folders đủ nhu cầu, tránh thêm registry/telemetry/dependency không cần thiết. |
| [hung-ngm/tu-vi-dau-so](https://github.com/hung-ngm/tu-vi-dau-so/tree/d0238e9ee9f1a8a1603f5ff1328b18bf6e4635b7) — `d0238e9ee9f1a8a1603f5ff1328b18bf6e4635b7` | 2026-03-07 | Skill cho Claude với Markdown hướng dẫn tính toán/ý nghĩa sao. Không có LICENSE trong tree được kiểm tra, GitHub license null. Đọc phục vụ thẩm định; **không đưa hướng dẫn/quy tắc nguồn này vào skill dự án**, không cài bản gốc. Cần làm rõ quyền trước khi tái sử dụng. |
| [duandigi/tu-vi-dau-so-research](https://github.com/duandigi/tu-vi-dau-so-research/tree/91f8a06f1bca2fb271791785937265ea78d7f858) — `91f8a06f1bca2fb271791785937265ea78d7f858` | 2026-07-12 | Agent Skill nghiên cứu, schema và validator Python; MIT. Chỉ chuyển thể phần hướng dẫn nghiên cứu: giữ `SOURCE_POLICY.md` làm reference có ghi công cho `tuvi-domain`. Không cài một skill luận giải thứ hai chồng với sáu skill chuyên biệt; không chạy installer shell hoặc validator của repo. Không coi tri thức repo là bộ thuật toán/lá số chuẩn. |
| [nngocduong92/an_sao_tu_vi](https://github.com/nngocduong92/an_sao_tu_vi/tree/760f9985bb289d8dc5238a24548cf1fdb37e68bf) — `760f9985bb289d8dc5238a24548cf1fdb37e68bf` | 2025-11-14 | App console/thư viện Python, không phải Codex Skill. README nói dùng stdlib, có lịch dựa trên thuật toán Hồ Ngọc Đức; chưa có LICENSE trong tree, GitHub license null. Chỉ đọc code/dependency để phân loại; không chạy, cài hoặc sao chép vào chart engine. Cần làm rõ cả giấy phép repo và nguồn thuật toán trước khi tái sử dụng. |

Không audit toàn bộ mã của ECC/Anthropic hoặc mọi repo. Phạm vi thẩm định sâu là các skill/runtime được chọn, license, tài liệu cài đặt và các ứng viên nêu trên. Các bản đọc trong `agent-sources/*/review/` là hồ sơ kiểm tra, không phải skill được Codex discover hoặc mã dùng cho app; không phát hành lại hồ sơ đọc từ repo chưa có license khi chưa làm rõ quyền.

## 5. Các điều chỉnh có chủ đích

- **Superpowers:** Giữ workflow lập kế hoạch, TDD, chẩn đoán và kiểm chứng. `writing-plans` bỏ yêu cầu phải có `using-git-worktrees`, `executing-plans` hoặc `subagent-driven-development` chưa cài; thay bằng thực thi Codex bản địa theo quyền hiện có. Không tự commit, không yêu cầu xin lại phép cho công việc đã được giao. Tham chiếu từ `systematic-debugging` được đổi sang tên skill local. Không nạp `using-superpowers` toàn cục, visual companion, telemetry hoặc hook. Các helper shell upstream không được chạy.
- **UI UX Pro Max:** Dùng SKILL.md/data/references của skill được chọn và runtime/tests từ đường dẫn canonical `src/ui-ux-pro-max/scripts`. Sửa ví dụ `${CLAUDE_PLUGIN_ROOT}` sang đường dẫn project-local có hướng dẫn resolve từ root; rút mô tả kích hoạt để giảm metadata. Python runtime giữ nguyên upstream. Search đọc CSV local; nhánh persist có ghi file nên bài smoke không dùng `--persist`. Các test persistence dùng thư mục tạm, có kiểm tra không ghi đè.
- **Duan Digi:** Giữ nguyên reference chính sách nguồn, thêm nguồn/commit và giấy phép MIT kèm theo. Các skill Tử Vi còn lại được viết riêng cho ranh giới engine/AI, không sao chép bảng an sao chưa được xác minh.
- **Validator:** Python có sẵn nhưng thiếu PyYAML; không cài pip hoặc sửa interpreter. Dùng parser thực `yaml@2.8.1` (ISC) trong `.agent-setup/validator`, có lockfile, cài với `--ignore-scripts`. Validator riêng kiểm YAML, tên/mô tả, liên kết của entrypoint, scaffold và hash. Chưa chạy `quick_validate.py` chính thức vì thiếu PyYAML; kiểm tra discovery thực tế của Codex đã đạt.

## 6. File được tạo

- `AGENTS.md`, `.gitignore` và 11 thư mục `.agents/skills/`.
- `.agent-setup/validator/package.json` và `package-lock.json`; `node_modules` local được bỏ qua bởi `.gitignore`.
- `scripts/review-skill-sources.ps1`, `scripts/stage-selected-skills.ps1`: chỉ đọc metadata/văn bản nguồn, ghi hồ sơ trong workspace; không chạy mã tải về. Trên máy có execution policy Restricted, phiên này đã chạy nội dung script do chính Codex viết trong shell hiện hữu, không đổi policy.
- `scripts/finalize-selected-skills.cjs`: ráp bản đã review và tạo manifest; từ chối ghi đè bản cài hoàn chỉnh. Đây là công cụ cho lần thiết lập này, không phải updater; không chạy lại để nâng phiên bản.
- `scripts/validate-agent-setup.cjs`, `scripts/check-codex-skills.cjs`, `scripts/run-ui-checks.cjs`, `scripts/check-setup-security.cjs`: kiểm tra có thể chạy lại.
- `docs/agent-sources/`: commit, README/license/tree và file đọc để review; `repositories.json`, `installed-skills.json`.
- `docs/agent-checks/`: JSON kết quả, log UI/test, bài thử kế hoạch và sáu walkthrough.
- Báo cáo này. Không tạo source app, package app, backend, pipeline deploy hoặc rule table.

## 7. Kết quả kiểm thử thực tế

| Kiểm tra | Kết quả | Bằng chứng |
| --- | --- | --- |
| Manifest YAML/tên/mô tả, link entrypoint, scaffold | Đạt: 11 skill | `agent-checks/validation.json` |
| File checksum sau điều chỉnh | Đạt: 102 file | `agent-sources/installed-skills.json`, `agent-checks/validation.json` |
| Codex CLI nhận diện skill | Đạt: 11/11 project skill, enabled; missing/duplicates/errors rỗng | `agent-checks/codex-discovery.json` |
| UI data validation | Exit 0: 12 domain, 22 stack và ui-reasoning.csv | `agent-checks/ui-data.txt` |
| UI design-system smoke | Exit 0; đã đọc kết quả và loại pattern landing khỏi đề xuất màn lá số | `agent-checks/ui-design-smoke.txt` |
| UI focused UX search | Exit 0; 3 kết quả focus/modal phù hợp chủ đề | `agent-checks/ui-ux-smoke.txt` |
| UI core unittest | 39 test đạt | `agent-checks/ui-test-core.txt` |
| UI color/design-mode unittest | 26 test đạt | `agent-checks/ui-test-design_system_mode.txt` |
| UI stack-mode unittest | 3 test đạt | `agent-checks/ui-test-design_system_stack.txt` |
| Bài thử Superpowers writing-plans | Đã áp dụng bản cài local để viết và tự rà kế hoạch setup | `agent-checks/writing-plans-smoke.md` |
| Bài thử 6 skill Tử Vi | Đã đọc và áp dụng bằng walkthrough cùng phiên; kết quả/giới hạn ghi riêng | `agent-checks/tuvi-skill-smoke.md` |
| Scan secret workspace | Không tìm thấy ứng viên theo các mẫu private key, GitHub token, AWS access ID, OpenAI key | `agent-checks/security.json` |

**68 test UI upstream đã chạy và đạt**, không phải toàn bộ test suite upstream. Bộ test được chọn dùng stdlib và thực sự thực thi runtime được cài. Các test/công cụ refresh catalog và kiểm cấu trúc repo upstream chưa chạy vì không cài cả repo. Không suy rộng kết quả thành chứng nhận mọi tính năng UI hoặc app Tử Vi.

Discovery dùng handshake `initialize` → `initialized` → `skills/list(forceReload=true)` theo [Codex App Server của OpenAI](https://learn.chatgpt.com/docs/app-server). Không dùng `thread/start`/`turn/start`, không gọi mô hình, không ghi cấu hình. Bài thử kế hoạch và Tử Vi là việc áp dụng chỉ dẫn trong chính phiên này; **chưa có eval độc lập hoặc kiểm chứng model tự chọn skill ở một phiên mới**. Không mô tả chúng như kết quả automatic trigger đã được chứng minh.

Scan secret chỉ là kiểm mẫu trên các file văn bản workspace, bỏ qua `node_modules`, `.git`, cache Python; không đọc kho credential toàn cục và không phải DLP audit toàn diện. Không sử dụng dữ liệu sinh thật. Không phát hiện ứng viên secret không đồng nghĩa đã chứng minh không thể có dữ liệu nhạy cảm ở mọi dạng.

## 8. Hạn chế, quyền và bước tiếp theo

1. **Chưa có trường phái/ruleset được chốt, bộ quy tắc đã thẩm định hay lá số mẫu được xác nhận độc lập.** Skill là workflow chuyên biệt, không phải chứng nhận nghiệp vụ hoặc engine hoàn chỉnh. Cần xác định cách xử lý giờ Tý, tháng nhuận, múi giờ lịch sử và tuổi vận trước khi lập trình engine.
2. **Chưa có app để chạy unit/integration/E2E của chart hoặc release.** Không build Android/iOS/Web, không test trên thiết bị. Cần chọn stack trong một yêu cầu phát triển tiếp theo; pnpm không phải điều kiện để dùng bộ skill này.
3. **Các bản cài upstream có điều chỉnh, đã ghim commit.** Khi nâng cấp, review diff, giữ LICENSE và chạy lại kiểm tra; không chạy installer đại trà. Manifest không tự cập nhật sau sửa skill.
4. **Không sửa hệ thống hoặc cấu hình toàn cục.** Nếu sau này muốn đưa skill ra `~/.agents/skills`, chỉnh PATH/cài runtime, bật plugin/hook hoặc publish, cần phê duyệt riêng theo phạm vi đó. **Không có yêu cầu phê duyệt còn treo để hoàn tất bộ cài project-local này.**
5. **Không thể bảo đảm UI phiên hiện tại đã refresh danh sách skill.** CLI thực tế đã xác nhận discovery; các skill mới có thể dùng từ lượt tiếp theo. Nếu selector không hiển thị, mở lại Codex tại workspace và kiểm tra `$tuvi-domain`, `$writing-plans` hoặc `$ui-ux-pro-max`; tài liệu OpenAI hướng dẫn restart nếu thay đổi chưa xuất hiện.
6. Không dùng hai repo chưa có giấy phép làm nguồn sao chép cho app. Làm rõ quyền trước khi tái sử dụng, hoặc chọn nguồn khác có giấy phép phù hợp và bộ kiểm thử độc lập.

Các bước khả dụng trong phạm vi thiết lập đã hoàn tất. Việc phát triển ứng dụng vẫn chưa bắt đầu, đúng yêu cầu người dùng.
