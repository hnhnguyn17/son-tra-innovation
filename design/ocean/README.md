# Minh họa nền biển Sơn Trà

Ba cảnh bờ biển (`coast`), âu thuyền (`harbor`) và Cá Ông (`whale`) được tạo bằng công cụ sinh ảnh AI. Đây là minh họa nghệ thuật lấy cảm hứng từ Sơn Trà, không phải ảnh tư liệu hay bản đồ địa lý chính xác.

## Tài nguyên sử dụng

Website sử dụng ảnh tại [public/assets/ocean](../../public/assets/ocean/): mỗi cảnh có bản dọc `-mobile.webp` riêng cho điện thoại dưới 768 px ở hướng dọc, bản ngang `-960.webp` cho điện thoại xoay ngang và `-1536.webp` cho màn hình lớn. Các bản WebP được xuất với chất lượng 0.82 từ ảnh gốc.

Bộ mobile được tạo lại theo bố cục 9:16, không cắt từ ảnh desktop: giữ thuyền, đê chắn bão và toàn thân Cá Ông trong khung. Ảnh hiển thị trọn chiều ngang, hòa phần trời vào nền; chữ tiếp tục chồng lên ảnh. Hai chương âu thuyền và di sản giữ phần mở đầu cao tối thiểu 70svh. Xem [prompt tạo ảnh mobile](mobile-prompts.md).

Ảnh mobile gốc: `source/coast-mobile.png`, `source/harbor-mobile.png`, `source/whale-mobile.png`. Bản dùng trên website rộng 720 px, đủ cho màn hình 360 px ở mật độ 2×.

Ảnh PNG gốc có thể được giữ cục bộ trong `design/ocean/source/`; thư mục này được bỏ qua bởi Git và không cần để chạy hoặc build website.

## Tích hợp

- [OceanArtwork.tsx](../../src/components/background/OceanArtwork.tsx): chọn ảnh responsive và xử lý trạng thái tải.
- [OceanLivingBackground.tsx](../../src/components/background/OceanLivingBackground.tsx): quản lý nền theo chương.
- [oceanScenes.ts](../../src/components/background/oceanScenes.ts): cấu hình cảnh.
- [ocean.css](../../src/components/background/ocean.css): bố cục và hiệu ứng.

Ảnh mở đầu tải trước; các cảnh còn lại tải khi truy cập. Lớp nền có phương án dự phòng khi ảnh lỗi và hỗ trợ giảm chuyển động, tạm dừng khi mở hộp tư liệu hoặc ẩn trang.

## Kiểm tra

Chạy `npm run lint` và `npm run build`. Các hàm kiểm tra giao diện nằm trong [cinematic-background.browser.js](../../tests/cinematic-background.browser.js) và [ocean-background.browser.js](../../tests/ocean-background.browser.js); cần môi trường Playwright riêng với trang đã mở ứng dụng.
