import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { OCEAN_SCENES } from './oceanScenes';
import { OceanArtwork, type OceanArtworkName } from './OceanArtwork';
import './ocean.css';

interface Props {
  activeSectionId: string;
  paused: boolean;
  reducedMotion: boolean;
}

export const OceanLivingBackground = ({ activeSectionId, paused, reducedMotion }: Props) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [loadedArtwork, setLoadedArtwork] = useState<OceanArtworkName[]>([]);
  const controlRef = useRef({ paused, density: 0.7 });
  const wakeRef = useRef<(() => void) | null>(null);
  const scene = OCEAN_SCENES[activeSectionId] ?? OCEAN_SCENES['vung-thung'];
  // Keep procedural fallback hidden while the previous decoded scene is retained.
  const artworkReady = loadedArtwork.length > 0;

  useEffect(() => {
    controlRef.current = { paused, density: scene.particles };
    wakeRef.current?.();
  }, [paused, scene.particles]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let width = 0;
    let height = 0;
    let mobile = false;
    let frame = 0;
    let lastTime = 0;
    let density = controlRef.current.density;
    const particles = Array.from({ length: 32 }, () => ({
      x: Math.random(), y: Math.random(), radius: 0.7 + Math.random() * 1.4,
      speed: 0.008 + Math.random() * 0.01,
    }));

    const draw = (dt: number) => {
      ctx.clearRect(0, 0, width, height);
      density += (controlRef.current.density - density) * Math.min(1, dt * 4);
      const count = mobile ? 12 : 32;
      particles.slice(0, count).forEach((p, index) => {
        p.y = (p.y - p.speed * dt + 1) % 1;
        p.x = (p.x + p.speed * dt * 0.15) % 1;
        const alpha = Math.max(0, Math.min(1, density * count - index));
        // Keep luminous flecks at the edges, away from the reading column.
        const x = (index % 2 ? 0.88 + p.x * 0.12 : p.x * 0.12) * width;
        ctx.beginPath();
        ctx.arc(x, p.y * height, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(53, 156, 186, ${alpha * 0.35})`;
        ctx.fill();
      });
    };
    const render = (time: number) => {
      frame = 0;
      if (controlRef.current.paused) return;
      if (!lastTime) lastTime = time;
      const elapsed = time - lastTime;
      if (elapsed >= (mobile ? 1000 / 30 : 1000 / 60)) {
        draw(Math.min(elapsed / 1000, 0.1));
        lastTime = time - elapsed % (mobile ? 1000 / 30 : 1000 / 60);
      }
      frame = requestAnimationFrame(render);
    };
    const wake = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      if (controlRef.current.paused) {
        density = controlRef.current.density;
        draw(0);
      } else {
        frame = requestAnimationFrame(render);
      }
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      mobile = width < 768;
      const dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };
    wakeRef.current = wake;
    resize();
    wake();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(frame);
      wakeRef.current = null;
      window.removeEventListener('resize', resize);
    };
  }, []);

  const style = {
    '--artwork-strength': scene.artworkStrength,
    '--wave-opacity': scene.waveOpacity,
    '--boat-one': scene.boats > 0 ? 1 : 0,
    '--boat-two': scene.boats > 1 ? 1 : 0,
    '--basket': scene.basket ? 1 : 0,
    '--whale': scene.whale ? 1 : 0,
  } as CSSProperties;

  return (
    <div className="ocean-background" aria-hidden="true" data-ocean-scene={activeSectionId}
      data-paused={paused} data-reduced-motion={reducedMotion} data-artwork-ready={artworkReady} style={style}>
      {Object.entries(OCEAN_SCENES).map(([id, colors]) => (
        <div key={id} className="ocean-palette" style={{
          opacity: id === activeSectionId ? 1 : 0,
          background: `radial-gradient(ellipse at 12% 12%, ${colors.light} 0%, transparent 48%), linear-gradient(${colors.sky}, #f8fafc 48%, ${colors.sea})`,
        }} />
      ))}
      <OceanArtwork name={scene.artwork} loaded={loadedArtwork}
        onLoad={name => setLoadedArtwork(previous => previous.includes(name) ? previous : [...previous, name])}
        onError={name => setLoadedArtwork(previous => previous.filter(item => item !== name))} />
      <div className="ocean-reading-light" />
      <div className="ocean-waterlight ocean-moving" />
      <svg className="ocean-canopy ocean-moving" viewBox="0 0 200 170" fill="none">
        <path d="M-10 0 Q50 30 145 95 M35 26 Q42 63 65 116 M75 47 Q106 30 169 41" stroke="#49633b" strokeWidth="2" />
        <g fill="#708553">
          <path d="M20 20 Q-4 46 21 58 Q38 37 20 20 M43 32 Q64 3 84 18 Q72 39 43 32 M62 48 Q40 78 65 88 Q80 65 62 48 M88 62 Q107 32 129 49 Q115 73 88 62 M109 79 Q94 110 118 118 Q135 95 109 79 M135 89 Q152 63 174 80 Q157 101 135 89 M45 64 Q14 70 26 94 Q47 93 45 64 M59 97 Q85 91 91 118 Q69 131 59 97 M123 37 Q143 10 160 27 Q145 46 123 37" />
        </g>
      </svg>
      <div className="ocean-light ocean-moving" />
      <div className="ocean-reflection ocean-moving" />
      <div className="ocean-waves">
        {[0, 1].map(layer => (
          <div key={layer} className={`ocean-wave-track ocean-moving ocean-wave-${layer}`}>
            {[0, 1].map(copy => (
              <svg key={copy} viewBox="0 0 1440 120" preserveAspectRatio="none">
                <path d="M0 45 C240 5 480 5 720 45 C960 85 1200 85 1440 45 V120 H0 Z" fill="currentColor" />
              </svg>
            ))}
          </div>
        ))}
      </div>
      {[0, 1].map(index => (
        <div key={index} data-active={scene.boats > index} className={`ocean-object ocean-boat ocean-boat-${index}`}>
          <div className="ocean-drift ocean-moving">
            <div className="ocean-bob ocean-moving">
              <FishingBoat />
            </div>
          </div>
        </div>
      ))}
      <div className="ocean-object ocean-basket" data-active={scene.basket}><div className="ocean-bob ocean-moving"><BasketBoat /></div></div>
      <div className="ocean-object ocean-whale" data-active={scene.whale}><div className="ocean-whale-path ocean-moving"><Whale /></div></div>
      <canvas ref={canvasRef} className="ocean-particles" />
    </div>
  );
};

