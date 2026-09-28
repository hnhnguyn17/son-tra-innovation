# Sơn Trà — Miền ký ức neo đậu

Website giới thiệu văn hóa biển, ký ức làng chài và ý tưởng không gian Công viên Đổi mới Sáng tạo Sơn Trà, Đà Nẵng. Dự án sử dụng React, TypeScript và Vite; nội dung được trình bày qua một trang cuộn với nền biển minh họa, thư viện hình ảnh và các trải nghiệm tương tác.

**Website:** [son-tra-innovation.vercel.app](https://son-tra-innovation.vercel.app)

Đây là website phục vụ đồ án và nghiên cứu thiết kế. Các minh họa nghệ thuật và đề xuất không gian không đại diện cho quy hoạch đã phê duyệt hoặc công trình đang hoạt động.

## Nội dung

1. **Cửa Biển Sơn Trà** — mở đầu hành trình khám phá.
2. **Kho Tri Thức Số** — tư liệu về địa danh, lịch sử và văn hóa bản địa.
3. **Người Xứ Biển** — không gian kể chuyện về cư dân làng chài.
4. **Âu Thuyền Thọ Quang** — câu chuyện bến neo đậu và nhịp sống cảng cá.
5. **Di Sản & Làng Chài** — tín ngưỡng biển, Cầu ngư và nghề truyền thống.
6. **Trải Nghiệm Bờ Vịnh** — phối cảnh, bản vẽ và ý tưởng hoạt động công viên.
7. **Tra Cứu & Đồng Hành** — liên kết tham khảo và thông tin cuối trang.

Trang mặc định cuộn tự do, có điều hướng theo chương và chế độ trình chiếu tùy chọn trên desktop. Lightbox phối cảnh và menu hỗ trợ bàn phím. Nền biển và lưới tương tác tự tuân theo cài đặt giảm chuyển động của hệ điều hành; không có nút giảm chuyển động riêng.

## Chạy trên máy

Yêu cầu Node.js **22.x, từ 22.12 trở lên**, và npm. Dự án cố định nhánh Node.js 22 để môi trường phát triển và Vercel sử dụng cùng phiên bản chính.

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

Một số vị trí ảnh, video và lời kể vẫn đang chờ bổ sung tư liệu; giao diện không cung cấp nút phát hay công cụ chèn file cho các vị trí này. Các tuyến nhân vật được trình bày là nội dung nghiên cứu đang sưu tầm, không phải phỏng vấn đã xác minh. Giọng đọc dùng tổng hợp tiếng nói của trình duyệt. Kiểm tra nguồn và quyền sử dụng trước khi thay bằng nội dung thực tế.

## Kiểm tra

```bash
npm run lint
npm run build
```

Các file `tests/*.browser.js` xuất hàm nhận một Playwright `Page` đã mở ứng dụng. Chúng chưa được tích hợp thành lệnh `npm test` và dự án chưa khai báo Playwright trong dependencies. Các báo cáo trong `docs/` ghi lại những lần kiểm tra trước, không thay thế việc kiểm tra lại phiên bản hiện tại.

Kiểm tra đợt cải thiện UI: `ui-refresh.browser.js` kiểm tra bộ lọc, trạng thái trống, điều hướng, dialog và giảm chuyển động; `ui-interactions.browser.js` kiểm tra lỗi giọng đọc/clipboard, vòng đời Canvas và thao tác cảm ứng qua Chromium CDP. Chạy trên trang foreground hoặc Chromium headless để animation không bị trình duyệt tạm dừng khi cửa sổ bị thu nhỏ. Dùng trang mới cho mỗi bộ kiểm tra. Xem [báo cáo UI](docs/ui-refresh-verification.md).

## Build và triển khai

### Vercel

Import repo `hnhnguyn17/son-tra-innovation` vào Vercel, chọn Root Directory là gốc repo và Production Branch là `main`. Cấu hình build được lưu tại [vercel.json](vercel.json):

| Thiết lập | Giá trị |
| --- | --- |
| Framework | Vite |
| Node.js | 22.x (khai báo trong `package.json`) |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

Sau khi kết nối GitHub, các lần push lên `main` sẽ kích hoạt bản deploy production. Kiểm tra trạng thái **Ready** và commit của deployment trong Vercel trước khi chia sẻ URL. Ứng dụng hiện không yêu cầu biến môi trường.

### Hosting tĩnh khác

Đưa nội dung thư mục `dist/` sau khi build lên dịch vụ lưu trữ web tĩnh. Cấu hình hiện tại dùng đường dẫn tài nguyên từ gốc (`/assets/...`), phù hợp khi website được phục vụ tại gốc tên miền. Triển khai dưới đường dẫn con cần cập nhật cấu hình base và các đường dẫn tài nguyên tương ứng.

Giữ `package-lock.json` trong Git để cài đặt nhất quán. Không commit `node_modules/`, `dist/`, `.vercel/`, file môi trường chứa thông tin riêng, log, kết quả kiểm thử hoặc ảnh thiết kế gốc trong `design/*/source/`. Các ảnh gốc có thể giữ tại máy; website chỉ cần các bản tối ưu trong `public/assets/`.
