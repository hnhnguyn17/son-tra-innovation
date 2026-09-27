import { useState, useEffect, useCallback } from 'react';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

interface IntroOverlayProps {
  onEnter?: () => void;
}

export const IntroOverlay = ({ onEnter }: IntroOverlayProps) => {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !sessionStorage.getItem('sontra_intro_seen');
  });
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleDismiss = useCallback(() => {
    setIsFadingOut(true);
    setTimeout(() => {
      setIsVisible(false);
      onEnter?.();
    }, 800);
  }, [onEnter]);

  useEffect(() => {
    if (!isVisible) return;

    // Auto dismiss after 4.5 seconds if untouched
    const timer = setTimeout(() => {
      handleDismiss();
      sessionStorage.setItem('sontra_intro_seen', 'true');
    }, 4500);

    return () => clearTimeout(timer);
  }, [isVisible, handleDismiss]);

  const triggerEnter = () => {
    sessionStorage.setItem('sontra_intro_seen', 'true');
    handleDismiss();
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Màn giới thiệu mở đầu trải nghiệm Sơn Trà"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#0A192F] text-white transition-all duration-800 ${
        isFadingOut
          ? 'opacity-0 pointer-events-none scale-105 filter blur-sm'
          : 'opacity-100'
      }`}
    >
      {/* Dreamcore Ocean Mist Ambient Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Soft Radial Ocean Light Orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-radial from-[#0077B6]/30 via-sky-600/10 to-transparent blur-3xl animate-pulse" />

        {/* Dynamic Wave Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full text-[#0077B6]/20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M-200 450 Q 300 350 700 450 T 1600 450"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="8 8"
            className="animate-pulse"
          />
          <path
            d="M-100 500 Q 400 420 900 500 T 1900 500"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        </svg>
      </div>

      {/* Intro Center Content */}
      <div className="relative z-10 max-w-xl mx-auto px-6 text-center flex flex-col items-center animate-fade-rise">
        {/* Top Tag */}
        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs text-cyan-200 tracking-widest uppercase mb-6">
          <Compass size={14} className="text-cyan-400 animate-spin" style={{ animationDuration: '10s' }} />
          <span>Bản sắc & Không gian tương lai</span>
        </div>

        {/* Big Serif Reveal Title */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold tracking-tight text-white leading-tight">
          SƠN TRÀ
        </h1>
        <p className="mt-2 text-lg sm:text-xl font-serif italic text-cyan-300 font-light">
          Miền ký ức neo đậu
        </p>

        {/* Subtitle */}
        <p className="mt-6 text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-md">
          Nơi vòng tay đê chắn bão ôm ấp nhịp sống làng chài, và hơi thở di sản hòa cùng đồ án công viên đổi mới sáng tạo.
        </p>

        {/* Interactive Enter Button */}
        <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
          <button
            type="button"
            onClick={triggerEnter}
            className="group px-7 py-3.5 rounded-full bg-[#0077B6] hover:bg-cyan-500 text-white font-medium text-sm sm:text-base flex items-center space-x-2.5 shadow-xl shadow-cyan-900/50 hover:shadow-cyan-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
          >
            <span>Bắt đầu khám phá</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            type="button"
            onClick={triggerEnter}
            className="text-xs text-slate-400 hover:text-white transition-colors underline underline-offset-4 py-2"
          >
            Bỏ qua mở màn (vào trang ngay)
          </button>
        </div>

        {/* Bottom subtle note */}
        <div className="mt-8 flex items-center space-x-2 text-[11px] text-slate-400/80">
          <Sparkles size={12} className="text-cyan-400" />
          <span>Trải nghiệm tương tác đa giác quan ven biển</span>
        </div>
      </div>
    </aside>
  );
};
