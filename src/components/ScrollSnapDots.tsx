import { ChevronUp, ChevronDown } from 'lucide-react';
import { APP_SECTIONS } from '../hooks/useOnePageScroll';
export function ScrollSnapDots({ currentSectionIndex, onNavigateSection, isSnapEnabled, onToggleSnap }: {
  currentSectionIndex: number; onNavigateSection: (index: number) => void; isSnapEnabled: boolean; onToggleSnap: () => void;
}) {
  return <aside className="chapter-navigation" aria-label="Điều hướng 7 chương Sơn Trà">
    <button className="presentation-toggle" type="button" aria-pressed={isSnapEnabled} aria-label="Chế độ trình chiếu" onClick={onToggleSnap} title="Bật hoặc tắt căn nhẹ theo chương"><span>Trình chiếu</span><span>{isSnapEnabled ? 'Bật' : 'Tắt'}</span></button>
    <button type="button" className="icon-button" disabled={currentSectionIndex === 0} onClick={() => onNavigateSection(currentSectionIndex - 1)} aria-label="Về chương trước"><ChevronUp size={18} /></button>
    <div className="chapter-dots">{APP_SECTIONS.map((section, index) => <button key={section.id} type="button" aria-label={'Chuyển đến ' + section.label} aria-current={index === currentSectionIndex ? 'location' : undefined} onClick={() => onNavigateSection(index)}><span className="chapter-dot" /><span className="chapter-tooltip">{section.label}</span></button>)}</div>
    <button type="button" className="icon-button" disabled={currentSectionIndex === APP_SECTIONS.length - 1} onClick={() => onNavigateSection(currentSectionIndex + 1)} aria-label="Đến chương tiếp theo"><ChevronDown size={18} /></button>
    <span className="chapter-count">0{currentSectionIndex + 1} / 07</span>
  </aside>;
}
