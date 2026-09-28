import { Anchor, BookOpen, ArrowRight } from "lucide-react";
import { CinematicPrelude } from "./background/CinematicPrelude";
import { Reveal } from "./ui/Reveal";
export function HeroSection() {
  return (
    <section
      id="vung-thung"
      className="cinematic-chapter"
      aria-label="Cửa biển Sơn Trà"
    >
      <CinematicPrelude chapter="coast" targetId="cua-bien-noi-dung" />
      <div id="cua-bien-noi-dung" className="chapter-content">
        <Reveal className="content-width hero-story">
          <div>
            <p className="eyebrow">Bắt đầu từ một bến bờ</p>
            <h2 className="section-title">
              Theo dấu những câu chuyện bên biển
            </h2>
            <p className="section-intro">
              Từ bến thuyền Thọ Quang đến làng chài dưới chân núi, khám phá địa
              danh và những nếp sống gắn bó với biển Sơn Trà.
            </p>
            <div className="hero-links">
              <a href="#au-thuyen" className="editorial-link">
                <Anchor size={24} />
                <span>
                  <strong>Âu thuyền</strong>
                  <span>Nơi những con thuyền tìm về</span>
                </span>
                <ArrowRight size={20} />
              </a>
              <a href="#tri-thuc-so" className="editorial-link">
                <BookOpen size={24} />
                <span>
                  <strong>Kho tri thức</strong>
                  <span>Khám phá 7 địa danh Sơn Trà</span>
                </span>
                <ArrowRight size={20} />
              </a>
            </div>
          </div>
          <img
            className="hero-photo"
            src="/assets/ocean/harbor-1536.webp"
            alt="Cảnh cửa biển và âu thuyền Sơn Trà"
            loading="lazy"
          />
        </Reveal>
      </div>
    </section>
  );
}
