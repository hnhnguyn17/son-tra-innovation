import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useMotion } from '../../hooks/useMotion';

export function Reveal({ children, className = '' }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [entered, setEntered] = useState(false);
  const { reducedMotion } = useMotion();
  useEffect(() => {
    if (!ref.current || !('IntersectionObserver' in window) || reducedMotion) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setEntered(true); observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [reducedMotion]);
  return <div ref={ref} className={`${className} ${entered && !reducedMotion ? 'reveal-entered' : ''}`}>{children}</div>;
}
