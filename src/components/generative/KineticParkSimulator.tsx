import { useEffect, useRef, useState } from 'react';
import { Compass, Layers, Sun, Moon } from 'lucide-react';

interface DesignPillar {
  id: 'ky-uc' | 'dong-chay' | 'cam-hung' | 'thich-ung';
  title: string;
  subtitle: string;
  focusArea: string;
  badge: string;
  bullet1Title: string;
  bullet1Text: string;
  bullet2Title: string;
  bullet2Text: string;
}

const DESIGN_PILLARS: DesignPillar[] = [
  {
    id: 'ky-uc',
    title: 'KÝ ỨC',
    subtitle: 'Lưu giữ linh hồn làng chài & Lớp lang thời gian',
    focusArea: 'Lòng hồ trũng giật cấp & Cấu trúc sắp đặt biểu tượng',
    badge: 'Trụ cột 01 · Văn hóa bản địa',
    bullet1Title: 'Ký ức cảng cá:',
    bullet1Text:
      'Lưu giữ linh hồn và dấu ấn của cộng đồng ngư dân Thọ Quang qua nhiều thế hệ trước khi khu vực chuyển đổi chức năng đô thị.',
    bullet2Title: 'Lớp lang thời gian:',
    bullet2Text:
      'Không gian tái hiện nhịp sống bám biển, tiếng hò kéo lưới và ký ức lao động gắn liền với mặt nước qua các cấu trúc sắp đặt mang tính biểu tượng.',
  },
  {
    id: 'dong-chay',
    title: 'DÒNG CHẢY',
    subtitle: 'Dòng chảy chuyển động & Trải nghiệm động lực học',
    focusArea: 'Hệ thống lối đi uốn lượn & Cầu dạo bộ Skywalk trên cao',
    badge: 'Trụ cột 02 · Giao thông cảnh quan',
    bullet1Title: 'Dòng chảy chuyển động:',
    bullet1Text:
      'Hệ thống lối đi uốn lượn mô phỏng đường di chuyển của sóng nước và luồng lạch thuyền bè ra vào cảng Thọ Quang.',
    bullet2Title: 'Trải nghiệm động lực học:',
    bullet2Text:
      'Dẫn dắt nhịp độ người tham quan từ sự tĩnh lặng của mảng xanh đô thị đến điểm nhìn cởi mở hướng ra mặt nước vịnh biển.',
  },
  {
    id: 'cam-hung',
    title: 'CẢM HỨNG',
    subtitle: 'Thuyền thúng truyền thống & Giàn không gian mắt lưới',
    focusArea: 'Hai khối nhà Oval Innovation Hub & Giàn bóng đổ',
    badge: 'Trụ cột 03 · Hình khối & Vật liệu',
    bullet1Title: 'Thuyền thúng truyền thống:',
    bullet1Text:
      'Hình khối tròn và cấu trúc đan lát của thuyền thúng được cách điệu thành các không gian sinh hoạt cộng đồng, ghế nghỉ và chòi trú nắng.',
    bullet2Title: 'Lưới đánh cá:',
    bullet2Text:
      'Hệ thống giàn không gian và vật liệu đan thả tạo hiệu ứng bóng đổ, gợi nhắc đến công cụ lao động quen thuộc của ngư dân.',
  },
  {
    id: 'thich-ung',
    title: 'THÍCH ỨNG',
    subtitle: 'Chuyển đổi không gian & Tính thích ứng đô thị',
    focusArea: 'Khoảng lùi sinh thái & Hồ điều hòa chống ngập',
    badge: 'Trụ cột 04 · Bền vững sinh thái',
    bullet1Title: 'Chuyển đổi không gian:',
    bullet1Text:
      'Điểm giao thoa giữa không gian đô thị hiện tại và ký ức làng chài quá khứ, tạo khoảng lùi xanh cho khu vực ven cảng.',
    bullet2Title: 'Tính thích ứng:',
    bullet2Text:
      'Thiết kế linh hoạt chuẩn bị cho sự thay đổi cấu trúc đô thị khi cảng cá di dời, giữ lại giá trị văn hóa cốt lõi cho khu vực.',
  },
];

