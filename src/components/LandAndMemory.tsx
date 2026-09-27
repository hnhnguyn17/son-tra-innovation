import { useState } from 'react';
import { Anchor, ShieldCheck, MapPin, ExternalLink, Image as ImageIcon, Maximize2 } from 'lucide-react';
import { LAND_TIMELINE } from '../data/contentData';
import type { MediaSlotInfo } from './MediaModal';

interface LandAndMemoryProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const LandAndMemory = ({ onOpenMediaSlot }: LandAndMemoryProps) => {
  const [activeTab, setActiveTab] = useState(1);

  const historyMediaSlot: MediaSlotInfo = {
    title: 'Vách Đá Tiền Tiêu & Bản Đồ Cổ Sơn Trà 1858',
    type: 'image',
    aspectRatio: '4:3 hoặc 16:10',
    recommendedSize: '2400x1800 (High-res Scan)',
    targetFile: 'src/assets/history-1858-map.jpg',
    description:
      'Hình ảnh tư liệu vách đá Sơn Trà, pháo đài phòng thủ và bản đồ cổ vịnh Đà Nẵng lưu giữ tại Bảo tàng Lịch sử Quốc gia.',
  };

  const currentItem = LAND_TIMELINE[activeTab];

  const placeTabs = [
    { label: 'Thế núi ôm biển', subtitle: 'Ba đỉnh núi tự nhiên' },
    { label: 'Trận địa 1858', subtitle: 'Tiền đồn đầu sóng' },
    { label: 'Làng biển cổ', subtitle: 'Dưới chân bán đảo' },
  ];

  return (
    <section
      id="dat-va-ky-uc"
      aria-labelledby="heading-dat-va-ky-uc"
      className="snap-slide min-h-[100dvh] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-12 sm:py-16 bg-slate-50 border-t border-slate-200/50"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-1.5">
            <Anchor size={13} className="text-[#0077B6]" />
            <span>Điểm chạm 02 · Vách đá tiền tiêu</span>
          </div>
          <h2
            id="heading-dat-va-ky-uc"
            className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
          >
            Vách đá tiền tiêu: Dấu xưa nơi đầu sóng ngọn gió
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed font-light">
            Vách đá Sơn Trà sừng sững nghìn năm tựa bức bình phong che chở cho vịnh biển, nơi từng tấc đất ngọn sóng còn in đậm dấu tích tiền tiêu bảo vệ non sông.
          </p>
        </div>

        {/* Place-Based Story Tabs */}
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-200/60 max-w-lg">
          {placeTabs.map((tab, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveTab(idx)}
              className={`flex-1 min-w-[120px] py-1.5 px-2.5 rounded-lg text-xs font-medium transition-all text-center ${
                activeTab === idx
                  ? 'bg-white text-[#0077B6] font-bold shadow-xs'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Interactive Story Content */}
        <div className="mt-4 sm:mt-6 grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
          {/* Active Story Card */}
          <div className="lg:col-span-7 bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/80 shadow-xs animate-fade-rise flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-1.5 text-[11px] text-[#0077B6] font-semibold uppercase tracking-wider mb-1">
                <MapPin size={13} />
                <span>{currentItem.context}</span>
              </div>

              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F]">
                {currentItem.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                {currentItem.description}
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-[11px]">
              <span className="inline-flex items-center text-[#4A5568] font-medium">
                <ShieldCheck size={13} className="mr-1 text-[#0077B6]" />
                Ký ức: {currentItem.significance}
              </span>

              <a
                href={currentItem.citationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-[#0077B6] hover:underline font-semibold"
              >
                <span>{currentItem.citationLabel}</span>
                <ExternalLink size={11} className="ml-1" />
              </a>
            </div>
          </div>

          {/* Place Media Frame */}
          <div className="lg:col-span-5">
            <div
              onClick={() => onOpenMediaSlot(historyMediaSlot)}
              className="group cursor-pointer relative aspect-4/3 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 via-sky-50 to-white border-2 border-dashed border-slate-300 hover:border-[#0077B6] p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
              title="Nhấp để chèn hình ảnh tư liệu vách đá tiền tiêu"
            >
              <div className="flex items-center justify-between text-xs text-[#4A5568]">
                <span className="font-mono text-[10px] uppercase tracking-wider bg-white px-2 py-0.5 rounded-full border border-slate-200 text-[#0077B6] font-semibold">
                  Tư liệu hình ảnh · Vách đá Sơn Trà
                </span>
                <Maximize2 size={13} className="text-[#0077B6] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>

              <div className="text-center py-2">
                <div className="w-11 h-11 mx-auto rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#0077B6] mb-2 group-hover:scale-110 transition-transform">
                  <ImageIcon size={20} />
                </div>
                <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0A192F]">
                  Vách Đá Sơn Trà & Bản Đồ 1858
                </h4>
                <p className="text-[11px] text-[#4A5568]/70 mt-0.5 max-w-xs mx-auto">
                  [Nhấp vào đây để chèn tư liệu lịch sử đầu sóng ngọn gió]
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200/60 text-[10px] text-[#4A5568]/80 flex justify-between">
                <span>Nguồn: Bảo tàng Lịch sử QG</span>
                <span className="font-semibold text-[#0077B6] group-hover:underline">Chèn tư liệu →</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
