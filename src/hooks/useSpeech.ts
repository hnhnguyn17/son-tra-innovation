import { useEffect, useId, useRef, useState } from 'react';

export function useSpeech(text: string) {
  const id = useId();
  const [status, setStatus] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [error, setError] = useState('');
  const utterance = useRef<SpeechSynthesisUtterance | null>(null);
  const startTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clearStartTimer = () => { if (startTimer.current) clearTimeout(startTimer.current); startTimer.current = null; };
  const stop = () => {
    clearStartTimer();
    if (utterance.current) {
      utterance.current.onstart = null;
      utterance.current.onend = null;
      utterance.current.onerror = null;
      utterance.current = null;
      window.speechSynthesis?.cancel();
    }
    setStatus('idle');
  };
  useEffect(() => {
    const cancel = (event: Event) => { if ((event as CustomEvent<string>).detail !== id) stop(); };
    window.addEventListener('sontra:speech', cancel);
    return () => { window.removeEventListener('sontra:speech', cancel); stop(); };
  }, [id, text]);
  const toggle = () => {
    if (status !== 'idle') { stop(); return; }
    setError('');
    if (typeof window.speechSynthesis?.speak !== 'function' || typeof window.SpeechSynthesisUtterance !== 'function') {
      setError('Trình duyệt chưa hỗ trợ giọng đọc. Bạn có thể đọc toàn bộ nội dung bên dưới.'); return;
    }
    window.dispatchEvent(new CustomEvent('sontra:speech', { detail: id }));
    const speech = new SpeechSynthesisUtterance(text);
    speech.lang = 'vi-VN'; speech.rate = 0.92;
    speech.onstart = () => { clearStartTimer(); setStatus('playing'); };
    speech.onend = () => { clearStartTimer(); utterance.current = null; setStatus('idle'); };
    speech.onerror = () => { clearStartTimer(); utterance.current = null; setStatus('idle'); setError('Chưa phát được giọng đọc tiếng Việt. Vui lòng thử lại.'); };
    utterance.current = speech;
    setStatus('loading');
    startTimer.current = setTimeout(() => { stop(); setError('Giọng đọc chưa sẵn sàng. Vui lòng thử lại.'); }, 10000);
    try { window.speechSynthesis.speak(speech); }
    catch { stop(); setError('Chưa phát được giọng đọc. Vui lòng thử lại.'); }
  };
  return { status, error, toggle };
}
