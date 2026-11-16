# VNScape — Chạm vào thế giới sống

Bản trải nghiệm dự thi EdTech, giao diện và nội dung tiếng Việt. Website tĩnh, chạy bằng HTML/CSS/JavaScript và Three.js được lưu tại `dist/assets/three.module.js` (MIT).

## Chạy tại máy

Muốn nộp bản PDF giới thiệu website, xem [hai bản PDF trong thư mục exports](exports/README.md). Chạy `npm.cmd run pdf` để chụp lại giao diện và xuất bản A4 mới sau khi cập nhật website.

Muốn đưa lên link cố định để nộp cuộc thi, xem [hướng dẫn xuất bản Cloudflare Pages](PUBLISH.md). Tạo bản cập nhật bằng `npm.cmd run release`; xuất bản lại vào cùng dự án sẽ giữ địa chỉ chính thức.

Yêu cầu Node.js 18+. Không cần tạo môi trường Python `venv` hoặc cài thêm thư viện để chạy web.

Nếu terminal đang ở `C:\Users\Admin\Desktop\VNScape` như thư mục mở trong VS Code, chạy lần lượt:

```powershell
cd .\vnscape
npm.cmd start
```

Phải chạy trong thư mục con `vnscape` có file `package.json`. Việc đang mở `README.md` trong trình soạn thảo không tự chuyển thư mục của terminal. Nếu terminal đã ở `VNScape\vnscape`, chỉ chạy `npm.cmd start`.

Khi terminal hiện `VNScape: http://127.0.0.1:4173`, mở địa chỉ đó bằng trình duyệt. Giữ terminal chạy khi sử dụng web; nhấn `Ctrl+C` để dừng.

Trên Windows PowerShell, `npm.cmd` tránh lỗi chặn thực thi file `npm.ps1`; không cần đổi Execution Policy. Nếu `npm` của bạn chạy bình thường, có thể dùng `npm start` tương đương. Cũng có thể chạy trực tiếp `node server.mjs` trong cùng thư mục.

Kiểm tra mã và các quy tắc dữ liệu, cũng từ thư mục con `vnscape`:

```powershell
npm.cmd run check
npm.cmd test
```

### Xem trên điện thoại qua Wi-Fi

Máy tính và điện thoại cần kết nối cùng một mạng Wi-Fi. Trong terminal đang chạy VNScape, nhấn `Ctrl+C`, rồi từ thư mục `vnscape` chạy:

```powershell
npm.cmd run start:lan
```

Terminal sẽ in đường dẫn **Điện thoại cùng Wi-Fi**, dạng `http://192.168.x.x:4173`. Nhập đúng đường dẫn đó vào Chrome/Safari trên điện thoại; dùng `http://`, không phải `https://`. Không dùng `localhost` hoặc `127.0.0.1` trên điện thoại vì đó là địa chỉ của chính điện thoại.

Nếu Windows hỏi quyền mạng cho Node.js, cho phép trên **Private networks / Mạng riêng tư**. Giữ máy tính bật và terminal chạy trong khi xem. Nếu chưa kết nối được, kiểm tra hai thiết bị có cùng mạng, không dùng Wi-Fi khách hoặc VPN; mạng có tính năng cô lập thiết bị có thể chặn kết nối này. IP có thể đổi khi chuyển mạng hoặc kết nối lại; dùng địa chỉ mới in trong terminal.

Lệnh `npm.cmd start` chỉ mở trên máy tính; `npm.cmd run start:lan` mở để các thiết bị cùng mạng truy cập. Ghi chép vẫn lưu riêng trong trình duyệt của từng thiết bị, không tự đồng bộ.

### Chia sẻ tạm cho người ở nơi khác (Windows)

Trong thư mục `vnscape`, chạy:

```powershell
npm.cmd run share
```

Lần đầu lệnh tải bản Cloudflare `cloudflared` chính thức vào `.tools` và đối chiếu SHA-256. Lệnh bật máy chủ VNScape nếu cần, mở đường hầm HTTPS rồi in `LINK: https://...trycloudflare.com`. Gửi link đó cho người cần xem; không cần cùng Wi-Fi. Các tiến trình chạy nền để bạn tiếp tục dùng terminal. Chạy lại lệnh sẽ in lại link đang dùng.

