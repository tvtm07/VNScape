# Xuất bản VNScape bằng Cloudflare Pages

Cloudflare Pages có gói miễn phí phù hợp với các file tĩnh của bản VNScape hiện tại. Website được phục vụ trên hosting, không cần giữ máy tính hoặc tunnel chạy. Miễn phí ở đây là địa chỉ `pages.dev`; tên miền riêng như `.vn` hoặc `.com` thường cần mua riêng.

Nguồn chính thức: [Static asset pricing](https://developers.cloudflare.com/pages/functions/pricing/), [Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/), [Wrangler Pages](https://developers.cloudflare.com/workers/wrangler/commands/pages/).

## Chuẩn bị bản cập nhật

Trong thư mục dự án:

```powershell
cd C:\Users\Admin\Desktop\VNScape\vnscape
npm.cmd run release
```

Lệnh kiểm tra ứng dụng rồi tạo `releases/vnscape-pages.zip` từ **nội dung bên trong `dist`**. Không tải toàn bộ thư mục dự án, `.git`, `node_modules`, `.share`, `.tools` hoặc file đăng nhập lên hosting. Bản ZIP có `index.html` ngay ở gốc; bản kiểm kê và SHA-256 nằm trong `releases/vnscape-release.json` để nhóm đối chiếu bản đã nộp.

## Nếu tải lên bằng dashboard

1. Đăng nhập [Cloudflare Dashboard](https://dash.cloudflare.com/), mở **Workers & Pages**.
2. Tạo ứng dụng **Pages** bằng **Direct Upload / Drag and drop**. Đây là Pages cho web tĩnh; không cần đăng ký gói trả phí hoặc thêm thẻ để dùng bản này.
3. Chọn tên dự án còn trống. Cloudflare trả về địa chỉ chính thức; tên ví dụ trong hướng dẫn không bảo đảm đã được đăng ký.
4. Tải `releases/vnscape-pages.zip` lên, chọn **Deploy site**.
5. Mở link `pages.dev` Cloudflare thực sự trả về trên cửa sổ ẩn danh và điện thoại. Kiểm tra Khám phá, Thư viện 3D, Phòng thí nghiệm, Kính hiển vi, Xưởng khám phá và Sổ tay.

Lần sau mở **đúng dự án đó**, chọn **Create a new deployment → Production**, rồi tải ZIP mới lên. Địa chỉ chính giữ nguyên. Không tạo dự án khác cho mỗi lần sửa.

## Nếu triển khai bằng Wrangler

Địa chỉ production của dự án: **https://vnscape-bio.pages.dev/**. Dùng địa chỉ này khi việc triển khai đã hoàn tất và đã kiểm tra, không dùng URL có mã deployment ở phía trước.

Bản đầu tiên đã được triển khai và kiểm tra truy cập không đăng nhập ngày **03/11/2026**. Đã đối chiếu 68 file công khai với bản đóng gói và kiểm tra sáu trang cùng các chức năng chính trên Chrome, gồm bố cục điện thoại. Bản chụp lưu để đối chiếu khi nộp nằm ở `releases/submission-2026-11-03.zip` và `releases/submission-2026-11-03.json`; các lần tạo release sau không ghi đè hai file này.

Công cụ chính thức được cài riêng trong `.tools/deploy`, yêu cầu Node.js 22 trở lên; thông tin đăng nhập không được đưa vào ZIP hoặc Git. Đăng nhập OAuth trên trang Cloudflare; không gửi mật khẩu/token trong chat.

Sau khi dự án được thiết lập, cấu hình công khai nằm trong `cloudflare-pages.json` (tên dự án, account ID, nhánh production, URL; không có token). Dùng:

```powershell
npm.cmd run hosting:status
npm.cmd run deploy:preview
```

Lệnh preview kiểm tra, đóng gói rồi đưa bản mới lên nhánh `preview`. Website production đã nộp cho ban giám khảo vẫn giữ phiên bản hiện tại. Khi đã kiểm tra và muốn cập nhật bản chính:

```powershell
npm.cmd run deploy
```

Lệnh này cũng chạy kiểm tra trước khi triển khai vào đúng dự án/nhánh production đã ghi trong cấu hình. Không dùng một link preview ngẫu nhiên làm địa chỉ chính thức khi có production URL cố định.

Nếu đăng nhập hết hạn, chạy `npm.cmd run hosting:login`, mở URL Cloudflare chính thức được in ra, nhập mã và tự xác nhận. Trên Windows, phiên đăng nhập được mã hóa bằng Windows Credential Manager. Nếu chuyển sang máy khác, cài công cụ riêng bằng `npm.cmd install --prefix .tools/deploy --no-audit --no-fund wrangler@4.157.0`; thành phần keyring có thể được Wrangler yêu cầu cài thêm. Dự án không chứa hoặc yêu cầu gửi mật khẩu/token.

Direct Upload không đổi trực tiếp sang Git integration trên dashboard được. Vẫn có thể cập nhật bằng Wrangler hoặc thiết lập CI gọi Wrangler cho cùng dự án. Nếu nhóm muốn nối Git tự động ngay từ đầu, chọn Git integration khi tạo dự án. Nguồn: [Cloudflare Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/).

## Sau khi nộp cho ban giám khảo

- Sửa và chạy thử tại máy như hiện tại; việc sửa file ở máy chưa thay đổi website đang công khai.
- Chỉ đưa bản mới lên production khi đã kiểm tra. Địa chỉ chính giữ nguyên và người mở sẽ thấy bản cập nhật.
- Giữ một bản ZIP/commit của phiên bản đã nộp; có thể dùng lịch sử deployment của Pages để quay về bản trước. Nếu cuộc thi yêu cầu chốt phiên bản, tuân theo quy định của ban tổ chức.
- Sổ tay và tiến độ hiện lưu trong trình duyệt, chưa có tài khoản đồng bộ. Chuyển từ link tunnel sang tên miền chính thức tạo vùng lưu trữ riêng; xuất sổ ở link cũ để giữ bản sao. Các lần cập nhật trên **cùng địa chỉ chính thức** không tự xóa dữ liệu này.
- `_headers` yêu cầu trình duyệt kiểm tra phiên bản file khi tải lại để giảm tình trạng giữ CSS/JavaScript cũ sau khi cập nhật.

Hosting giúp website chạy độc lập với máy tính; không tự bổ sung backend, đồng bộ tài khoản hay AI. Những phần đó có thể phát triển sau trên cùng nền tảng, với chi phí và giới hạn cần được xem lại khi triển khai.

## Bản mở rộng 06/11/2026

BioLab hợp nhất kính hiển vi; link `#/microscope` cũ vẫn chuyển đúng bàn kính. Học liệu, BioMap, BioQuest và Hành trình dùng cùng địa chỉ production, tiếp tục đọc dữ liệu `vnscape-v1` cũ. Không xóa localStorage khi cập nhật. Có bản ZIP và manifest nội dung riêng tại `releases/update-2026-11-06.*` sau khi xuất bản; bản nộp đầu tiên được giữ nguyên.
