import { CinematicPrelude } from './background/CinematicPrelude';
import { useState } from 'react';
import { Fish, CheckCircle2, Quote, Image as ImageIcon, Maximize2, ChevronLeft, ChevronRight, Waves } from 'lucide-react';
import { LIVING_HERITAGE_LIST } from '../data/contentData';
import { GenerativeNetWave } from './generative/GenerativeNetWave';
import { InteractiveRopePull } from './generative/InteractiveRopePull';
import type { MediaSlotInfo } from './MediaModal';

interface CoastalLifeProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const CoastalLife = ({ onOpenMediaSlot }: CoastalLifeProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'media' | 'interactive'>('media');

  const heritageSlots: { [key: string]: MediaSlotInfo } = {
    'cau-ngu': {
      title: 'Lăng Thần Nam Hải & Lễ Hội Cầu Ngư',
      type: 'image',
      aspectRatio: '4:3 hoặc 16:9',
      recommendedSize: '2400x1800 (High-res)',
      targetFile: 'src/assets/heritage-cau-ngu.jpg',
      description:
        'Khoảnh khắc linh thiêng trong ngày hội Cầu ngư tại lăng Ông ven biển Thọ Quang / Mân Thái: tiếng trống chiêng rộn rã tiễn đoàn thuyền vươn khơi.',
    },
    'thung-chai': {
      title: 'Chiếc Thúng Chai Trên Bãi Cát Mân Thái',
      type: 'image',
      aspectRatio: '4:3 hoặc 1:1',
      recommendedSize: '2000x2000',
      targetFile: 'src/assets/heritage-thung-chai.jpg',
      description:
        'Hàng trăm chiếc thúng chai tròn trét dầu rái nằm phơi mình trên cát mịn Mân Thái, biểu tượng mộc mạc của trí tuệ thích nghi biển khơi.',
    },
    'keo-luoi-rung': {
      title: 'Bình Minh Kéo Lưới Rùng Ven Bờ',
      type: 'image',
      aspectRatio: '16:9 Cinematic',
      recommendedSize: '3840x2160',
      targetFile: 'src/assets/heritage-keo-luoi.jpg',
      description:
        'Khung hình cả xóm chài cùng nhau ghìm chặt sợi dây lưới rùng lúc mặt trời đỏ ối vừa nhô lên khỏi đường chân trời vịnh biển.',
    },
  };

  const item = LIVING_HERITAGE_LIST[currentIndex];
  const slot = heritageSlots[item.id] || heritageSlots['cau-ngu'];

  const prevItem = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : LIVING_HERITAGE_LIST.length - 1));
  };

  const nextItem = () => {
    setCurrentIndex((prev) => (prev < LIVING_HERITAGE_LIST.length - 1 ? prev + 1 : 0));
  };

  const placeTabs = ['Lăng Ông & Cầu Ngư', 'Thúng chai nan tre', 'Kéo lưới rùng bình minh'];

  return (
    <section
      id="di-san"
      aria-labelledby="heading-di-san"
      className="cinematic-chapter w-full md:snap-start md:snap-always"
    >
      <CinematicPrelude chapter="whale" targetId="di-san-noi-dung" />
      <div id="di-san-noi-dung" className="chapter-content">
      <div className="max-w-5xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-2 mb-2.5 border-b border-cyan-100/70 pb-1.5">
          <div className="max-w-xl">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-0.5">
              <Fish size={13} className="text-[#0077B6]" />
              <span>Di sản tâm linh & Văn hóa làng biển · Sơn Trà</span>
            </div>
            <h2
              id="heading-di-san"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Di sản Lăng Ông & Lễ Cầu ngư: Điểm tựa ngàn đời của vạn chài
            </h2>
          </div>

          {/* Mode Switcher & Carousel Arrows */}
          <div className="flex items-center space-x-2 shrink-0">
            <div className="flex items-center p-0.5 rounded-xl bg-white/80 backdrop-blur-md border border-cyan-200/60 shadow-2xs text-xs">
              <button
                type="button"
                onClick={() => setViewMode('media')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                  viewMode === 'media'
                    ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white font-bold shadow-2xs'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                Khung tư liệu
              </button>
              <button
                type="button"
                onClick={() => setViewMode('interactive')}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all flex items-center space-x-1 ${
                  viewMode === 'interactive'
                    ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white font-bold shadow-2xs'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                <Waves size={12} />
                <span>Sóng lưới động</span>
              </button>
            </div>

            {viewMode === 'media' && (
              <div className="flex items-center space-x-1.5 ml-1">
                <button
                  type="button"
                  onClick={prevItem}
                  className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 hover:border-[#0077B6] hover:text-[#0077B6] flex items-center justify-center shadow-2xs transition-colors"
                  aria-label="Xem nét văn hóa trước"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono text-xs sm:text-sm font-bold text-[#0077B6] px-1.5">
                  0{currentIndex + 1}
                </span>
                <button
                  type="button"
                  onClick={nextItem}
                  className="w-8 h-8 rounded-full bg-white/90 border border-slate-200 hover:border-[#0077B6] hover:text-[#0077B6] flex items-center justify-center shadow-2xs transition-colors"
                  aria-label="Xem nét văn hóa tiếp theo"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>

        {viewMode === 'interactive' ? (
          /* Interactive Generative Mesh & Rope Pull Experience */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-rise">
            <GenerativeNetWave />
            <InteractiveRopePull />
          </div>
        ) : (
          /* Standard Media & Living Heritage Carousel View */
          <>
            {/* 3 Tab Buttons */}
            <div className="flex gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-md border border-cyan-200/60 shadow-2xs max-w-lg mb-3 overflow-x-auto">
              {placeTabs.map((label, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all whitespace-nowrap text-center ${
                    currentIndex === idx
                      ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white shadow-2xs'
                      : 'text-[#4A5568] hover:text-[#0A192F] hover:bg-sky-50/70'
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Spotlight Active Showcase Card */}
            <article className="rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-sm p-4 sm:p-5 animate-fade-rise">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
                {/* Text Column */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-1.5">
                      <span className="text-xs font-bold text-[#0077B6] uppercase tracking-wider">
                        {item.tag}
                      </span>
                      <CheckCircle2 size={13} className="text-emerald-600" />
                    </div>

                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F]">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                      {item.summary}
                    </p>

                    <p className="mt-1.5 text-xs text-[#4A5568]/85 leading-relaxed font-light hidden sm:block">
                      {item.details}
                    </p>
                  </div>

                  {/* Folk Quote */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-start space-x-2 text-xs">
                    <Quote size={15} className="text-[#0077B6] shrink-0 mt-0.5" />
                    <p className="font-serif italic text-[#0A192F]">
                      {item.quote}
                    </p>
                  </div>
                </div>

                {/* Media Slot Column (4:3) */}
                <div className="lg:col-span-5">
                  <div
                    onClick={() => onOpenMediaSlot(slot)}
                    className="group cursor-pointer relative aspect-4/3 w-full rounded-xl bg-gradient-to-tr from-slate-100 via-sky-50 to-white border-2 border-dashed border-slate-300 hover:border-[#0077B6] p-4 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-md"
                    title="Nhấp để chèn ảnh tư liệu bãi chài Mân Thái"
                  >
                    <div className="flex items-center justify-between text-xs text-[#4A5568]">
                      <span className="font-mono bg-white px-2.5 py-0.5 rounded-full border border-slate-200 text-[#0077B6] font-semibold text-xs">
                        Tư liệu ảnh · Bãi chài Mân Thái
                      </span>
                      <Maximize2 size={14} className="text-[#0077B6] opacity-0 group-hover/slot:opacity-100 transition-opacity" />
                    </div>

                    <div className="text-center my-auto py-2">
                      <div className="w-12 h-12 mx-auto rounded-full bg-white shadow-xs border border-slate-200 flex items-center justify-center text-[#0077B6] mb-1.5 group-hover/slot:scale-110 transition-transform">
                        <ImageIcon size={22} />
                      </div>
                      <h4 className="text-xs sm:text-sm font-serif font-bold text-[#0A192F]">
                        {slot.title}
                      </h4>
                      <p className="text-xs text-slate-500 mt-1">
                        [Nhấp để chọn & chèn ảnh tư liệu địa phương]
                      </p>
                    </div>

                    <div className="flex justify-between items-center text-xs text-slate-600 pt-2 border-t border-slate-200/60">
                      <span>Địa bàn: Bãi cát Mân Thái</span>
                      <span className="text-[#0077B6] font-semibold group-hover:underline">Chèn tư liệu →</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </>
        )}
      </div>
      </div>
    </section>
  );
};
