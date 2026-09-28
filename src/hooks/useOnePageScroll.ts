import { useState, useEffect, useCallback } from 'react';
import { navigateTo } from './navigation';
export interface PageSectionInfo { id: string; label: string }
export const APP_SECTIONS: PageSectionInfo[] = [
  { id: 'vung-thung', label: '01. Cửa Biển Sơn Trà' },
  { id: 'tri-thuc-so', label: '02. Kho Tri Thức Số' },
  { id: 'chuyen-nguoi-bien', label: '03. Người Xứ Biển' },
  { id: 'au-thuyen', label: '04. Âu Thuyền Thọ Quang' },
  { id: 'di-san', label: '05. Di Sản & Làng Chài' },
  { id: 'khong-gian-trai-nghiem', label: '06. Trải Nghiệm Bờ Vịnh' },
  { id: 'mang-theo-cau-chuyen', label: '07. Tra Cứu & Đồng Hành' },
];
export function useOnePageScroll() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSnapEnabled, setIsSnapEnabled] = useState(false);
  const scrollToSection = useCallback((index: number) => {
    if (APP_SECTIONS[index]) navigateTo(APP_SECTIONS[index].id);
  }, []);
  useEffect(() => {
    let frame = 0;
    const sync = () => {
      frame = 0;
      let current = 0;
      APP_SECTIONS.forEach((section, index) => {
        if ((document.getElementById(section.id)?.getBoundingClientRect().top ?? Infinity) <= innerHeight * 0.35) current = index;
      });
      if (scrollY > 0 && scrollY + innerHeight >= document.documentElement.scrollHeight - 4) current = APP_SECTIONS.length - 1;
      setActiveIndex(current);
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(sync); };
    const observer = new ResizeObserver(schedule);
    APP_SECTIONS.forEach(section => { const el = document.getElementById(section.id); if (el) observer.observe(el); });
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    schedule();
    return () => { cancelAnimationFrame(frame); observer.disconnect(); removeEventListener('scroll', schedule); removeEventListener('resize', schedule); };
  }, []);
  return { activeIndex, isSnapEnabled, setIsSnapEnabled, scrollToSection, sections: APP_SECTIONS };
}
