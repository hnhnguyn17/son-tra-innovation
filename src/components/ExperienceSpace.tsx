import { useEffect, useRef, useState } from 'react';
import { Maximize2, Check, Share2, MapPin, Coffee, Sunset, Music, ChevronDown } from 'lucide-react';
import { ITINERARY_1DAY } from '../data/siteData';
import { Reveal } from './ui/Reveal';
import { Dialog } from './ui/Dialog';

const photos = [
  { id: 'amphitheater-day', src: '/assets/park-renders/render-amphitheater-day.jpg', title: 'Khán đài bậc thang bên mặt nước', tag: 'Phối cảnh ban ngày', description: 'Đề xuất không gian nghỉ chân và sinh hoạt cộng đồng bên hồ nước, kết nối bóng mát, khán đài và pavilion.' },
  { id: 'sunset-aerial', src: '/assets/park-renders/render-sunset-aerial.jpg', title: 'Một góc nhìn hướng về hoàng hôn', tag: 'Phối cảnh hoàng hôn', description: 'Đề xuất cảnh quan bên bờ vịnh qua góc nhìn trên cao. Phối cảnh thể hiện ý tưởng thiết kế, không phải ảnh chụp công trình đang hoạt động.' },
];
const activities = [
  { icon: Coffee, title: 'Nghỉ chân bên bến thuyền', text: 'Những khoảng ngồi dưới bóng cây để gặp gỡ, thưởng trà và quan sát nhịp sống ven vịnh.' },
  { icon: Sunset, title: 'Tản bộ đón hoàng hôn', text: 'Đường dạo gắn với cảnh quan mặt nước, mở ra những điểm dừng ngắm cảnh và trò chuyện.' },
  { icon: Music, title: 'Không gian sinh hoạt cộng đồng', text: 'Khán đài mở dành cho những buổi giao lưu văn hóa biển và hoạt động kết nối các thế hệ.' },
];
export function ExperienceSpace() {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [modalIndex, setModalIndex] = useState<number | null>(null);
  const [stopIndex, setStopIndex] = useState(0);
  const [shareStatus, setShareStatus] = useState('');
  const shareTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const photo = photos[photoIndex];
  useEffect(() => () => { if (shareTimer.current) clearTimeout(shareTimer.current); }, []);
  const share = async () => {
    if (shareTimer.current) clearTimeout(shareTimer.current);
    const url = location.origin + location.pathname + '#khong-gian-trai-nghiem';
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      setShareStatus('Đã sao chép liên kết.');
      shareTimer.current = setTimeout(() => setShareStatus(''), 3000);
    } catch { setShareStatus('Chưa sao chép được. Bạn có thể sao chép liên kết bên dưới.'); }
  };
  return <section id="khong-gian-trai-nghiem" className="reading-section experience-section" aria-labelledby="heading-khong-gian-trai-nghiem"><Reveal className="content-width">
    <div className="section-heading"><p className="eyebrow">Đề xuất trong đồ án</p><h2 id="heading-khong-gian-trai-nghiem" className="section-title">Một điểm hẹn bên bờ vịnh</h2><p className="section-intro">Ý tưởng không gian công cộng kết nối ký ức làng chài với đời sống hôm nay. Các phối cảnh và hoạt động dưới đây chưa phải công trình hay chương trình đang hoạt động.</p></div>
    <div className="experience-gallery">
      <figure className="main-photo"><button type="button" className="photo-open" onClick={() => setModalIndex(photoIndex)} aria-label={'Phóng to: ' + photo.title}><span className="photo-frame aspect-[16/10]"><img key={photo.src} className="content-change" src={photo.src} alt={photo.title} width="1536" height="864" loading="lazy" /></span><span className="photo-enlarge"><Maximize2 size={20} /> Xem ảnh lớn</span></button><figcaption><span className="eyebrow">{photo.tag}</span><h3>{photo.title}</h3><p>{photo.description}</p></figcaption></figure>
      <div className="photo-choices" role="group" aria-label="Chọn phối cảnh">{photos.map((item, i) => <button key={item.id} type="button" aria-pressed={i === photoIndex} onClick={() => setPhotoIndex(i)}><img src={item.src} alt="" width="240" height="150" loading="lazy" /><span>{item.tag}</span></button>)}</div>
    </div>
    <div className="activity-grid">{activities.map(activity => { const Icon = activity.icon; return <article key={activity.title}><Icon size={26} aria-hidden="true" /><h3>{activity.title}</h3><p>{activity.text}</p></article>; })}</div>
    <div className="experience-actions"><p className="secondary-copy"><MapPin size={18} /> Khu vực nghiên cứu: bờ vịnh Vũng Thùng, Sơn Trà</p><div className="action-links"><a className="button secondary" href="https://www.google.com/maps/search/?api=1&query=Au+thuyen+Tho+Quang+Da+Nang" target="_blank" rel="noopener noreferrer">Xem khu vực trên bản đồ</a><button type="button" className="button secondary" onClick={share}>{shareStatus.startsWith('Đã') ? <Check size={18} /> : <Share2 size={18} />} Chia sẻ</button></div></div>
    <div role="status" className="feedback">{shareStatus}</div>{shareStatus.startsWith('Chưa') && <label className="share-fallback">Liên kết để sao chép<input readOnly value={location.origin + location.pathname + '#khong-gian-trai-nghiem'} onFocus={event => event.target.select()} /></label>}
    <div id="lich-trinh" className="itinerary"><p className="eyebrow">Gợi ý khám phá địa phương</p><h3>Một ngày theo nhịp biển</h3><p className="secondary-copy">Lịch trình tham khảo; thời gian và khả năng tiếp cận từng địa điểm cần kiểm tra trước chuyến đi.</p><div className="itinerary-stops">{ITINERARY_1DAY.map((stop, i) => <div key={stop.time} className="itinerary-stop"><button type="button" className="itinerary-choice" aria-expanded={stopIndex === i} aria-controls={stopIndex === i ? 'itinerary-detail-' + i : undefined} onClick={() => setStopIndex(i)}><span className="stop-number">0{i + 1}</span><span><span className="stop-time">{stop.time}</span><strong>{stop.title}</strong></span><ChevronDown size={20} /></button>{stopIndex === i && <div id={'itinerary-detail-' + i} className="itinerary-detail content-change"><p>{stop.activity}</p><p className="secondary-copy"><MapPin size={16} />{stop.location}</p></div>}</div>)}</div></div>
    {modalIndex !== null && <Dialog title={photos[modalIndex].title} onClose={() => setModalIndex(null)} className="photo-dialog"><img className="lightbox-image" src={photos[modalIndex].src} alt={photos[modalIndex].title} width="1536" height="864" /><div className="lightbox-caption"><p className="eyebrow">Đề xuất trong đồ án · {photos[modalIndex].tag}</p><p>{photos[modalIndex].description}</p></div></Dialog>}
  </Reveal></section>;
}
