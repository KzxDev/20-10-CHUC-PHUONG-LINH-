# Thêm ảnh kỷ niệm thật vào đây

1. Copy ảnh của hai bạn vào thư mục này (ví dụ: `memory-01.jpg`, `memory-02.jpg`, ...).
   - Nên dùng ảnh tỉ lệ dọc hoặc vuông, dung lượng vừa phải (dưới ~1.5MB mỗi ảnh) để trang tải nhanh.
2. Mở file `src/config/loveConfig.ts`, tìm mảng `GALLERY_PHOTOS`.
3. Với mỗi ảnh, thêm thuộc tính `src: "/photos/ten-file-cua-ban.jpg"` — ví dụ:

```ts
{ id: 1, fileName: "memory-01.jpg", caption: "Lần đầu đi chơi cùng nhau", date: "2023", src: "/photos/memory-01.jpg" }
```

4. Nếu không có `src`, ảnh sẽ tự động hiển thị khung placeholder thiết kế sẵn — website vẫn chạy bình thường, không bị lỗi ảnh vỡ.
