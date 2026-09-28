import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { CinematicPrelude } from "./background/CinematicPrelude";
import { Reveal } from "./ui/Reveal";
import harborPhoto from "../assets/au-thuyen-tho-quang.jpg";
const zones = [
  {
    id: "breakwater",
    label: "Cánh đê chắn bão",
    title: "Đê đá chắn sóng Thọ Quang",
    detail:
      "Cánh tay đá vươn ra vịnh, đón ngọn sóng ngoài khơi để giữ vùng nước phía trong êm hơn cho những con thuyền trở về.",
  },
  {
    id: "harbour",
    label: "Lòng âu nước lặng",
    title: "Lòng âu thuyền — khoảng 58 ha",
    detail:
      "Không gian mặt nước neo đậu, nơi tàu thuyền tìm về tránh trú qua những mùa biển động.",
  },
  {
    id: "promenade",
    label: "Lối dạo chở che",
    title: "Ý tưởng đường dạo ven vịnh",
    detail:
      "Đề xuất trong đồ án: đường dạo lấy cảm hứng từ hình dáng đê kè, kết nối không gian nghỉ chân và tầm nhìn hướng biển.",
  },
];
export function EmbracingBreakwater() {
  const [index, setIndex] = useState(0);
  const zone = zones[index];
  return (
    <section
      id="au-thuyen"
      className="cinematic-chapter"
      aria-labelledby="heading-au-thuyen"
    >
      <CinematicPrelude chapter="harbor" targetId="au-thuyen-noi-dung" />
      <div id="au-thuyen-noi-dung" className="chapter-content">
        <Reveal className="content-width">
          <div className="section-heading">
            <p className="eyebrow">Bến neo đậu & nhịp sống cảng cá</p>
            <h2 id="heading-au-thuyen" className="section-title">
              Dáng hình của sự chở che
            </h2>
            <p className="section-intro">
              Từ cánh cung đê đá đến mặt nước âu thuyền, tìm hiểu cảm hứng cho
              một không gian bên bờ vịnh.
            </p>
          </div>
          <div className="harbor-layout">
            <div className="harbor-diagram">
              <svg
                viewBox="0 0 540 290"
                role="img"
                aria-label={
                  "Sơ đồ ý niệm âu thuyền; vùng đang chọn: " + zone.label
                }
              >
                <defs>
                  <pattern
                    id="harbor-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <path d="M24 0H0V24" fill="none" stroke="#d9e7ea" />
                  </pattern>
                </defs>
                <rect
                  width="540"
                  height="290"
                  fill="url(#harbor-grid)"
                  rx="16"
                />
                <path
                  d="M20 48Q60 25 100 48T180 48T260 48T340 48"
                  stroke="#829da6"
                  strokeWidth="2"
                  strokeDasharray="5 5"
                  fill="none"
                />
                <text x="24" y="24" fill="#506978" fontSize="16">
                  Sóng ngoài khơi
                </text>
                <ellipse
                  cx="270"
                  cy="186"
                  rx="148"
                  ry="70"
                  fill={index === 1 ? "#9bd9ea" : "#e0f2f6"}
                  className="diagram-zone"
                />
                <path
                  d="M85 248C95 128 200 79 330 84C438 89 478 158 485 240"
                  fill="none"
                  stroke={index === 0 ? "#0077b6" : "#506978"}
                  strokeWidth={index === 0 ? 9 : 6}
                  strokeLinecap="round"
                  className="diagram-zone"
                />
                <path
                  d="M110 248C124 142 210 105 325 107C414 112 450 168 458 240"
                  fill="none"
                  stroke={index === 2 ? "#0077b6" : "#7bb7c9"}
                  strokeWidth={index === 2 ? 7 : 4}
                  strokeDasharray="8 7"
                  className="diagram-zone"
                />
                <text
                  x="270"
                  y="184"
                  textAnchor="middle"
                  fill="#16445b"
                  fontSize="20"
                  fontWeight="600"
                >
                  Âu thuyền
                </text>
                <text
                  x="270"
                  y="211"
                  textAnchor="middle"
                  fill="#386377"
                  fontSize="16"
                >
                  Vùng nước neo đậu
                </text>
              </svg>
              <p className="secondary-copy">
                Sơ đồ ý niệm thiết kế, không phải bản đồ địa lý thực tế.
              </p>
              <div
                className="zone-buttons"
                role="group"
                aria-label="Vùng trong sơ đồ"
              >
                {zones.map((item, i) => (
                  <button
                    type="button"
                    className="chip"
                    key={item.id}
                    aria-pressed={index === i}
                    aria-controls="zone-description"
                    onClick={() => setIndex(i)}
                  >
                    {i + 1}. {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="harbor-description">
              <div
                key={zone.id}
                id="zone-description"
                className="content-change"
              >
                <p className="eyebrow">Đọc dáng hình bến cảng</p>
                <h3>{zone.title}</h3>
                <p>{zone.detail}</p>
              </div>
              <a
                className="text-link"
                href="https://baodanang.vn/ngam-toan-canh-au-thuyen-tho-quang-noi-dang-duoc-xay-dung-thanh-1-trong-5-trung-tam-nghe-ca-lon-cua-ca-nuoc-3287472.html"
                target="_blank"
                rel="noopener noreferrer"
              >
                Tư liệu Báo Đà Nẵng <ExternalLink size={18} />
              </a>
              <img
                className="harbor-photo"
                src={harborPhoto}
                alt="Toàn cảnh âu thuyền Thọ Quang"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
