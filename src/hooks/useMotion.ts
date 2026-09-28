import { createContext, useContext, useEffect, useState, type RefObject } from 'react';

export const MotionContext = createContext({ reducedMotion: false, paused: false, changeDialogs: (_delta: number) => {} });

export function useMotion() { return useContext(MotionContext); }

export function useVisibleMotion(ref: RefObject<HTMLElement | null>) {
  const motion = useMotion();
  const [visible, setVisible] = useState(() => !('IntersectionObserver' in window));
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (!('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0 });
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref]);
  return { ...motion, paused: motion.paused || !visible };
}