function FishingBoat() { return (<svg viewBox="0 0 120 75" className="w-full h-full drop-shadow-sm">
          {/* Water Wake Ripple */}
          <ellipse cx="60" cy="62" rx="45" ry="3.5" fill="#E0F2FE" opacity="0.6" />
          <path d="M15,62 Q60,65 105,62" stroke="#BAE6FD" strokeWidth="1" strokeDasharray="3 3" />

          {/* Wooden Boat Hull */}
          <path d="M20,48 L100,48 L90,62 L32,62 Z" fill="#0369A1" stroke="#0284C7" strokeWidth="0.8" />
          <path d="M32,62 L90,62 L85,65 L37,65 Z" fill="#B91C1C" /> {/* Red bottom hull */}

          {/* Cabin & Mast */}
          <rect x="52" y="34" width="24" height="14" rx="2" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="0.8" />
          <rect x="56" y="37" width="6" height="5" rx="1" fill="#0284C7" />
          <rect x="66" y="37" width="6" height="5" rx="1" fill="#0284C7" />

          {/* Mast and National Red Flag */}
          <line x1="64" y1="34" x2="64" y2="14" stroke="#475569" strokeWidth="1.2" />
          <polygon points="64,15 76,19 64,23" fill="#DC2626" />
          <circle cx="68" cy="19" r="1.2" fill="#FBBF24" />

          {/* Bow Lamp */}
          <circle cx="100" cy="46" r="2" fill="#FEF08A" opacity="0.9" />
        </svg>); }

