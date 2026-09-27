import { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { MAIN_NAV_ITEMS, MOBILE_DRAWER_ITEMS } from '../data/contentData';

interface NavbarProps {
  activeSectionId: string;
  onNavigateSection?: (targetId: string) => void;
}

export const Navbar = ({ activeSectionId, onNavigateSection }: NavbarProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollYRef = useRef(0);
  const accumulatedDownRef = useRef(0);
  const accumulatedUpRef = useRef(0);
  const activeId = activeSectionId === 'mang-theo-cau-chuyen' ? 'khong-gian-trai-nghiem' : activeSectionId;
  const toggleButtonRef = useRef<HTMLButtonElement>(null);

  // Smart Auto-Hide on Mobile Scroll: hide when scrolling down, show when scrolling up
  useEffect(() => {
    const getScrollY = () =>
      window.scrollY ||
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    lastScrollYRef.current = getScrollY();

    const handleScroll = () => {
      // Keep always visible on desktop (>= 768px) and when mobile menu is open
      if (window.innerWidth >= 768 || mobileMenuOpen) {
        setIsVisible(true);
        return;
      }

      const currentY = Math.max(0, getScrollY());
      const prevY = lastScrollYRef.current;
      const delta = currentY - prevY;

      // Always show near top of page
      if (currentY <= 40) {
        setIsVisible(true);
        accumulatedDownRef.current = 0;
        accumulatedUpRef.current = 0;
      } else if (delta > 0) {
        // Scrolling DOWN
        accumulatedUpRef.current = 0;
        accumulatedDownRef.current += delta;
        // As soon as user scrolls down by 20px, auto-hide navbar
        if (accumulatedDownRef.current > 20) {
          setIsVisible(false);
        }
      } else if (delta < 0) {
        // Scrolling UP
        accumulatedDownRef.current = 0;
        accumulatedUpRef.current += Math.abs(delta);
        // As soon as user scrolls up by 10px, reveal navbar immediately
        if (accumulatedUpRef.current > 10) {
          setIsVisible(true);
        }
      }

      lastScrollYRef.current = currentY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mobileMenuOpen]);

  // Handle Escape key to close mobile menu and restore focus to trigger button
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [mobileMenuOpen]);

  const handleNavClick = (href: string) => {
    // 1. Immediately unlock body overflow so scroll can happen
    document.body.style.overflow = '';
    setMobileMenuOpen(false);

    const targetId = href.replace('#', '');

    // Allow brief delay for drawer unmount and layout unlock
    setTimeout(() => {
      if (onNavigateSection) {
        onNavigateSection(targetId);
      } else {
        const element = document.getElementById(targetId);
        if (element) {
          const targetTop = element.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({
            top: targetTop,
            behavior: 'smooth',
          });
        }
      }
    }, 30);
  };

  return (
    <>
      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#0077B6] focus:text-white focus:rounded-md focus:shadow-lg focus:outline-none"
      >
        Chuyển đến nội dung chính
      </a>

      {/* Floating Smart Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full py-2 px-3 transition-all duration-300 pointer-events-none flex flex-col items-center ${
          mobileMenuOpen
            ? 'opacity-0 pointer-events-none'
            : isVisible
            ? 'translate-y-0 opacity-100'
            : '-translate-y-28 opacity-0 pointer-events-none md:translate-y-0 md:opacity-100 md:pointer-events-auto'
        }`}
      >
        <div className="w-fit max-w-3xl px-3.5 py-1.5 flex items-center space-x-2 sm:space-x-3 rounded-full bg-white/90 backdrop-blur-xl border border-cyan-200/70 shadow-md shadow-cyan-900/10 animate-nav-aura pointer-events-auto transition-all duration-300">
          {/* Brand Logo & Animated Live Pulse */}
          <a
            href="#vung-thung"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#vung-thung');
            }}
            className="flex items-center space-x-1.5 group select-none text-left shrink-0 pr-2 border-r border-slate-200/90"
            aria-label="Sơn Trà — Cầu Nối Tri Thức Số & Không Gian Thực Tế"
          >
            {/* Live Oceanic Breathing Beacon */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0077B6]" />
            </span>
            <span className="text-sm font-bold font-serif tracking-wider text-[#0A192F] group-hover:text-[#0077B6] transition-colors leading-none">
              SƠN TRÀ
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Thanh điều hướng chính"
            className="hidden md:flex items-center space-x-1"
          >
            {MAIN_NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-2.5 py-1 rounded-full text-xs transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#0077B6] to-[#0284C7] text-white font-semibold shadow-xs shadow-cyan-500/30 scale-102'
                      : 'text-slate-600 hover:text-[#0077B6] hover:bg-sky-50/80 font-medium'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Action CTA & Mobile Buttons */}
          <div className="flex items-center space-x-1.5 pl-1.5 border-l border-slate-200/90">
            <a
              href="#khong-gian-trai-nghiem"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#khong-gian-trai-nghiem');
              }}
              className="relative overflow-hidden hidden sm:inline-flex items-center justify-center px-3.5 py-1 rounded-full text-xs font-semibold tracking-wide bg-gradient-to-r from-[#0077B6] via-[#0284C7] to-[#0077B6] text-white shadow-xs shadow-cyan-600/25 hover:shadow-md hover:shadow-cyan-500/40 active:scale-95 transition-all duration-300 group/cta"
            >
              <span className="relative z-10 flex items-center gap-1">
                <span>Trải nghiệm</span>
              </span>
              {/* Shimmer light sweep */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-light-sweep pointer-events-none" />
            </a>

            {/* Mobile Menu Trigger Button */}
            <button
              ref={toggleButtonRef}
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full text-[#0A192F] hover:bg-slate-100 active:bg-slate-200 transition-colors focus-visible:outline-2 focus-visible:outline-[#0077B6]"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              aria-label={mobileMenuOpen ? 'Đóng menu điều hướng' : 'Mở menu điều hướng'}
            >
              {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Modal Drawer & Darkened Solid Backdrop */}
      {mobileMenuOpen && (
        <>
          {/* Fullscreen Backdrop with Dark Blur */}
          <div
            className="fixed inset-0 bg-slate-950/70 backdrop-blur-md z-[60] transition-opacity animate-fade-rise"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Solid Opaque Drawer Card (zero bleed-through) */}
          <nav
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Menu điều hướng Sơn Trà"
            className="fixed top-4 inset-x-3 max-w-sm mx-auto p-4 sm:p-5 bg-white rounded-3xl border border-slate-200/90 shadow-2xl shadow-slate-950/30 z-[70] animate-fade-rise text-slate-800"
          >
            {/* Drawer Single Clean Header */}
            <div className="flex items-center justify-between pb-3.5 mb-2.5 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#0077B6]" />
                </span>
                <span className="text-sm font-bold font-serif tracking-wider text-[#0A192F]">
                  SƠN TRÀ
                </span>
                <span className="text-[11px] font-medium text-slate-400 pl-1.5 border-l border-slate-200">
                  Mục lục 6 chương
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 hover:bg-slate-200 active:scale-95 transition-all"
                aria-label="Đóng menu điều hướng"
              >
                <X size={16} />
              </button>
            </div>

            {/* 6 Chapter Links */}
            <div className="flex flex-col space-y-1">
              {MOBILE_DRAWER_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                    aria-current={isActive ? 'page' : undefined}
                    className={`min-h-[46px] flex items-center justify-between px-3.5 py-2 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'text-white bg-gradient-to-r from-[#0077B6] to-[#0284C7] font-semibold shadow-xs'
                        : 'text-slate-700 hover:text-[#0077B6] hover:bg-sky-50 active:bg-sky-100'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className={`text-xs font-mono font-semibold ${isActive ? 'text-white/90' : 'text-slate-400'}`}>
                      0{item.chapterNumber}
                    </span>
                  </a>
                );
              })}

              <div className="pt-2.5 mt-1 border-t border-slate-100">
                <a
                  href="#khong-gian-trai-nghiem"
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick('#khong-gian-trai-nghiem');
                  }}
                  className="min-h-[46px] w-full flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold bg-gradient-to-r from-[#0077B6] via-[#0284C7] to-[#0077B6] text-white shadow-md active:scale-98 transition-all"
                >
                  Trải nghiệm bờ vịnh & Điểm hẹn 3D
                </a>
              </div>
            </div>
          </nav>
        </>
      )}
    </>
  );
};
