import { CinematicPrelude } from './background/CinematicPrelude';
import { useState } from 'react';
import { Shield, ExternalLink, Layers, Camera } from 'lucide-react';
import { BREAKWATER_INSIGHTS } from '../data/contentData';
import type { MediaSlotInfo } from './MediaModal';

interface EmbracingBreakwaterProps {
  onOpenMediaSlot: (slot: MediaSlotInfo) => void;
}

export const EmbracingBreakwater = ({ onOpenMediaSlot }: EmbracingBreakwaterProps) => {
  const [activeZone, setActiveZone] = useState<'breakwater' | 'harbour' | 'promenade'>('breakwater');

  const harbourMediaSlot: MediaSlotInfo = {
    title: 'Âu Thuyền Thọ Quang: Bến Đậu Tránh Bão',
    type: 'image',
    aspectRatio: '16:9 hoặc 21:9 Panorama',
    recommendedSize: '3840x2160 (Ultra-wide)',
    targetFile: 'src/assets/tho-quang-harbour-aerial.jpg',
    description:
      'Góc nhìn flycam toàn cảnh âu thuyền Thọ Quang: hàng nghìn con tàu neo đậu san sát nhau trong lòng đê đá vững chãi khi biển động.',
  };

  const zoneDetails = {
    breakwater: {
      title: 'Đê đá chắn sóng Thọ Quang',
      detail:
        'Cánh tay đá vươn dài ra vịnh, đón đầu ngọn sóng dữ ngoài khơi để trả lại sự bình yên cho hàng ngàn mái thuyền của bà con ngư dân.',
      color: '#0A192F',
    },
    harbour: {
      title: 'Lòng âu thuyền êm đềm (~58 ha)',
      detail:
        'Mặt nước phẳng lặng như tấm gương lớn, nơi tàu bè từ khắp miền Trung tề tựu neo đậu an toàn qua bao mùa bão gió.',
      color: '#0077B6',
    },
    promenade: {
      title: 'Lối dạo chở che ven vịnh',
      detail:
        'Lấy cảm hứng từ dáng hình đê kè ôm trọn mặt nước, tạo nên không gian tản bộ an yên ngắm hoàng hôn buông trên mặt vịnh.',
      color: '#0284C7',
    },
  };

  return (
    <section
      id="au-thuyen"
      aria-labelledby="heading-au-thuyen"
      className="cinematic-chapter w-full md:snap-start md:snap-always"
    >
      <CinematicPrelude chapter="harbor" targetId="au-thuyen-noi-dung" />
      <div id="au-thuyen-noi-dung" className="chapter-content">
      <div className="max-w-5xl mx-auto w-full my-auto">
        {/* Section Header & Metrics in Balanced Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-end mb-2.5 border-b border-cyan-100/70 pb-2">
          <div className="lg:col-span-7">
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-0.5">
              <Shield size={13} className="text-[#0077B6]" />
              <span>Bến neo đậu & Kinh tế biển · Cảng cá Thọ Quang</span>
            </div>
            <h2
              id="heading-au-thuyen"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Âu thuyền Thọ Quang: Bến đỗ chở che ngàn con tàu
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-tight">
              Trung tâm hậu cần nghề cá lớn nhất miền Trung, nơi hàng ngàn con tàu tìm về neo đậu an yên trước mỗi mùa bão gió.
            </p>
          </div>

          {/* 3 Compact Fact Cards */}
          <div className="lg:col-span-5 grid grid-cols-3 gap-2">
            {BREAKWATER_INSIGHTS.map((item, index) => (
              <div
                key={index}
                className="p-2 sm:p-2.5 rounded-xl bg-white/90 backdrop-blur-sm border border-white/90 shadow-2xs text-center hover:border-cyan-300 transition-all"
              >
                <div className="text-base sm:text-lg font-serif font-bold text-[#0077B6] leading-none">
                  {item.metric}
                </div>
                <div className="text-xs text-slate-600 font-semibold truncate mt-1">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Diagram Container */}
        <div className="p-3.5 sm:p-4 rounded-2xl bg-white/90 backdrop-blur-md border border-white/90 shadow-xs">
          <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-200/80 text-xs">
            <span className="font-serif font-bold text-[#0A192F] text-xs sm:text-sm">
              Dáng hình che chở: Cánh cung đê đá & Lối dạo ven vịnh
            </span>

            <button
              type="button"
              onClick={() => onOpenMediaSlot(harbourMediaSlot)}
              className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-[#0077B6] hover:bg-cyan-50 shadow-2xs cursor-pointer transition-colors"
            >
              <Camera size={13} />
              <span>Tư liệu ảnh 16:9</span>
            </button>
          </div>

          {/* SVG Diagram and Interactive Selector */}
          <div className="mt-3 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
            {/* Interactive SVG Visual */}
            <div className="lg:col-span-7 bg-white p-2.5 rounded-xl border border-slate-200 flex flex-col items-center justify-center">
              <svg
                viewBox="0 0 540 250"
                className="w-full h-auto max-w-[400px]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <pattern id="grid-bw-3" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#E2E8F0" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="540" height="260" fill="url(#grid-bw-3)" rx="8" />

                {/* Outer rough waves */}
                <path d="M20 40 Q60 20 100 40 T180 40 T260 40 T340 40" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
                <text x="30" y="25" fill="#64748B" fontSize="11">Sóng dữ Biển Đông</text>

                {/* Calm Basin */}
                <ellipse
                  cx="270"
                  cy="160"
                  rx="150"
                  ry="70"
                  fill="#E0F2FE"
                  fillOpacity={activeZone === 'harbour' ? '0.9' : '0.4'}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setActiveZone('harbour')}
                />
                <text
                  x="270"
                  y="165"
                  fill="#0077B6"
                  fontSize="12"
                  fontWeight="bold"
                  textAnchor="middle"
                  className="cursor-pointer select-none"
                  onClick={() => setActiveZone('harbour')}
                >
                  Vùng nước phẳng lặng (Âu Thọ Quang 58 ha)
                </text>

                {/* Breakwater Solid Curve */}
                <path
                  d="M90 230 C100 110 200 70 330 75 C430 80 470 140 480 220"
                  stroke={activeZone === 'breakwater' ? '#0077B6' : '#0A192F'}
                  strokeWidth={activeZone === 'breakwater' ? '6' : '4.5'}
                  strokeLinecap="round"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setActiveZone('breakwater')}
                />

                {/* Proposed Promenade Dashed Curve */}
                <path
                  d="M110 230 C120 120 210 90 325 95 C415 100 450 150 460 220"
                  stroke={activeZone === 'promenade' ? '#0077B6' : '#38BDF8'}
                  strokeWidth={activeZone === 'promenade' ? '4' : '2'}
                  strokeDasharray="5 4"
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setActiveZone('promenade')}
                />
              </svg>

              {/* Toggles */}
              <div className="mt-3 flex flex-wrap justify-center gap-2 text-xs">
                {(['breakwater', 'harbour', 'promenade'] as const).map((zone) => (
                  <button
                    key={zone}
                    type="button"
                    onClick={() => setActiveZone(zone)}
                    className={`px-3 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                      activeZone === zone
                        ? 'bg-[#0077B6] text-white shadow-xs'
                        : 'bg-slate-100 text-[#4A5568] hover:bg-slate-200'
                    }`}
                  >
                    {zone === 'breakwater'
                      ? '1. Cánh đê chắn bão'
                      : zone === 'harbour'
                      ? '2. Lòng âu nước lặng'
                      : '3. Lối dạo chở che'}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Zone Detail */}
            <div className="lg:col-span-5 space-y-2.5 text-xs">
              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-2xs animate-fade-rise">
                <div className="flex items-center space-x-1.5 text-[#0077B6] font-semibold text-xs uppercase tracking-wider mb-1">
                  <Layers size={13} />
                  <span>Ký ức địa danh:</span>
                </div>
                <h4 className="text-sm sm:text-base font-serif font-bold text-[#0A192F]">
                  {zoneDetails[activeZone].title}
                </h4>
                <p className="mt-1 text-xs sm:text-sm text-[#4A5568] leading-relaxed">
                  {zoneDetails[activeZone].detail}
                </p>
              </div>

              <div className="p-2.5 rounded-lg bg-cyan-50/70 border border-cyan-100 text-xs text-[#4A5568] flex items-center justify-between">
                <span>Tư liệu: Báo Đà Nẵng</span>
                <a
                  href="https://baodanang.vn/ngam-toan-canh-au-thuyen-tho-quang-noi-dang-duoc-xay-dung-thanh-1-trong-5-trung-tam-nghe-ca-lon-cua-ca-nuoc-3287472.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-[#0077B6] hover:underline inline-flex items-center"
                >
                  <span>Xem tư liệu</span>
                  <ExternalLink size={12} className="ml-1" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
