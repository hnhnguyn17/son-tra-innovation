import { useState } from 'react';
import { Sparkles, Layers, Palette, Maximize2, Compass, Eye, Check, Clock } from 'lucide-react';
import { PARK_CONCEPT_DESIGNS } from '../data/contentData';
import { TemporalMorphStudio } from './generative/TemporalMorphStudio';
import { KineticParkSimulator } from './generative/KineticParkSimulator';
import type { MediaSlotInfo } from '../types/media';

interface MemoryIntoSpaceProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const MemoryIntoSpace = ({ onOpenMediaSlot }: MemoryIntoSpaceProps) => {
  const [activeConceptIndex, setActiveConceptIndex] = useState(0);
  const [activeViewMode, setActiveViewMode] = useState<'kinetic' | 'concepts' | 'timeline'>('kinetic');

  const conceptSlots: MediaSlotInfo[] = [
    {
      title: 'Không Gian 01: Đường Dạo Chở Che Ven Vịnh',
      type: '3d',
      aspectRatio: '16:9 Landscape',
      recommendedSize: '3840x2160 (Render 4K)',
      targetFile: 'src/assets/concept-promenade-render.jpg',
      description: 'Hình ảnh ý niệm không gian cầu dạo bộ trên cao uốn lượn theo dáng đê Thọ Quang ngắm nhìn vịnh biển ban mai.',
    },
    {
      title: 'Không Gian 02: Quảng Trường Hội Ngộ Biển',
      type: '3d',
      aspectRatio: '16:9 Landscape',
      recommendedSize: '3840x2160 (Render 4K)',
      targetFile: 'src/assets/concept-plaza-render.jpg',
      description: 'Không gian quảng trường mở hướng biển với các lớp mái che tựa cánh buồm và sàn lát sa thạch địa phương.',
    },
    {
      title: 'Không Gian 03: Cấu Trúc Biểu Tượng & Giàn Mắt Lưới Ký Ức',
      type: '3d',
      aspectRatio: '16:9 Landscape',
      recommendedSize: '3840x2160 (Render 4K)',
      targetFile: 'src/assets/concept-pavilion-render.jpg',
      description: 'Cấu trúc sắp đặt biểu tượng và hệ giàn không gian lấy cảm hứng từ nan thuyền thúng và mắt lưới rùng, tạo hiệu ứng bóng đổ tự nhiên trên bậc thềm hồ trũng.',
    },
  ];

  const currentConcept = PARK_CONCEPT_DESIGNS[activeConceptIndex];
  const currentSlot = conceptSlots[activeConceptIndex];

  return (
    <section
      id="ky-uc-thanh-khong-gian"
      aria-labelledby="heading-ky-uc-thanh-khong-gian"
      className="snap-slide min-h-[100dvh] w-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 py-10 sm:py-14 bg-slate-50 border-t border-slate-200/60"
    >
      <div className="max-w-5xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-3">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-1">
              <Sparkles size={13} className="text-[#0077B6]" />
              <span>Điểm chạm 06 · Công viên tương lai</span>
            </div>
            <h2
              id="heading-ky-uc-thanh-khong-gian"
              className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Công viên tương lai: Ký ức hóa thành không gian
            </h2>
          </div>

          {/* Mode Selector Toggle */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-slate-200/70 shrink-0 text-xs">
            <button
              type="button"
              onClick={() => setActiveViewMode('kinetic')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'kinetic'
                  ? 'bg-white text-[#0077B6] font-bold shadow-xs'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              <Compass size={13} />
              <span>4 Trụ cột ý tưởng thiết kế</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode('concepts')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'concepts'
                  ? 'bg-white text-[#0077B6] font-bold shadow-xs'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              <Palette size={13} />
              <span>3 Không gian kiến trúc</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveViewMode('timeline')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                activeViewMode === 'timeline'
                  ? 'bg-white text-[#0077B6] font-bold shadow-xs'
                  : 'text-[#4A5568] hover:text-[#0A192F]'
              }`}
            >
              <Clock size={13} />
              <span>Lớp lang thời gian</span>
            </button>
          </div>
        </div>

        {activeViewMode === 'kinetic' ? (
          /* Real-time 2.5D Kinetic Park Simulation */
          <KineticParkSimulator />
        ) : activeViewMode === 'timeline' ? (
          /* Generative Temporal Morphing Studio */
          <TemporalMorphStudio />
        ) : (
          /* 3 Architectural Concepts View */
          <>
            {/* 3 Space Tabs */}
            <div className="grid grid-cols-3 gap-2 mb-3">
              {PARK_CONCEPT_DESIGNS.map((c, idx) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setActiveConceptIndex(idx)}
                  className={`p-2 sm:p-2.5 rounded-xl border text-left transition-all ${
                    activeConceptIndex === idx
                      ? 'bg-white border-[#0077B6] shadow-sm ring-2 ring-[#0077B6]/20'
                      : 'bg-white/60 border-slate-200 hover:bg-white text-[#4A5568]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-[10px] font-bold text-[#0077B6]">Không gian 0{idx + 1}</span>
                    {activeConceptIndex === idx && <Check size={12} className="text-[#0077B6]" />}
                  </div>
                  <h3 className="font-serif font-bold text-xs text-[#0A192F] truncate">
                    {c.conceptTitle.split('(')[0]}
                  </h3>
                </button>
              ))}
            </div>

