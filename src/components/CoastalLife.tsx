import { useState } from 'react';
import { CinematicPrelude } from './background/CinematicPrelude';
import { LIVING_HERITAGE_LIST } from '../data/contentData';
import { GenerativeNetWave } from './generative/GenerativeNetWave';
import { InteractiveRopePull } from './generative/InteractiveRopePull';
import { MediaPending } from './ui/MediaPending';
import { Reveal } from './ui/Reveal';

export function CoastalLife() {
  const [index, setIndex] = useState(0);
  const [interactive, setInteractive] = useState(false);
  const item = LIVING_HERITAGE_LIST[index];
  const tabs = ['Lăng Ông & Cầu Ngư', 'Thúng chai nan tre', 'Kéo lưới rùng bình minh'];
  return <section id="di-san" className="cinematic-chapter" aria-labelledby="heading-di-san">
    <CinematicPrelude chapter="whale" targetId="di-san-noi-dung" />
    <div id="di-san-noi-dung" className="chapter-content"><Reveal className="content-width">
      <div className="section-heading"><p className="eyebrow">Di sản & văn hóa làng biển</p><h2 id="heading-di-san" className="section-title">Điểm tựa của những vạn chài</h2><p className="section-intro">Tín ngưỡng, nghề truyền thống và sự gắn kết của những cộng đồng bên bờ biển.</p></div>
      <div className="mode-switch" role="group" aria-label="Cách khám phá di sản"><button type="button" className="chip" aria-pressed={!interactive} onClick={() => setInteractive(false)}>Câu chuyện di sản</button><button type="button" className="chip" aria-pressed={interactive} onClick={() => setInteractive(true)}>Sóng lưới động</button></div>
      {interactive ? <div className="interactive-grid content-change"><GenerativeNetWave /><InteractiveRopePull /></div> : <>
        <div className="heritage-tabs filter-list" role="group" aria-label="Chủ đề di sản">{tabs.map((tab, i) => <button key={tab} type="button" className="chip" aria-pressed={index === i} onClick={() => setIndex(i)}>{tab}</button>)}</div>
        <article className="heritage-story"><div key={item.id} className="content-change"><p className="eyebrow">{item.tag}</p><h3>{item.title}</h3><p>{item.summary}</p><p>{item.details}</p><div className="editorial-note"><p className="eyebrow">Diễn giải văn hóa</p><p>{item.quote}</p></div></div><MediaPending title={item.title} description="Ảnh tư liệu địa phương đang được sưu tầm và bổ sung nguồn." /></article>
      </>}
    </Reveal></div>
  </section>;
}
