import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { navigateTo } from '../hooks/navigation';
export function BackToTop() {
  const [scrolled, setScrolled] = useState(false);
  const [footerVisible, setFooterVisible] = useState(false);
  useEffect(() => {
    const scroll = () => setScrolled(scrollY > 350);
    addEventListener('scroll', scroll, { passive: true });
    scroll();
    const button = document.querySelector('.story-footer-top');
    const observer = new IntersectionObserver(([entry]) => setFooterVisible(entry.isIntersecting));
    if (button) observer.observe(button);
    return () => { removeEventListener('scroll', scroll); observer.disconnect(); };
  }, []);
  return scrolled && !footerVisible ? <button type="button" className="back-to-top icon-button" aria-label="Cuộn về đầu trang" onClick={() => navigateTo('vung-thung', true)}><ArrowUp size={22} /></button> : null;
}
