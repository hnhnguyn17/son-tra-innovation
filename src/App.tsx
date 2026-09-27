import { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DigitalKnowledgeHub } from './components/DigitalKnowledgeHub';
import { KeepersOfSoul } from './components/KeepersOfSoul';
import { EmbracingBreakwater } from './components/EmbracingBreakwater';
import { CoastalLife } from './components/CoastalLife';
import { ExperienceSpace } from './components/ExperienceSpace';
import { CarryingAStory } from './components/CarryingAStory';
import { OceanLivingBackground } from './components/background/OceanLivingBackground';
import { MediaModal, type MediaSlotInfo } from './components/MediaModal';
import { ScrollSnapDots } from './components/ScrollSnapDots';
import { BackToTop } from './components/BackToTop';
import { useOceanMotion } from './hooks/useOceanMotion';
import { useOnePageScroll, APP_SECTIONS } from './hooks/useOnePageScroll';

export default function App() {
  const [selectedMediaSlot, setSelectedMediaSlot] = useState<MediaSlotInfo | null>(null);
  const { activeIndex, isSnapEnabled, setIsSnapEnabled, scrollToSection } = useOnePageScroll(Boolean(selectedMediaSlot));

  const oceanMotion = useOceanMotion(Boolean(selectedMediaSlot));
  const activeSectionId = APP_SECTIONS[activeIndex].id;

  const handleNavigateSection = (targetId: string) => {
    document.body.style.overflow = '';
    const index = APP_SECTIONS.findIndex((s) => s.id === targetId);
    if (index !== -1) {
      scrollToSection(index);
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const targetTop = el.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: targetTop,
          behavior: 'smooth',
        });
      }
    }
  };

  useEffect(() => {
    document.documentElement.classList.toggle('snap-active', isSnapEnabled);
    return () => {
      document.documentElement.classList.remove('snap-active');
    };
  }, [isSnapEnabled]);

  return (
    <div className="min-h-screen w-full isolate flex flex-col font-sans selection:bg-[#0077B6] selection:text-white relative scroll-smooth overflow-x-hidden">
      {/* Living Ocean Background: Caustics, Waves, Cá Ông Whale, Boats & Floating Particles (Always Auto) */}
      <OceanLivingBackground activeSectionId={activeSectionId} paused={oceanMotion.paused} reducedMotion={oceanMotion.reducedMotion} />

      {/* Floating Navigation Bar */}
      <Navbar activeSectionId={activeSectionId} onNavigateSection={handleNavigateSection} />

      {/* 7-Chapter Right Dot Navigator & 1-Scroll-1-Page Controller */}
      <ScrollSnapDots
        currentSectionIndex={activeIndex}
        onNavigateSection={scrollToSection}
        isSnapEnabled={isSnapEnabled}
        onToggleSnap={() => setIsSnapEnabled(!isSnapEnabled)}
      />

      {/* Landing Page Content Sections */}
      <main id="main-content" className="flex-1 w-full">
        {/* 1. Hero: Cầu nối không gian thực tế & kho tàng tri thức số */}
        <HeroSection onOpenMediaSlot={setSelectedMediaSlot} />

        {/* 2. Kho tàng tri thức số về địa danh Sơn Trà: Số hóa tư liệu & di sản bản địa */}
        <DigitalKnowledgeHub />

        {/* 3. CHUYỆN NGƯỜI XỨ BIỂN: 5 câu chuyện đời thực của người dân làng chài */}
        <KeepersOfSoul onOpenMediaSlot={setSelectedMediaSlot} />

        {/* 4. Âu thuyền Thọ Quang: Bến neo đậu chở che ngàn con tàu & Chợ cá đêm */}
        <EmbracingBreakwater onOpenMediaSlot={setSelectedMediaSlot} />

        {/* 5. Di sản & Tín ngưỡng: Lăng Ông Nam Thọ & Lễ hội Cầu ngư */}
        <CoastalLife onOpenMediaSlot={setSelectedMediaSlot} />

        {/* 6. Không gian trải nghiệm thực tế bên bờ vịnh: Ảnh 3D & Hoạt động đời sống & Lịch trình 1 ngày */}
        <ExperienceSpace />
      </main>

      {/* 7. Footer Chân Trang */}
      <CarryingAStory />

      {/* Media Modal */}
      <MediaModal slot={selectedMediaSlot} onClose={() => setSelectedMediaSlot(null)} />

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
