import { useState } from "react";
import { Users, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { SOUL_KEEPERS } from "../data/contentData";
import { Reveal } from "./ui/Reveal";
import { SpeechButton } from "./ui/SpeechButton";
import fisherPhoto from "../assets/nguoi-di-bien.jpg";
import fishCarrierPhoto from "../assets/nguoi-ganh-ca.jpg";
import basketWeaverPhoto from "../assets/nguoi-dan-thung.avif";
import ritualKeeperPhoto from "../assets/nguoi-giu-nep-le.jpg";
import fishSauceMakerPhoto from "../assets/nguoi-lam-mam.jpg";
const labels = [
  "Người đi biển",
  "Người gánh cá",
  "Nghệ nhân đan thúng",
  "Người giữ nếp lễ",
  "Người làm mắm",
];
const keeperPhotos = [
  { src: fisherPhoto, alt: "Ngư dân Sơn Trà trên biển" },
  { src: fishCarrierPhoto, alt: "Người gánh cá ở làng biển" },
  { src: basketWeaverPhoto, alt: "Nghệ nhân đan thúng chai" },
  { src: ritualKeeperPhoto, alt: "Người gìn giữ nếp lễ làng biển" },
  { src: fishSauceMakerPhoto, alt: "Người làm mắm truyền thống" },
];
export function KeepersOfSoul() {
  const [index, setIndex] = useState(0);
  const keeper = SOUL_KEEPERS[index];
  const choose = (next: number) => {
    const value = (next + SOUL_KEEPERS.length) % SOUL_KEEPERS.length;
    setIndex(value);
    const button = document.getElementById("keeper-choice-" + value);
    const track = button?.parentElement;
    if (button && track && track.scrollWidth > track.clientWidth) {
      track.scrollTo({
        left: button.offsetLeft - track.offsetLeft - 8,
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  };
  return (
    <section
      id="chuyen-nguoi-bien"
      className="reading-section people-section"
      aria-labelledby="heading-chuyen-nguoi-bien"
    >
      <Reveal className="content-width">
        <div className="section-heading">
          <p className="eyebrow">Con người & ký ức sống</p>
          <h2 id="heading-chuyen-nguoi-bien" className="section-title">
            Những người giữ hồn biển
          </h2>
          <p className="section-intro">
            Những tuyến câu chuyện đang được sưu tầm và ghi chép điền dã tại các
            làng biển Sơn Trà.
          </p>
        </div>
        <div className="carousel-bar">
          <p className="secondary-copy">
            Chọn một tuyến câu chuyện{" "}
            <span className="mobile-hint">· Vuốt ngang để xem thêm</span>
          </p>
          <div className="carousel-buttons">
            <button
              type="button"
              className="icon-button"
              aria-label="Xem câu chuyện trước"
              onClick={() => choose(index - 1)}
            >
              <ChevronLeft size={20} />
            </button>
            <span>
              {index + 1} / {labels.length}
            </span>
            <button
              type="button"
              className="icon-button"
              aria-label="Xem câu chuyện tiếp theo"
              onClick={() => choose(index + 1)}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div
          className="keeper-choices"
          role="group"
          aria-label="Tuyến nhân vật"
        >
          {labels.map((label, i) => (
            <button
              id={"keeper-choice-" + i}
              key={label}
              type="button"
              aria-pressed={index === i}
              aria-controls="keeper-story"
              onClick={() => choose(i)}
            >
              <span className="eyebrow">0{i + 1}</span>
              <strong>{label}</strong>
            </button>
          ))}
        </div>
        <article id="keeper-story" className="keeper-story">
          <div>
            <img
              key={keeper.id}
              className="keeper-photo content-change"
              src={keeperPhotos[index].src}
              alt={keeperPhotos[index].alt}
              loading="lazy"
            />
          </div>
          <div key={keeper.id} className="content-change keeper-narrative">
            <p className="eyebrow">
              <Users size={16} /> Câu chuyện đang được sưu tầm
            </p>
            <h3>{labels[index]}</h3>
            <p className="story-subtitle">{keeper.subtitle}</p>
            <div className="story-focus">
              <h4>Điều chúng mình muốn lắng nghe</h4>
              <p>{keeper.researchFocus}</p>
            </div>
            <p className="secondary-copy">
              <MapPin size={16} /> Địa bàn dự kiến: {keeper.location}
            </p>
            <p className="secondary-copy">
              Nội dung giới thiệu tuyến nghiên cứu, chưa phải lời kể hoặc hồ sơ
              của một nhân vật đã được xác minh.
            </p>
            <SpeechButton
              text={
                "Tuyến câu chuyện đang được sưu tầm: " +
                labels[index] +
                ". " +
                keeper.subtitle +
                ". Nội dung tìm hiểu: " +
                keeper.researchFocus
              }
            />
          </div>
        </article>
      </Reveal>
    </section>
  );
}
