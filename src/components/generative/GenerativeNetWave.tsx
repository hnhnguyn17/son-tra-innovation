import { useEffect, useRef } from 'react';
import { Waves, Sparkles } from 'lucide-react';

interface Point {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const GenerativeNetWave = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 600);
    let height = (canvas.height = canvas.parentElement?.clientHeight || 340);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
      initGrid();
    };
    window.addEventListener('resize', handleResize);

    const cols = 22;
    const rows = 11;
    let grid: Point[][] = [];

    const initGrid = () => {
      grid = [];
      const stepX = width / (cols - 1);
      const stepY = height / (rows - 1);

      for (let r = 0; r < rows; r++) {
        const rowPoints: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const x = c * stepX;
          const y = r * stepY;
          rowPoints.push({
            baseX: x,
            baseY: y,
            x,
            y,
            vx: 0,
            vy: 0,
          });
        }
        grid.push(rowPoints);
      }
    };

    initGrid();

    // Mouse interaction tracking
    let mouseX = -1000;
    let mouseY = -1000;
    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    let time = 0;

    const render = () => {
      time += 0.025;
      ctx.clearRect(0, 0, width, height);

      // Update point positions with wave math + spring physics
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];

          // 3D Sine wave displacement for fishing net silk motion
          const waveOffsetY = Math.sin(c * 0.35 + time) * 12 + Math.cos(r * 0.4 + time * 0.8) * 8;
          const targetY = pt.baseY + waveOffsetY;
          const targetX = pt.baseX + Math.sin(r * 0.3 + time * 0.6) * 6;

          // Mouse pull elasticity (kéo dãn mắt lưới)
          const dx = mouseX - pt.x;
          const dy = mouseY - pt.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const pullRadius = 130;

          if (dist < pullRadius && dist > 0) {
            const force = (1 - dist / pullRadius) * 22;
            pt.vx += (dx / dist) * force * 0.12;
            pt.vy += (dy / dist) * force * 0.12;
          }

          // Spring tension return
          const spring = 0.08;
          const friction = 0.84;
          pt.vx += (targetX - pt.x) * spring;
          pt.vy += (targetY - pt.y) * spring;
          pt.vx *= friction;
          pt.vy *= friction;
          pt.x += pt.vx;
          pt.y += pt.vy;
        }
      }

      // Draw diamond rhombuses (mắt lưới đánh cá)
      ctx.lineWidth = 1;

      // Draw horizontal lines connecting net nodes
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const pt = grid[r][c];
          if (c === 0) ctx.moveTo(pt.x, pt.y);
          else ctx.lineTo(pt.x, pt.y);
        }
        ctx.strokeStyle = 'rgba(0, 119, 182, 0.25)';
        ctx.stroke();
      }

      // Draw diagonal cross lines for diamond mesh
      for (let r = 0; r < rows - 1; r++) {
        for (let c = 0; c < cols - 1; c++) {
          const p1 = grid[r][c];
          const p2 = grid[r + 1][c + 1];
          const p3 = grid[r][c + 1];
          const p4 = grid[r + 1][c];

          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = 'rgba(0, 119, 182, 0.18)';
          ctx.stroke();

          ctx.beginPath();
          ctx.moveTo(p3.x, p3.y);
          ctx.lineTo(p4.x, p4.y);
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
          ctx.stroke();
        }
      }

      // Draw glowing net knots (nút thắt mắt lưới)
      for (let r = 0; r < rows; r += 2) {
        for (let c = 0; c < cols; c += 2) {
          const pt = grid[r][c];
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(0, 119, 182, 0.6)';
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[220px] rounded-2xl overflow-hidden bg-gradient-to-br from-sky-50/70 via-white to-cyan-50/50 border border-slate-200/80 shadow-xs flex flex-col justify-between p-4">
      {/* Top Banner */}
      <div className="relative z-10 flex items-center justify-between text-xs">
        <div className="flex items-center space-x-1.5 text-[#0077B6] font-semibold text-[11px] uppercase tracking-wider">
          <Waves size={14} className="text-[#0077B6]" />
          <span>Sóng lưới thời gian (Generative Mesh)</span>
        </div>
        <span className="text-[10px] text-[#4A5568]/70 italic flex items-center">
          <Sparkles size={11} className="mr-1 text-[#0077B6]" />
          Rê chuột để kéo dãn mắt lưới
        </span>
      </div>

      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Bottom Footnote */}
      <div className="relative z-10 flex items-center justify-between text-[10px] text-[#4A5568]/80 pt-2 border-t border-slate-200/50">
        <span>Tái hiện tấm lưới rùng bãi cát Mân Thái</span>
        <span className="font-mono text-[#0077B6]">Thuật toán sóng sin 3D</span>
      </div>
    </div>
  );
};
