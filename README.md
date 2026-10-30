# VNScape — Chạm vào thế giới sống

Bản trải nghiệm dự thi EdTech, giao diện và nội dung tiếng Việt. Website tĩnh, chạy bằng HTML/CSS/JavaScript và Three.js được lưu tại `dist/assets/three.module.js` (MIT).

## Chạy tại máy

Yêu cầu Node.js 18+. Không cần cài thư viện để chạy web.

```sh
npm start
```

Mở http://127.0.0.1:4173. Kiểm tra mã và các quy tắc dữ liệu:

```sh
npm run check
npm test
```

## Đã hoạt động

- Sáu bài mẫu, hai bài cho mỗi lớp 10, 11, 12; chọn khối lớp, tìm kiếm có hoặc không dấu, đánh dấu bài.
- Mô hình tế bào thực vật cắt lớp và ADN: xoay bằng kéo hoặc bàn phím, phóng to, dừng chuyển động; chọn bào quan bằng chạm hoặc nút chú giải. Có bản chú giải khi WebGL không khả dụng.
- Thí nghiệm quang hợp với ánh sáng và CO₂, ghi tối đa 20 lần thử, so sánh và lưu vào sổ tay.
- Câu hỏi có phản hồi, hoàn thành bài, XP không cộng lặp, huy hiệu, hành trình, đổi tên người học.
- Sổ tay tạo/sửa/xóa ghi chép, xuất văn bản; góc giáo viên hiển thị kết quả thực tế trên thiết bị và xuất CSV.
- Bố cục điện thoại, menu nhỏ, hộp thoại truy cập bằng bàn phím, hỗ trợ giảm chuyển động.

## Giới hạn hiện tại

Đây là prototype hoạt động cục bộ ở trình duyệt, chưa có backend/tài khoản, quản lý lớp nhiều học sinh, AI, AR hoặc đồng bộ đa thiết bị. Dữ liệu nằm trong localStorage của thiết bị. Cần xuất ghi chép trước khi xóa trình duyệt. Không có số người dùng, đánh giá hay dữ liệu học sinh giả.

Mô hình khoa học dùng màu quy ước, hình dạng đơn giản và không theo tỉ lệ. Công thức thí nghiệm là mô hình sư phạm đơn giản được công khai trên giao diện; không phải mô phỏng sinh lý hay dữ liệu đo thực nghiệm. Cần giáo viên thẩm định nội dung và đối chiếu chương trình/sách giáo khoa trước khi đưa vào dạy chính thức. Nguồn cho từng bài được liên kết trong bài và cửa sổ Nguồn học liệu.

Ảnh: Unsplash (các mã ảnh lưu trong giao diện Nguồn học liệu). Phông chữ Be Vietnam Pro và Lora: Google Fonts. Chưa sử dụng ảnh sinh từ AI.

## Các bước phát triển tiếp

1. Nhóm duyệt hướng mỹ thuật trên điện thoại và máy tính, chọn bài trình diễn chính.
2. Giáo viên đồng hành thẩm định 3 bài chủ lực, bổ sung mục tiêu, rubric và thí nghiệm thực tế đối chiếu.
3. Thử nghiệm với nhóm học sinh nhỏ: quan sát thao tác, hỏi trước/sau và ghi nhận điều gây nhầm lẫn.
4. Xây tài khoản, lớp học và đồng bộ tiến độ nếu đó là nhu cầu được kiểm chứng; sau đó mới thêm AI có nguồn trích dẫn và AR.
