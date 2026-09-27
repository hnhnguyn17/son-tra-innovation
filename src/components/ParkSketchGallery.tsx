import { useState } from 'react';
import { Layers, Sparkles, ChevronLeft, ChevronRight, Maximize2, PencilRuler } from 'lucide-react';

interface GalleryItem {
  id: string;
  title: string;
  viewType: string;
  imageSrc: string;
  perspectiveTag: string;
  description: string;
  lifeHighlight: string;
}

const RENDERS_3D: GalleryItem[] = [
  {
    id: 'render-amphitheater-day',
    title: 'Khán đài bậc thang & Hồ nước trong nắng mai',
    viewType: 'Phối cảnh 3D thực tế — Ban ngày',
    imageSrc: '/assets/park-renders/render-amphitheater-day.jpg',
    perspectiveTag: 'Không gian sống cộng đồng',
    description:
      'Hình ảnh 3D mô phỏng chân thực hồ nước bán nguyệt trong xanh, các tầng bậc đá sa thạch giật cấp nơi bà con làng chài ngồi uống trà, cà phê sáng hóng gió biển dưới bóng dừa và hoa giấy nở rực rỡ.',
    lifeHighlight: 'Cà phê sáng · Hóng gió biển mặn mòi · Điểm hẹn thư thái của cư dân',
  },
  {
    id: 'render-sunset-aerial',
    title: 'Hoàng hôn rực rỡ bên cầu Thuận Phước & Bến tàu',
    viewType: 'Phối cảnh 3D toàn cảnh — Chiều tà',
    imageSrc: '/assets/park-renders/render-sunset-aerial.jpg',
    perspectiveTag: 'Góc nhìn trên cao bao quát vịnh',
    description:
      'Toàn cảnh công viên 2.000m² bừng sáng trong ánh hoàng hôn vàng cam lộng lẫy: cầu dạo bộ trên cao vươn dài đón gió sông Hàn, khối pavilion ấm cúng ánh đèn và hàng chục con thuyền âu Thọ Quang neo đậu thanh bình.',
    lifeHighlight: 'Ngắm hoàng hôn sông Hàn · Toàn cảnh bến tàu Thọ Quang lên đèn',
  },
];

const SKETCH_VIEWS: GalleryItem[] = [
  {
    id: 'sketch-amphitheater',
    title: 'Khán đài bậc thang bên hồ nước trung tâm',
    viewType: 'Phác thảo phối cảnh lòng hồ',
    imageSrc: '/assets/park-sketches/phoi-canh-khan-dai.png',
    perspectiveTag: 'Bản vẽ cấu trúc gốc',
    description:
      'Hồ nước trung tâm phản chiếu mây trời Sơn Trà kết hợp hệ khán đài bậc thang giật cấp mềm mại. Đây là nơi bà con xóm chài ngồi hóng mát, trò chuyện rôm rả mỗi buổi chiều, trẻ em vui đùa và diễn ra các buổi biểu diễn văn nghệ dân gian.',
    lifeHighlight: 'Tụ họp chiều tà · Hóng gió biển · Giao lưu văn nghệ dân gian',
  },
  {
    id: 'sketch-elevation-1',
    title: 'Mặt đứng hướng Tây — Đón hoàng hôn sông Hàn',
    viewType: 'Mặt đứng đường Ngô Thì Trí',
    imageSrc: '/assets/park-sketches/mat-dung-01.png',
    perspectiveTag: 'Lối ngắm hoàng hôn',
    description:
      'Nhịp khối thanh thoát kết nối từ mặt đất lên hệ cầu dạo bộ trên cao, mở rộng tầm nhìn về phía cửa sông Hàn và chân cầu Thuận Phước khi hoàng hôn buông xuống.',
    lifeHighlight: 'Đón hoàng hôn buông · Ngắm sông Hàn lên đèn lung linh',
  },
  {
    id: 'sketch-elevation-2',
    title: 'Mặt đứng hướng Đông — Cầu dạo bộ ngắm âu thuyền',
    viewType: 'Mặt đứng đường Vũng Thùng 4',
    imageSrc: '/assets/park-sketches/mat-dung-02.png',
    perspectiveTag: 'Lối ra bến cảng Thọ Quang',
    description:
      'Hệ cầu dạo bộ vươn dài với hàng cột mở thoáng bên dưới, chỉ cách mặt nước Âu thuyền Thọ Quang 150m, mở ra tầm nhìn bao quát toàn bộ tàu bè tấp nập cập bến.',
    lifeHighlight: 'Ngắm tàu thuyền về bến · Đón trọn gió mặn mòi vịnh biển',
  },
  {
    id: 'sketch-elevation-3',
    title: 'Mặt đứng hướng Nam — Trục dạo bộ phố ẩm thực',
    viewType: 'Mặt đứng đường Lý Nhật Quang',
    imageSrc: '/assets/park-sketches/mat-dung-03.png',
    perspectiveTag: 'Trục kết nối làng cá',
    description:
      'Khối nhà pavilion cong mềm mại với các mảng kính lớn trong suốt, đón ánh sáng tự nhiên và mở lối tiếp cận thân thiện từ các dãy phố hải sản làng cá Vũng Thùng.',
    lifeHighlight: 'Trạm dừng chân cà phê sáng · Góc trưng bày ký ức làng chài',
  },
  {
    id: 'sketch-elevation-4',
    title: 'Mặt đứng tổng thể — Đường cong mô phỏng thân thuyền',
    viewType: 'Mặt cắt ngang công trình',
    imageSrc: '/assets/park-sketches/mat-dung-04.png',
    perspectiveTag: 'Kiến trúc hài hòa tự nhiên',
    description:
      'Hình khối uốn lượn lấy cảm hứng từ mạn thuyền thúng và cánh buồm no gió; không gian mở bên dưới râm mát giúp gió biển luồn qua tự nhiên giữa ba mặt đường.',
    lifeHighlight: 'Thông thoáng gió tự nhiên · Không gian râm mát ngày hè',
  },
];

