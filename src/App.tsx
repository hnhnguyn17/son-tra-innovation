import { Navbar } from './components/Navbar';
import { VideoBackground } from './components/VideoBackground';
import { HeroSection } from './components/HeroSection';

export default function App() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-50 flex flex-col justify-between selection:bg-[#0077B6] selection:text-white">
      {/* Background Video Layer (z-0) & Gradient Overlay (z-1) */}
      <VideoBackground />

      {/* Navigation Bar (z-50) */}
      <Navbar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col justify-center">
        {/* Hero Content Container (z-10) */}
        <HeroSection />
      </main>

      {/* Glassmorphic subtle footer badge */}
      <footer className="relative z-10 py-6 px-4 text-center text-xs tracking-wider text-[#4A5568]/80 font-light select-none">
        <span>SƠN TRÀ INNOVATION PARK</span>
        <span className="mx-2">•</span>
        <span>ĐÀ NẴNG, VIỆT NAM</span>
      </footer>
    </div>
  );
}
