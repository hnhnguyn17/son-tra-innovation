import { useState, useMemo, useEffect } from 'react';
import {
  Database,
  Search,
  Volume2,
  VolumeX,
  Sparkles,
  Quote
} from 'lucide-react';
import { NEIGHBORHOOD_POIS, type NeighborhoodPOI } from '../data/siteData';

export const DigitalKnowledgeHub = () => {
  const [selectedPoiId, setSelectedPoiId] = useState<string>('poi-au-thuyen');
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const categories = [
    { id: 'all', label: 'Tất cả địa danh' },
    { id: 'Kinh tế biển', label: 'Kinh tế biển & Cảng tàu' },
    { id: 'Tâm linh & Di sản', label: 'Tín ngưỡng & Làng cổ' },
    { id: 'Cảnh quan & Du lịch', label: 'Cảnh quan & Vịnh biển' },
    { id: 'Ẩm thực bản địa', label: 'Ẩm thực làng cá' },
    { id: 'Lịch sử & Ký ức', label: 'Lịch sử phòng tuyến 1858' },
    { id: 'Đổi mới sáng tạo', label: 'Đổi mới & Đô thị số' },
  ];

  const filteredPois = useMemo(() => {
    return NEIGHBORHOOD_POIS.filter((poi) => {
      const matchCategory = activeCategory === 'all' || poi.category === activeCategory;
      const matchSearch =
        searchQuery.trim() === '' ||
        poi.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poi.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        poi.highlight.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (poi.quote && poi.quote.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [activeCategory, searchQuery]);

  const selectedPoi =
    NEIGHBORHOOD_POIS.find((p) => p.id === selectedPoiId) || filteredPois[0] || NEIGHBORHOOD_POIS[0];

  const handleSelectPoi = (poi: NeighborhoodPOI) => {
    setSelectedPoiId(poi.id);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  const toggleAudio = () => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsPlayingAudio(!isPlayingAudio);
      return;
    }

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const textToRead = `${selectedPoi.title}. ${selectedPoi.experienceTag}. ${selectedPoi.quote ? `Lời truyền đời: ${selectedPoi.quote}.` : ''} ${selectedPoi.description}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.92;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  return (
    <section
      id="tri-thuc-so"
      aria-labelledby="heading-tri-thuc-so"
      className="w-full min-h-[100dvh] flex flex-col justify-center pt-14 sm:pt-16 pb-2.5 sm:pb-3.5 px-4 sm:px-6 lg:px-8 bg-slate-50/40 backdrop-blur-xs border-t border-cyan-100/60 md:snap-start md:snap-always"
    >
      <div className="max-w-6xl mx-auto w-full my-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 mb-2 border-b border-cyan-100/70 pb-1.5">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-0.5">
              <Database size={13} className="text-[#0077B6]" />
              <span>Kho tàng tri thức số · Địa danh Sơn Trà</span>
            </div>
            <h2
              id="heading-tri-thuc-so"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Cầu nối tri thức số: Từng tấc đất, ngọn sóng Sơn Trà
            </h2>
            <p className="text-xs sm:text-sm text-[#4A5568] leading-tight line-clamp-1">
              Số hóa tư liệu lịch sử, di tích tâm linh, kinh tế biển và nhịp sống bản địa Vũng Thùng — Thọ Quang.
            </p>
          </div>

          {/* Quick Counter Badge */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/80 backdrop-blur-md border border-cyan-200/60 shrink-0">
            <div className="px-2.5 py-0.5 rounded-lg bg-sky-50/70 shadow-2xs text-center border border-cyan-100/80">
              <span className="text-sm sm:text-base font-bold font-serif text-[#0077B6] block leading-none">
                {NEIGHBORHOOD_POIS.length}
              </span>
              <span className="text-xs text-slate-600 font-semibold uppercase">Địa danh</span>
            </div>
            <div className="px-2.5 py-0.5 rounded-lg bg-sky-50/70 shadow-2xs text-center border border-cyan-100/80">
              <span className="text-sm sm:text-base font-bold font-serif text-[#0A192F] block leading-none">
                300+
              </span>
              <span className="text-xs text-slate-600 font-semibold uppercase">Năm ký ức</span>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 mb-2.5 bg-white/80 backdrop-blur-md p-1.5 rounded-xl border border-cyan-200/60 shadow-2xs">
          {/* Category Chips */}
          <div className="flex items-center gap-1 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none" role="tablist">
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 shrink-0 ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white shadow-xs font-semibold'
                    : 'bg-white text-slate-600 hover:bg-sky-50 hover:text-[#0077B6] border border-slate-200/90'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[170px] sm:w-52">
            <Search size={13} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm địa danh, di sản..."
              className="w-full pl-7 pr-7 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-[#0077B6] focus:bg-white"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Knowledge Explorer Split View: All 7 POIs visible on screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-stretch">
          {/* Left Column: All 7 POIs as compact interactive cards (5 cols) */}
          <div className="lg:col-span-5 flex flex-col space-y-1 justify-between">
            {filteredPois.length === 0 ? (
              <div className="p-5 text-center bg-white/95 backdrop-blur-md rounded-2xl border border-dashed border-cyan-300 shadow-sm flex flex-col items-center justify-center space-y-2 my-auto">
                <Search size={22} className="text-[#0077B6]/60" />
                <p className="text-xs sm:text-sm font-semibold text-slate-800">
                  Chưa tìm thấy địa danh phù hợp với "{searchQuery}"
                </p>
                <p className="text-xs text-slate-500">
                  Thử tìm kiếm với từ khóa khác như "cảng", "lăng", "đê" hoặc xóa bộ lọc.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setActiveCategory('all');
                  }}
                  className="mt-1 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[#0077B6] text-white hover:bg-[#0284C7] shadow-xs active:scale-95 transition-all"
                >
                  Xem lại tất cả 7 địa danh
                </button>
              </div>
            ) : (
              filteredPois.map((poi, idx) => {
                const isSelected = selectedPoi.id === poi.id;
                return (
                  <button
                    key={poi.id}
                    type="button"
                    onClick={() => handleSelectPoi(poi)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                      isSelected
                        ? 'bg-cyan-50/95 border-[#0077B6] shadow-xs ring-1 ring-[#0077B6]/40'
                        : 'bg-white/85 backdrop-blur-sm border-white/90 hover:border-sky-300 hover:bg-white shadow-2xs'
                    }`}
                  >
                    <div className="flex items-center space-x-2 min-w-0 pr-1.5">
                      <span
                        className={`w-5 h-5 rounded-md text-xs font-mono font-bold flex items-center justify-center shrink-0 ${
                          isSelected
                            ? 'bg-[#0077B6] text-white'
                            : 'bg-sky-50 text-[#0077B6] group-hover:bg-[#0077B6] group-hover:text-white'
                        }`}
                      >
                        0{idx + 1}
                      </span>
                      <div className="min-w-0">
                        <h3 className={`text-xs sm:text-sm font-serif font-bold truncate leading-tight ${isSelected ? 'text-[#0077B6]' : 'text-[#0A192F] group-hover:text-[#0077B6]'}`}>
                          {poi.title}
                        </h3>
                        <span className="text-xs text-slate-500 block truncate">
                          {poi.category} · {poi.distance}
                        </span>
                      </div>
                    </div>

                    <span
                      className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 transition-all ${
                        isSelected
                          ? 'bg-[#0077B6] text-white shadow-2xs'
                          : 'bg-slate-100 text-slate-600 group-hover:bg-sky-100 group-hover:text-[#0077B6]'
                      }`}
                    >
                      {poi.walkingTime}
                    </span>
                  </button>
                );
              })
            )}
          </div>

          {/* Right Column: Detailed Knowledge Showcase (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <div className="bg-slate-900 text-white rounded-xl p-3 sm:p-3.5 border border-slate-800 shadow-md overflow-hidden relative flex flex-col justify-between h-full">
              {/* Background ambient light */}
              <div
                className="absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl opacity-25 pointer-events-none"
                style={{ backgroundColor: selectedPoi.accentColor }}
              />

              {/* Header Badges & Audio Trigger */}
              <div className="relative z-10 flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center space-x-1.5">
                  <span
                    className="px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-wider font-semibold border"
                    style={{
                      backgroundColor: `${selectedPoi.accentColor}25`,
                      borderColor: `${selectedPoi.accentColor}60`,
                      color: '#BAE6FD',
                    }}
                  >
                    Tư liệu số · {selectedPoi.category}
                  </span>
                  {selectedPoi.coordinates && (
                    <span className="text-xs font-mono text-cyan-300/90 bg-black/40 px-2 py-0.5 rounded border border-white/10">
                      📍 {selectedPoi.coordinates}
                    </span>
                  )}
                </div>

                {/* Audio Reading Simulation Trigger Button */}
                <button
                  type="button"
                  onClick={toggleAudio}
                  className={`px-2.5 py-1 rounded-md text-xs font-medium flex items-center space-x-1.5 transition-all duration-200 ${
                    isPlayingAudio
                      ? 'bg-emerald-500 text-white shadow-2xs font-semibold'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'
                  }`}
                  aria-pressed={isPlayingAudio}
                >
                  {isPlayingAudio ? (
                    <>
                      <Volume2 size={13} className="animate-pulse" />
                      <span>Đang phát giọng đọc...</span>
                    </>
                  ) : (
                    <>
                      <VolumeX size={13} />
                      <span>Nghe thuyết minh</span>
                    </>
                  )}
                </button>
              </div>

              {/* Title & Experience Tag */}
              <div className="relative z-10 mb-1.5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base sm:text-lg font-bold font-serif text-white tracking-tight leading-snug">
                    {selectedPoi.title}
                  </h3>
                  <div className="flex items-center space-x-1 text-xs text-cyan-200/90 font-mono shrink-0">
                    <span>{selectedPoi.distance}</span>
                    <span>·</span>
                    <span className="text-cyan-300 font-bold">{selectedPoi.walkingTime}</span>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-cyan-200 font-medium flex items-center gap-1.5 mt-0.5">
                  <Sparkles size={12} className="text-cyan-400 shrink-0" />
                  <span>{selectedPoi.experienceTag}</span>
                </p>
              </div>

              {/* Quote from local life */}
              {selectedPoi.quote && (
                <div className="relative z-10 my-1 p-2 px-3 rounded-lg bg-white/5 border border-white/10 text-xs sm:text-sm text-sky-100/90 italic flex items-start gap-2">
                  <Quote size={13} className="text-cyan-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-2">{selectedPoi.quote}</span>
                </div>
              )}

              {/* Main Detailed Description */}
              <div className="relative z-10 my-1 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <p className="line-clamp-3">{selectedPoi.description}</p>
                {selectedPoi.historicalFact && (
                  <div className="p-2 px-2.5 rounded-lg bg-cyan-950/40 border border-cyan-800/40 mt-1.5">
                    <span className="font-semibold text-cyan-300 block text-xs mb-0.5">
                      Mốc tri thức lịch sử:
                    </span>
                    <p className="text-xs sm:text-sm text-cyan-100/90 leading-relaxed line-clamp-2">
                      {selectedPoi.historicalFact}
                    </p>
                  </div>
                )}
              </div>

              {/* Audio status banner if active */}
              {isPlayingAudio && (
                <div className="relative z-10 mt-1.5 p-2 rounded-lg bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-200 flex items-center justify-between">
                  <span>🔊 Đang phát thuyết minh tiếng Việt: <strong>{selectedPoi.title}</strong>...</span>
                  <button
                    type="button"
                    onClick={() => {
                      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                      }
                      setIsPlayingAudio(false);
                    }}
                    className="font-bold underline ml-2 text-white hover:text-emerald-100"
                  >
                    Dừng
                  </button>
                </div>
              )}

              {/* Footer Links */}
              <div className="relative z-10 pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-slate-400">
                  Tọa độ số hóa di sản Sơn Trà
                </span>
                <a
                  href="#khong-gian-trai-nghiem"
                  className="text-cyan-300 hover:text-cyan-200 font-semibold underline underline-offset-2 flex items-center gap-1"
                >
                  <span>Trải nghiệm thực địa</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
