# Báo cáo Kiểm thử & Nghiệm thu Thực tế (Verification Report)

**Dự án**: Sơn Trà — Miền ký ức neo đậu (`son-tra-innovation`)
**Ngày thực hiện**: 27/09/2026
**Môi trường thử nghiệm**: Localhost Node.js v20+, Vite 8.3.1, Chromium Headless / Chrome Browser

---

## 1. Kết quả Kiểm thử Tự động & Lệnh hệ thống

| Lệnh thực thi | Mục đích | Kết quả | Chi tiết |
| :--- | :--- | :--- | :--- |
| `npm.cmd run lint` | Oxlint phân tích cú pháp & mã nguồn | **PASS** (0 warnings, 0 errors) | Chạy trong 70ms trên 15 files với 116 rules |
| `npm.cmd run build` | TypeScript compile (`tsc -b`) & Vite build | **PASS** (Exit code 0) | Hoàn tất trong 1.59s, tạo bundle tối ưu tại `/dist` |
| `npm.cmd run dev` | Local Dev Server | **RUNNING** | Đang chạy tại `http://127.0.0.1:5173/` |

---

## 2. Kiểm thử Trực quan & Hành vi (Browser Subagent Verification)

Đã khởi chạy subagent trình duyệt tự động kiểm thử toàn diện trên cả Desktop và Mobile:

### a. Bảy chương nội dung & Luồng cuộn (Scroll Journey)
* **Chương I: Miền ký ức neo đậu**:
  * Tiêu đề duy nhất (`H1`), kết hợp font `Playfair Display` và `Inter`.
  * Background Dreamcore vector SVG thể hiện đường cong đê biển và âu nước phẳng lặng.
  * Tùy chọn trợ năng: Đã có nút **"Dừng sương nền" / "Bật sương nền"** hoạt động chính xác.
  * Nút CTA *"Khám phá bản sắc Sơn Trà"* cuộn mượt mà trực tiếp xuống Chương II (`#dat-va-ky-uc`).
* **Chương II: Đất và ký ức**:
  * Thể hiện địa thế tự nhiên ba ngọn núi (Nghê, Mỏ Diều, Cổ Ngựa).
  * Mốc thời gian ngày **01/09/1858** dẫn nguồn chuẩn xác từ Bảo tàng Lịch sử Quốc gia.
* **Chương III: Vòng tay chắn bão**:
  * Trình bày dữ kiện thực tế Âu thuyền Thọ Quang: diện tích mặt nước 58 ha, sức chứa hàng ngàn tàu thuyền.
  * Sơ đồ ý niệm SVG thể hiện cánh cung đê kè ôm trọn vùng nước phẳng lặng và chuyển tiếp thành đường dạo công viên.
  * Có nhãn minh bạch: *Sơ đồ ý niệm thiết kế — Không phải bản đồ địa lý thực tế*.
* **Chương IV: Nhịp sống bên biển**:
  * Bố cục ảnh-chữ so le cho Lễ hội Cầu ngư (Di sản văn hóa phi vật thể quốc gia), thúng chai nan tre và nghề kéo lưới rùng.
  * Có trích dẫn ca dao tục ngữ biển và nhãn xác minh.
* **Chương V: Những người giữ hồn Sơn Trà**:
  * Khung câu chuyện người thật việc thật: Lão ngư rẽ sóng, nghệ nhân chắp thúng chai, thợ làm mắm truyền thống.
  * Ghi rõ nhãn: *Câu chuyện đang được sưu tầm & điền dã*, không bịa đặt tên tuổi hay trích dẫn giả mạo.
* **Chương VI: Ký ức thành không gian**:
  * Ba tuyến ý tưởng thiết kế: Đường dạo Chở Che, Quảng trường Hội Ngộ Biển, Vòm Điêu Khắc Ký Ức.
  * Nhãn cảnh báo minh bạch: *Đề xuất thiết kế đồ án — Không phải quy hoạch đã duyệt hay công viên đang hoạt động*.
* **Chương VII: Mang theo một câu chuyện**:
  * Lời kết tri ân, ma trận tra cứu nguồn tư liệu chính thức (Báo Đà Nẵng, Cục PCCC & CNCH, Bảo tàng LSVN).
  * Quy chuẩn phân định 3 tầng thông tin rõ ràng.
  * Nút *"Về đầu trang ↑"* cuộn mượt mà trở lại Hero section.

### b. Thanh điều hướng & Tương tác (Navbar)
* **IntersectionObserver**: Đã kiểm chứng menu tự động nhận diện và cập nhật trạng thái chọn (`Sơn Trà` -> `Đời sống biển` -> `Con người` -> `Công viên`) tương ứng với vị trí người dùng đang cuộn.
* **Accessibility**:
  * Skip link: `<a href="#main-content">` ẩn và hiện khi nhấn phím `Tab`.
  * Thuộc tính `aria-current="page"` được gắn tự động vào liên kết đang xem.
  * Touch target đạt tối thiểu `44x44px`.