function BasketBoat() { return (<svg viewBox="0 0 60 50" className="w-full h-full drop-shadow-sm">
          {/* Water Ripple Circles */}
          <ellipse cx="30" cy="38" rx="24" ry="4" fill="#E0F2FE" opacity="0.6" />
          <ellipse cx="30" cy="38" rx="18" ry="2.5" fill="#BAE6FD" opacity="0.5" />

          {/* Woven Basket Outer Circle */}
          <ellipse cx="30" cy="30" rx="20" ry="12" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <ellipse cx="30" cy="28" rx="18" ry="10" fill="#B45309" />
          <ellipse cx="30" cy="27" rx="16" ry="8" fill="#78350F" />

          {/* Bamboo Weave Textures */}
          <path d="M16,28 Q30,36 44,28" stroke="#FDE68A" strokeWidth="0.8" fill="none" opacity="0.7" />
          <path d="M18,30 Q30,38 42,30" stroke="#FDE68A" strokeWidth="0.8" fill="none" opacity="0.7" />

          {/* Wooden Paddle across the rim */}
          <line x1="10" y1="18" x2="45" y2="38" stroke="#F8FAFC" strokeWidth="1.5" strokeLinecap="round" />
          <ellipse cx="43" cy="37" rx="5" ry="2.5" fill="#E2E8F0" transform="rotate(30 43 37)" />
        </svg>); }

function Whale() { return (<svg
            viewBox="0 0 260 120"
            className="w-full h-full drop-shadow-md transition-transform duration-500 "
            fill="none"
          >
            <defs>
              <linearGradient id="whale-body-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#0A2540" stopOpacity="0.85" />
                <stop offset="50%" stopColor="#0077B6" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.65" />
              </linearGradient>
              <linearGradient id="whale-belly-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            {/* Whale Main Body & Head */}
            <path
              d="M40,55 C60,25 120,20 180,35 C210,42 235,55 250,58 C235,62 210,72 180,78 C120,88 65,85 40,55 Z"
              fill="url(#whale-body-grad)"
              stroke="#38BDF8"
              strokeWidth="0.8"
            />

            {/* Whale Underbelly Throat Grooves */}
            <path
              d="M45,58 C65,75 110,80 160,74 C130,82 80,80 45,58 Z"
              fill="url(#whale-belly-grad)"
            />
            {/* Throat Grooves Lines */}
            <path d="M60,65 Q100,74 140,71" stroke="#BAE6FD" strokeWidth="0.6" strokeDasharray="3 2" />
            <path d="M70,68 Q110,76 150,72" stroke="#BAE6FD" strokeWidth="0.6" strokeDasharray="3 2" />

            {/* Whale Eye with spiritual star gleam */}
            <circle cx="55" cy="50" r="2" fill="#E0F2FE" />
            <circle cx="55" cy="50" r="0.9" fill="#0A192F" />
            <circle cx="56" cy="49" r="0.5" fill="#FFFFFF" />

            {/* Constellation-like Spiritual Star Dots along body */}
            <circle cx="95" cy="42" r="1.2" fill="#7DD3FC" opacity="0.9" />
            <circle cx="118" cy="46" r="1" fill="#7DD3FC" opacity="0.8" />
            <circle cx="140" cy="48" r="1.3" fill="#7DD3FC" opacity="0.9" />
            <circle cx="165" cy="45" r="1" fill="#7DD3FC" opacity="0.7" />
            <line x1="95" y1="42" x2="118" y2="46" stroke="#38BDF8" strokeWidth="0.4" opacity="0.5" />
            <line x1="118" y1="46" x2="140" y2="48" stroke="#38BDF8" strokeWidth="0.4" opacity="0.5" />
            <line x1="140" y1="48" x2="165" y2="45" stroke="#38BDF8" strokeWidth="0.4" opacity="0.5" />

            {/* Pectoral Flipper (Wing Fin) */}
            <path
              d="M95,65 C115,85 130,105 125,108 C120,110 105,95 90,72 Z"
              fill="#0077B6"
              opacity="0.8"
              stroke="#7DD3FC"
              strokeWidth="0.7"
            />

            {/* Dorsal Fin */}
            <path
              d="M175,34 C185,22 195,20 198,24 C195,30 190,36 182,36 Z"
              fill="#0284C7"
              opacity="0.9"
            />

            {/* Tail Fluke (Oscillating) */}
            <g className="animate-whale-fluke">
              <path
                d="M245,58 C255,42 265,30 258,28 C250,30 248,48 240,56 C248,64 250,82 258,84 C265,82 255,70 245,58 Z"
                fill="#0077B6"
                stroke="#38BDF8"
                strokeWidth="0.8"
              />
            </g>
          </svg>); }
