import { useState, useEffect } from 'react';
import { Users, Play, Pause, Maximize2, Mic, ChevronLeft, ChevronRight, Heart, MapPin, Sparkles } from 'lucide-react';
import { SOUL_KEEPERS } from '../data/contentData';
import type { MediaSlotInfo } from './MediaModal';

interface KeepersOfSoulProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const KeepersOfSoul = ({ onOpenMediaSlot }: KeepersOfSoulProps) => {
  const [activeKeeperIdx, setActiveKeeperIdx] = useState(0);
  const [playingVoice, setPlayingVoice] = useState(false);

  const portraitSlots: { [key: string]: MediaSlotInfo } = {
    'keeper-1': {
      title: 'Chân Dung Lão Ngư Bác Hai Lực',
      type: 'image',
      aspectRatio: '1:1 Vuông hoặc 4:5 Chân dung',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/keeper-lao-ngu.jpg',
      description: 'Ảnh chụp chân dung lão ngư dày dặn sương gió, ánh mắt kiên nghị hướng về biển cả Sơn Trà.',
    },
    'keeper-2': {
      title: 'Chân Dung Cô Mười Bé Gánh Cá',
      type: 'image',
      aspectRatio: '1:1 Vuông hoặc 4:5 Chân dung',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/keeper-ganh-ca.jpg',
      description: 'Ảnh chụp người phụ nữ bên đôi quang gánh cá tươi lúc rạng đông trên cầu cảng Thọ Quang.',
    },
    'keeper-3': {
      title: 'Chân Dung Nghệ Nhân Ba Thảo',
      type: 'image',
      aspectRatio: '1:1 Vuông hoặc 4:5 Chân dung',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/keeper-nghe-nhan-thung.jpg',
      description: 'Ảnh chụp nghệ nhân bên chiếc thúng chai nan tre đang quét dầu rái dưới chân núi Sơn Trà.',
    },
    'keeper-4': {
      title: 'Chân Dung Cụ Tư Tôn Lăng Ông',
      type: 'image',
      aspectRatio: '1:1 Vuông hoặc 4:5 Chân dung',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/keeper-lang-ong.jpg',
      description: 'Ảnh chụp bậc cao niên làng chài trong tà áo the khăn đóng bên hương án Lăng Ông Nam Thọ.',
    },
    'keeper-5': {
      title: 'Chân Dung Chị Lan Người Giữ Vị Mắm',
      type: 'image',
      aspectRatio: '1:1 Vuông hoặc 4:5 Chân dung',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/keeper-nguoi-lam-mam.jpg',
      description: 'Ảnh chụp người phụ nữ bên hàng chum sành ủ cá cơm than truyền thống làng biển Nam Thọ.',
    },
  };

