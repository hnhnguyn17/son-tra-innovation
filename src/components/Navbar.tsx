import { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { MAIN_NAV_ITEMS, MOBILE_DRAWER_ITEMS } from '../data/contentData';
import { Dialog } from './ui/Dialog';
import { navigateTo } from '../hooks/navigation';
export function Navbar({ activeSectionId }: { activeSectionId: string }) {
  const [open, setOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    let previous = scrollY;
    let travel = 0;
    let direction = 0;
    const update = () => {
      const y = Math.max(0, scrollY);
      const delta = y - previous;
      previous = y;
      if (innerWidth >= 768 || open || focused || y < 64) { setVisible(true); travel = 0; return; }
      if (Math.abs(delta) < 1) return;
      const next = Math.sign(delta);
      if (next !== direction) { direction = next; travel = 0; }
      travel += Math.abs(delta);
      if (direction > 0 && travel >= 64) setVisible(false);
      if (direction < 0 && travel >= 24) setVisible(true);
    };
    addEventListener('scroll', update, { passive: true });
    addEventListener('resize', update);
    return () => { removeEventListener('scroll', update); removeEventListener('resize', update); };
  }, [open, focused]);
  const choose = (id: string) => {
    setOpen(false);
    setTimeout(() => { history.pushState(null, '', '#' + id); navigateTo(id, true); }, 0);
  };
  return <>
    <a href="#main-content" className="skip-link">Chuyển đến nội dung chính</a>
    <header className={'site-header ' + (!visible && !focused && !open ? 'header-hidden' : '')} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }}>
      <div className="nav-capsule"><a className="brand" href="#vung-thung">SƠN TRÀ<span aria-hidden="true"> / </span></a>
        <nav aria-label="Thanh điều hướng chính" className="desktop-nav">{MAIN_NAV_ITEMS.map(item => <a key={item.id} href={item.href} aria-current={activeSectionId === item.id ? 'location' : undefined}>{item.label}</a>)}</nav>
        <button type="button" className="icon-button mobile-menu-trigger" onClick={() => setOpen(true)} aria-expanded={open} aria-controls="mobile-navigation" aria-label="Mở menu điều hướng"><Menu size={22} /></button>
      </div>
    </header>
    {open && <Dialog id="mobile-navigation" title="Khám phá Sơn Trà" onClose={() => setOpen(false)} className="menu-dialog">
      <nav aria-label="Mục lục Sơn Trà" className="mobile-navigation">{MOBILE_DRAWER_ITEMS.map(item => <a key={item.id} href={item.href} aria-current={activeSectionId === item.id ? 'location' : undefined} onClick={event => { event.preventDefault(); choose(item.id); }}><span>{item.label}</span><span aria-hidden="true">0{item.chapterNumber}</span></a>)}
        <a href="#mang-theo-cau-chuyen" onClick={event => { event.preventDefault(); choose('mang-theo-cau-chuyen'); }}>Tư liệu & đồng hành <span>07</span></a>
      </nav>
    </Dialog>}
  </>;
}
