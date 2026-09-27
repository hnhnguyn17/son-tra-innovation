import { X, Image, Video, Sparkles, Check, Copy } from 'lucide-react';
import { useState } from 'react';

export interface MediaSlotInfo {
  title: string;
  type: 'video' | 'image' | '3d' | 'audio';
  aspectRatio: string;
  recommendedSize: string;
  targetFile: string;
  description: string;
}

interface MediaModalProps {
  slot: MediaSlotInfo | null;
  onClose: () => void;
}

export const MediaModal = ({ slot, onClose }: MediaModalProps) => {
  const [copied, setCopied] = useState(false);

  if (!slot) return null;

  const copyPath = () => {
    navigator.clipboard.writeText(slot.targetFile).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-[#0A192F]/80 backdrop-blur-md animate-fade-rise"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-white p-6 sm:p-8 shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-[#0A192F] transition-colors"
          aria-label="Đóng cửa sổ thông tin khung"
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 text-[#0077B6] mb-4">
          <div className="w-10 h-10 rounded-xl bg-cyan-50 flex items-center justify-center border border-cyan-100">
            {slot.type === 'video' ? (
              <Video size={20} />
            ) : slot.type === 'image' ? (
              <Image size={20} />
            ) : (
              <Sparkles size={20} />
            )}
          </div>
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0077B6]">
              Khung truyền thông tương tác
            </span>
            <h3 id="modal-title" className="text-xl font-serif font-bold text-[#0A192F]">
              {slot.title}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[#4A5568] leading-relaxed">
          {slot.description}
        </p>

        {/* Specifications Box */}
        <div className="mt-5 p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs">
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-[#4A5568] font-medium">Tỉ lệ khung hình khuyến nghị:</span>
            <span className="font-semibold text-[#0A192F]">{slot.aspectRatio}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-slate-200/60">
            <span className="text-[#4A5568] font-medium">Độ phân giải tối ưu:</span>
            <span className="font-semibold text-[#0A192F]">{slot.recommendedSize}</span>
          </div>
          <div className="flex flex-col pt-1">
            <span className="text-[#4A5568] font-medium mb-1">Vị trí chèn tệp trong mã nguồn:</span>
            <div className="flex items-center justify-between p-2 rounded bg-white border border-slate-200 font-mono text-[11px] text-[#0077B6]">
              <span className="truncate mr-2">{slot.targetFile}</span>
              <button
                type="button"
                onClick={copyPath}
                className="shrink-0 p-1 hover:bg-slate-100 rounded text-[#4A5568] hover:text-[#0A192F]"
                title="Sao chép đường dẫn"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
              </button>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
          <span className="text-xs text-[#4A5568]/80 italic">
            * Khung đã tích hợp sẵn responsive và lazy-load
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-full bg-[#0A192F] text-white text-xs font-semibold hover:bg-[#0077B6] transition-colors"
          >
            Đã hiểu
          </button>
        </div>
      </div>
    </div>
  );
};
