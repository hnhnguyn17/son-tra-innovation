import { Volume2, Square } from 'lucide-react';
import { useSpeech } from '../../hooks/useSpeech';

export function SpeechButton({ text }: { text: string }) {
  const { status, error, toggle } = useSpeech(text);
  return <div className="speech-control"><button type="button" className="button secondary" onClick={toggle} aria-pressed={status !== 'idle'}>
    {status === 'idle' ? <Volume2 size={18} /> : <Square size={16} />}
    {status === 'playing' ? 'Dừng giọng đọc tổng hợp' : status === 'loading' ? 'Đang chuẩn bị giọng đọc…' : 'Nghe giọng đọc tổng hợp'}
  </button><p className="sr-only" role="status">{status === 'playing' ? 'Đang phát giọng đọc tổng hợp' : ''}</p>{error && <p className="feedback" role="status">{error}</p>}</div>;
}