export const ParkSketchGallery = () => {
  const [activeTab, setActiveTab] = useState<'3d-render' | 'sketches'>('3d-render');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentList = activeTab === '3d-render' ? RENDERS_3D : SKETCH_VIEWS;
  const currentItem = currentList[activeIdx] || currentList[0];

  const prevItem = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : currentList.length - 1));
  };

  const nextItem = () => {
    setActiveIdx((prev) => (prev < currentList.length - 1 ? prev + 1 : 0));
  };

  const handleTabChange = (tab: '3d-render' | 'sketches') => {
    setActiveTab(tab);
    setActiveIdx(0);
  };

  return (
    <div className="mt-12 pt-10 border-t border-slate-200">
      {/* Header & Mode Switcher */}
      <div className="flex flex-col lg:flex-row items-start lg:items-end justify-between gap-4 mb-6">
        <div>
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-1.5">
            <Layers size={13} className="text-[#0077B6]" />
            <span>Phác thảo & Phối cảnh 3D · Công viên Vũng Thùng 2.000m²</span>
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#0A192F]">
            Hình dung không gian thực tế: Điểm hẹn bên bờ vịnh
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Tái hiện chân thực từ bản vẽ phác thảo đến không gian 3D sống động với hồ nước trung tâm, khán đài hóng mát và cầu dạo bộ đón hoàng hôn sông Hàn.
          </p>
        </div>

        {/* View Mode Toggle Pill + Carousel Arrows */}
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <div className="flex items-center p-1 rounded-xl bg-slate-200/80 text-xs">
            <button
              type="button"
              onClick={() => handleTabChange('3d-render')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === '3d-render'
                  ? 'bg-[#0077B6] text-white shadow-xs font-semibold'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              <Sparkles size={13} />
              <span>Phối cảnh 3D thực tế</span>
            </button>
            <button
              type="button"
              onClick={() => handleTabChange('sketches')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeTab === 'sketches'
                  ? 'bg-[#0077B6] text-white shadow-xs font-semibold'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              <PencilRuler size={13} />
              <span>Bản vẽ phác thảo</span>
            </button>
          </div>

          <div className="flex items-center space-x-1.5">
            <button
              type="button"
              onClick={prevItem}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#0077B6] hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Xem góc trước"
            >
              <ChevronLeft size={18} />
            </button>
            <span className="font-mono text-xs font-bold text-[#0077B6] px-1.5">
              0{activeIdx + 1} / 0{currentList.length}
            </span>
            <button
              type="button"
              onClick={nextItem}
              className="w-9 h-9 rounded-full bg-white hover:bg-[#0077B6] hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-xs"
              aria-label="Xem góc tiếp theo"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Display: Large Viewer Frame + Sidebar Explanation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Viewer Screen (8 cols) */}
        <div className="lg:col-span-8 flex flex-col justify-between rounded-3xl bg-slate-900 border border-slate-800 p-3 sm:p-4 text-white shadow-xl overflow-hidden relative group">
          {/* Top Info Bar */}
          <div className="flex items-center justify-between text-xs px-2 pt-1 pb-2 z-10">
            <span className="inline-flex items-center space-x-2 font-mono text-cyan-300 font-semibold text-[11px]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{currentItem.viewType}</span>
            </span>

            <button
              type="button"
              onClick={() => setIsFullscreen(true)}
              className="text-slate-300 hover:text-white flex items-center space-x-1 text-[11px] bg-slate-800/90 hover:bg-slate-700 px-3 py-1 rounded-lg border border-slate-700 transition-colors"
            >
              <Maximize2 size={12} />
              <span>Xem kích thước đầy đủ</span>
            </button>
          </div>

          {/* Image Container */}
          <div className="relative aspect-16/9 w-full rounded-2xl bg-black overflow-hidden flex items-center justify-center shadow-inner">
            <img
              src={currentItem.imageSrc}
              alt={currentItem.title}
              className="w-full h-full object-cover select-none transition-all duration-500 group-hover:scale-[1.02]"
              loading="lazy"
            />
          </div>

          {/* Bottom Caption */}
          <div className="pt-3 px-2 flex items-center justify-between text-xs text-slate-300">
            <span className="font-serif font-bold text-white text-xs sm:text-sm truncate">
              {currentItem.title}
            </span>
            <span className="text-[10px] text-cyan-300 shrink-0 ml-2">
              {currentItem.perspectiveTag}
            </span>
          </div>
        </div>

        {/* Detail Panel & Functional Breakdown (4 cols) */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4 rounded-3xl bg-slate-50 border border-slate-200 p-5 sm:p-6 shadow-2xs">
          <div className="space-y-3">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-100/90 text-[#0077B6]">
              <Sparkles size={13} className="text-[#0077B6]" />
              <span>{currentItem.perspectiveTag}</span>
            </div>

            <h4 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F] leading-snug">
              {currentItem.title}
            </h4>

            <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed">
              {currentItem.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-white border border-slate-200 text-xs">
              <span className="font-bold text-[#0A192F] block mb-1">
                Ý nghĩa với đời sống cư dân & du khách:
              </span>
              <p className="text-slate-600 text-[11px] leading-relaxed">
                {currentItem.lifeHighlight}
              </p>
            </div>
          </div>

          {/* Quick Select Thumbnails */}
          <div className="pt-3 border-t border-slate-200">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {activeTab === '3d-render' ? 'Chọn góc nhìn 3D:' : 'Chọn góc phác thảo:'}
            </span>
            <div className={`grid gap-2 ${activeTab === '3d-render' ? 'grid-cols-2' : 'grid-cols-5'}`}>
              {currentList.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  className={`relative aspect-16/10 rounded-xl overflow-hidden border-2 transition-all bg-slate-800 ${
                    activeIdx === idx
                      ? 'border-[#0077B6] ring-2 ring-[#0077B6]/30 shadow-xs'
                      : 'border-slate-200 opacity-60 hover:opacity-100'
                  }`}
                  title={item.title}
                >
                  <img
                    src={item.imageSrc}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-1">
                    <span className="text-[9px] text-white font-medium truncate">
                      {idx + 1}. {item.viewType.split('—')[0]}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Fullscreen Modal if clicked */}
      {isFullscreen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setIsFullscreen(false)}
        >
          <div
            className="relative max-w-6xl w-full max-h-[92vh] bg-slate-900 rounded-3xl p-4 sm:p-6 overflow-hidden flex flex-col justify-between border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-3 text-white">
              <div>
                <span className="text-xs font-mono text-cyan-400 block uppercase">
                  {currentItem.viewType}
                </span>
                <span className="font-serif font-bold text-base sm:text-lg">
                  {currentItem.title}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsFullscreen(false)}
                className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
              >
                Đóng [Esc]
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center overflow-auto py-2">
              <img
                src={currentItem.imageSrc}
                alt={currentItem.title}
                className="max-h-[75vh] w-auto rounded-xl object-contain shadow-2xl"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
