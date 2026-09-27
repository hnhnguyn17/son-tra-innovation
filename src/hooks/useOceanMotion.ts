import { useEffect, useState } from 'react';

const STORAGE_KEY = 'sontra:ocean-paused';

export function useOceanMotion(modalOpen: boolean) {
  const [userPaused, setUserPaused] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [hidden, setHidden] = useState(() => document.hidden);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updateMotion = () => setReducedMotion(media.matches);
    const updateVisibility = () => setHidden(document.hidden);
    media.addEventListener('change', updateMotion);
    document.addEventListener('visibilitychange', updateVisibility);
    return () => {
      media.removeEventListener('change', updateMotion);
      document.removeEventListener('visibilitychange', updateVisibility);
    };
  }, []);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, String(userPaused)); } catch { /* Private browsing can disable storage. */ }
  }, [userPaused]);

  return {
    userPaused,
    reducedMotion,
    paused: userPaused || reducedMotion || hidden || modalOpen,
    togglePaused: () => setUserPaused(value => !value),
  };
}