  const keeper = SOUL_KEEPERS[activeKeeperIdx];
  const slot = portraitSlots[keeper.id] || portraitSlots['keeper-1'];

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleSelectKeeper = (idx: number) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingVoice(false);
    setActiveKeeperIdx(idx);
  };

  const handleToggleVoice = () => {
    if (!('speechSynthesis' in window)) {
      alert('Trình duyệt chưa hỗ trợ phát giọng đọc tự động.');
      return;
    }

    if (playingVoice) {
      window.speechSynthesis.cancel();
      setPlayingVoice(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = `${keeper.characterName}, ${keeper.role}. ${keeper.narrativeExcerpt}`;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.92;
      utterance.onend = () => setPlayingVoice(false);
      utterance.onerror = () => setPlayingVoice(false);
      window.speechSynthesis.speak(utterance);
      setPlayingVoice(true);
    }
  };

  const prevKeeper = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingVoice(false);
    setActiveKeeperIdx((prev) => (prev > 0 ? prev - 1 : SOUL_KEEPERS.length - 1));
  };

  const nextKeeper = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setPlayingVoice(false);
    setActiveKeeperIdx((prev) => (prev < SOUL_KEEPERS.length - 1 ? prev + 1 : 0));
  };

  return (
    <section
      id="chuyen-nguoi-bien"
      aria-labelledby="heading-chuyen-nguoi-bien"
      className="w-full min-h-[100dvh] flex flex-col justify-center pt-14 sm:pt-16 pb-3 sm:pb-4 px-4 sm:px-6 lg:px-8 bg-slate-50/40 backdrop-blur-xs border-t border-cyan-100/60 md:snap-start md:snap-always"
    >
      <div className="max-w-6xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-2.5 border-b border-cyan-100/70 pb-1.5">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-0.5">
              <Users size={14} className="text-[#0077B6]" />
              <span>Con người & Ký ức sống · Làng cá Vũng Thùng</span>
            </div>
            <h2
              id="heading-chuyen-nguoi-bien"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Chuyện người xứ biển: Ký ức neo đậu bên đầu sóng
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-tight">
              Những tâm sự mộc mạc, thấm đẫm vị mặn mòi của những người con làng chài Vũng Thùng — Thọ Quang.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              type="button"
              onClick={prevKeeper}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#0077B6] hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Xem câu chuyện trước"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#0077B6] px-1.5">
              0{activeKeeperIdx + 1} / 0{SOUL_KEEPERS.length}
            </span>
            <button
              type="button"
              onClick={nextKeeper}
              className="w-8 h-8 rounded-full bg-white/90 hover:bg-[#0077B6] hover:text-white border border-slate-200 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
              aria-label="Xem câu chuyện tiếp theo"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Character Navigation Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2.5">
          {SOUL_KEEPERS.map((item, idx) => {
            const isSelected = activeKeeperIdx === idx;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectKeeper(idx)}
                className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-br from-[#0A192F] to-[#1E293B] text-white border-[#0A192F] shadow-sm ring-1 ring-[#0077B6]/40'
                    : 'bg-white/90 backdrop-blur-sm text-[#4A5568] border-white/90 hover:bg-white hover:text-[#0A192F] shadow-2xs'
                }`}
              >
                <div className="flex items-center justify-between text-xs mb-0.5">
                  <span className={isSelected ? 'text-cyan-300 font-bold' : 'text-[#0077B6] font-bold'}>
                    0{idx + 1}
                  </span>
                  <span className={isSelected ? 'text-slate-300' : 'text-slate-400'}>
                    {item.age}
                  </span>
                </div>
                <h4 className="font-serif font-bold text-xs sm:text-sm truncate">
                  {item.characterName}
                </h4>
                <p className={`text-xs truncate ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                  {item.role}
                </p>
              </button>
            );
          })}
        </div>

        {/* Active Character Detailed Narrative Spotlight */}
        <article className="rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-sm p-3.5 sm:p-5 transition-all">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Left: Portrait / Visual Badge */}
            <div className="lg:col-span-4 flex flex-col items-center">
              <div
                onClick={() => onOpenMediaSlot(slot)}
                className="cursor-pointer relative aspect-square w-full max-w-[210px] rounded-2xl bg-gradient-to-br from-sky-50 via-slate-50 to-cyan-50 border-2 border-dashed border-[#0077B6]/40 hover:border-[#0077B6] flex flex-col items-center justify-center p-3.5 text-center transition-all group/port shadow-2xs"
                title="Nhấp để chèn hình ảnh chân dung"
              >
                <div className="absolute top-2 right-2 text-[#0077B6] opacity-0 group-hover/port:opacity-100 transition-opacity">
                  <Maximize2 size={15} />
                </div>

                <div className="w-12 h-12 rounded-full bg-cyan-100/80 border border-cyan-200 flex items-center justify-center text-[#0077B6] mb-2 group-hover/port:scale-110 transition-transform shadow-xs">
                  <Users size={24} />
                </div>

                <span className="text-sm sm:text-base font-serif font-bold text-[#0A192F]">
                  {keeper.characterName}
                </span>
                <span className="text-xs text-[#0077B6] font-medium mt-0.5">
                  {keeper.role} · {keeper.age}
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  [Tư liệu điền dã làng cá Sơn Trà]
                </span>
              </div>

              {/* Location Tag */}
              <div className="mt-2.5 inline-flex items-center space-x-1.5 text-xs text-slate-700 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full border border-slate-200 shadow-2xs">
                <MapPin size={13} className="text-[#0077B6]" />
                <span>{keeper.location}</span>
              </div>
            </div>

            {/* Right: Narrative Story & Life Quote */}
            <div className="lg:col-span-8 flex flex-col justify-between space-y-2.5">
              <div>
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-[#0077B6] border border-sky-100 mb-1">
                  <Heart size={13} className="text-rose-500 fill-rose-500" />
                  <span>{keeper.statusLabel}</span>
                </div>

                <h3 className="text-lg sm:text-2xl font-serif font-bold text-[#0A192F] tracking-tight leading-snug">
                  {keeper.characterTitle}
                </h3>
                <p className="text-xs sm:text-sm text-[#0077B6] font-medium">
                  {keeper.subtitle}
                </p>

                {/* Primary Quote - full narrative without cut-off */}
                <div className="mt-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50/95 border-l-4 border-[#0077B6] text-[#1E293B]">
                  <p className="font-serif italic text-xs sm:text-sm leading-relaxed text-slate-800">
                    {keeper.narrativeExcerpt}
                  </p>
                </div>

                {/* Research Insight */}
                <div className="mt-2 flex items-start space-x-1.5 text-xs sm:text-sm text-slate-600">
                  <Sparkles size={14} className="text-amber-500 shrink-0 mt-0.5" />
                  <p>
                    <strong className="text-slate-700">Ghi chép đời sống:</strong> {keeper.researchFocus}
                  </p>
                </div>
              </div>

              {/* Real Web Speech Voice Button */}
              <div className="pt-2 border-t border-slate-200/80">
                <button
                  type="button"
                  onClick={handleToggleVoice}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-between transition-all cursor-pointer ${
                    playingVoice
                      ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white shadow-xs'
                      : 'bg-slate-100/90 hover:bg-slate-200/90 text-[#0A192F]'
                  }`}
                  aria-label={playingVoice ? 'Dừng phát giọng đọc' : 'Nghe lời tâm sự mộc mạc xứ biển'}
                >
                  <div className="flex items-center space-x-2">
                    {playingVoice ? <Pause size={14} /> : <Play size={14} />}
                    <span>
                      {playingVoice
                        ? `Đang đọc tâm sự của ${keeper.characterName} (Nhấp để dừng)`
                        : `Lắng nghe tâm sự của ${keeper.characterName}`}
                    </span>
                  </div>

                  {playingVoice ? (
                    <div className="flex items-center space-x-0.5 h-3">
                      <span className="w-1 h-full bg-white rounded-full animate-bounce" />
                      <span className="w-1 h-2/3 bg-white rounded-full animate-bounce" style={{ animationDelay: '100ms' }} />
                      <span className="w-1 h-full bg-white rounded-full animate-bounce" style={{ animationDelay: '200ms' }} />
                      <span className="w-1 h-1/2 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  ) : (
                    <Mic size={16} className="text-[#0077B6]" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
