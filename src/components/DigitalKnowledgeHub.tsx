import { useState } from 'react';
import { Search, MapPin, ArrowRight, ChevronDown } from 'lucide-react';
import { NEIGHBORHOOD_POIS, type NeighborhoodPOI } from '../data/siteData';
import { Reveal } from './ui/Reveal';
import { SpeechButton } from './ui/SpeechButton';

const categories = [
  ['all', 'Tất cả địa danh'], ['Kinh tế biển', 'Kinh tế biển & Cảng tàu'], ['Tâm linh & Di sản', 'Tín ngưỡng & Làng cổ'],
  ['Cảnh quan & Du lịch', 'Cảnh quan & Vịnh biển'], ['Ẩm thực bản địa', 'Ẩm thực làng cá'], ['Lịch sử & Ký ức', 'Lịch sử phòng tuyến 1858'], ['Đổi mới sáng tạo', 'Đổi mới & Đô thị số'],
];
const normalize = (value: string) => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/gi, 'd').toLocaleLowerCase('vi').trim();
function PoiDetail({ poi, id }: { poi: NeighborhoodPOI; id: string }) {
  return <article id={id} className="poi-detail content-change" aria-labelledby={id + '-title'}>
    <p className="eyebrow">{poi.category}</p><h3 id={id + '-title'}>{poi.title}</h3>
    <p className="detail-highlight">{poi.experienceTag}</p><p>{poi.description}</p>
    {poi.historicalFact && <div className="detail-fact"><strong>Dấu mốc địa danh</strong><p>{poi.historicalFact}</p></div>}
    <div className="detail-meta"><MapPin size={18} aria-hidden="true" /><span>{poi.distance} · {poi.walkingTime}</span></div>
    {poi.coordinates && <details className="coordinates"><summary>Thông tin vị trí</summary><p>Tọa độ tham khảo: {poi.coordinates}</p></details>}
    <SpeechButton text={poi.title + '. ' + poi.experienceTag + '. ' + poi.description} />
    <a className="text-link" href="#khong-gian-trai-nghiem">Khám phá ý tưởng không gian <ArrowRight size={18} /></a>
  </article>;
}
export function DigitalKnowledgeHub() {
  const [selectedId, setSelectedId] = useState(NEIGHBORHOOD_POIS[0].id);
  const [category, setCategory] = useState('all');
  const [query, setQuery] = useState('');
  const results = NEIGHBORHOOD_POIS.filter(poi => (category === 'all' || poi.category === category) && normalize(poi.title + ' ' + poi.description + ' ' + poi.highlight).includes(normalize(query)));
  const selected = results.find(poi => poi.id === selectedId) ?? results[0];
  // Update the remembered selection as filters change; never display a stale detail.
  if (selected && selected.id !== selectedId) setSelectedId(selected.id);
  return <section id="tri-thuc-so" className="reading-section" aria-labelledby="heading-tri-thuc-so"><Reveal className="content-width">
    <div className="section-heading"><p className="eyebrow">Kho tri thức số · Địa danh Sơn Trà</p><h2 id="heading-tri-thuc-so" className="section-title">Từng tấc đất, ngọn sóng Sơn Trà</h2><p className="section-intro">Tìm hiểu lịch sử, di sản và nhịp sống bản địa qua những điểm dừng bên bờ vịnh.</p></div>
    <div className="knowledge-controls"><div className="filter-list" role="group" aria-label="Lọc theo chủ đề">{categories.map(([id, label]) => <button type="button" key={id} className="chip" aria-pressed={category === id} onClick={() => setCategory(id)}>{label}</button>)}</div>
      <div className="search-field"><Search size={20} aria-hidden="true" /><label className="sr-only" htmlFor="poi-search">Tìm địa danh, di sản</label><input id="poi-search" type="search" placeholder="Tìm địa danh, di sản…" value={query} onChange={event => setQuery(event.target.value)} /></div>
    </div><p className="result-count" role="status">{results.length} địa danh phù hợp</p>
    {!selected ? <div className="empty-state"><Search size={28} /><p>Chưa tìm thấy địa danh phù hợp với “{query}”.</p><button type="button" className="button secondary" onClick={() => { setQuery(''); setCategory('all'); }}>Xem tất cả địa danh</button></div> : <div className="knowledge-layout">
      {results.map((poi, index) => <div key={poi.id} className="poi-entry"><button style={{ gridRow: index + 1 }} className="poi-choice" type="button" aria-expanded={selected.id === poi.id} aria-controls={selected.id === poi.id ? 'poi-' + poi.id : undefined} onClick={() => setSelectedId(poi.id)}><span><strong>{poi.title}</strong><span>{poi.category} · {poi.walkingTime}</span></span><ChevronDown size={20} aria-hidden="true" /></button>{selected.id === poi.id && <div className="poi-panel" style={{ gridRow: '1 / span ' + results.length }}><PoiDetail key={poi.id} poi={poi} id={'poi-' + poi.id} /></div>}</div>)}
    </div>}
  </Reveal></section>;
}
