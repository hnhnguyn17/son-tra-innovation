# Sơn Trà — Miền ký ức neo đậu

Website giới thiệu văn hóa biển, ký ức làng chài và ý tưởng không gian Công viên Đổi mới Sáng tạo Sơn Trà, Đà Nẵng. Dự án sử dụng React, TypeScript và Vite; nội dung được trình bày qua một trang cuộn với nền biển minh họa, thư viện hình ảnh và các trải nghiệm tương tác.

Đây là website phục vụ đồ án và nghiên cứu thiết kế. Các minh họa nghệ thuật và đề xuất không gian không đại diện cho quy hoạch đã phê duyệt hoặc công trình đang hoạt động.

## Nội dung

1. **Cửa Biển Sơn Trà** — mở đầu hành trình khám phá.
2. **Kho Tri Thức Số** — tư liệu về địa danh, lịch sử và văn hóa bản địa.
3. **Người Xứ Biển** — không gian kể chuyện về cư dân làng chài.
4. **Âu Thuyền Thọ Quang** — câu chuyện bến neo đậu và nhịp sống cảng cá.
5. **Di Sản & Làng Chài** — tín ngưỡng biển, Cầu ngư và nghề truyền thống.
6. **Trải Nghiệm Bờ Vịnh** — phối cảnh, bản vẽ và ý tưởng hoạt động công viên.
7. **Tra Cứu & Đồng Hành** — liên kết tham khảo và thông tin cuối trang.

Trang có điều hướng theo chương, chế độ cuộn tự do, hộp xem tư liệu và nền biển thích ứng với thiết bị. Hiệu ứng nền hỗ trợ tùy chọn giảm chuyển động của hệ điều hành.

## Chạy trên máy

Yêu cầu Node.js **20.19+ trong nhánh 20**, hoặc **22.12+** và npm, theo yêu cầu của Vite đang cài đặt. Nên dùng Node.js 22.12 trở lên.

```bash
npm ci
npm run dev
```

Mở địa chỉ Vite hiển thị trong terminal, mặc định là `http://localhost:5173`. Trên Windows, nếu PowerShell chặn script npm, dùng `npm.cmd` thay cho `npm`.

| Lệnh | Chức năng |
| --- | --- |
| `npm run dev` | Chạy máy chủ phát triển |
| `npm run lint` | Kiểm tra mã bằng Oxlint |
| `npm run build` | Kiểm tra TypeScript và tạo bản build trong `dist/` |
| `npm run preview` | Xem bản build tại máy sau khi build |

## Cấu trúc dự án

```text
src/
  components/          Các phần nội dung và thành phần giao diện
    background/        Nền biển, minh họa và hiệu ứng chuyển cảnh
    generative/        Các trải nghiệm tương tác bằng Canvas/SVG
  data/                Dữ liệu nội dung và thông tin địa điểm
  hooks/               Điều hướng cuộn và trạng thái chuyển động
  styles/              Font, theme và giao diện footer
  App.tsx              Ghép các phần của trang
  index.css            Stylesheet chính
public/assets/         Hình ảnh dùng trực tiếp trên website
design/                Ghi chú về tài nguyên minh họa
docs/                  Nguồn nội dung và báo cáo kiểm tra
tests/                 Các hàm kiểm tra giao diện bằng Playwright
```

## Cập nhật nội dung và hình ảnh

- Nội dung dùng chung: [contentData.ts](src/data/contentData.ts) và [siteData.ts](src/data/siteData.ts). Một số câu chữ và cấu hình tư liệu vẫn nằm trong từng component.
- Thứ tự và nhãn điều hướng: [useOnePageScroll.ts](src/hooks/useOnePageScroll.ts); bố cục hiển thị: [App.tsx](src/App.tsx).
- Bản vẽ và phối cảnh: [ParkSketchGallery.tsx](src/components/ParkSketchGallery.tsx), ảnh tại `public/assets/park-sketches/` và `public/assets/park-renders/`.
- Nền biển: [design/ocean/README.md](design/ocean/README.md), ảnh WebP tại `public/assets/ocean/`.
- Minh họa footer: [design/footer/README.md](design/footer/README.md), ảnh WebP tại `public/assets/footer/`.
- Nguồn tham khảo và tư liệu cần bổ sung: [docs/content-sources.md](docs/content-sources.md).

Một số vị trí ảnh, video và lời kể vẫn là khung chờ bổ sung tư liệu. Kiểm tra nguồn và quyền sử dụng trước khi thay bằng nội dung thực tế.

## Kiểm tra

```bash
npm run lint
npm run build
```

Các file `tests/*.browser.js` xuất hàm nhận một Playwright `Page` đã mở ứng dụng. Chúng chưa được tích hợp thành lệnh `npm test` và dự án chưa khai báo Playwright trong dependencies. Các báo cáo trong `docs/` ghi lại những lần kiểm tra trước, không thay thế việc kiểm tra lại phiên bản hiện tại.

## Build và triển khai

Đưa nội dung thư mục `dist/` sau khi build lên dịch vụ lưu trữ web tĩnh. Cấu hình hiện tại dùng đường dẫn tài nguyên từ gốc (`/assets/...`), phù hợp khi website được phục vụ tại gốc tên miền. Triển khai dưới đường dẫn con cần cập nhật cấu hình base và các đường dẫn tài nguyên tương ứng.

Giữ `package-lock.json` trong Git để cài đặt nhất quán. Không commit `node_modules/`, `dist/`, file môi trường chứa thông tin riêng, log, kết quả kiểm thử hoặc ảnh thiết kế gốc trong `design/*/source/`. Các ảnh gốc có thể giữ tại máy; website chỉ cần các bản tối ưu trong `public/assets/`.
