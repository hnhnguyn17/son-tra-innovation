import { useLayoutEffect, useRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { useMotion } from '../../hooks/useMotion';

export function Dialog({ title, onClose, children, className = '', id }: {
  title: string; onClose: () => void; children: ReactNode; className?: string; id?: string;
}) {
  const panel = useRef<HTMLDivElement>(null);
  const closeRef = useRef(onClose);
  const { changeDialogs } = useMotion();
  useLayoutEffect(() => { closeRef.current = onClose; });
  useLayoutEffect(() => {
    const element = panel.current;
    if (!element) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const root = document.getElementById('root');
    const wasInert = root?.inert ?? false;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    changeDialogs(1);
    const focusables = () => [...element.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex="0"]')]
      .filter(item => item.getClientRects().length > 0);
    element.querySelector<HTMLElement>('[data-dialog-close]')?.focus({ preventScroll: true });
    if (root) root.inert = true;
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeRef.current(); }
      if (event.key !== 'Tab') return;
      const list = focusables();
      const first = list[0];
      const last = list[list.length - 1];
      if (!first) { event.preventDefault(); element.focus(); return; }
      if (event.shiftKey && (document.activeElement === first || !element.contains(document.activeElement))) {
        event.preventDefault(); last.focus();
      } else if (!event.shiftKey && (document.activeElement === last || !element.contains(document.activeElement))) {
        event.preventDefault(); first.focus();
      }
    };
    const focusin = () => { if (!element.contains(document.activeElement)) (focusables()[0] ?? element).focus(); };
    document.addEventListener('keydown', keydown, true);
    document.addEventListener('focusin', focusin);
    return () => {
      document.removeEventListener('keydown', keydown, true);
      document.removeEventListener('focusin', focusin);
      if (root) root.inert = wasInert;
      document.body.style.overflow = overflow;
      changeDialogs(-1);
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, [changeDialogs]);
  return createPortal(<div className="dialog-backdrop" onClick={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div ref={panel} id={id} role="dialog" aria-modal="true" aria-label={title} tabIndex={-1} className={`dialog-panel ${className}`}>
      <div className="dialog-heading"><h2>{title}</h2><button type="button" data-dialog-close onClick={onClose} className="icon-button" aria-label={className.includes('photo') ? 'Đóng ảnh' : 'Đóng menu điều hướng'}><X size={22} /></button></div>
      {children}
    </div>
  </div>, document.body);
}
