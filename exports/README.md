# PDF website VNScape

- **VNScape-HoSoWebsite-DuThi.pdf:** bản A4 ngang để nộp thi, gồm ảnh giao diện, mô tả chức năng, nguồn SGK, link có thể bấm và mã QR website. Chữ giới thiệu có thể tìm kiếm/chọn trong PDF.
- **VNScape-GiaoDien-DayDu.pdf:** ảnh giao diện của các trang và tab chi tiết, dùng khổ trang dài để giữ nội dung; phù hợp xem trên màn hình và phóng to.

PDF lưu lại giao diện tại thời điểm xuất. Animation và các điều khiển tương tác cần mở tại https://vnscape-bio.pages.dev/. Nội dung sổ tay trong ảnh được ghi rõ là minh họa, không phải dữ liệu học sinh.

Để xuất lại bản A4 sau khi sửa website, mở terminal tại thư mục `vnscape` và chạy:

```powershell
npm.cmd run pdf
```

Cần Playwright (`npm.cmd ci`) và Google Chrome. Lệnh tự mở một máy chủ cục bộ ở cổng trống, dùng hồ sơ trình duyệt tạm riêng, xuất vào thư mục này rồi tự đóng máy chủ. Không cần chạy `npm start` trước; không đăng dữ liệu lên website hoặc sửa ghi chép của người dùng.

Ảnh và HTML dàn trang nằm tại `.qa/pdf-export`. Bộ kiểm tra/xuất bản tham chiếu `python scripts/finish-pdf.py` dùng PyMuPDF, Pillow; công cụ đã cài riêng trong `.tools/pdf-tooling`. Nguồn mẫu và mã QR nằm trong `scripts/export-pdf.mjs` và `scripts/pdf-assets/`.

Khi website thay đổi, xuất lại PDF để tài liệu phản ánh phiên bản mới. File PDF đã nộp là bản tĩnh, không tự thay đổi theo website.
