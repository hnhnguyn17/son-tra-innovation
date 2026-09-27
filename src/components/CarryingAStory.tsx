import { Heart, ExternalLink, ArrowUp, Anchor, MapPin } from 'lucide-react';
import { CITATION_REGISTRY } from '../data/contentData';
import '../styles/footer.css';

export const CarryingAStory = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };

  const quickNav = [
    { label: 'Vùng đất Vũng Thùng', href: '#vung-thung' },
    { label: 'Kho tàng tri thức số', href: '#tri-thuc-so' },
    { label: 'Chuyện người xứ biển', href: '#chuyen-nguoi-bien' },
    { label: 'Âu thuyền & Cảng cá', href: '#au-thuyen' },
    { label: 'Di sản & Tín ngưỡng', href: '#di-san' },
    { label: 'Không gian trải nghiệm', href: '#khong-gian-trai-nghiem' },
    { label: 'Lịch trình 1 ngày', href: '#lich-trinh' },
  ];

  return (
    <footer
      id="mang-theo-cau-chuyen"
      className="story-footer w-full text-white md:snap-start md:snap-always"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Top Split */}
        <div className="story-footer-grid">
          {/* Brand & Narrative Intro */}
          <div className="story-footer-brand space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-cyan-400">
              <Anchor size={14} />
              <span>Vũng Thùng — Sơn Trà, TP. Đà Nẵng</span>
            </div>

            <h3 className="story-footer-title font-serif text-white">
              Sơn Trà — Cầu Nối Tri Thức Số & Không Gian Thực Tế
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-light max-w-lg">
              Cầu nối giữa không gian thực tế và kho tàng tri thức số về địa danh Sơn Trà. Nơi lưu giữ ký ức, định vị địa lý và tôn vinh những câu chuyện mặn mòi qua bao đời người dân xứ biển.
            </p>

            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <MapPin size={13} className="text-cyan-400" />
              <span>Phường Nại Hiên Đông & Thọ Quang, quận Sơn Trà, TP. Đà Nẵng</span>
            </div>
          </div>

          {/* Quick Links */}
          <nav className="story-footer-links space-y-3" aria-label="Khám phá Sơn Trà từ chân trang">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Khám phá nhanh
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              {quickNav.map((item, idx) => (
                <li key={idx}>
                  <a
                    href={item.href}
                    className="story-footer-link hover:text-cyan-300 transition-colors flex items-center space-x-1.5"
                  >
                    <span>•</span>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Citations & Authentic Sources */}
          <div className="story-footer-sources space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-300">
              Tư liệu & Tham khảo
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              {CITATION_REGISTRY.slice(0, 3).map((cite) => (
                <li key={cite.id}>
                  <a
                    href={cite.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="story-footer-link hover:text-cyan-200 transition-colors flex items-center space-x-2 text-xs"
                  >
                    <ExternalLink size={11} className="shrink-0 mt-0.5" />
                    <span>{cite.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <picture className="story-footer-art" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/assets/footer/outline-mobile.webp" width="720" height="900" />
            <img src="/assets/footer/outline-desktop.webp" alt="" width="1536" height="768"
              loading="lazy" decoding="async" draggable={false}
              onLoad={event => { event.currentTarget.style.visibility = ''; }}
              onError={event => { event.currentTarget.style.visibility = 'hidden'; }} />
          </picture>
        </div>

        {/* Bottom Bar */}
        <div className="story-footer-bottom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center space-x-1.5">
            <span>Dự án giới thiệu văn hóa và không gian sống cộng đồng Làng cá Vũng Thùng</span>
            <Heart size={12} className="text-rose-400 fill-rose-400" />
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="story-footer-top flex items-center space-x-2 px-5 py-3 rounded-full text-white text-xs"
          >
            <span>Về đầu trang</span>
            <ArrowUp size={13} />
          </button>
        </div>
      </div>
    </footer>
  );
};