Nếu Cloudflare báo `Unauthorized: Tunnel not found`, chạy lại `npm.cmd run share`: chương trình sẽ tạo tunnel mới và giữ máy chủ cục bộ. Có thể chủ động đổi link bằng `npm.cmd run share -- -Refresh`.

Để tắt chia sẻ:

```powershell
npm.cmd run share:stop
```

Lệnh tắt chỉ dừng các tiến trình do lần chia sẻ này tạo, không dừng máy chủ bạn đã tự mở trước đó. Giữ máy tính bật, có Internet và không ngủ trong lúc chia sẻ. Link mới có thể khác sau khi tắt/mở lại; ai có link đều xem được website. Ghi chép vẫn riêng theo trình duyệt của từng người. File công cụ và trạng thái nằm ngoài `dist`, không được web phục vụ và không được đưa vào Git.

Tham khảo: [Cloudflare Quick Tunnels](https://developers.cloudflare.com/tunnel/get-started/quick-tunnels/).

### Lỗi thường gặp

- **`ENOENT ... VNScape\package.json`:** terminal đang ở thư mục ngoài. Chạy `cd .\vnscape` trước.
- **`npm.ps1 cannot be loaded ... running scripts is disabled`:** dùng `npm.cmd` như hướng dẫn trên.
- **`EADDRINUSE ... 4173`:** đã có chương trình dùng cổng này. Nếu bản VNScape cũ vẫn chạy, mở địa chỉ trên hoặc nhấn `Ctrl+C` ở terminal chạy bản cũ trước khi khởi động lại.

### Có cần môi trường ảo không?

`venv` dành cho Python; dự án hiện tại dùng JavaScript và Node.js nên không cần. Các thư viện phát triển được npm đặt trong `node_modules` của chính dự án và ghi phiên bản trong `package-lock.json`. Chỉ cần `npm.cmd ci` nếu muốn cài các công cụ phát triển như Playwright; việc mở website bằng lệnh ở trên không cần bước này.

## Đã hoạt động

- Tám trang riêng: `#/explore`, `#/library`, `#/lab`, `#/world`, `#/quests`, `#/journey`, `#/studio`, `#/notebook`. BioLab có các đường dẫn con `stations`, `microscope`, `division`, `human`; Thế giới sống có `stories`, `map`, `careers`. Link kính hiển vi cũ `#/microscope` tự chuyển về `#/lab/microscope`. Thanh điều hướng đổi trang, hỗ trợ mở đường dẫn trực tiếp, tải lại và nút quay lại của trình duyệt.
- Bộ chọn sách tham khảo Kết nối tri thức với cuộc sống / Chân trời sáng tạo; mỗi lớp có tổng quan mạch kiến thức, nguồn đọc thêm và bộ lọc bài học hoặc hoạt động tương tác.
- Giao diện triển lãm xanh rừng sâu: không gian nhiều lớp, hạt phấn, ánh sáng viền và thanh chọn tế bào/ADN ngay trên trang đầu.
- Bảng màu rừng buổi sáng: xanh rừng sáng hơn, thẻ học và bảng điều khiển xanh kem, chữ xanh đậm trên nền sáng, điểm nhấn vàng nắng. Lớp phối màu nằm trong `dist/palette.css`; hiệu ứng, mô hình và dữ liệu giữ nguyên.
- Không gian 3D gần toàn màn hình, đèn quan sát và ẩn/hiện thành tế bào. Nút Chuyển động tạm dừng hiệu ứng; cài đặt giảm chuyển động của hệ điều hành được tôn trọng.
- 27 bài khám phá: ba bài cho mỗi lớp 6–9 (Khoa học tự nhiên), năm bài cho mỗi lớp 10–12 (Sinh học). Bộ lọc khối lớp, dạng hoạt động, Cơ bản/Vận dụng/Mở rộng; bài có câu hỏi khởi động, kiến thức, minh họa, kiểm tra, vận dụng và kết nối. Mục vận dụng cho phép lưu suy nghĩ vào sổ. Nội dung đối chiếu SGK Kết nối tri thức trên cổng NXBGDVN; CTST mới liên kết thông tin tham khảo, chưa gán tương đương từng bài.
- Năm mô hình 3D: tế bào thực vật cắt lớp, ADN, lục lạp, ti thể và vi khuẩn. Xoay bằng kéo hoặc bàn phím, phóng to, dừng chuyển động; chọn cấu trúc bằng chạm hoặc nút chú giải. Có bản chú giải khi WebGL không khả dụng.
- Logo SVG riêng, ba poster khoa học có thể mở lớn và tải về, ảnh thiên nhiên kèm nguồn. Thư viện và phòng thí nghiệm có hậu cảnh rừng nhiều lớp, ánh sáng và cây lá gần–xa.
- Sáu trạm tương tác: quang hợp, thẩm thấu, enzyme theo nhiệt độ/pH, hướng sáng, lai Mendel và dòng năng lượng sinh thái. Có hình minh họa thay đổi theo điều kiện, nhật ký so sánh, lưu vào sổ tay và liên kết bài học.
- Hành trình: XP/cấp độ, tám huy hiệu, lịch 14 ngày và chuỗi học thực tế theo múi giờ Việt Nam, chủ đề hoàn thành, gợi ý ôn từ lượt trả lời gần nhất. Thử thách 2–6 người thay phiên trên cùng thiết bị có bảng kết quả tính từ câu trả lời; không phải xếp hạng trực tuyến.
- Sổ tay dạng quyển sách: gõ tiêu đề/nội dung trực tiếp lên giấy, tự động lưu, lật trang có hiệu ứng, mục lục, bìa sổ, thêm/xóa nội dung trang và xuất văn bản theo thứ tự trang. Máy tính mở hai trang; điện thoại một trang. Ghi chép cũ được giữ lại và đánh số trang. Góc giáo viên hiển thị kết quả thực tế trên thiết bị và xuất CSV.
- Hiệu ứng nổi bong bóng kính, nâng nhẹ và phản hồi khi nhấn cho nút/thanh điều hướng. Không chặn thao tác; tắt chuyển động theo cài đặt giảm chuyển động của hệ điều hành.
- Trạm kính hiển vi góc nhìn thứ nhất: cuộn trong khung để tiến gần/rời thị kính hoặc dùng nút trên điện thoại. Năm tiêu bản: thịt quả cà chua, trùng roi xanh, trùng giày, đỉnh rễ hành nhuộm, phết máu người. Có vật kính 4×/10×/40×/100× (thị kính 10×), chỉnh thô/tinh, đèn, khẩu độ, dầu nhúng mô phỏng, kéo/dịch tiêu bản, dừng mẫu sống, chụp PNG và ghi vào sổ tay.
- Bố cục điện thoại, menu nhỏ, hộp thoại truy cập bằng bàn phím, hỗ trợ giảm chuyển động. Nội dung chính dùng cỡ chữ khoảng 15–16px, nút và nhãn được tăng kích thước.

## Mở rộng BioLab và Thế giới sống · 06/11/2026

- **BioLab hợp nhất** kính hiển vi và sáu trạm cũ. Quang hợp điều chỉnh ánh sáng, CO₂ và nhiệt độ. Có dự đoán, kết quả, bảng so sánh và báo cáo vào sổ.
- **Phân bào Three.js**: chu kì tế bào/nguyên phân và giảm phân với mô hình 2n = 4, kéo đổi góc, chạy/dừng và chọn giai đoạn. **Human Lab**: cơ hoành, thể tích và hướng khí đồng bộ theo pha thở yên tĩnh.
- **Thế giới sống**: năm câu chuyện tương tác; BioMap với tám hồ sơ sinh cảnh có câu hỏi bảo tồn; BioCareer với năm hướng nghề, kiến thức, kỹ năng, hoạt động thử và nguồn gốc.
- **BioQuest**: năm nhiệm vụ về ao, kết nối sinh cảnh, mã di truyền, lưới thức ăn và phân tích một tình huống dịch giả định. Phải thử phương án đúng và giải thích trước khi nhận 40 XP ở lần đầu; có báo cáo lưu sổ.
- Hover nâng thẻ, nhấn thu nhẹ, hiện khi cuộn, chuyển trang/modal, phản hồi đúng/sai và lá giấy mừng thành tựu dùng nhịp thống nhất; tôn trọng giảm chuyển động.

Đọc [nguồn, giả định và giới hạn khoa học](SCIENCE.md). Các điểm BioMap là vị trí định hướng, không phải ranh giới hành chính/khu bảo tồn; chưa phải atlas mọi địa phương. Dữ liệu cá nhân và phiên nhóm lưu tại trình duyệt; chưa có đồng bộ tài khoản.

Kiểm tra chức năng mới bằng **node tests/campus-browser.mjs** khi máy chủ đang chạy ở cổng 4173. Bộ kiểm tra dùng hồ sơ trình duyệt tạm, không ghi vào hồ sơ của người dùng.

## Xưởng khám phá mới

Mở **Xưởng khám phá** trên thanh điều hướng, hoặc truy cập `http://127.0.0.1:4173/#/studio`. Năm không gian nằm trong các tab riêng; trên điện thoại cả năm tab đều hiện để dễ chọn.

1. **Vũ trụ sống:** hành trình phóng đại với thang logarithm, từ khu rừng → lá → mô → tế bào → nhân → DNA → nguyên tử. Cuộn trong khung, kéo thanh hoặc chọn mốc. Có chú giải kích thước, câu hỏi gợi mở và lưu điểm nhìn vào sổ tay. Chuyển cảnh là minh họa để so sánh thang đo, không phải ảnh quay xuyên cùng một mẫu vật.
2. **GeneCraft:** nhập mạch mã hóa DNA, chọn/thay/chèn/xóa base, kéo đổi chỗ bộ ba hoặc dùng nút mũi tên. Mạch khuôn, mRNA, codon và chuỗi amino acid thay đổi theo bảng mã chuẩn NCBI số 1. Bốn thử thách kiểm tra trình tự thực tế: đồng nghĩa, thay amino acid, dừng sớm và dịch khung. Có lưu kết quả và **BioSound**, ánh xạ amino acid thành nhạc theo quy ước; không phải âm thanh tự nhiên của DNA.
3. **BioDefense:** hai nhiệm vụ miễn dịch có phản hồi theo vai trò: vi khuẩn ngoài tế bào và tế bào nhiễm virus. Phân biệt đại thực bào, tế bào tua, T hỗ trợ, B, tương bào, T gây độc và tế bào nhớ. Chế độ hai người là luân phiên **trên cùng thiết bị**, chưa có chơi qua mạng. Nhật ký lưu vào sổ tay.
4. **Cổng nhà khoa học:** các câu hỏi gợi mở theo câu chuyện Mendel, Darwin, Franklin và Pasteur. Ghi rõ là **tái hiện sư phạm bằng kịch bản có nguồn**, không phải AI trực tiếp hoặc lời trích lịch sử. Người học có thể viết suy nghĩ và lưu cuộc gặp.
5. **STEM tại bàn:** ba hoạt động quan sát về thẩm thấu ở khoai, nảy mầm và hồ sơ lá. Có vật liệu, bước làm, biến xét/điều kiện kiểm soát, phiếu dự đoán–điều kiện–số liệu–giải thích. Người học nhập dữ liệu thật; website không tự tạo số đo hoặc xác nhận kết quả thực nghiệm.

Xưởng có 14 cột mốc, mỗi cột mốc chỉ cộng **15 XP một lần**. Tiến độ cũ được giữ lại. Ghi chép chỉ được thêm khi chọn nút lưu; nếu đã có đủ 100 ghi chép, xưởng yêu cầu sắp xếp sổ trước khi thêm để tránh đẩy mất trang cũ. Nguồn khoa học có trong từng tab; xem thêm [SCIENCE.md](SCIENCE.md).

Các mô-đun được khởi tạo khi mở, chuyển động phóng đại và âm thanh dừng khi rời hoạt động. Có thao tác bàn phím, bố cục 360–1920 px, hỗ trợ giảm chuyển động và nhắc khi đóng trang còn phiếu/suy nghĩ chưa lưu.

Kiểm tra logic và cú pháp:

```powershell
npm.cmd test
npm.cmd run check
```

Nếu đã cài công cụ phát triển bằng `npm.cmd ci` và có Chrome, kiểm tra luồng trình duyệt:

```powershell
node tests/studio-browser.mjs
```

Lệnh kiểm tra cần máy chủ đang chạy ở cổng 4173. Các phiếu quan sát do bộ kiểm tra nhập được ghi rõ là dữ liệu kiểm thử, trong hồ sơ trình duyệt tạm riêng.

## Giới hạn hiện tại

Đây là prototype hoạt động cục bộ ở trình duyệt, chưa có backend/tài khoản, quản lý lớp nhiều học sinh, AI, AR hoặc đồng bộ đa thiết bị. Dữ liệu nằm trong localStorage của thiết bị. Cần xuất ghi chép trước khi xóa trình duyệt. Không có số người dùng, đánh giá hay dữ liệu học sinh giả.

Mô hình khoa học dùng màu quy ước, hình dạng đơn giản và không theo tỉ lệ. Mỗi trạm công khai các giả định ở mục “Giả định mô hình & nguồn tham khảo”; kết quả là dữ liệu mô phỏng, không phải đo thực nghiệm. Trạm enzyme dùng một enzyme giả định; tháp năng lượng dùng đơn vị quy ước; Mendel giả định một gene hai allele với trội hoàn toàn.

Nội dung được tổ chức theo mạch chủ đề, tham khảo nguồn NXBGDVN cho Kết nối tri thức với cuộc sống và Chân trời sáng tạo, cùng OpenStax Biology 2e. Chưa đối chiếu đầy đủ từng bài, số trang và mọi phiên bản sách. Cần giáo viên thẩm định trước khi dùng chính thức; nguồn cho từng bài nằm trong bài và cửa sổ Nguồn học liệu. Không sao chép nguyên bộ SGK.

Tiến độ và ghi chép của bản cũ được giữ lại khi mở bản này trong cùng trình duyệt, trên cùng địa chỉ truy cập (origin). Đổi tên miền tunnel hoặc đổi từ localhost sang địa chỉ LAN sẽ tạo vùng lưu trữ riêng; hãy xuất sổ để giữ bản sao. Mỗi trạm chỉ cộng XP ở lần ghi kết quả đầu tiên, không cộng lặp khi ghi nhiều lần thử.

Ảnh: Unsplash (các mã ảnh lưu trong giao diện Nguồn học liệu). Phông chữ Be Vietnam Pro và Lora: Google Fonts. Chưa sử dụng ảnh sinh từ AI.

## Dùng trạm kính hiển vi

1. Mở **BioLab → Cell Lab**, chọn một tiêu bản. Cuộn xuống trong khung kính hoặc chọn **Bắt đầu quan sát**. Cuộn ngược hoặc chọn **Rời thị kính** để lùi ra.
2. Bắt đầu với vật kính 4×/10×, chỉnh thô rồi chỉnh tinh cho nét. Có nút **Hỗ trợ tìm nét** khi cần. Khi chọn 40×/100×, chỉnh thô khóa; dùng chỉnh tinh hoặc trở lại vật kính nhỏ. 100× cần bật dầu nhúng mô phỏng.
3. Kéo vùng nhìn để dịch tiêu bản (ảnh đi ngược chiều bàn tiêu bản); có phím mũi tên và cụm nút di chuyển. **◎** đưa về tâm. Độ phóng đại tăng làm vùng nhìn hẹp lại; thước tỉ lệ đổi tương ứng.
4. **Chụp vùng nhìn** tải PNG kèm thông số và nhãn mô phỏng. **Ghi vào sổ tay** tạo trang có điều kiện quan sát và câu hỏi để bạn viết tiếp.

Ảnh gốc và nguồn đối chiếu được liên kết trong **Ảnh tham khảo & cách mô phỏng**: MNHN, University of Hawaiʻi, Fukuoka University of Education, Histology Guide, Rolf Vossen, Thilo Bauer và Nikon Small World; thao tác lấy nét tham khảo Celestron. Đồ họa mẫu vật được lập trình riêng, không chép ảnh có bản quyền. Tiêu bản cố định đứng yên; chỉ trùng roi và trùng giày có chuyển động chậm. Mô phỏng dùng số trường giả định 18 mm, kích thước tế bào minh họa và quang học định tính, không thay thế thực hành bằng kính thật.

Kiểm tra trình duyệt (cần cài công cụ phát triển bằng `npm.cmd ci` và có Google Chrome):

```powershell
node tests/microscope-browser.mjs
node tests/campus-browser.mjs
```

## Các bước phát triển tiếp

1. Nhóm duyệt hướng mỹ thuật trên điện thoại và máy tính, chọn bài trình diễn chính.
2. Giáo viên đồng hành thẩm định 3 bài chủ lực, bổ sung mục tiêu, rubric và thí nghiệm thực tế đối chiếu.
3. Thử nghiệm với nhóm học sinh nhỏ: quan sát thao tác, hỏi trước/sau và ghi nhận điều gây nhầm lẫn.
4. Xây tài khoản, lớp học và đồng bộ tiến độ nếu đó là nhu cầu được kiểm chứng; sau đó mới thêm AI có nguồn trích dẫn và AR.