            {/* Interactive Showcase Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-xs animate-fade-rise">
              {/* Narrative Details */}
              <div className="lg:col-span-6 space-y-2.5">
                <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-sky-50 text-[#0077B6] border border-sky-100">
                  <Compass size={11} />
                  <span>Gợi cảm hứng từ Sơn Trà</span>
                </div>

                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F]">
                  {currentConcept.conceptTitle}
                </h3>
                <p className="text-xs font-medium text-[#0077B6]">
                  {currentConcept.poeticSubtitle}
                </p>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-[#4A5568] space-y-1">
                  <div className="flex items-center space-x-1.5 font-semibold text-[#0A192F]">
                    <Layers size={13} className="text-[#0077B6]" />
                    <span>Ý niệm kiến trúc:</span>
                  </div>
                  <p className="text-[11px] leading-relaxed">
                    {currentConcept.architecturalForm}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2 rounded-lg bg-cyan-50/50 border border-cyan-100">
                    <span className="font-semibold text-[#0077B6] block">Hồn cốt di sản:</span>
                    <span className="text-[#4A5568] line-clamp-2">{currentConcept.heritageEcho}</span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-200">
                    <span className="font-semibold text-[#0A192F] block">Cho con người:</span>
                    <span className="text-[#4A5568] line-clamp-2">{currentConcept.communityExperience}</span>
                  </div>
                </div>
              </div>

              {/* 3D Blueprint / Render Showcase Slot */}
              <div className="lg:col-span-6">
                <div
                  onClick={() => onOpenMediaSlot(currentSlot)}
                  className="group cursor-pointer relative aspect-16/10 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 via-[#0A192F] to-[#0077B6] p-4 text-white flex flex-col justify-between border border-slate-700 shadow-md transition-all duration-300 hover:scale-[1.01]"
                  title="Nhấp để chèn hình ảnh ý niệm không gian"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full font-mono text-cyan-200">
                      Ý niệm không gian · 16:9
                    </span>
                    <Maximize2 size={13} className="text-white opacity-80 group-hover:opacity-100" />
                  </div>

                  <div className="text-center my-auto py-2">
                    <div className="w-11 h-11 mx-auto rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-cyan-300 mb-1.5 group-hover:scale-110 transition-transform">
                      <Palette size={20} />
                    </div>
                    <h4 className="font-serif font-bold text-xs sm:text-sm text-white">
                      {currentSlot.title}
                    </h4>
                    <p className="text-[10px] text-cyan-100/70 mt-0.5">
                      [Nhấp để xem thông số và chèn ảnh render không gian]
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/15 text-[10px] text-white/80">
                    <span>Không gian mở đón bình minh</span>
                    <span className="text-cyan-300 font-semibold group-hover:underline flex items-center">
                      <Eye size={11} className="mr-1" />
                      Chèn hình ảnh →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};
