import { CinematicPrelude } from './background/CinematicPrelude';
import { useState } from 'react';
import { ChevronDown, Compass, Play, Maximize2, Video, Anchor, Clock, Heart, BookOpen } from 'lucide-react';
import type { MediaSlotInfo } from './MediaModal';

interface HeroSectionProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const HeroSection = ({ onOpenMediaSlot }: HeroSectionProps) => {
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);

  const heroMediaSlot: MediaSlotInfo = {
    title: 'Cửa Biển Sơn Trà: Toàn cảnh Vịnh & Bán đảo',
    type: 'video',
    aspectRatio: '16:9 (Cinematic Widescreen)',
    recommendedSize: '3840x2160 (4K) hoặc 1920x1080 (Full HD)',
    targetFile: 'src/assets/hero-sontra.mp4 hoặc YouTube/Vimeo embed URL',
    description:
      'Góc nhìn flycam từ cửa biển Sơn Trà: cảnh non nước hữu tình ôm lấy vịnh Đà Nẵng, nhịp thuyền ra vào bến Thọ Quang lúc mặt trời mọc.',
  };

  const scrollToNext = () => {
    const nextSection = document.getElementById('tri-thuc-so');
    if (nextSection) {
      document.body.style.overflow = '';
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="vung-thung"
      aria-label="Cầu nối giữa không gian thực tế và kho tàng tri thức số về địa danh Sơn Trà"
      className="cinematic-chapter w-full md:snap-start md:snap-always"
    >
      <CinematicPrelude chapter="coast" targetId="cua-bien-noi-dung" />
      <div id="cua-bien-noi-dung" className="chapter-content">
      {/* Responsive 2-Column Presentation Frame */}
      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto">
        {/* Left Column: Narrative Header, 4 Pillars & CTA (lg:col-span-6) */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md border border-cyan-200/80 shadow-xs text-xs font-semibold tracking-widest text-[#0077B6] uppercase mb-2 animate-fade-rise">
            <Compass size={14} className="text-[#0077B6] animate-spin" style={{ animationDuration: '15s' }} />
            <span>Cầu nối thực địa & tri thức số</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif text-[#0A192F] tracking-tight leading-tight animate-fade-rise">
            Sơn Trà —{' '}
            <span className="text-[#0077B6] font-normal italic">
              Miền ký ức neo đậu
            </span>
          </h2>

          <p className="mt-2.5 text-sm sm:text-base text-[#334155] font-normal leading-relaxed animate-fade-rise-delay">
            Cầu nối giữa không gian thực tế của bến cảng, làng chài cổ và kho tàng tri thức số về địa danh Sơn Trà. Nơi lưu giữ ký ức, định vị địa lý và tôn vinh những câu chuyện mặn mòi qua bao đời người dân xứ biển.
          </p>

          {/* 4 Key Geographic Pillars in compact 2x2 grid */}
          <div className="grid grid-cols-2 gap-2.5 w-full my-4">
            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs text-left hover:border-cyan-300 transition-all">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-sky-50 text-[#0077B6] flex items-center justify-center">
                  <Anchor size={16} />
                </div>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#0A192F]">58 ha</span>
              </div>
              <span className="text-xs text-slate-600 font-medium block">Mặt nước Âu thuyền</span>
            </div>

            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs text-left hover:border-amber-300 transition-all">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
                  <Clock size={16} />
                </div>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#0A192F]">01h - 05h</span>
              </div>
              <span className="text-xs text-slate-600 font-medium block">Chợ cá đêm rạng sáng</span>
            </div>

            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs text-left hover:border-rose-300 transition-all">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <Heart size={16} />
                </div>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#0A192F]">300+ năm</span>
              </div>
              <span className="text-xs text-slate-600 font-medium block">Lăng Ông & Cầu ngư</span>
            </div>

            <div className="p-3 rounded-xl bg-white/85 backdrop-blur-md border border-white/90 shadow-xs text-left hover:border-emerald-300 transition-all">
              <div className="flex items-center space-x-2 mb-1">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <BookOpen size={16} />
                </div>
                <span className="text-lg sm:text-xl font-bold font-serif text-[#0A192F]">7+ Địa danh</span>
              </div>
              <span className="text-xs text-slate-600 font-medium block">Kho tri thức số bản địa</span>
            </div>
          </div>

          {/* CTA Button to Scroll */}
          <div className="flex items-center space-x-3">
            <button
              type="button"
              onClick={scrollToNext}
              className="px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide bg-[#0A192F] text-white hover:bg-[#0077B6] hover:shadow-lg hover:shadow-cyan-900/20 active:scale-95 transition-all duration-300 flex items-center space-x-2 cursor-pointer"
            >
              <span>Khám phá kho tàng tri thức số</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        {/* Right Column: PLACE MEDIA SHOWCASE FRAME (16:9) (lg:col-span-6) */}
        <div className="lg:col-span-6 w-full animate-fade-rise-delay-2">
          <div className="group relative rounded-2xl sm:rounded-3xl p-1.5 bg-white/80 backdrop-blur-xl border border-white/80 shadow-lg shadow-cyan-950/10 hover:shadow-cyan-600/20 transition-all duration-500">
            <div className="relative aspect-16/9 w-full rounded-xl sm:rounded-2xl overflow-hidden bg-gradient-to-br from-[#0A192F] via-[#0E2A47] to-[#0077B6] border border-slate-700/50 flex flex-col justify-between p-3.5 sm:p-4 text-white select-none">
              {/* Ambient Wave Simulation */}
              <div className="absolute inset-0 pointer-events-none opacity-35">
                <svg className="w-full h-full" viewBox="0 0 1000 600" fill="none" preserveAspectRatio="none">
                  <path d="M0 350 C300 280 500 420 1000 320 L1000 600 L0 600 Z" fill="#0077B6" fillOpacity="0.3" className="animate-pulse" />
                  <path d="M0 400 C400 320 600 480 1000 370 L1000 600 L0 600 Z" fill="#0A192F" fillOpacity="0.5" />
                </svg>
              </div>

              {/* Frame Top Bar */}
              <div className="relative z-10 flex items-center justify-between text-xs">
                <div className="flex items-center space-x-1.5 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="font-mono uppercase text-xs text-cyan-200">
                    Tư liệu số hóa · Cửa biển & Âu thuyền
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenMediaSlot(heroMediaSlot)}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/20 text-white text-xs transition-all cursor-pointer"
                >
                  <Maximize2 size={13} />
                  <span>Chèn video</span>
                </button>
              </div>

              {/* Frame Center Play Trigger */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center my-auto">
                <button
                  type="button"
                  onClick={() => {
                    setIsPlayingPreview(!isPlayingPreview);
                    onOpenMediaSlot(heroMediaSlot);
                  }}
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#0077B6] hover:bg-cyan-500 text-white flex items-center justify-center shadow-lg shadow-cyan-900/60 hover:scale-110 active:scale-95 transition-all duration-300 group/btn cursor-pointer"
                  aria-label="Xem thước phim cửa biển Sơn Trà"
                >
                  <Play size={20} className="ml-0.5 text-white group-hover/btn:scale-110 transition-transform" />
                </button>

                <h2 className="mt-2 text-sm sm:text-lg font-serif font-bold tracking-tight text-white drop-shadow-md">
                  Bình minh trên Cửa biển & Vịnh Đà Nẵng
                </h2>
                <p className="text-xs text-cyan-100/90 font-light max-w-xs mx-auto">
                  [Khung tư liệu video 16:9 — Thước phim thực tế nơi tàu thuyền cập bến]
                </p>
              </div>

              {/* Frame Bottom Hotspots */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-1.5 pt-2 border-t border-white/15 text-xs text-white/80">
                <div className="flex items-center space-x-1">
                  <Video size={13} className="text-cyan-400" />
                  <span className="hidden sm:inline">Tư liệu số 4K</span>
                </div>

                <div className="flex items-center space-x-1">
                  {['Âu thuyền Thọ Quang', 'Làng cá Vũng Thùng', 'Cửa sông Hàn', 'Lăng Ông'].map((spot) => (
                    <button
                      key={spot}
                      type="button"
                      onClick={() => setActiveHotspot(activeHotspot === spot ? null : spot)}
                      className={`px-2.5 py-0.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                        activeHotspot === spot
                          ? 'bg-cyan-400 text-[#0A192F] font-bold shadow-xs'
                          : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                      }`}
                    >
                      📍 {spot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {activeHotspot && (
            <div className="mt-2 p-2.5 rounded-xl bg-white border border-slate-200 text-xs text-[#4A5568] flex items-center justify-between shadow-xs animate-fade-rise">
              <span className="text-xs"><strong>Địa danh:</strong> {activeHotspot} — Vùng đất neo giữ ký ức xứ biển.</span>
              <button type="button" onClick={() => setActiveHotspot(null)} className="text-[#0077B6] font-bold ml-2 text-xs cursor-pointer hover:underline">Đóng</button>
            </div>
          )}
        </div>
      </div>
      </div>
    </section>
  );
};
