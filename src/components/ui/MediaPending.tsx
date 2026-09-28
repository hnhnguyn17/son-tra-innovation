import { Image } from 'lucide-react';

export function MediaPending({ title, description }: { title: string; description?: string }) {
  return <div className="media-pending"><Image size={28} aria-hidden="true" /><p className="eyebrow">Tư liệu đang được bổ sung</p><h3>{title}</h3>{description && <p>{description}</p>}</div>;
}
