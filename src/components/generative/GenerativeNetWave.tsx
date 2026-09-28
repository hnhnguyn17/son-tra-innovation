import { useEffect, useRef } from 'react';
import { useVisibleMotion } from '../../hooks/useMotion';

export function GenerativeNetWave() {
  const container = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { paused, reducedMotion } = useVisibleMotion(container);
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = canvas?.parentElement;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx || !stage) return;
    let width = 0, height = 0, frame = 0, last = 0, time = 0;
    let pointer = { x: -1000, y: -1000 };
    let touchStart: { x: number; y: number } | null = null;
    const cols = 20, rows = 10;
    const draw = (delta: number) => {
      time += delta;
      ctx.clearRect(0, 0, width, height);
      const grid = Array.from({ length: rows }, (_, r) => Array.from({ length: cols }, (_, c) => {
        const baseX = c * width / (cols - 1), baseY = r * height / (rows - 1);
        const dx = pointer.x - baseX, dy = pointer.y - baseY;
        const distance = Math.hypot(dx, dy);
        const force = Math.max(0, 1 - distance / 110) * .2;
        return {
          x: baseX + (reducedMotion ? 0 : Math.sin(r * .35 + time * .7) * 5) + dx * force,
          y: baseY + (reducedMotion ? 0 : Math.sin(c * .32 + time * 1.2) * 10 + Math.cos(r * .4 + time) * 5) + dy * force,
        };
      }));
      ctx.lineWidth = 1;
      ctx.strokeStyle = '#087ca43d';
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        grid[r].forEach((p, c) => c ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
        ctx.stroke();
        if (r === rows - 1) continue;
        for (let c = 0; c < cols - 1; c++) {
          ctx.beginPath();
          ctx.moveTo(grid[r][c].x, grid[r][c].y); ctx.lineTo(grid[r + 1][c + 1].x, grid[r + 1][c + 1].y);
          ctx.moveTo(grid[r][c + 1].x, grid[r][c + 1].y); ctx.lineTo(grid[r + 1][c].x, grid[r + 1][c].y);
          ctx.stroke();
        }
      }
      ctx.fillStyle = '#167a9b';
      for (let r = 0; r < rows; r += 2) for (let c = 0; c < cols; c += 2) {
        const p = grid[r][c]; ctx.beginPath(); ctx.arc(p.x, p.y, 2, 0, Math.PI * 2); ctx.fill();
      }
    };
    const resize = () => {
      width = stage.clientWidth; height = stage.clientHeight;
      const dpr = Math.min(devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0); draw(0);
    };
    const updatePointer = (event: PointerEvent) => {
      const bounds = canvas.getBoundingClientRect();
      pointer = { x: event.clientX - bounds.left, y: event.clientY - bounds.top };
      if (paused) draw(0);
    };
    const down = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') touchStart = { x: event.clientX, y: event.clientY };
      else updatePointer(event);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse') {
        if (!touchStart) return;
        const dx = Math.abs(event.clientX - touchStart.x), dy = Math.abs(event.clientY - touchStart.y);
        if (dy > dx && dy > 8) { leave(); return; }
        if (dx < 6) return;
      }
      updatePointer(event);
    };
    const leave = () => { pointer = { x: -1000, y: -1000 }; touchStart = null; if (paused) draw(0); };
    const render = (now: number) => {
      const interval = 1000 / (innerWidth < 768 ? 30 : 60);
      if (!last) last = now;
      const elapsed = now - last;
      if (elapsed >= interval) { draw(Math.min(elapsed / 1000, .1)); last = now - elapsed % interval; }
      frame = requestAnimationFrame(render);
    };
    const observer = new ResizeObserver(resize);
    observer.observe(stage); resize();
    if (!paused) frame = requestAnimationFrame(render);
    canvas.addEventListener('pointerdown', down);
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerleave', leave);
    canvas.addEventListener('pointerup', leave);
    canvas.addEventListener('pointercancel', leave);
    return () => {
      cancelAnimationFrame(frame); observer.disconnect();
      canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerleave', leave); canvas.removeEventListener('pointerup', leave); canvas.removeEventListener('pointercancel', leave);
    };
  }, [paused, reducedMotion]);
  return <div ref={container} className="interaction-card" data-motion-paused={paused}><p className="eyebrow">Chạm vào nhịp biển</p><h3>Sóng lưới thời gian</h3><p className="secondary-copy pointer-hint">Rê chuột để cảm nhận độ giãn của mắt lưới.</p><p className="secondary-copy touch-hint">Chạm và kéo ngang trên lưới. Vuốt dọc để tiếp tục đọc.</p><div className="mesh-stage"><canvas ref={canvasRef} role="img" aria-label="Minh họa mắt lưới rùng biến đổi theo nhịp sóng và vị trí chạm" /></div><p className="secondary-copy mt-4">Một diễn giải bằng hình ảnh về tấm lưới rùng của làng biển.</p></div>;
}
