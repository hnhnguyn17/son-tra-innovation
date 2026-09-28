import { useEffect, type MouseEvent } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { DigitalKnowledgeHub } from "./components/DigitalKnowledgeHub";
import { KeepersOfSoul } from "./components/KeepersOfSoul";
import { EmbracingBreakwater } from "./components/EmbracingBreakwater";
import { CoastalLife } from "./components/CoastalLife";
import { ExperienceSpace } from "./components/ExperienceSpace";
import { CarryingAStory } from "./components/CarryingAStory";
import { OceanLivingBackground } from "./components/background/OceanLivingBackground";
import { ScrollSnapDots } from "./components/ScrollSnapDots";
import { BackToTop } from "./components/BackToTop";
import { useMotion } from "./hooks/useMotion";
import { MotionProvider } from "./components/ui/MotionProvider";
import { useOnePageScroll, APP_SECTIONS } from "./hooks/useOnePageScroll";
import { navigateTo } from "./hooks/navigation";
import { Agentation } from "agentation";

function Site() {
  const { activeIndex, isSnapEnabled, setIsSnapEnabled, scrollToSection } =
    useOnePageScroll();
  const motion = useMotion();
  useEffect(() => {
    document.documentElement.classList.toggle("snap-active", isSnapEnabled);
    return () => document.documentElement.classList.remove("snap-active");
  }, [isSnapEnabled]);
  const anchors = (event: MouseEvent<HTMLDivElement>) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    )
      return;
    const anchor = (event.target as Element).closest<HTMLAnchorElement>(
      'a[href^="#"]',
    );
    if (!anchor) return;
    const id = anchor.hash.slice(1);
    if (!document.getElementById(id)) return;
    event.preventDefault();
    history.pushState(null, "", "#" + id);
    navigateTo(id, true);
  };
  return (
    <div className="site-shell" onClick={anchors}>
      <OceanLivingBackground
        activeSectionId={APP_SECTIONS[activeIndex].id}
        paused={motion.paused}
        reducedMotion={motion.reducedMotion}
      />
      <Navbar activeSectionId={APP_SECTIONS[activeIndex].id} />
      <ScrollSnapDots
        currentSectionIndex={activeIndex}
        onNavigateSection={scrollToSection}
        isSnapEnabled={isSnapEnabled}
        onToggleSnap={() => setIsSnapEnabled((value) => !value)}
      />
      <main id="main-content">
        <HeroSection />
        <DigitalKnowledgeHub />
        <KeepersOfSoul />
        <EmbracingBreakwater />
        <CoastalLife />
        <ExperienceSpace />
      </main>
      <CarryingAStory />
      <BackToTop />
      <Agentation />
    </div>
  );
}
export default function App() {
  return (
    <MotionProvider>
      <Site />
    </MotionProvider>
  );
}
