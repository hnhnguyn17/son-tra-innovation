import { useEffect, useRef } from 'react';

interface Lantern {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  radius: number;
  hue: number;
  brightness: number;
  phase: number;
  speed: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export const WaterLanternCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Drifting boat lights & lanterns inside Tho Quang harbour
    const lanternCount = Math.min(22, Math.floor(width / 60));
    const lanterns: Lantern[] = Array.from({ length: lanternCount }, () => {
      const x = Math.random() * width;
      const y = height * 0.5 + Math.random() * (height * 0.48);
      return {
        x,
        y,
        baseX: x,
        baseY: y,
        radius: Math.random() * 2.8 + 1.8,
        hue: Math.random() > 0.35 ? 38 : 198, // Warm amber boat light (38) or ocean cyan reflection (198)
        brightness: Math.random() * 0.4 + 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: Math.random() * 0.015 + 0.008,
      };
    });

    const ripples: Ripple[] = [];

    const handlePointerMove = (e: MouseEvent) => {
      if (Math.random() > 0.88) {
        ripples.push({
          x: e.clientX,
          y: e.clientY,
          radius: 2,
          maxRadius: Math.random() * 55 + 30,
          alpha: 0.35,
        });
      }
    };
    window.addEventListener('mousemove', handlePointerMove);

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw expanding water ripples from user interaction
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += 0.85;
        r.alpha *= 0.965;

        ctx.save();
        ctx.beginPath();
        ctx.ellipse(r.x, r.y, r.radius * 1.6, r.radius * 0.6, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 119, 182, ${r.alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
        ctx.restore();

        if (r.alpha < 0.02 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
        }
      }

      // 2. Draw drifting lanterns with gentle water displacement
      lanterns.forEach((l) => {
        l.phase += l.speed;
        // Swaying drift
        l.x = l.baseX + Math.sin(l.phase * 0.8) * 16;
        l.y = l.baseY + Math.cos(l.phase * 1.1) * 8;

        const pulse = Math.sin(l.phase * 2) * 0.15 + 0.85;
        const currentRadius = l.radius * pulse;

        // Outer Water Reflection Glow
        const gradient = ctx.createRadialGradient(
          l.x,
          l.y,
          0,
          l.x,
          l.y,
          currentRadius * 6
        );
        gradient.addColorStop(0, `hsla(${l.hue}, 95%, 65%, ${l.brightness * 0.6})`);
        gradient.addColorStop(0.4, `hsla(${l.hue}, 90%, 55%, ${l.brightness * 0.15})`);
        gradient.addColorStop(1, 'transparent');

        ctx.beginPath();
        ctx.arc(l.x, l.y, currentRadius * 6, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Inner glowing core of boat light
        ctx.beginPath();
        ctx.arc(l.x, l.y, currentRadius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${l.hue}, 100%, 88%, ${l.brightness * 0.9})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `hsla(${l.hue}, 100%, 70%, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Submerged reflection stretch
        ctx.beginPath();
        ctx.ellipse(l.x, l.y + currentRadius * 3, currentRadius * 2, currentRadius * 0.8, 0, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${l.hue}, 95%, 60%, ${l.brightness * 0.2})`;
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[1] overflow-hidden"
      aria-hidden="true"
    />
  );
};