export const KineticParkSimulator = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activePillarId, setActivePillarId] = useState<'ky-uc' | 'dong-chay' | 'cam-hung' | 'thich-ung'>('ky-uc');
  const [isNightMode, setIsNightMode] = useState<boolean>(false);
  const animFrameId = useRef<number | null>(null);
  const timeRef = useRef<number>(0);

  const activePillar = DESIGN_PILLARS.find((p) => p.id === activePillarId) || DESIGN_PILLARS[0];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = canvas.parentElement?.clientWidth || 720);
    let height = (canvas.height = Math.min(440, Math.round(width * 0.58)));

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = Math.min(440, Math.round(width * 0.58));
    };

    window.addEventListener('resize', handleResize);

    const render = () => {
      timeRef.current += 0.015;
      const t = timeRef.current;
      const w = width;
      const h = height;
      const cx = w * 0.5;
      const cy = h * 0.52;
      const scale = Math.min(w / 720, 1.15);

      ctx.clearRect(0, 0, w, h);

      // Clean Architectural Background
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      if (isNightMode) {
        bgGrad.addColorStop(0, '#09131f');
        bgGrad.addColorStop(1, '#0f1f33');
      } else {
        bgGrad.addColorStop(0, '#f8fafc');
        bgGrad.addColorStop(1, '#f1f5f9');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      ctx.save();
      ctx.translate(cx, cy);

      // 1. PARK SLAB (Bệ địa hình công viên - Bám sát mô hình SketchUp của bạn)
      ctx.beginPath();
      ctx.ellipse(0, 25 * scale, 280 * scale, 135 * scale, -0.05, 0, Math.PI * 2);
      ctx.fillStyle = isNightMode ? '#162232' : '#ffffff';
      ctx.fill();
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeStyle = isNightMode ? '#2a3b50' : '#cbd5e1';
      ctx.stroke();

      // Drop shadow underneath
      ctx.beginPath();
      ctx.ellipse(0, 36 * scale, 280 * scale, 135 * scale, -0.05, 0, Math.PI * 2);
      ctx.strokeStyle = isNightMode ? 'rgba(0,0,0,0.4)' : 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 4 * scale;
      ctx.stroke();

      // 2. GREEN LAWN MOUNDS (Đồi cỏ xanh)
      // Left hill (under skywalk ramp)
      const isFlowActive = activePillarId === 'dong-chay';
      ctx.beginPath();
      ctx.ellipse(-165 * scale, -10 * scale, 85 * scale, 65 * scale, 0.3, 0, Math.PI * 2);
      ctx.fillStyle = isNightMode
        ? isFlowActive ? '#123d2b' : '#0d281e'
        : isFlowActive ? '#bbf7d0' : '#dcfce7';
      ctx.fill();
      ctx.strokeStyle = isNightMode ? '#1e4d3a' : '#86efac';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();

      // Right grass strip (Khoảng lùi xanh - Thích ứng)
      const isAdaptActive = activePillarId === 'thich-ung';
      ctx.beginPath();
      ctx.ellipse(155 * scale, 35 * scale, 80 * scale, 35 * scale, -0.2, 0, Math.PI * 2);
      ctx.fillStyle = isNightMode
        ? isAdaptActive ? '#123d2b' : '#0d281e'
        : isAdaptActive ? '#bbf7d0' : '#dcfce7';
      ctx.fill();
      ctx.strokeStyle = isNightMode ? '#1e4d3a' : '#86efac';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();

      // 3. KHỐI NHÀ ĐÔI OVAL (Innovation Hub - Cảm hứng thuyền thúng)
      const isInspirationActive = activePillarId === 'cam-hung';
      // Left Oval Building (Glass Facade)
      ctx.save();
      ctx.translate(-45 * scale, -70 * scale);
      ctx.beginPath();
      ctx.ellipse(0, 0, 52 * scale, 30 * scale, -0.15, 0, Math.PI * 2);
      ctx.fillStyle = isNightMode
        ? isInspirationActive ? 'rgba(56, 189, 248, 0.3)' : 'rgba(30, 58, 138, 0.25)'
        : isInspirationActive ? 'rgba(186, 230, 253, 0.9)' : 'rgba(241, 245, 249, 0.9)';
      ctx.fill();
      ctx.lineWidth = isInspirationActive ? 2.5 : 1.5;
      ctx.strokeStyle = isInspirationActive ? '#0077b6' : '#94a3b8';
      ctx.stroke();

      // Glass panels divisions
      for (let g = -2; g <= 2; g++) {
        ctx.beginPath();
        const gx = g * 12 * scale;
        ctx.moveTo(gx, -15 * scale);
        ctx.lineTo(gx, 15 * scale);
        ctx.strokeStyle = isNightMode ? 'rgba(148, 163, 184, 0.3)' : 'rgba(148, 163, 184, 0.5)';
        ctx.lineWidth = 0.8 * scale;
        ctx.stroke();
      }
      ctx.restore();

      // Right Oval Building (with wrap-around balcony ramp)
      ctx.save();
      ctx.translate(75 * scale, -60 * scale);
      ctx.beginPath();
      ctx.ellipse(0, 0, 78 * scale, 42 * scale, 0.1, 0, Math.PI * 2);
      ctx.fillStyle = isNightMode
        ? isInspirationActive ? 'rgba(56, 189, 248, 0.3)' : 'rgba(30, 58, 138, 0.25)'
        : isInspirationActive ? 'rgba(186, 230, 253, 0.85)' : 'rgba(248, 250, 252, 0.9)';
      ctx.fill();
      ctx.lineWidth = isInspirationActive ? 2.5 : 1.5;
      ctx.strokeStyle = isInspirationActive ? '#0077b6' : '#94a3b8';
      ctx.stroke();

      // Wrap-around outer balcony railing
      ctx.beginPath();
      ctx.ellipse(0, 0, 88 * scale, 48 * scale, 0.1, 0, Math.PI * 2);
      ctx.strokeStyle = isInspirationActive ? '#0284c7' : '#cbd5e1';
      ctx.lineWidth = 1 * scale;
      ctx.stroke();
      ctx.restore();

      // Vertical Gate / Screen (Cổng Ký Ức)
      ctx.save();
      ctx.translate(-50 * scale, -25 * scale);
      ctx.fillStyle = isNightMode ? '#0f172a' : '#0a192f';
      ctx.fillRect(-2 * scale, -22 * scale, 34 * scale, 22 * scale);
      ctx.fillStyle = isNightMode ? '#38bdf8' : '#0284c7';
      ctx.fillRect(1 * scale, -19 * scale, 28 * scale, 16 * scale);
      ctx.restore();

      // 4. ELEVATED SKYWALK (Tuyến cầu dạo bộ trên cao uốn lượn - DÒNG CHẢY)
      ctx.save();
      ctx.strokeStyle = isFlowActive ? '#0077b6' : isNightMode ? '#64748b' : '#94a3b8';
      ctx.lineWidth = (isFlowActive ? 5 : 3.5) * scale;
      ctx.lineCap = 'round';

      // Support Stilts
      const stilts = [
        [-205, -25],
        [-185, -45],
        [-155, -65],
        [-120, -78],
        [-85, -75],
      ];
      ctx.beginPath();
      stilts.forEach(([sx, sy]) => {
        ctx.moveTo(sx * scale, (sy + 22) * scale);
        ctx.lineTo(sx * scale, (sy + 2) * scale);
      });
      ctx.lineWidth = 1.5 * scale;
      ctx.strokeStyle = isNightMode ? '#475569' : '#94a3b8';
      ctx.stroke();

      // Curved Skywalk Ribbon
      ctx.beginPath();
      ctx.moveTo(-215 * scale, -20 * scale);
      ctx.bezierCurveTo(
        -185 * scale,
        -95 * scale,
        -125 * scale,
        -100 * scale,
        -70 * scale,
        -68 * scale
      );
      ctx.strokeStyle = isFlowActive ? '#0077b6' : isNightMode ? '#38bdf8' : '#0284c7';
      ctx.lineWidth = (isFlowActive ? 5 : 3.5) * scale;
      ctx.stroke();
      ctx.restore();

      // 5. SUNKEN AMPHITHEATER BASIN (Lòng hồ trũng giật cấp - KÝ ỨC & THÍCH ỨNG)
      const isMemoryActive = activePillarId === 'ky-uc';
      const steps = [
        { rx: 135, ry: 68, y: 15 },
        { rx: 122, ry: 60, y: 18 },
        { rx: 110, ry: 52, y: 22 },
      ];

      // Stepped terraces
      steps.forEach((st, idx) => {
        ctx.beginPath();
        ctx.ellipse(-10 * scale, st.y * scale, st.rx * scale, st.ry * scale, 0.05, 0, Math.PI * 2);
        ctx.fillStyle = isNightMode
          ? idx % 2 === 0 ? '#1e293b' : '#0f172a'
          : idx % 2 === 0 ? '#f8fafc' : '#f1f5f9';
        ctx.fill();
        ctx.strokeStyle = isMemoryActive || isAdaptActive ? '#0077b6' : isNightMode ? '#334155' : '#cbd5e1';
        ctx.lineWidth = 1 * scale;
        ctx.stroke();
      });

      // Water Basin Surface
      const lakeX = -10 * scale;
      const lakeY = 25 * scale;
      const lakeRx = 96 * scale;
      const lakeRy = 44 * scale;

      ctx.save();
      ctx.beginPath();
      ctx.ellipse(lakeX, lakeY, lakeRx, lakeRy, 0.05, 0, Math.PI * 2);
      ctx.clip();

      // Water Surface Gradient
      const waterGrad = ctx.createRadialGradient(lakeX, lakeY, 15 * scale, lakeX, lakeY, lakeRx);
      if (isNightMode) {
        waterGrad.addColorStop(0, '#075985');
        waterGrad.addColorStop(1, '#0c4a6e');
      } else {
        waterGrad.addColorStop(0, '#bae6fd');
        waterGrad.addColorStop(0.7, '#38bdf8');
        waterGrad.addColorStop(1, '#0284c7');
      }
      ctx.fillStyle = waterGrad;
      ctx.fill();

      // Subtle water reflection ripples
      ctx.strokeStyle = isNightMode ? 'rgba(255,255,255,0.18)' : 'rgba(255,255,255,0.45)';
      ctx.lineWidth = 1 * scale;
      for (let wave = -2; wave <= 2; wave++) {
        ctx.beginPath();
        const wy = lakeY + wave * 11 * scale;
        const waveOffset = Math.sin(t * 1.5 + wave) * 3 * scale;
        ctx.ellipse(
          lakeX + waveOffset,
          wy,
          (lakeRx - Math.abs(wave) * 16 * scale) * 0.9,
          4 * scale,
          0,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }

      // Symbolic Architectural Installation (Cấu trúc sắp đặt biểu tượng ký ức)
      // Tác phẩm tạo hình tối giản, trang trọng thay cho mô hình cơ khí
      ctx.save();
      ctx.translate(lakeX, lakeY - 4 * scale);

      // Elegant arched metal rib canopy (Nan vòm trừu tượng đón nắng)
      ctx.strokeStyle = isNightMode ? '#7dd3fc' : '#ffffff';
      ctx.lineWidth = 2 * scale;
      for (let rib = -2; rib <= 2; rib++) {
        ctx.beginPath();
        const rx = rib * 8 * scale;
        ctx.arc(rx, 0, 16 * scale, Math.PI * 0.85, Math.PI * 2.15);
        ctx.stroke();
      }

      // Small wooden boat symbol in stillness
      ctx.fillStyle = '#b45309';
      ctx.beginPath();
      ctx.ellipse(28 * scale, 6 * scale, 12 * scale, 4 * scale, 0.1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.restore(); // End of lake clipping

      ctx.restore(); // End of center transform

      animFrameId.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [activePillarId, isNightMode]);

  return (
    <div className="w-full rounded-2xl bg-white border border-slate-200/90 shadow-sm p-4 sm:p-6 animate-fade-rise">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-[#0077B6]">
            <Compass size={14} />
            <span>Ý niệm thiết kế công viên</span>
          </div>
          <h3 className="text-lg sm:text-xl font-serif font-bold text-[#0A192F] mt-0.5">
            4 Trụ Cột Không Gian: Ký Ức · Dòng Chảy · Cảm Hứng · Thích Ứng
          </h3>
        </div>

        {/* Day / Night View Toggle */}
        <button
          type="button"
          onClick={() => setIsNightMode(!isNightMode)}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition-all self-end sm:self-auto ${
            isNightMode
              ? 'bg-slate-900 text-sky-300 shadow-inner'
              : 'bg-slate-100 text-[#4A5568] hover:bg-slate-200/80'
          }`}
        >
          {isNightMode ? <Moon size={13} /> : <Sun size={13} />}
          <span>{isNightMode ? 'Phối cảnh đêm' : 'Phối cảnh ngày'}</span>
        </button>
      </div>

      {/* 4 Pillars Interactive Tabs (Trực tiếp từ bản thuyết minh của bạn) */}
      <div className="mt-3 grid grid-cols-2 lg:grid-cols-4 gap-2">
        {DESIGN_PILLARS.map((p) => {
          const isActive = activePillarId === p.id;
          return (
            <button
              key={p.id}
              type="button"
              onClick={() => setActivePillarId(p.id)}
              className={`p-2.5 sm:p-3 rounded-xl border text-left transition-all ${
                isActive
                  ? 'bg-sky-50/80 border-[#0077B6] ring-2 ring-[#0077B6]/20 shadow-xs'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-[#4A5568]'
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span className={`text-[10px] font-bold block ${isActive ? 'text-[#0077B6]' : 'text-slate-500'}`}>
                  {p.title}
                </span>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />}
              </div>
              <span className="font-serif font-bold text-xs text-[#0A192F] block truncate">
                {p.subtitle.split('&')[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* 2.5D Architectural Canvas Viewer */}
      <div className="mt-3 relative rounded-xl overflow-hidden border border-slate-200 bg-slate-50 shadow-inner">
        <canvas ref={canvasRef} className="w-full block select-none" />

        {/* Spatial Zone Indicator Tag */}
        <div className="absolute top-2.5 left-2.5 flex items-center space-x-2 pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-white/90 backdrop-blur-xs text-[#0A192F] shadow-xs flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0077B6]" />
            <span>{activePillar.badge}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-[#0A192F]/80 text-white backdrop-blur-xs hidden sm:inline-block">
            {activePillar.focusArea}
          </span>
        </div>

        {/* Interaction hint */}
        <div className="absolute bottom-2 right-2 text-[10px] text-slate-500 bg-white/80 backdrop-blur-xs px-2 py-0.5 rounded-md pointer-events-none hidden sm:block">
          Sơ đồ ý niệm không gian mô hình 3D
        </div>
      </div>

      {/* Exact Pillar Architectural Narrative Box (Chuẩn xác từ bản vẽ của bạn) */}
      <div className="mt-3.5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-2.5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-slate-200/80">
          <h4 className="font-serif font-bold text-sm text-[#0A192F] flex items-center space-x-1.5">
            <Layers size={14} className="text-[#0077B6]" />
            <span>{activePillar.title}: {activePillar.subtitle}</span>
          </h4>
          <span className="text-[11px] font-semibold text-[#0077B6] bg-sky-100/70 px-2 py-0.5 rounded-full self-start sm:self-auto">
            Không gian: {activePillar.focusArea}
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
          <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs">
            <span className="font-bold text-[#0A192F] block mb-1">
              • {activePillar.bullet1Title}
            </span>
            <p className="text-[#4A5568] leading-relaxed">
              {activePillar.bullet1Text}
            </p>
          </div>
          <div className="p-2.5 rounded-lg bg-white border border-slate-200/90 shadow-2xs">
            <span className="font-bold text-[#0A192F] block mb-1">
              • {activePillar.bullet2Title}
            </span>
            <p className="text-[#4A5568] leading-relaxed">
              {activePillar.bullet2Text}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
