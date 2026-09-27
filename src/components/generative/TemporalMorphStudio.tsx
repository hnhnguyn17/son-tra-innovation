import { useState } from 'react';
import { Layers, Sparkles } from 'lucide-react';

interface EpochLayer {
  id: string;
  yearRange: string;
  title: string;
  landscapeDescription: string;
  maritimeFeature: string;
  spatialTransformation: string;
  tagColor: string;
}

const EPOCHS: EpochLayer[] = [
  {
    id: 'epoch-1',
    yearRange: '1950 - 1980',
    title: 'Lớp 1: Bãi Cát Nguyên Sinh & Xóm Chài Mộc Mạc',
    landscapeDescription:
      'Bờ biển tự nhiên cong thoải, nơi ngư dân hạ trại dựng chòi lá, đan thúng chai tre trét dầu rái và kéo những mẻ lưới rùng đầu tiên bên mép nước.',
    maritimeFeature: 'Thuyền nan, thúng chai, bãi phơi lưới rùng ven chân núi Sơn Trà.',
    spatialTransformation: 'Ký ức lao động tập thể thuần nông - ngư nguyên sơ gắn liền với triều dâng sóng vỗ.',
    tagColor: '#F59E0B',
  },
  {
    id: 'epoch-2',
    yearRange: '2000 - 2020',
    title: 'Lớp 2: Âu Thuyền Thọ Quang — Vòng Tay Trú Bão',
    landscapeDescription:
      'Đê đá chắn sóng quy mô lớn vươn ra biển hình thành âu thuyền ~58 ha mặt nước, biến Thọ Quang thành 1 trong 5 trung tâm dịch vụ hậu cần nghề cá lớn nhất cả nước.',
    maritimeFeature: 'Cánh cung đê kè đá chịu lực, hàng ngàn tàu thuyền công suất lớn neo đậu san sát.',
    spatialTransformation: 'Biểu tượng của sự chở che, nơi bảo vệ tính mạng ngư dân và phương tiện trước giông tố.',
    tagColor: '#0077B6',
  },
  {
    id: 'epoch-3',
    yearRange: 'Tương lai',
    title: 'Lớp 3: Công Viên Di Sản — Ký Ức Thành Không Gian',
    landscapeDescription:
      'Chuyển đổi chức năng đô thị nhưng bảo tồn trọn vẹn linh hồn cảng cá: đường cong đê kè thành lối dạo ven vịnh, vòm nan thúng thành không gian nghệ thuật cộng đồng.',
    maritimeFeature: 'Cấu trúc sắp đặt parametric từ nan tre, quảng trường đón ánh bình minh, bảo tàng mở.',
    spatialTransformation: 'Không gian đổi mới sáng tạo tôn vinh bản sắc và trao truyền ký ức cho thế hệ mai sau.',
    tagColor: '#0284C7',
  },
];

