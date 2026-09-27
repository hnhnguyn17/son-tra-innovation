import { useState, useEffect } from 'react';
import { MapPin, Navigation, Clock, Compass, Sparkles, Footprints, Calendar } from 'lucide-react';
import { NEIGHBORHOOD_POIS, ITINERARY_1DAY } from '../data/siteData';
import { ParkSketchGallery } from './ParkSketchGallery';

export const SiteAndNeighborhood = () => {
  const [selectedPoiId, setSelectedPoiId] = useState<string>('poi-au-thuyen');
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [activeGuideTab, setActiveGuideTab] = useState<'pois' | 'itinerary'>('pois');

  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#lich-trinh') {
        setActiveGuideTab('itinerary');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const selectedPoi = NEIGHBORHOOD_POIS.find((p) => p.id === selectedPoiId) || NEIGHBORHOOD_POIS[0];

  const categories = [
    { id: 'all', label: 'Tất cả điểm đến' },
    { id: 'Kinh tế biển', label: 'Cảng cá & Âu thuyền' },
    { id: 'Tâm linh & Di sản', label: 'Di sản & Làng chài' },
    { id: 'Cảnh quan & Du lịch', label: 'Cảnh quan vịnh biển' },
    { id: 'Ẩm thực bản địa', label: 'Ẩm thực hải sản' },
  ];

  const filteredPois =
    activeFilter === 'all'
      ? NEIGHBORHOOD_POIS
      : NEIGHBORHOOD_POIS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="cong-vien-xanh"
      aria-label="Cẩm nang tham quan Vũng Thùng và Điểm hẹn công viên 2.000m²"
      className="w-full py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-white border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3 mb-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 text-[11px] sm:text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-1">
              <MapPin size={13} className="text-[#0077B6]" />
              <span>Cẩm nang khám phá · Cửa ngõ bán đảo Sơn Trà</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-serif text-[#0A192F] tracking-tight">
              Điểm hẹn Vũng Thùng: Cửa ngõ bến cảng & vịnh biển
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#4A5568]">
              Không gian công viên sinh thái 2.000m² mở ra 3 hướng gió biển, điểm dừng chân lý tưởng kết nối Âu thuyền Thọ Quang, Lăng Ông cổ kính và hoàng hôn sông Hàn.
            </p>
          </div>

          <div className="px-3.5 py-1.5 rounded-xl bg-sky-50 border border-sky-200/80 text-xs font-semibold text-[#0077B6] flex items-center space-x-1.5 shrink-0">
            <Navigation size={13} />
            <span>Giao lộ Ngô Thì Trí × Lý Nhật Quang × Vũng Thùng 4</span>
          </div>
        </div>

        {/* Top Split: Walkable Spatial Connection Diagram vs Visitor Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mb-6">
          {/* Spatial Diagram */}
          <div className="lg:col-span-6 bg-slate-900 rounded-2xl p-4 sm:p-5 text-white flex flex-col justify-between border border-slate-800 shadow-sm relative overflow-hidden">
            <div className="flex items-center justify-between text-xs mb-2 z-10">
              <span className="font-mono text-cyan-400 font-bold flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                <span>SƠ ĐỒ 3 HƯỚNG DẠO BỘ & ĐÓN GIÓ (2.000 m²)</span>
              </span>
              <span className="text-[11px] text-cyan-200 bg-cyan-950/80 px-2 py-0.5 rounded-md border border-cyan-800/60">
                3 Mặt thoáng mở
              </span>
            </div>

            {/* SVG Spatial Connection Diagram */}
            <div className="relative aspect-16/10 w-full flex items-center justify-center my-auto">
              <svg viewBox="0 0 500 320" className="w-full h-full select-none" fill="none">
                {/* Road: Đường Ngô Thì Trí (Top-right) */}
                <path d="M280 15 L480 230" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 4" />
                <path d="M310 5 L495 200" stroke="#38bdf8" strokeWidth="2" />
                <text x="375" y="110" fill="#bae6fd" fontSize="11" transform="rotate(46 375 110)" fontFamily="sans-serif" fontWeight="600">
                  Lối ngắm hoàng hôn sông Hàn (Ngô Thì Trí)
                </text>

                {/* Road: Đường Vũng Thùng 4 (Bottom-right) */}
                <path d="M480 230 L360 310" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 4" />
                <path d="M495 245 L380 320" stroke="#38bdf8" strokeWidth="2" />
                <text x="405" y="278" fill="#bae6fd" fontSize="11" transform="rotate(-34 405 278)" fontFamily="sans-serif" fontWeight="600">
                  Lối ra bến tàu Thọ Quang (Vũng Thùng 4)
                </text>

                {/* Road: Đường Lý Nhật Quang (Bottom-left) */}
                <path d="M360 310 L70 120" stroke="#0284c7" strokeWidth="2.5" strokeDasharray="4 4" />
                <path d="M350 330 L50 135" stroke="#38bdf8" strokeWidth="2" />
                <text x="195" y="235" fill="#bae6fd" fontSize="11" transform="rotate(33 195 235)" fontFamily="sans-serif" fontWeight="600">
                  Trục dạo bộ phố hải sản (Lý Nhật Quang)
                </text>

                {/* Rear Boundary: Khu dân cư làng chài */}
                <path d="M70 120 L300 45" stroke="#64748b" strokeWidth="1.8" strokeDasharray="3 3" />
                <text x="180" y="70" fill="#94a3b8" fontSize="10" transform="rotate(-18 180 70)" fontFamily="sans-serif">
                  Khu dân cư làng chài Vũng Thùng bình yên
                </text>

                {/* The 2,000m² Land Parcel Polygon */}
                <polygon
                  points="300,45 385,140 340,265 110,135"
                  fill="rgba(2, 132, 199, 0.25)"
                  stroke="#38bdf8"
                  strokeWidth="2.5"
                />

                {/* Center Badge: Công viên 2.000m² */}
                <rect x="220" y="130" width="115" height="42" rx="8" fill="#0284c7" stroke="#7dd3fc" strokeWidth="1.5" />
                <text x="277" y="148" fill="#ffffff" fontSize="12" fontWeight="bold" textAnchor="middle" fontFamily="sans-serif">
                  CÔNG VIÊN 2.000 m²
                </text>
                <text x="277" y="163" fill="#e0f2fe" fontSize="9" textAnchor="middle" fontFamily="sans-serif">
                  Điểm Dừng Chân Sinh Thái
                </text>

                {/* Corner Markers */}
                <circle cx="300" cy="45" r="4" fill="#38bdf8" />
                <circle cx="385" cy="140" r="4" fill="#38bdf8" />
                <circle cx="340" cy="265" r="4" fill="#38bdf8" />
                <circle cx="110" cy="135" r="4" fill="#38bdf8" />
              </svg>
            </div>

            {/* Bottom Note */}
            <div className="text-[11px] text-slate-300 bg-slate-800/80 p-2.5 rounded-xl border border-slate-700/60 flex items-center justify-between">
              <span>Trạm dừng chân rợp bóng cây xanh & gió vịnh</span>
              <span className="text-cyan-300 font-semibold">Tự do trải nghiệm & Dạo bộ</span>
            </div>
          </div>

          {/* Right Column: Experience Value & Highlights */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-3">
            <div className="grid grid-cols-3 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-[#0077B6] block uppercase truncate">
                  Lối ngắm hoàng hôn
                </span>
                <span className="text-base sm:text-lg font-bold font-serif text-[#0A192F] block mt-0.5">
                  Đường Ngô Thì Trí
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  Đón gió sông Hàn & Thuận Phước
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-[#0077B6] block uppercase truncate">
                  Lối ra bến cảng
                </span>
                <span className="text-base sm:text-lg font-bold font-serif text-[#0A192F] block mt-0.5">
                  Đường Vũng Thùng 4
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  2 phút đi bộ tới mặt nước bến tàu
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-[#0077B6] block uppercase truncate">
                  Trục dạo làng cá
                </span>
                <span className="text-base sm:text-lg font-bold font-serif text-[#0A192F] block mt-0.5">
                  Đường Lý Nhật Quang
                </span>
                <span className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  Kết nối dãy phố hải sản tươi sống
                </span>
              </div>
            </div>

            {/* Strategic Role Card */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-sky-50 to-slate-50 border border-sky-100 space-y-2">
              <div className="flex items-center space-x-1.5 text-xs font-bold text-[#0077B6]">
                <Sparkles size={14} />
                <span>Trải nghiệm gì tại công viên sinh thái tương lai này?</span>
              </div>
              <p className="text-xs text-[#4A5568] leading-relaxed">
                Nằm giữa bến cảng tàu cá nhộn nhịp và cửa sông Hàn lộng gió, công viên 2.000m² mở ra không gian thư giãn tuyệt vời: bạn có thể thưởng thức ly cà phê sớm ngắm thuyền về bến, dạo bước hít hà vị biển mặn mòi, hay ngồi ghế đá bóng mát chờ đón ánh hoàng hôn rực rỡ buông xuống chân cầu Thuận Phước.
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 text-[11px]">
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-semibold text-[#0A192F] block">🌅 Bình minh & Phiên chợ:</span>
                  <span className="text-slate-600">Đón nắng sớm bến cảng, khám phá hải sản tươi rói từ âu thuyền.</span>
                </div>
                <div className="p-2 rounded-lg bg-white border border-slate-200">
                  <span className="font-semibold text-[#0A192F] block">🌇 Chiều tà & Phố ẩm thực:</span>
                  <span className="text-slate-600">Ngắm hoàng hôn sông Hàn, thưởng thức hải sản nướng tại chỗ.</span>
                </div>
              </div>
            </div>

            {/* Walking Connection Strip */}
            <div className="p-3 rounded-xl bg-slate-100/90 border border-slate-200 flex items-center justify-between text-xs text-[#0A192F]">
              <div className="flex items-center space-x-2">
                <Footprints size={15} className="text-[#0077B6] shrink-0" />
                <span className="font-medium text-[11px]">
                  <strong>Cung đường dạo bộ liền mạch:</strong> Cảng Thọ Quang ➔ Lăng Ông ➔ Công viên 2.000m² ➔ Cửa sông Hàn.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* User's Architectural Sketch Views Gallery */}
        <ParkSketchGallery />

        {/* Bottom Section: Interactive Neighborhood Explorer (Quảng bá khu vực xung quanh) */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
            <div>
              <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F] flex items-center space-x-2">
                <Compass size={18} className="text-[#0077B6]" />
                <span>Cẩm nang trải nghiệm Vũng Thùng — Thọ Quang</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Khám phá ẩm thực, văn hóa làng chài, cảnh quan và lịch trình dạo quanh công viên
              </p>
            </div>

            {/* Main Guide Mode Selector */}
            <div className="flex items-center p-1 rounded-xl bg-slate-100 border border-slate-200 text-xs shrink-0">
              <button
                type="button"
                onClick={() => setActiveGuideTab('pois')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  activeGuideTab === 'pois'
                    ? 'bg-[#0077B6] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                <Compass size={13} />
                <span>Điểm đến quanh đây (Bán kính 1km)</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveGuideTab('itinerary')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  activeGuideTab === 'itinerary'
                    ? 'bg-[#0077B6] text-white shadow-xs'
                    : 'text-[#4A5568] hover:text-[#0A192F]'
                }`}
              >
                <Calendar size={13} />
                <span>Gợi ý lịch trình 1 ngày</span>
              </button>
            </div>
          </div>

          {activeGuideTab === 'pois' ? (
            <div>
              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-1.5 text-xs mb-3">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setActiveFilter(c.id)}
                    className={`px-3 py-1 rounded-lg font-medium transition-all ${
                      activeFilter === c.id
                        ? 'bg-[#0077B6] text-white shadow-xs'
                        : 'bg-slate-100 hover:bg-slate-200 text-[#4A5568]'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* POI Cards Grid + Selected Detail */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                {/* POI Cards List (Left Column) */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {filteredPois.map((poi) => {
                    const isSelected = selectedPoiId === poi.id;
                    return (
                      <button
                        key={poi.id}
                        type="button"
                        onClick={() => setSelectedPoiId(poi.id)}
                        className={`p-3 rounded-xl border text-left transition-all relative overflow-hidden ${
                          isSelected
                            ? 'bg-sky-50/90 border-[#0077B6] ring-2 ring-[#0077B6]/20 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50 text-[#4A5568]'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span
                            className="text-[9px] font-bold px-2 py-0.5 rounded-full text-white"
                            style={{ backgroundColor: poi.accentColor }}
                          >
                            {poi.category}
                          </span>
                          <span className="text-[10px] font-semibold text-[#0077B6] flex items-center space-x-1">
                            <Clock size={10} />
                            <span>{poi.distance}</span>
                          </span>
                        </div>

                        <h4 className="font-serif font-bold text-xs text-[#0A192F] line-clamp-1 mt-1">
                          {poi.title}
                        </h4>
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                          {poi.highlight}
                        </p>
                      </button>
                    );
                  })}
                </div>

                {/* Selected POI Detailed Spotlight Box (Right Column) */}
                <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/90 flex flex-col justify-between">
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span
                        className="font-bold text-xs px-2.5 py-1 rounded-full text-white shadow-2xs"
                        style={{ backgroundColor: selectedPoi.accentColor }}
                      >
                        {selectedPoi.category}
                      </span>
                      <span className="font-mono text-xs font-semibold text-[#0077B6] bg-white px-2.5 py-1 rounded-full border border-slate-200">
                        {selectedPoi.distance} ({selectedPoi.walkingTime})
                      </span>
                    </div>

                    <h4 className="text-base sm:text-lg font-serif font-bold text-[#0A192F]">
                      {selectedPoi.title}
                    </h4>

                    <div className="p-2.5 rounded-xl bg-white border border-slate-200/80 text-[11px] font-semibold text-[#0077B6]">
                      {selectedPoi.highlight}
                    </div>

                    <p className="text-xs text-[#4A5568] leading-relaxed">
                      {selectedPoi.description}
                    </p>
                  </div>

                  {/* Action Banner */}
                  <div className="mt-4 pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                    <span className="font-semibold text-[11px] text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-lg">
                      Trải nghiệm: {selectedPoi.experienceTag}
                    </span>
                    <span className="text-[10px] text-slate-400">Từ công viên Vũng Thùng</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Interactive 1-Day Itinerary Explorer */
            <div id="lich-trinh" className="p-4 sm:p-6 rounded-2xl bg-gradient-to-br from-slate-50 to-sky-50/50 border border-slate-200 scroll-mt-28">
              <div className="mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0077B6] block">
                  Hành trình gợi ý dành cho bạn
                </span>
                <h4 className="text-base sm:text-lg font-serif font-bold text-[#0A192F] mt-0.5">
                  Một ngày trọn vẹn khám phá Vũng Thùng — Sơn Trà
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Tận hưởng nhịp sống bình minh bến cá, tách cà phê công viên gió biển và ánh hoàng hôn tráng lệ bên sông Hàn.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {ITINERARY_1DAY.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md hover:border-[#0077B6] transition-all flex flex-col justify-between relative group"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-1.5">
                        <span className="font-mono font-bold text-[#0077B6] bg-sky-50 px-2 py-0.5 rounded-md border border-sky-100">
                          {step.time}
                        </span>
                        <span className="text-[10px] font-bold text-slate-400">
                          0{idx + 1}
                        </span>
                      </div>
                      <h5 className="font-serif font-bold text-xs sm:text-sm text-[#0A192F] mb-1 group-hover:text-[#0077B6] transition-colors">
                        {step.title}
                      </h5>
                      <p className="text-[11px] text-slate-600 leading-relaxed mb-2">
                        {step.activity}
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span className="truncate">{step.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