### c. Kiểm thử Mobile Responsive & Bàn phím
* **Kích thước kiểm thử**: Đã giả lập và chụp ảnh tại viewport di động `390px x 844px`.
* Layout co giãn mượt mà 1 cột, không có thanh cuộn ngang (`overflow-x: hidden`), chữ không bị tràn hay cắt vụn.
* **Thao tác menu**:
  * Nút hamburger có `aria-expanded` cập nhật đúng trạng thái.
  * Drawer mở ra mượt mà, nội dung menu trong luồng trang.
  * Đã kiểm thử phím **Escape**: Menu tự động đóng ngay lập tức và trả focus về nút hamburger.

---

## 3. Ảnh chụp Kiểm chứng (Proof Artifacts)

Tất cả các ảnh chụp màn hình thực tế và video ghi lại quá trình kiểm thử được lưu trữ tại:
* Ảnh chụp Hero Section: [hero_section.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/hero_section_1790503028749.png)
* Ảnh chụp Sơ đồ ý niệm Chương III: [chuong_3_diagram.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/chuong_3_diagram_1790503098888.png)
* Ảnh chụp Chi tiết sơ đồ đê chắn bão: [chuong_3_diagram_detail.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/chuong_3_diagram_detail_1790503134113.png)
* Ảnh chụp Ý niệm không gian Chương VI: [chuong_6_concepts.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/chuong_6_concepts_1790503242568.png)
* Ảnh chụp Menu di động 390px: [mobile_menu_open.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/mobile_menu_open_1790503374541.png)
* Video toàn bộ phiên tương tác: [sontra_full_test.webp](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/sontra_full_test_1790502995395.webp)

---

## 5. Kiểm thử Phần tử Động & Ký ức Cảng cá Thọ Quang (Generative Elements Verification)

Đã hoàn thiện và kiểm thử tự động toàn diện các phần tử động và thuật toán mô phỏng ký ức ngư dân Thọ Quang:

1. **Nền Canvas Đèn Hoa Đăng & Sóng nước (`WaterLanternCanvas`)**:
   - Tọa độ ngẫu nhiên các đốm sáng đại diện đèn tàu câu mực và hoa đăng Cầu ngư trên mặt vịnh Thọ Quang.
   - Hiệu ứng sóng nước loang hình elip (`Water Ripples`) kích hoạt mượt mà khi rê chuột.
   - Đạt 60fps, không gây giật lag luồng cuộn.

2. **Sóng lưới thời gian (`GenerativeNetWave`) - Bãi chài Mân Thái**:
   - Thuật toán sóng sin 3D lượn sóng kết hợp mạng lưới hình thoi (mắt lưới đánh cá) và các nút thắt phát sáng.
   - Mô hình vật lý lò xo (`Spring physics` & `Friction`): Khi rê chuột qua, các mắt lưới co giãn và kéo dãn tự nhiên theo lực kéo của chuột rồi từ từ đàn hồi trở lại.

3. **Ký ức lao động: Nhịp thừng kéo lưới (`InteractiveRopePull`)**:
   - Sợi thừng dệt cáp xoắn đôi mô phỏng chuyển động căng cơ học khi nhấp chuột.
   - Hiệu ứng sóng âm thanh cộng hưởng (`Acoustic Wave Ripples`) tỏa ra từ nút thừng trung tâm.
   - Bộ đếm nhịp kéo kèm trích dẫn luân phiên 4 câu hò kéo lưới bám biển dạt dào cảm xúc của ngư dân Thọ Quang / Mân Thái.

4. **Trục chuyển đổi: Lớp lang thời gian Thọ Quang (`TemporalMorphStudio`)**:
   - Bộ chọn 3 mốc lịch sử (1950-1980 Bãi cát nguyên sinh $\rightarrow$ 2000-2020 Đê đá âu thuyền 58 ha $\rightarrow$ Tương lai: Công viên di sản Sơn Trà).
   - Khung Blueprint vector SVG tự động biến hình (morphing) thể hiện sự dịch chuyển không gian từ nhịp sống bám biển truyền thống sang công viên văn hóa mở.

### Ảnh chụp & Video Kiểm chứng Phần tử Động:
* Ảnh chụp Sóng lưới động & Kéo thừng: [net_wave_rope_pull.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/net_wave_rope_pull_1790507714337.png)
* Ảnh chụp Sơ đồ biến hình không gian Thọ Quang: [temporal_morph_blueprint.png](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/temporal_morph_blueprint_1790507847940.png)
* Video toàn bộ tương tác phần tử động: [verify_generative_elements.webp](file:///C:/Users/PHU/.gemini/antigravity-ide/brain/fd4ca471-827f-4881-aaa6-00f1fc610508/verify_generative_elements_1790507663338.webp)