export const TemporalMorphStudio = () => {
  const [activeEpochIdx, setActiveEpochIdx] = useState(1); // Default to Tho Quang Harbour
  const activeEpoch = EPOCHS[activeEpochIdx];

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-xs p-5 sm:p-6 animate-fade-rise">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0077B6]">
            <Layers size={14} />
            <span>Lớp lang thời gian cảng cá Thọ Quang</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F] mt-0.5">
            Trục chuyển đổi: Từ bãi chài nguyên sơ đến công viên di sản
          </h3>
        </div>

        {/* Time Badge */}
        <span
          className="px-3 py-1 rounded-full text-xs font-bold shadow-xs text-white"
          style={{ backgroundColor: activeEpoch.tagColor }}
        >
          {activeEpoch.yearRange}
        </span>
      </div>

      {/* Epoch Stepper Buttons (Time-Slider) */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {EPOCHS.map((ep, idx) => (
          <button
            key={ep.id}
            type="button"
            onClick={() => setActiveEpochIdx(idx)}
            className={`p-2 sm:p-3 rounded-xl border text-left transition-all ${
              activeEpochIdx === idx
                ? 'bg-slate-50 border-[#0077B6] ring-2 ring-[#0077B6]/20 shadow-xs'
                : 'bg-white border-slate-200 hover:bg-slate-50 text-[#4A5568]'
            }`}
          >
            <span className="font-mono text-[10px] font-bold text-[#0077B6] block">
              Giai đoạn 0{idx + 1}
            </span>
            <span className="font-serif font-bold text-xs sm:text-sm text-[#0A192F] block truncate">
              {ep.yearRange}
            </span>
          </button>
        ))}
      </div>

      {/* Dynamic Visual Layer Morphing Stage */}
      <div className="mt-5 grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* Generative Layer SVG Blueprint Simulation */}
        <div className="lg:col-span-6 bg-slate-900 rounded-xl p-4 text-white relative aspect-16/10 flex flex-col justify-between overflow-hidden border border-slate-700 select-none">
          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38BDF8_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Morphing Vector Overlay based on Epoch */}
          <svg viewBox="0 0 400 240" className="w-full h-full relative z-10">
            {activeEpochIdx === 0 && (
              /* Epoch 1: Natural beach & scattered thung chai dots */
              <g className="animate-fade-rise">
                <path d="M 20 200 Q 150 180 260 210 T 380 190" stroke="#F59E0B" strokeWidth="2.5" fill="none" strokeDasharray="4 4" />
                <text x="30" y="40" fill="#F59E0B" fontSize="11" fontFamily="serif">Bãi cát tự nhiên & Vệt thúng chai</text>
                <circle cx="90" cy="185" r="7" fill="#F59E0B" fillOpacity="0.7" />
                <circle cx="160" cy="195" r="8" fill="#F59E0B" fillOpacity="0.8" />
                <circle cx="230" cy="190" r="7" fill="#F59E0B" fillOpacity="0.7" />
                <path d="M 70 170 Q 180 120 320 160" stroke="#38BDF8" strokeWidth="1" fill="none" strokeDasharray="3 3" />
                <text x="180" y="140" fill="#38BDF8" fontSize="9" textAnchor="middle">Sóng lừng tràn bờ</text>
              </g>
            )}

            {activeEpochIdx === 1 && (
              /* Epoch 2: The Mighty Breakwater Curve & Harbour Basin */
              <g className="animate-fade-rise">
                <ellipse cx="200" cy="150" rx="130" ry="60" fill="#0077B6" fillOpacity="0.3" />
                <path d="M 50 200 C 60 90 140 60 230 65 C 310 70 340 120 350 200" stroke="#38BDF8" strokeWidth="4.5" fill="none" strokeLinecap="round" />
                <text x="30" y="40" fill="#38BDF8" fontSize="11" fontFamily="serif">Âu thuyền Thọ Quang (Đê đá 58 ha)</text>
                {/* Boat lights */}
                <circle cx="150" cy="140" r="3" fill="#F59E0B" className="animate-ping" />
                <circle cx="220" cy="150" r="3" fill="#F59E0B" className="animate-ping" />
                <circle cx="260" cy="130" r="3" fill="#F59E0B" className="animate-ping" />
                <text x="200" y="155" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Hàng ngàn tàu trú bão</text>
              </g>
            )}

            {activeEpochIdx === 2 && (
              /* Epoch 3: The Future Park with Sheltering Promenade & Art Canopy */
              <g className="animate-fade-rise">
                <ellipse cx="200" cy="150" rx="130" ry="60" fill="#0284C7" fillOpacity="0.2" />
                <path d="M 60 200 C 70 100 150 75 230 80 C 300 85 330 130 340 200" stroke="#0077B6" strokeWidth="2.5" strokeDasharray="5 5" fill="none" />
                <path d="M 80 200 C 90 115 160 95 230 100 C 290 105 315 145 325 200" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
                <text x="30" y="40" fill="#38BDF8" fontSize="11" fontFamily="serif">Công viên Di sản Sơn Trà (Tương lai)</text>
                {/* Parametric Art Nodes */}
                <polygon points="200,90 215,110 185,110" fill="#F59E0B" fillOpacity="0.8" />
                <text x="200" y="125" fill="#FFFFFF" fontSize="9" textAnchor="middle">Vòm điêu khắc nan thúng</text>
                <text x="200" y="170" fill="#38BDF8" fontSize="9" textAnchor="middle">Lối dạo ven vịnh che chở</text>
              </g>
            )}
          </svg>

          {/* Bottom Vector Label */}
          <div className="relative z-10 flex justify-between items-center text-[10px] text-slate-300">
            <span>Mô hình mô phỏng chuyển dịch không gian</span>
            <span className="font-mono text-cyan-300">Tọa độ Thọ Quang</span>
          </div>
        </div>

        {/* Narrative Context Details */}
        <div className="lg:col-span-6 space-y-3 text-xs sm:text-sm">
          <h4 className="font-serif font-bold text-base sm:text-lg text-[#0A192F]">
            {activeEpoch.title}
          </h4>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-[#4A5568]">
            <span className="font-semibold text-[#0A192F] block mb-1">Cảnh quan & Đời sống:</span>
            <p className="leading-relaxed">{activeEpoch.landscapeDescription}</p>
          </div>

          <div className="p-3 rounded-xl bg-cyan-50/50 border border-cyan-100 text-xs text-[#4A5568]">
            <span className="font-semibold text-[#0077B6] block mb-1">Dấu ấn nghề biển:</span>
            <p className="leading-relaxed">{activeEpoch.maritimeFeature}</p>
          </div>

          <div className="flex items-center space-x-2 text-[11px] text-[#0A192F] font-medium pt-1">
            <Sparkles size={13} className="text-[#0077B6] shrink-0" />
            <span>{activeEpoch.spatialTransformation}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
