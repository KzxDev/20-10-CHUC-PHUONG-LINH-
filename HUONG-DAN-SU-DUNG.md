# 💌 Our Little Universe — Hướng dẫn sử dụng & chỉnh sửa

Món quà 20/10 & kỷ niệm 2 năm dành cho Phương Linh iu. Dưới đây là hướng dẫn nhanh để chạy, xem và tuỳ chỉnh website.

## 1. Chạy thử dự án

```bash
npm install
npm run dev      # chạy dev server, xem trực tiếp khi chỉnh sửa
npm run build    # build bản production vào thư mục dist/
npm run preview  # xem thử bản đã build
```

## 2. Chỉnh toàn bộ nội dung ở MỘT file duy nhất

Mở `src/config/loveConfig.ts`. File này chứa toàn bộ:
- Tên/nickname của Linh.
- `ANNIVERSARY_DATE` — ngày bắt đầu yêu nhau (để `null` nếu chưa chắc chắn, site sẽ hiện "2 YEARS TOGETHER" thay vì đếm theo giây).
- Lời chúc 20/10, nội dung thư tay, các chương timeline, lời khen, điều ước, caption ảnh...
- Đường dẫn ảnh nền cinematic (`BACKGROUNDS`).

Không cần sửa bất kỳ file component nào khác để đổi nội dung chữ.

## 3. Thêm ảnh kỷ niệm thật

Xem hướng dẫn chi tiết trong `public/photos/README.md`. Tóm tắt:
1. Copy ảnh vào `public/photos/`.
2. Khai báo `src: "/photos/ten-file.jpg"` cho từng mục trong `GALLERY_PHOTOS` (trong `loveConfig.ts`).

## 4. Thêm nhạc nền (tùy chọn)

Xem `public/audio/README.md`. Website chạy bình thường kể cả khi chưa có file nhạc.

## 5. Các tính năng đã triển khai

- Loading screen + Intro mở phong thư (có animation 3D, hạt sáng, nút bỏ qua, có thể xem lại qua icon 💌 trên thanh điều hướng).
- Hero "OUR LITTLE UNIVERSE" với bầu trời sao, tinh vân, cánh hoa bay.
- Our Story: orbit-heart intro, bộ đếm kỷ niệm (tự tính năm/tháng/ngày/giờ/phút/giây chính xác theo lịch), timeline 5 chương với vẽ đường SVG theo tiến trình cuộn.
- Love Constellation: các vì sao hội tụ thành trái tim, click để tan ra rồi tái hợp, chứa 1 easter egg.
- Memory Gallery: masonry/polaroid, lightbox full-screen (phím mũi tên, Esc, vuốt mobile), 1 easter egg ẩn.
- Magical Garden: hoa "mọc" thực sự qua 7 giai đoạn (SEED → WIND) dựng bằng SVG + framer-motion, đom đóm & cánh hoa bằng canvas particle system, parallax chuột theo lớp chiều sâu, 3 bông hoa đặc biệt + mặt trăng là easter egg (mưa sao băng).
- Love Letter: thư tay reveal từng đoạn, chữ ký viết tay, nút đọc lại & gửi ôm.
- Gift Room: hộp quà mở bằng animation, 3 món quà tương tác (lời khen ngẫu nhiên, điều ước, mở lại album).
- 20/10 Celebration: pháo hoa canvas nhiều lớp + pháo hoa hình trái tim + hiệu ứng chữ, có thể bấm lại nhiều lần.
- Wish Maker: nhập điều ước, biến thành ngôi sao bay lên — không gửi lên server, không lưu trữ ngoài phiên hiện tại.
- 5 Easter eggs với modal chúc mừng khi tìm đủ cả 5.
- Audio controller bật/tắt nhạc nền, có fallback an toàn nếu thiếu file.
- Navigation kính mờ, active indicator, thanh tiến trình cuộn, nút về đầu trang, menu mobile.
- Hỗ trợ `prefers-reduced-motion`, tự phát hiện thiết bị yếu để giảm số lượng particle (HIGH QUALITY / PERFORMANCE MODE).

## 6. Đã kiểm tra

- `npx tsc --noEmit` — không có lỗi kiểu dữ liệu.
- `npm run build` — build thành công, ảnh nền xuất ra đúng trong `dist/images/`.
- `npm run preview` — server phục vụ `dist/index.html` trả về đúng tiêu đề trang, ảnh tải được (HTTP 200).

## 7. Phần có thể mở rộng thêm (nếu muốn nâng cấp sau)

- Thay particle-based Magical Garden bằng scene Three.js đầy đủ (hiện tại dùng SVG/Canvas 2D để đảm bảo hiệu năng mượt trên mọi thiết bị, vẫn giữ đủ 7 phase nở hoa, nhiều lớp chiều sâu và parallax chuột như yêu cầu).
- Thêm ảnh thật & nhạc nền hợp pháp theo hướng dẫn ở trên.
