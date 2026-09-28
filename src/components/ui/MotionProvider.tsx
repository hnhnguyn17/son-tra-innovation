import { useCallback, useEffect, useState, type ReactNode } from 'react';
import { MotionContext } from '../../hooks/useMotion';

export function MotionProvider({ children }: { children: ReactNode }) {
  const [reducedMotion, setReducedMotion] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hidden, setHidden] = useState(() => document.hidden);
  const [dialogs, setDialogs] = useState(0);
  const changeDialogs = useCallback((delta: number) => setDialogs(count => Math.max(0, count + delta)), []);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const motion = () => setReducedMotion(media.matches);
    const visibility = () => setHidden(document.hidden);
    media.addEventListener('change', motion);
    document.addEventListener('visibilitychange', visibility);
    return () => {
      media.removeEventListener('change', motion);
      document.removeEventListener('visibilitychange', visibility);
    };
  }, []);
  return <MotionContext.Provider value={{ reducedMotion, paused: reducedMotion || hidden || dialogs > 0, changeDialogs }}>{children}</MotionContext.Provider>;
}
