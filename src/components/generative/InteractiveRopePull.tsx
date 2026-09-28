import { useEffect, useRef, useState, type PointerEvent } from 'react';
import { GripHorizontal, RotateCcw } from 'lucide-react';
import { useVisibleMotion } from '../../hooks/useMotion';

const chants = ['Cùng giữ một nhịp, cùng kéo một tấm lưới.', 'Đôi chân bám cát, đôi tay cùng hướng về bờ.', 'Nhịp kéo nối những người bạn chài.', 'Đồng lòng trong công việc, gắn bó với biển.'];
export function InteractiveRopePull() {
  const container = useRef<HTMLDivElement>(null);
  const { paused, reducedMotion } = useVisibleMotion(container);
  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [stageWidth, setStageWidth] = useState(500);
  const stageRef = useRef<HTMLDivElement>(null);
  const gesture = useRef<{ id: number; startX: number; startY: number; offset: number } | null>(null);
  const gripRef = useRef<HTMLButtonElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const observer = new ResizeObserver(([entry]) => setStageWidth(Math.max(1, entry.contentRect.width)));
    observer.observe(stage);
    return () => observer.disconnect();
  }, []);
  if (paused && (offset !== 0 || dragging)) { setOffset(0); setDragging(false); }
  useEffect(() => {
    if (paused) { if (timer.current) clearTimeout(timer.current); gesture.current = null; }
    return () => { if (timer.current) clearTimeout(timer.current); };
  }, [paused]);
  const pull = () => {
    setCount(value => value + 1);
    if (timer.current) clearTimeout(timer.current);
    if (reducedMotion || paused) return;
    setOffset(48);
    timer.current = setTimeout(() => setOffset(0), 220);
  };
  const down = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    gesture.current = { id: event.pointerId, startX: event.clientX, startY: event.clientY, offset: 0 };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: PointerEvent<HTMLButtonElement>) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    const dx = event.clientX - current.startX, dy = event.clientY - current.startY;
    if (Math.abs(dy) > Math.abs(dx) && Math.abs(dy) > 10) { finish(event, false); return; }
    if (Math.abs(dx) < 6) return;
    current.offset = Math.max(-64, Math.min(64, dx));
    setDragging(true);
    if (!reducedMotion) setOffset(current.offset);
  };
  const finish = (event: PointerEvent<HTMLButtonElement>, commit: boolean) => {
    const current = gesture.current;
    if (!current || current.id !== event.pointerId) return;
    if (commit && Math.abs(current.offset) >= 16) setCount(value => value + 1);
    gesture.current = null;
    setDragging(false); setOffset(0);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };
  const tension = Math.abs(offset) * .28;
  const curveOffset = offset * 500 / stageWidth;
  return <div ref={container} className="interaction-card" data-motion-paused={paused}><p className="eyebrow">Ký ức lao động</p><h3>Cùng nhau kéo lưới</h3><p className="secondary-copy">Kéo điểm nắm sang ngang rồi thả tay, hoặc dùng nút “Kéo tiếp”.</p>
    <div ref={stageRef} className="rope-stage"><svg viewBox="0 0 500 150" preserveAspectRatio="none" aria-hidden="true"><path d={'M10 75 Q' + (250 + curveOffset * 2) + ' ' + (75 + tension * 2) + ' 490 75'} fill="none" stroke="#294854" strokeWidth="6" strokeLinecap="round" /><path d={'M10 75 Q' + (250 + curveOffset * 2) + ' ' + (75 + tension * 2) + ' 490 75'} fill="none" stroke="#c7a35d" strokeWidth="3" strokeDasharray="7 6" /></svg><button ref={gripRef} type="button" className="rope-grip" data-dragging={dragging} style={{ transform: 'translate(' + offset + 'px, ' + tension + 'px)' }} aria-label="Điểm nắm kéo lưới" onPointerDown={down} onPointerMove={move} onPointerUp={event => finish(event, true)} onPointerCancel={event => finish(event, false)} onLostPointerCapture={event => finish(event, false)} onClick={event => { if (event.detail === 0) pull(); }}><GripHorizontal size={22} /></button></div>
    <div className="rope-result"><p role="status">Đã cùng kéo {count} nhịp</p><p className="secondary-copy">{chants[count % chants.length]}</p><button type="button" className="button secondary" onClick={pull}><RotateCcw size={18} /> Kéo tiếp</button></div>
  </div>;
}
