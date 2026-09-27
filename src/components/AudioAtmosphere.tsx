import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AudioAtmosphere = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<number | null>(null);

  const startOceanWaves = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      // Create pink/brown noise buffer for ocean surf
      const bufferSize = ctx.sampleRate * 4;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
        b6 = white * 0.115926;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      // Lowpass filter for deep ocean rumble
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);

      const mainGain = ctx.createGain();
      mainGain.gain.setValueAtTime(0.01, ctx.currentTime);
      gainNodeRef.current = mainGain;

      whiteNoise.connect(filter);
      filter.connect(mainGain);
      mainGain.connect(ctx.destination);

      whiteNoise.start(0);

      // Smooth wave swell modulation: breathing in and out every ~6 seconds
      let wavePhase = 0;
      intervalRef.current = window.setInterval(() => {
        if (!audioCtxRef.current || !gainNodeRef.current) return;
        wavePhase += 0.15;
        const swell = Math.sin(wavePhase) * 0.5 + 0.5; // 0 to 1
        const targetVol = 0.04 + swell * 0.14;
        const targetFreq = 280 + swell * 450;
        filter.frequency.setTargetAtTime(targetFreq, ctx.currentTime, 0.4);
        mainGain.gain.setTargetAtTime(targetVol, ctx.currentTime, 0.4);
      }, 200);

      setIsPlaying(true);
    } catch (e) {
      console.warn('Audio context init prevented:', e);
      setIsPlaying(false);
    }
  };

  const stopOceanWaves = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsPlaying(false);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopOceanWaves();
    } else {
      startOceanWaves();
    }
  };

  useEffect(() => {
    return () => {
      stopOceanWaves();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggleAudio}
      className={`fixed bottom-6 right-6 z-40 flex items-center space-x-2.5 px-4 py-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 border ${
        isPlaying
          ? 'bg-[#0077B6] text-white border-cyan-300/40 shadow-cyan-600/30 scale-105'
          : 'bg-white/90 text-[#0A192F] border-slate-200/80 hover:border-[#0077B6]/40 hover:text-[#0077B6]'
      }`}
      aria-label={isPlaying ? 'Tắt âm thanh sóng biển' : 'Bật âm thanh sóng biển'}
      title="Trải nghiệm âm thanh sóng biển Sơn Trà"
    >
      {isPlaying ? (
        <>
          <Volume2 size={16} className="text-white animate-pulse" />
          <div className="flex items-center space-x-0.5 h-3">
            <span className="w-0.5 h-full bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-0.5 h-2/3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-0.5 h-full bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
          <span className="text-xs font-medium">Sóng biển đang mở</span>
        </>
      ) : (
        <>
          <VolumeX size={16} className="text-[#4A5568]" />
          <span className="text-xs font-medium">Âm thanh sóng biển</span>
        </>
      )}
    </button>
  );
};
