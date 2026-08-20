import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 8);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Directory', path: '/directory' },
    { name: 'News', path: '/news' },
    { name: 'Complaints', path: '/file-complaint' },
    { name: 'Verify', path: '/verify' },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-[#008000] focus:text-white focus:rounded-md focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-200 ${
          isScrolled ? 'shadow-sm' : ''
        } border-b border-[#E2E8E4]`}
      >
        <div className="max-w-[1280px] mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2 rounded-sm"
              aria-label="AHUON — Home"
            >
              <div className="w-9 h-9 bg-[#003D1F] flex items-center justify-center rounded-sm flex-shrink-0">
                <span className="text-white font-bold text-sm tracking-wide">A</span>
              </div>
              <div>
                <div className="font-bold text-[15px] text-[#17211B] leading-none">AHUON</div>
                <div className="text-[11px] text-[#66736A] leading-none mt-0.5 hidden sm:block">
                  Hajj & Umrah Operators of Nigeria
                </div>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2 text-[14px] font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-[#008000] bg-green-50'
                      : 'text-[#66736A] hover:text-[#17211B] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                to="/login"
                className="text-[14px] font-medium text-[#66736A] hover:text-[#17211B] transition-colors px-3 py-2"
              >
                Member Login
              </Link>
              <Link
                to="/register"
                className="text-[14px] font-semibold bg-[#008000] text-white px-4 py-2 rounded-md hover:bg-[#005A2B] transition-colors focus:outline-none focus:ring-2 focus:ring-[#008000] focus:ring-offset-2"
              >
                Become a Member
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-[#66736A] hover:text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#008000] rounded-md"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div
            id="mobile-menu"
            className="lg:hidden border-t border-[#E2E8E4] bg-white"
          >
            <nav className="max-w-[1280px] mx-auto px-6 py-4 flex flex-col gap-1" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-2.5 text-[14px] font-medium rounded-md transition-colors ${
                    isActive(link.path)
                      ? 'text-[#008000] bg-green-50'
                      : 'text-[#17211B] hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="border-t border-[#E2E8E4] mt-2 pt-3 flex flex-col gap-2">
                <Link
                  to="/login"
                  className="px-3 py-2.5 text-[14px] font-medium text-[#17211B] hover:bg-gray-50 rounded-md transition-colors"
                >
                  Member Login
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-2.5 text-[14px] font-semibold bg-[#008000] text-white rounded-md hover:bg-[#005A2B] transition-colors text-center"
                >
                  Become a Member
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>
    </>
  );
}
