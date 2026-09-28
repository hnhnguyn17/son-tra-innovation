import { navigateTo } from '../../hooks/navigation';
import { ArrowDown, Anchor, Waves } from 'lucide-react';

type Chapter = 'coast' | 'harbor' | 'whale';

const chapters = {
  coast: { eyebrow: 'SƠN TRÀ · BIỂN ÔM CHÂN NÚI', title: <>Miền ký ức<br /><em>neo đậu</em></>, description: 'Nơi biển và rừng cùng kể chuyện', action: 'Khám phá Sơn Trà', note: 'Một miền biển. Những câu chuyện ở lại.' },
  harbor: { eyebrow: 'ÂU THUYỀN THỌ QUANG', title: <>Vòng tay<br /><em>chắn bão</em></>, description: 'Bến neo đậu bình yên', action: 'Khám phá âu thuyền', note: 'Nơi những con thuyền trở về sau giông gió.' },
  whale: { eyebrow: 'DI SẢN LÀNG BIỂN', title: <>Cá Ông —<br /><em>Người chở che</em></>, description: 'Ký ức và tín ngưỡng xứ biển', action: 'Lắng nghe chuyện biển', note: 'Biểu tượng của lòng nhân hậu trong ký ức ngư dân.' },
};

export function CinematicPrelude({ chapter, targetId }: { chapter: Chapter; targetId: string }) {
  const content = chapters[chapter];
  const Heading = chapter === 'coast' ? 'h1' : 'h2';
  return (
    <div className="cinematic-prelude" data-chapter={chapter}>
      <div className="cinematic-intro">
        <p className="cinematic-eyebrow">{content.eyebrow}</p>
        <Heading className="cinematic-title">{content.title}</Heading>
        <span className="cinematic-rule" aria-hidden="true" />
        <p className="cinematic-description">{content.description}</p>
        {chapter !== 'coast' && (
          <div className="cinematic-note">
            {chapter === 'harbor' ? <Anchor aria-hidden="true" size={24} /> : <Waves aria-hidden="true" size={24} />}
            <p>{content.note}</p>
          </div>
        )}
      </div>
      <div className="cinematic-bottom">
        <a className="cinematic-explore" href={`#${targetId}`} onClick={event => {
          event.preventDefault();
          history.pushState(null, '', '#' + targetId);
          navigateTo(targetId, true);
        }}>{content.action}<ArrowDown size={16} aria-hidden="true" /></a>
        <p className="cinematic-art-note">Minh họa nghệ thuật · Cảm hứng Sơn Trà</p>
      </div>
    </div>
  );
}
