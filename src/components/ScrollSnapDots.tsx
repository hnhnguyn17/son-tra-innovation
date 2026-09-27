import { ChevronUp, ChevronDown } from 'lucide-react';
import { APP_SECTIONS } from '../hooks/useOnePageScroll';

interface ScrollSnapDotsProps {
  currentSectionIndex: number;
  onNavigateSection: (index: number) => void;
  isSnapEnabled: boolean;
  onToggleSnap: () => void;
}

export const ScrollSnapDots = ({
  currentSectionIndex,
  onNavigateSection,
  isSnapEnabled,
  onToggleSnap,
}: ScrollSnapDotsProps) => {
  const total = APP_SECTIONS.length;

  const handlePrev = () => {
    if (currentSectionIndex > 0) {
      onNavigateSection(currentSectionIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentSectionIndex < total - 1) {
      onNavigateSection(currentSectionIndex + 1);
    }
  };

  return (
    <aside
      aria-label="Điều hướng 7 trang Sơn Trà"
      className="fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center space-y-2 select-none"
    >
      {/* Snap Mode Toggle Pill Button */}
      <button
        type="button"
        onClick={onToggleSnap}
        className={`group relative flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border backdrop-blur-md transition-all shadow-xs ${
          isSnapEnabled
            ? 'bg-white/90 text-[#0077B6] border-sky-300 hover:bg-sky-50'
            : 'bg-white/60 text-slate-500 border-slate-200 hover:bg-white'
        }`}
        title="Nhấp để bật/tắt chế độ cuộn từng trang (1 lướt = 1 trang)"
      >
        <span
          className={`w-1.5 h-1.5 rounded-full ${
            isSnapEnabled ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'
          }`}
        />
        <span className="hidden xl:inline">1 Lướt = 1 Trang</span>

        {/* Hover Tooltip */}
        <span className="absolute right-full mr-2 px-2.5 py-1 rounded-md bg-[#0A192F] text-white text-[10px] whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity shadow-md">
          {isSnapEnabled ? 'Chế độ 1 lướt = 1 trang đang BẬT (phím ↑/↓)' : 'Chế độ cuộn tự do đang BẬT'}
        </span>
      </button>

      {/* Up Button */}
      <button
        type="button"
        onClick={handlePrev}
        disabled={currentSectionIndex === 0}
        className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs flex items-center justify-center transition-all ${
          currentSectionIndex === 0
            ? 'opacity-30 cursor-not-allowed text-slate-300'
            : 'hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6] text-[#0A192F]'
        }`}
        aria-label="Về trang trước (Phím Mũi tên lên)"
      >
        <ChevronUp size={14} />
      </button>

      {/* Chapter Indicator Dots Container */}
      <div className="py-2 px-1 rounded-full bg-white/85 backdrop-blur-md border border-slate-200/90 shadow-md flex flex-col items-center space-y-1.5">
        {APP_SECTIONS.map((sec, idx) => {
          const isActive = currentSectionIndex === idx;
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => onNavigateSection(idx)}
              className="group relative flex items-center justify-center p-1 rounded-full focus:outline-none"
              aria-label={`Chuyển đến ${sec.label}`}
              aria-current={isActive ? 'page' : undefined}
            >
              {/* Dot Element */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? 'w-2 h-5 bg-[#0077B6] shadow-sm shadow-cyan-600/50'
                    : 'w-2 h-2 bg-slate-300 group-hover:bg-[#0077B6]/70 group-hover:scale-125'
                }`}
              />

              {/* Tooltip Label on hover */}
              <span className="absolute right-7 px-2.5 py-1 rounded-md bg-[#0A192F] text-white text-[11px] font-medium tracking-wide whitespace-nowrap opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity shadow-md z-50">
                {sec.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Down Button */}
      <button
        type="button"
        onClick={handleNext}
        disabled={currentSectionIndex === total - 1}
        className={`w-7 h-7 rounded-full bg-white/90 backdrop-blur-md border border-slate-200 shadow-xs flex items-center justify-center transition-all ${
          currentSectionIndex === total - 1
            ? 'opacity-30 cursor-not-allowed text-slate-300'
            : 'hover:bg-[#0077B6] hover:text-white hover:border-[#0077B6] text-[#0A192F]'
        }`}
        aria-label="Đến trang tiếp theo (Phím Mũi tên xuống)"
      >
        <ChevronDown size={14} />
      </button>

      {/* Compact Page Number */}
      <span className="font-mono text-[10px] font-bold text-[#0077B6] bg-white/90 px-2 py-0.5 rounded-full border border-slate-200 shadow-2xs">
        0{currentSectionIndex + 1} / 0{total}
      </span>
    </aside>
  );
};
