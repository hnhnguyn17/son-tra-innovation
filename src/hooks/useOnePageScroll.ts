import { useState, useEffect, useRef, useCallback } from 'react';

export interface PageSectionInfo {
  id: string;
  label: string;
}

export const APP_SECTIONS: PageSectionInfo[] = [
  { id: 'vung-thung', label: '01. Cửa Biển Sơn Trà' },
  { id: 'tri-thuc-so', label: '02. Kho Tri Thức Số' },
  { id: 'chuyen-nguoi-bien', label: '03. Người Xứ Biển' },
  { id: 'au-thuyen', label: '04. Âu Thuyền Thọ Quang' },
  { id: 'di-san', label: '05. Di Sản & Làng Chài' },
  { id: 'khong-gian-trai-nghiem', label: '06. Trải Nghiệm Bờ Vịnh' },
  { id: 'mang-theo-cau-chuyen', label: '07. Tra Cứu & Đồng Hành' },
];

export function useOnePageScroll(isModalOpen = false) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSnapEnabled, setIsSnapEnabled] = useState(true);
  const scrollTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isAnimatingRef = useRef(false);
  const lastScrollTimeRef = useRef(0);
  const activeIndexRef = useRef(0);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  const scrollToSection = useCallback((targetIndex: number) => {
    if (targetIndex < 0 || targetIndex >= APP_SECTIONS.length) return;
    const targetId = APP_SECTIONS[targetIndex].id;
    const element = document.getElementById(targetId);
    if (!element) return;

    isAnimatingRef.current = true;
    lastScrollTimeRef.current = Date.now();
    setActiveIndex(targetIndex);

    const targetTop = element.getBoundingClientRect().top + window.scrollY;

    window.scrollTo({
      top: Math.max(0, targetTop),
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });

    // 800ms cooldown for smooth section-to-section animation
    if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
    scrollTimerRef.current = setTimeout(() => {
      isAnimatingRef.current = false;
      window.dispatchEvent(new Event('scroll'));
    }, 800);
  }, []);

  // Compare all chapter positions, including tall mobile chapters. Observer
  // callbacks only contain changed entries and cannot reliably rank all chapters.
  useEffect(() => {
    let frame = 0;
    const syncSection = () => {
      frame = 0;
      if (isAnimatingRef.current) return;
      const anchor = window.innerHeight * 0.35;
      let index = 0;
      APP_SECTIONS.forEach((section, candidate) => {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= anchor) index = candidate;
      });
      if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
        index = APP_SECTIONS.length - 1;
      }
      activeIndexRef.current = index;
      setActiveIndex(index);
    };
    const scheduleSync = () => {
      if (!frame) frame = requestAnimationFrame(syncSection);
    };
    window.addEventListener('scroll', scheduleSync, { passive: true });
    window.addEventListener('resize', scheduleSync);
    const resizeObserver = new ResizeObserver(scheduleSync);
    APP_SECTIONS.forEach(section => {
      const element = document.getElementById(section.id);
      if (element) resizeObserver.observe(element);
    });
    scheduleSync();
    return () => {
      cancelAnimationFrame(frame);
      if (scrollTimerRef.current) clearTimeout(scrollTimerRef.current);
      window.removeEventListener('scroll', scheduleSync);
      window.removeEventListener('resize', scheduleSync);
      resizeObserver.disconnect();
    };
  }, []);

  // Listen to wheel, keyboard, and touch swipe gestures
  useEffect(() => {
    if (!isSnapEnabled) return;

    // Helper to check if the scroll event is inside an element that can scroll internally
    const checkInternalScroll = (target: EventTarget | null, deltaY: number): boolean => {
      let el = target as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight > el.clientHeight + 4) {
          const style = window.getComputedStyle(el);
          const overflowY = style.overflowY;
          if (overflowY === 'auto' || overflowY === 'scroll') {
            // Scrolling down and element has not reached bottom
            if (deltaY > 0 && el.scrollTop + el.clientHeight < el.scrollHeight - 6) {
              return true;
            }
            // Scrolling up and element has not reached top
            if (deltaY < 0 && el.scrollTop > 6) {
              return true;
            }
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const handleWheel = (e: WheelEvent) => {
      // On mobile devices (< 768px), allow native smooth momentum scrolling without interception
      if (window.innerWidth < 768) return;

      // Don't intercept if modal or dialog is open
      if (isModalOpen || document.querySelector('[role="dialog"]')) return;

      // Don't intercept if element can scroll internally
      if (checkInternalScroll(e.target, e.deltaY)) return;

      const now = Date.now();
      const timeSinceLast = now - lastScrollTimeRef.current;

      // Prevent chaotic jumping during animation cooldown
      if (isAnimatingRef.current || timeSinceLast < 750) {
        e.preventDefault();
        return;
      }

      // Ignore tiny jitter
      if (Math.abs(e.deltaY) < 18) return;

      // Cinematic chapters contain an opening and a reading surface. Let users
      // reach the end of both before advancing to another chapter.
      const section = document.getElementById(APP_SECTIONS[activeIndexRef.current].id);
      const bounds = section?.getBoundingClientRect();
      if (bounds && ((e.deltaY > 0 && bounds.bottom > window.innerHeight + 8) ||
          (e.deltaY < 0 && bounds.top < -8))) return;

      e.preventDefault();
      const current = activeIndexRef.current;
      if (e.deltaY > 0) {
        if (current < APP_SECTIONS.length - 1) {
          scrollToSection(current + 1);
        }
      } else {
        if (current > 0) {
          scrollToSection(current - 1);
        }
      }
    };

    // Keyboard navigation (Arrow keys, PageUp/Down, Home, End)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isModalOpen) return;
      const target = e.target as HTMLElement;
      if (target.closest('input, textarea, select, button, a, [contenteditable="true"], [role="dialog"]')) return;

      const current = activeIndexRef.current;
      const bounds = document.getElementById(APP_SECTIONS[current].id)?.getBoundingClientRect();
      if (bounds && ((['ArrowDown', 'PageDown'].includes(e.key) && bounds.bottom > window.innerHeight + 8) ||
          (['ArrowUp', 'PageUp'].includes(e.key) && bounds.top < -8))) return;
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        if (current < APP_SECTIONS.length - 1) {
          e.preventDefault();
          scrollToSection(current + 1);
        }
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        if (current > 0) {
          e.preventDefault();
          scrollToSection(current - 1);
        }
      } else if (e.key === 'Home') {
        e.preventDefault();
        scrollToSection(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        scrollToSection(APP_SECTIONS.length - 1);
      }
    };

    // Native touch scrolling preserves reading in tall sections and horizontal
    // carousels. CSS scroll snap handles chapter snapping on touch devices.
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSnapEnabled, isModalOpen, scrollToSection]);

  return {
    activeIndex,
    isSnapEnabled,
    setIsSnapEnabled,
    scrollToSection,
    sections: APP_SECTIONS,
  };
}
