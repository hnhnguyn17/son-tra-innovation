import { useState, useRef } from 'react';
import { Anchor, Volume2, Sparkles, RefreshCw } from 'lucide-react';

export const InteractiveRopePull = () => {
  const [pullCount, setPullCount] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [tensionOffset, setTensionOffset] = useState(0);
  const animTimeoutRef = useRef<number | null>(null);

  const chants = [
    '“Dô tả dô hò...!” — Đôi chân bấm chặt vào cát mịn',
    '“Hò dô kéo lên...!” — Nhịp sóng tràn qua mạn thuyền',
    '“Tay ghìm sợi thừng...!” — Tôm cá tươi rạng đông cập bến',
    '“Đồng lòng kéo lưới...!” — Biển mẹ bao dung chở che xóm chài',
  ];

  const handlePullRope = () => {
    setIsPulling(true);
    setPullCount((prev) => prev + 1);
    setTensionOffset(28);

    if (animTimeoutRef.current) clearTimeout(animTimeoutRef.current);

    animTimeoutRef.current = window.setTimeout(() => {
      setTensionOffset(0);
      setIsPulling(false);
    }, 450);
  };

  const currentChant = chants[pullCount % chants.length];

  return (
    <div className="relative w-full rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-sky-50 via-white to-cyan-50/50 border border-slate-200/80 shadow-xs flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs mb-3">
        <div className="flex items-center space-x-1.5 text-[#0077B6] font-semibold text-[11px] uppercase tracking-wider">
          <Anchor size={14} />
          <span>Ký ức lao động: Nhịp thừng kéo lưới</span>
        </div>
        <span className="font-mono text-[10px] text-[#4A5568]/80 bg-white px-2 py-0.5 rounded-full border border-slate-200">
          Nhịp kéo: #{pullCount + 1}
        </span>
      </div>

      {/* Interactive Tension Rope Line (SVG) */}
      <div
        onClick={handlePullRope}
        className="group cursor-pointer relative py-6 flex flex-col items-center justify-center select-none"
        title="Nhấp để kéo căng sợi thừng"
      >
        <svg viewBox="0 0 500 80" className="w-full h-16 overflow-visible">
          {/* Expanding Acoustic Sound Waves when pulled */}
          {isPulling && (
            <>
              <ellipse
                cx="250"
                cy={40 + tensionOffset}
                rx="60"
                ry="24"
                fill="none"
                stroke="#0077B6"
                strokeWidth="1.5"
                className="animate-ping opacity-60"
              />
              <ellipse
                cx="250"
                cy={40 + tensionOffset}
                rx="110"
                ry="40"
                fill="none"
                stroke="#38BDF8"
                strokeWidth="1"
                className="animate-pulse opacity-40"
              />
            </>
          )}

          {/* Natural Rope Curve with dynamic tension */}
          <path
            d={`M 10 40 Q 250 ${40 + tensionOffset} 490 40`}
            fill="none"
            stroke="#0A192F"
            strokeWidth="5"
            strokeLinecap="round"
            className="transition-all duration-200 group-hover:stroke-[#0077B6]"
          />

          {/* Twisted Rope Texture Dashes */}
          <path
            d={`M 10 40 Q 250 ${40 + tensionOffset} 490 40`}
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            strokeDasharray="6 6"
            className="transition-all duration-200 opacity-70"
          />

          {/* Central Pull Grip Ring */}
          <circle
            cx="250"
            cy={40 + tensionOffset}
            r="8"
            fill="#0077B6"
            className="transition-all duration-200 group-hover:scale-125"
          />
          <circle
            cx="250"
            cy={40 + tensionOffset}
            r="14"
            fill="none"
            stroke="#0077B6"
            strokeWidth="1.5"
            strokeDasharray="3 3"
            className="animate-spin"
            style={{ animationDuration: '6s' }}
          />
        </svg>

        <p className="text-[11px] font-medium text-[#0077B6] mt-1 group-hover:scale-105 transition-transform flex items-center">
          <Sparkles size={11} className="mr-1" />
          Nhấp vào sợi thừng để cùng ngư dân kéo lưới rùng
        </p>
      </div>

      {/* Chanting Rhythm Excerpt */}
      <div className="p-2.5 rounded-xl bg-white border border-slate-200/70 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-2">
          <Volume2 size={14} className="text-[#0077B6] shrink-0" />
          <span className="font-serif italic text-[#0A192F] text-[11px] sm:text-xs">
            {currentChant}
          </span>
        </div>

        <button
          type="button"
          onClick={handlePullRope}
          className="shrink-0 px-2.5 py-1 rounded-md bg-[#0077B6] hover:bg-[#0A192F] text-white text-[10px] font-semibold transition-colors flex items-center space-x-1"
        >
          <RefreshCw size={10} className={isPulling ? 'animate-spin' : ''} />
          <span>Kéo tiếp</span>
        </button>
      </div>
    </div>
  );
};
