# VNScape — Chạm vào thế giới sống

Bản trải nghiệm dự thi EdTech, giao diện và nội dung tiếng Việt. Website tĩnh, chạy bằng HTML/CSS/JavaScript và Three.js được lưu tại `dist/assets/three.module.js` (MIT).

## Chạy tại máy

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

### Lỗi thường gặp

- **`ENOENT ... VNScape\package.json`:** terminal đang ở thư mục ngoài. Chạy `cd .\vnscape` trước.
- **`npm.ps1 cannot be loaded ... running scripts is disabled`:** dùng `npm.cmd` như hướng dẫn trên.
- **`EADDRINUSE ... 4173`:** đã có chương trình dùng cổng này. Nếu bản VNScape cũ vẫn chạy, mở địa chỉ trên hoặc nhấn `Ctrl+C` ở terminal chạy bản cũ trước khi khởi động lại.

### Có cần môi trường ảo không?

`venv` dành cho Python; dự án hiện tại dùng JavaScript và Node.js nên không cần. Các thư viện phát triển được npm đặt trong `node_modules` của chính dự án và ghi phiên bản trong `package-lock.json`. Chỉ cần `npm.cmd ci` nếu muốn cài các công cụ phát triển như Playwright; việc mở website bằng lệnh ở trên không cần bước này.

## Đã hoạt động

- Bốn trang độc lập trong cùng website: `#/explore`, `#/library`, `#/lab`, `#/notebook`. Thanh điều hướng đổi trang, hỗ trợ mở đường dẫn trực tiếp, tải lại và nút quay lại của trình duyệt.
- Bộ chọn sách tham khảo Kết nối tri thức với cuộc sống / Chân trời sáng tạo; mỗi lớp có tổng quan mạch kiến thức, nguồn đọc thêm và bộ lọc bài học hoặc hoạt động tương tác.
- Giao diện triển lãm xanh rừng sâu: không gian nhiều lớp, hạt phấn, ánh sáng viền và thanh chọn tế bào/ADN ngay trên trang đầu.
- Không gian 3D gần toàn màn hình, đèn quan sát và ẩn/hiện thành tế bào. Nút Chuyển động tạm dừng hiệu ứng; cài đặt giảm chuyển động của hệ điều hành được tôn trọng.
- Mười lăm bài mẫu, năm bài cho mỗi lớp 10, 11, 12; chọn khối lớp, tìm kiếm có hoặc không dấu, đánh dấu bài. Nội dung mới gồm năng lượng, phân bào, vi sinh vật, cảm ứng, sinh trưởng, sinh sản, tiến hóa, sinh thái và di truyền học người.
- Năm mô hình 3D: tế bào thực vật cắt lớp, ADN, lục lạp, ti thể và vi khuẩn. Xoay bằng kéo hoặc bàn phím, phóng to, dừng chuyển động; chọn cấu trúc bằng chạm hoặc nút chú giải. Có bản chú giải khi WebGL không khả dụng.
- Logo SVG riêng, ba poster khoa học có thể mở lớn và tải về, ảnh thiên nhiên kèm nguồn. Thư viện và phòng thí nghiệm có hậu cảnh rừng nhiều lớp, ánh sáng và cây lá gần–xa.
- Sáu trạm tương tác: quang hợp, thẩm thấu, enzyme theo nhiệt độ/pH, hướng sáng, lai Mendel và dòng năng lượng sinh thái. Có hình minh họa thay đổi theo điều kiện, nhật ký so sánh, lưu vào sổ tay và liên kết bài học.
- Câu hỏi có phản hồi, hoàn thành bài, XP không cộng lặp, huy hiệu, hành trình, đổi tên người học.
- Sổ tay dạng quyển sách: gõ tiêu đề/nội dung trực tiếp lên giấy, tự động lưu, lật trang có hiệu ứng, mục lục, bìa sổ, thêm/xóa nội dung trang và xuất văn bản theo thứ tự trang. Máy tính mở hai trang; điện thoại một trang. Ghi chép cũ được giữ lại và đánh số trang. Góc giáo viên hiển thị kết quả thực tế trên thiết bị và xuất CSV.
- Bố cục điện thoại, menu nhỏ, hộp thoại truy cập bằng bàn phím, hỗ trợ giảm chuyển động. Nội dung chính dùng cỡ chữ khoảng 15–16px, nút và nhãn được tăng kích thước.

## Giới hạn hiện tại

Đây là prototype hoạt động cục bộ ở trình duyệt, chưa có backend/tài khoản, quản lý lớp nhiều học sinh, AI, AR hoặc đồng bộ đa thiết bị. Dữ liệu nằm trong localStorage của thiết bị. Cần xuất ghi chép trước khi xóa trình duyệt. Không có số người dùng, đánh giá hay dữ liệu học sinh giả.

Mô hình khoa học dùng màu quy ước, hình dạng đơn giản và không theo tỉ lệ. Mỗi trạm công khai các giả định ở mục “Giả định mô hình & nguồn tham khảo”; kết quả là dữ liệu mô phỏng, không phải đo thực nghiệm. Trạm enzyme dùng một enzyme giả định; tháp năng lượng dùng đơn vị quy ước; Mendel giả định một gene hai allele với trội hoàn toàn.

Nội dung được tổ chức theo mạch chủ đề, tham khảo nguồn NXBGDVN cho Kết nối tri thức với cuộc sống và Chân trời sáng tạo, cùng OpenStax Biology 2e. Chưa đối chiếu đầy đủ từng bài, số trang và mọi phiên bản sách. Cần giáo viên thẩm định trước khi dùng chính thức; nguồn cho từng bài nằm trong bài và cửa sổ Nguồn học liệu. Không sao chép nguyên bộ SGK.

Tiến độ và ghi chép của bản cũ được giữ lại khi mở bản này trong cùng trình duyệt. Mỗi trạm chỉ cộng XP ở lần ghi kết quả đầu tiên, không cộng lặp khi ghi nhiều lần thử.

Ảnh: Unsplash (các mã ảnh lưu trong giao diện Nguồn học liệu). Phông chữ Be Vietnam Pro và Lora: Google Fonts. Chưa sử dụng ảnh sinh từ AI.

## Các bước phát triển tiếp

1. Nhóm duyệt hướng mỹ thuật trên điện thoại và máy tính, chọn bài trình diễn chính.
2. Giáo viên đồng hành thẩm định 3 bài chủ lực, bổ sung mục tiêu, rubric và thí nghiệm thực tế đối chiếu.
3. Thử nghiệm với nhóm học sinh nhỏ: quan sát thao tác, hỏi trước/sau và ghi nhận điều gây nhầm lẫn.
4. Xây tài khoản, lớp học và đồng bộ tiến độ nếu đó là nhu cầu được kiểm chứng; sau đó mới thêm AI có nguồn trích dẫn và AR.
