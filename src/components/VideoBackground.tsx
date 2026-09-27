import { useEffect, useRef } from 'react';

const VIDEO_URL =
  'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-the-ocean-waves-crashing-on-the-beach-4008-large.mp4';

export const VideoBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let animationFrameId: number;
    let timeoutId: number | null = null;
    let isResetting = false;
    const fadeDuration = 0.5; // 0.5s fade in / fade out

    const updateFade = () => {
      if (video && !isResetting && video.duration && !video.paused) {
        const { currentTime, duration } = video;
        let opacity = 1;

        if (currentTime < fadeDuration) {
          // Fade in over 0.5s at the start (opacity 0 to 1)
          opacity = Math.max(0, Math.min(1, currentTime / fadeDuration));
        } else if (currentTime > duration - fadeDuration) {
          // Fade out over 0.5s before the end (opacity 1 to 0)
          opacity = Math.max(0, Math.min(1, (duration - currentTime) / fadeDuration));
        } else {
          opacity = 1;
        }

        video.style.opacity = opacity.toString();
      }

      animationFrameId = requestAnimationFrame(updateFade);
    };

    const handleEnded = () => {
      if (isResetting) return;
      isResetting = true;

      // On ended event: set opacity to 0, wait 100ms, reset currentTime = 0, then play() again
      video.style.opacity = '0';

      timeoutId = window.setTimeout(() => {
        try {
          video.currentTime = 0;
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise
              .catch((err) => {
                console.warn('Playback resume issue:', err);
              })
              .finally(() => {
                isResetting = false;
              });
          } else {
            isResetting = false;
          }
        } catch {
          isResetting = false;
        }
      }, 100);
    };

    video.addEventListener('ended', handleEnded);
    animationFrameId = requestAnimationFrame(updateFade);

    // Initial play trigger
    video.play().catch((err) => {
      console.warn('Initial autoplay prevented or pending:', err);
    });

    return () => {
      cancelAnimationFrame(animationFrameId);
      if (timeoutId) clearTimeout(timeoutId);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden select-none">
      {/* Background video layer (z-0) */}
      <video
        ref={videoRef}
        src={VIDEO_URL}
        muted
        playsInline
        autoPlay
        preload="auto"
        className="absolute inset-0 object-cover w-full h-full z-0 transition-opacity"
        style={{ opacity: 0 }}
      />

      {/* Gradient overlay on video (z-1) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white/90 z-[1]"
        aria-hidden="true"
      />
    </div>
  );
};
