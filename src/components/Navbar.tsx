import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const navItems: NavItem[] = [
  { label: 'Trang chủ', href: '#', isActive: true },
  { label: 'Kiến trúc', href: '#architecture' },
  { label: 'Làng chài', href: '#fishing-village' },
  { label: 'Tín ngưỡng', href: '#heritage' },
  { label: 'Liên hệ', href: '#contact' },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-sm bg-white/30 border-b border-white/20 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <a
          href="#"
          className="text-2xl tracking-widest font-bold font-serif text-[#0A192F] transition-opacity hover:opacity-90 select-none"
        >
          SƠN TRÀ PARK
        </a>

        {/* Desktop Navigation Menu */}
        <nav className="hidden md:flex items-center space-x-8 lg:space-x-10">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`text-sm font-medium transition-colors duration-200 hover:text-[#0077B6] ${
                item.isActive ? 'text-[#0077B6] font-semibold' : 'text-[#4A5568]'
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA Button & Mobile Toggle */}
        <div className="flex items-center space-x-4">
          <button
            type="button"
            className="hidden sm:inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-semibold bg-[#0077B6] text-white hover:scale-105 shadow-lg hover:shadow-cyan-500/20 active:scale-95 transition-all duration-200"
          >
            Trải Nghiệm
          </button>

          {/* Mobile hamburger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-[#0A192F] hover:bg-white/50 transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-8 pt-2 pb-6 backdrop-blur-md bg-white/80 border-b border-white/40 shadow-sm animate-fade-rise">
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-1 transition-colors ${
                  item.isActive ? 'text-[#0077B6] font-semibold' : 'text-[#4A5568] hover:text-[#0077B6]'
                }`}
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2">
              <button
                type="button"
                className="w-full rounded-full px-6 py-2.5 text-sm font-semibold bg-[#0077B6] text-white hover:scale-105 shadow-md active:scale-95 transition-all duration-200"
              >
                Trải Nghiệm
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
