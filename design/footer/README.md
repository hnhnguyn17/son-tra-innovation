# Minh họa footer Sơn Trà

Minh họa nét Cá Ông, thuyền và đê chắn sóng được tạo bằng công cụ sinh ảnh AI, dùng làm lớp trang trí phía sau chữ và liên kết HTML ở cuối trang.

## Tài nguyên sử dụng

- [outline-desktop.webp](../../public/assets/footer/outline-desktop.webp): 1536 × 768, khoảng 33 KB.
- [outline-mobile.webp](../../public/assets/footer/outline-mobile.webp): 720 × 900, khoảng 20 KB.

Bản mobile sắp xếp Cá Ông và âu thuyền theo chiều dọc. Các ảnh WebP được xuất với chất lượng 0.88. Ảnh PNG gốc có thể giữ cục bộ trong `design/footer/source/`; thư mục này được bỏ qua bởi Git và không cần để build website.

## Tích hợp

[CarryingAStory.tsx](../../src/components/CarryingAStory.tsx) chọn ảnh mobile dưới 768 px và tải ảnh theo cơ chế lazy loading. [footer.css](../../src/styles/footer.css) định vị lớp minh họa phía sau nội dung. Ảnh chỉ mang tính trang trí, không chiếm vùng tương tác và không chứa chữ giao diện.

## Kiểm tra

Chạy `npm run lint` và `npm run build`. [footer-outline.browser.js](../../tests/footer-outline.browser.js) chứa hàm kiểm tra responsive, liên kết và hành vi dự phòng; cần môi trường Playwright riêng với trang đã mở ứng dụng.
