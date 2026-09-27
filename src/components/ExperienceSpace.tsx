import { useState } from 'react';
import {
  Camera,
  Coffee,
  Sunset,
  Music,
  Calendar,
  MapPin,
  Maximize2,
  ChevronRight,
  Sparkles,
  X,
  Share2,
  Check,
  Navigation
} from 'lucide-react';
import { ITINERARY_1DAY } from '../data/siteData';

interface ExperiencePhoto {
  id: string;
  src: string;
  title: string;
  tag: string;
  timeContext: string;
  description: string;
}

export const ExperienceSpace = () => {
  const [activePhotoModal, setActivePhotoModal] = useState<ExperiencePhoto | null>(null);
  const [selectedItineraryIdx, setSelectedItineraryIdx] = useState<number>(0);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleShareLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#khong-gian-trai-nghiem`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const photos: ExperiencePhoto[] = [
    {
      id: 'amphitheater-day',
      src: '/assets/park-renders/render-amphitheater-day.jpg',
      title: 'Khán đài bậc thang ven hồ nước & Không gian sinh hoạt cộng đồng',
      tag: 'Trải nghiệm ban ngày',
      timeContext: '07:00 - 16:30',
      description:
        'Góc nhìn bóng mát chan hòa bên hồ nước trong vắt và pavilion kính. Nơi cư dân làng chài và du khách ngồi thưởng trà, nhâm nhi cà phê sáng, lắng nghe tiếng gió vịnh và đàm đạo chuyện biển khơi.',
    },
    {
      id: 'sunset-aerial',
      src: '/assets/park-renders/render-sunset-aerial.jpg',
      title: 'Toàn cảnh hoàng hôn trên bến Thọ Quang & Sông Hàn',
      tag: 'Hoàng hôn & Ráng chiều',
      timeContext: '17:00 - 18:45',
      description:
        'Góc nhìn từ trên cao chiêm ngưỡng ánh ráng chiều buông xuống mặt nước âu thuyền 58 ha, dòng sông Hàn thơ mộng và dải cầu dây võng Thuận Phước lên đèn lung linh nơi cửa vịnh.',
    },
  ];

  const experienceActivities = [
    {
      id: 'coffee-morning',
      icon: Coffee,
      iconColor: 'text-amber-600',
      iconBg: 'bg-amber-50',
      title: 'Cà phê sáng ngắm bến tàu',
      time: '06:30 - 09:00',
      highlight: 'Đón luồng gió mặn mòi & ngắm nhịp sống làng chài',
      description:
        'Thưởng thức ly cà phê sáng đậm đà rợp bóng mát, đón làn gió biển trong lành và ngắm nhìn từng tốp thuyền cá cập bến sau chuyến hải trình đêm.',
    },
    {
      id: 'sunset-walk',
      icon: Sunset,
      iconColor: 'text-rose-600',
      iconBg: 'bg-rose-50',
      title: 'Tản bộ ngắm hoàng hôn sông Hàn',
      time: '16:30 - 18:30',
      highlight: 'Chiêm ngưỡng mặt trời lặn sau cầu Thuận Phước',
      description:
        'Dạo bước trên các cung đường rợp bóng cây xanh, phóng tầm mắt ngắm ánh ráng chiều nhuộm đỏ vịnh Đà Nẵng và cầu dây võng hùng vĩ bắc qua cửa sông.',
    },
    {
      id: 'folk-performance',
      icon: Music,
      iconColor: 'text-[#0077B6]',
      iconBg: 'bg-sky-50',
      title: 'Giao lưu văn nghệ dân gian tại khán đài',
      time: '19:00 - 21:00',
      highlight: 'Hát bả trạo, hò khoan & sinh hoạt văn hóa biển',
      description:
        'Không gian mở ven hồ nước là điểm hẹn biểu diễn các làn điệu dân ca miền biển, những đêm nhạc cộng đồng và nơi các thế hệ sẻ chia ký ức xứ biển.',
    },
  ];

  return (
    <section
      id="khong-gian-trai-nghiem"
      aria-labelledby="heading-khong-gian-trai-nghiem"
      className="w-full min-h-[100dvh] flex flex-col justify-center pt-14 sm:pt-16 pb-2.5 sm:pb-3.5 px-4 sm:px-6 lg:px-8 bg-slate-50/40 backdrop-blur-xs border-t border-cyan-100/60 md:snap-start md:snap-always"
    >
      <div className="max-w-6xl mx-auto w-full my-auto space-y-2.5">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-1.5 border-b border-cyan-100/70 pb-1.5">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-widest text-[#0077B6] mb-1 px-3 py-0.5 rounded-full bg-white/90 backdrop-blur-sm border border-cyan-200/80 shadow-2xs">
              <Sparkles size={12} className="text-[#0077B6]" />
              <span>Không gian trải nghiệm thực tế bên bờ vịnh</span>
            </div>
            <h2
              id="heading-khong-gian-trai-nghiem"
              className="text-xl sm:text-2xl lg:text-3xl font-bold font-serif text-[#0A192F] tracking-tight leading-snug"
            >
              Điểm hẹn thực địa: Lắng nghe gió biển & ngắm nhìn âu thuyền
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4A5568] max-w-md hidden sm:block">
            Không gian mở chan hòa bóng mát và mặt nước phẳng lặng bên bờ vịnh. Nơi kết nối du khách với đời sống thường nhật của làng chài.
          </p>
        </div>

        {/* Middle Split: 3D Photos (col-span-5) vs 3 Activities (col-span-7) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
          {/* 1. PHOTOREALISTIC 3D RENDERS GALLERY (5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1.5 font-bold font-serif text-[#0A192F]">
                <Camera size={14} className="text-[#0077B6]" />
                <span>Không gian thực tế bên bờ vịnh</span>
              </div>
              <span className="text-xs text-slate-500">Nhấp để phóng to</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="group relative rounded-xl overflow-hidden border border-slate-200 shadow-2xs bg-slate-900 cursor-pointer"
                  onClick={() => setActivePhotoModal(photo)}
                >
                  <div className="aspect-16/10 w-full overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  </div>

                  <div className="absolute top-1.5 left-1.5">
                    <span className="px-2 py-0.5 rounded text-xs font-semibold bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      {photo.tag}
                    </span>
                  </div>

                  <div className="absolute bottom-1.5 left-1.5 right-1.5 flex items-center justify-between text-white">
                    <span className="text-xs font-bold font-serif truncate pr-1">
                      {photo.title}
                    </span>
                    <span className="w-6 h-6 rounded-full bg-white/30 backdrop-blur-xs flex items-center justify-center shrink-0">
                      <Maximize2 size={12} />
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 text-xs text-slate-600 flex items-center justify-between">
              <span>Khán đài bậc thang ven hồ nước & toàn cảnh ráng chiều trên sông Hàn.</span>
              <span className="text-[#0077B6] font-semibold text-xs uppercase shrink-0 ml-2">Render 3D</span>
            </div>
          </div>

          {/* 2. REAL-LIFE ACTIVITIES GRID (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-2">
            <div className="flex items-center justify-between text-xs font-bold font-serif text-[#0A192F]">
              <div className="flex items-center space-x-1.5">
                <Sparkles size={14} className="text-[#0077B6]" />
                <span>3 Hoạt động trải nghiệm không thể bỏ lỡ</span>
              </div>
              <span className="text-xs text-emerald-600 font-sans font-semibold">Miễn phí trải nghiệm</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {experienceActivities.map((act) => {
                const IconComp = act.icon;
                return (
                  <div
                    key={act.id}
                    className="p-3 rounded-xl bg-white border border-slate-200/90 shadow-2xs hover:border-sky-300 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <div className={`w-8 h-8 rounded-lg ${act.iconBg} ${act.iconColor} flex items-center justify-center`}>
                          <IconComp size={16} />
                        </div>
                        <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                          {act.time}
                        </span>
                      </div>

                      <h4 className="text-xs sm:text-sm font-bold font-serif text-[#0A192F] mb-1">
                        {act.title}
                      </h4>
                      <p className="text-xs text-[#4A5568] leading-relaxed">
                        {act.description}
                      </p>
                    </div>

                    <div className="mt-2 pt-1.5 border-t border-slate-100 text-xs text-[#0077B6] font-semibold">
                      {act.highlight}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Location & Navigation Link */}
            <div className="p-2.5 rounded-xl bg-sky-50/80 border border-sky-200/80 text-xs text-[#0077B6] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <span className="flex items-center gap-1.5">
                <MapPin size={14} className="shrink-0 text-[#0077B6]" />
                <strong>Vị trí:</strong> Bờ vịnh Vũng Thùng (Giao lộ Ngô Thì Trí × Lý Nhật Quang)
              </span>
              <div className="flex items-center gap-2 shrink-0">
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Au+thuyen+Tho+Quang+Da+Nang"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-cyan-300 text-xs font-semibold text-[#0077B6] hover:bg-[#0077B6] hover:text-white transition-colors shadow-2xs cursor-pointer"
                >
                  <Navigation size={12} />
                  <span>Chỉ đường Maps</span>
                </a>
                <button
                  type="button"
                  onClick={handleShareLink}
                  className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors shadow-2xs cursor-pointer"
                  title="Sao chép liên kết trang"
                >
                  {copiedLink ? <Check size={12} className="text-emerald-600" /> : <Share2 size={12} />}
                  <span>{copiedLink ? 'Đã chép link' : 'Chia sẻ'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. 1-DAY ITINERARY PLANNER HORIZONTAL TIMELINE STRIP */}
        <div id="lich-trinh" className="bg-white rounded-2xl p-3.5 sm:p-4 border border-slate-200 shadow-2xs scroll-mt-20">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center space-x-1.5 text-xs sm:text-sm font-bold font-serif text-[#0A192F]">
              <Calendar size={14} className="text-[#0077B6]" />
              <span>Cẩm nang 1 ngày trải nghiệm trọn vẹn Sơn Trà</span>
            </div>
            <span className="text-xs font-mono font-semibold text-[#0077B6] bg-sky-50 px-2.5 py-0.5 rounded-full">
              5 Chặng khám phá · Nhấp chặng để xem
            </span>
          </div>

          {/* 5-Stop Horizontal Timeline Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-2.5">
            {ITINERARY_1DAY.map((stop, idx) => (
              <button
                key={stop.time}
                type="button"
                onClick={() => setSelectedItineraryIdx(idx)}
                className={`p-2.5 rounded-xl text-left border transition-all cursor-pointer ${
                  selectedItineraryIdx === idx
                    ? 'bg-[#0077B6] text-white border-[#0077B6] shadow-xs'
                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-mono opacity-85">{stop.time}</span>
                  <span className={`font-bold ${selectedItineraryIdx === idx ? 'text-cyan-200' : 'text-slate-400'}`}>0{idx + 1}</span>
                </div>
                <span className="text-xs font-bold font-serif truncate block mt-1">{stop.title}</span>
              </button>
            ))}
          </div>

          {/* Selected Itinerary Active Snapshot */}
          {(() => {
            const currentStop = ITINERARY_1DAY[selectedItineraryIdx];
            return (
              <div className="px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-semibold bg-[#0077B6] text-white shrink-0">
                    Chặng {selectedItineraryIdx + 1}
                  </span>
                  <span className="font-bold text-[#0A192F]">{currentStop.title}</span>
                  <span className="text-slate-400 hidden sm:inline">·</span>
                  <span className="text-slate-600 line-clamp-1">{currentStop.activity}</span>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <MapPin size={12} className="text-[#0077B6]" />
                    {currentStop.location}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedItineraryIdx((prev) => (prev < ITINERARY_1DAY.length - 1 ? prev + 1 : 0))}
                    className="text-xs font-semibold text-[#0077B6] hover:underline flex items-center cursor-pointer"
                  >
                    <span>Tiếp theo</span>
                    <ChevronRight size={13} />
                  </button>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* FULL-SCREEN IMAGE MODAL LIGHTBOX */}
      {activePhotoModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-fade-rise"
          onClick={() => setActivePhotoModal(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-white">
              <div>
                <span className="text-[11px] font-mono text-cyan-300 block uppercase">
                  {activePhotoModal.tag} · {activePhotoModal.timeContext}
                </span>
                <h3 className="text-base sm:text-lg font-bold font-serif">
                  {activePhotoModal.title}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setActivePhotoModal(null)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
                aria-label="Đóng ảnh"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Image */}
            <div className="relative aspect-16/9 w-full bg-black">
              <img
                src={activePhotoModal.src}
                alt={activePhotoModal.title}
                className="w-full h-full object-contain"
              />
            </div>

            {/* Modal Footer Description */}
            <div className="p-4 sm:p-5 text-slate-300 text-xs sm:text-sm bg-slate-900/90 border-t border-slate-800">
              <p>{activePhotoModal.description}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
