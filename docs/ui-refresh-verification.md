# Kiểm tra cải thiện UI SonTra — 28/09/2026

## Thay đổi đã hoàn thành

- Cuộn tự do mặc định; trình chiếu desktop dùng CSS proximity snap, không chặn wheel hoặc khóa cuộn theo thời gian.
- Điều hướng giữ nguyên ID của 7 chương; khoảng tránh navbar và reduced motion dùng chung.
- Bộ lọc địa danh đồng bộ với chi tiết, có trạng thái trống và tìm kiếm không dấu. Trên màn hình nhỏ, chi tiết nằm ngay dưới địa danh được chọn.
- Menu và lightbox dùng dialog chung: portal, khóa cuộn, nền inert, focus ban đầu, vòng Tab/Shift+Tab, Escape và khôi phục focus.
- Tăng cỡ chữ, vùng chạm; sửa màu trên nền tối và tỉ lệ ảnh. Bỏ trang trí chuyển động liên tục của navbar và mục điều hướng trùng.
- Bỏ popup chèn file và nút phát video chưa có tư liệu. Các tuyến nhân vật được giới thiệu là nội dung đang sưu tầm; không hiển thị tên tuổi hoặc trích dẫn như phỏng vấn đã xác minh.
- Phối cảnh lớn với ảnh chọn phụ, chú thích ngoài ảnh, lịch trình mở rộng và nhãn đề xuất đồ án.
- Giọng đọc tổng hợp chỉ báo đang phát sau sự kiện bắt đầu; xử lý lỗi/không hỗ trợ và thời gian chờ. Sao chép liên kết chỉ báo thành công khi Clipboard API hoàn tất, có trường liên kết để sao chép khi thất bại.
- Hiệu ứng xuất hiện 400 ms / 12 px khi vào viewport; chuyển nội dung 180 ms; chuyển cảnh nền 600 ms sau khi ảnh mới được giải mã.
- Lưới và dây kéo hỗ trợ chuột/cảm ứng. Canvas dừng ngoài viewport, khi tab ẩn, dialog mở hoặc hệ điều hành yêu cầu giảm chuyển động.
- Không thêm nút giảm chuyển động; bỏ trạng thái tạm dừng thủ công cũ. Footer rút gọn và tránh hai nút về đầu trang đồng thời.

## Kết quả kiểm tra

Kiểm tra trên bản build production được phục vụ bằng Vite preview tại máy; không deploy.

| Kiểm tra | Kết quả |
| --- | --- |
| `npm run build` | Đạt: TypeScript và Vite |
| `npm run lint` | Đạt, không cảnh báo |
| `git diff --check` | Đạt sau chuẩn hóa cuối file |
| `tests/ui-refresh.browser.js` | 7/7 trường hợp đạt: lọc, trạng thái trống, cuộn mặc định, bỏ CTA giả, lightbox, focus menu, reduced motion |
| `tests/ui-interactions.browser.js` | Đạt: vòng đời/lỗi speech, clipboard thất bại và thành công, Canvas hiện/ẩn, kéo dây, giảm chuyển động, cảm ứng |
| `tests/cinematic-background.browser.js` | Đạt: ảnh responsive, 3 cảnh, anchor, cuộn desktop, chuyển nội dung di sản, giảm chuyển động và fallback ảnh lỗi |
| `tests/footer-outline.browser.js` | Đạt: bố cục, vùng chạm, 10 liên kết, về đầu trang và ảnh lỗi |
| `tests/ocean-background.browser.js` | Đạt: 7 chương, ngân sách Canvas mobile, menu tạm dừng nền, reduced motion, tab ẩn, điều hướng và trình chiếu |

Ma trận bố cục: **1440×900, 1366×768, 768×1024, 390×844, 320×568 và 844×390**. Không phát hiện tràn ngang toàn trang; các điều khiển hiển thị được kiểm tra đều đạt tối thiểu 44 px mỗi chiều. Một số bộ kiểm tra cũ bổ sung các chiều rộng 360 và 430 px.

Đã kiểm tra trực tiếp thêm:

- Trì hoãn tải cảnh âu thuyền: cảnh biển cũ được giữ cho tới khi ảnh mới sẵn sàng.
- Chặn tải cảnh Cá Ông: ảnh đã tải trước đó được giữ lại, nội dung vẫn sử dụng được.
- Lightbox tạm dừng nền, tiêu đề sáng trên nền tối và có nút đóng trong viewport mobile.
- Nút về đầu trang nổi biến mất khi nút trong footer xuất hiện.
- Cảm ứng Chromium CDP: vuốt dọc trên lưới vẫn cuộn trang; kéo ngang thay đổi lưới mà không cuộn trang. Khi giảm chuyển động, kết quả thao tác vẫn cập nhật ở trạng thái tĩnh.

Đã chụp và xem đủ 7 chương trên desktop/mobile, cộng các bề mặt đọc và lightbox. Ảnh cục bộ nằm trong `H:\SonTra\.tmp`, theo tên `after-1440-*`, `after-390-*` và `final-*`; ảnh không được đưa vào Git.

## Giới hạn

- Dùng Chrome headless để tránh animation bị tạm dừng do cửa sổ trình duyệt tương tác đang bị ẩn. Các kiểm tra này không thay thế thử nghiệm trên iPhone/Android thật hoặc Safari.
- Giọng đọc và clipboard có kiểm tra bằng stub cho thành công/thất bại; chất lượng giọng Việt còn tùy hệ điều hành và trình duyệt.
- Canvas nền đạt khoảng 29 lần vẽ/giây trong phép đo desktop giả lập viewport mobile; đây không phải FPS toàn trang, benchmark GPU hay số đo pin điện thoại.
- Chưa đo độ phủ dòng mã bằng công cụ coverage; các kết quả trên là kiểm tra hành vi, không phải tuyên bố phần trăm coverage.
- Video, chân dung và bản ghi điền dã vẫn cần tài nguyên thực tế được xác minh. Website thể hiện trạng thái này rõ ràng, không tạo thêm tư liệu giả.

Các hàm kiểm tra nhận một Playwright `Page` đã mở ứng dụng. Dùng trang mới cho từng bộ, chạy trong tab foreground hoặc headless. Bộ cảm ứng yêu cầu Chromium CDP. Không thêm thư viện animation, API backend hoặc phụ thuộc Playwright vào ứng dụng.
