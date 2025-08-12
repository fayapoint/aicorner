'use client';

import { useEffect, useState, useRef } from "react";
import { useClientSession } from '../hooks/useClientSession';
import {
  Brain,
  Menu,
  X,
  ChevronDown,
  ArrowRight,
  Sparkles,
  Star,
  Zap
} from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  // During SSR/SSG, render a minimal placeholder header
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">AI Corner</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-8 bg-gray-100 rounded animate-pulse"></div>
              <div className="w-16 h-8 bg-gray-100 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return <ClientHeader />;
}

function ClientHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTimeouts, setMenuTimeouts] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  
  const { data: session, status } = useClientSession();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    products: false,
    pricing: false,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    return () => {
      menuTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [menuTimeouts]);

  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  useEffect(() => {
    if (!isOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener('keydown', onKey);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen && menuButtonRef.current) {
      menuButtonRef.current.focus();
    }
  }, [isOpen]);

  const toggleSection = (key: string) => {
    setMobileSections(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));
  };

  const handleMenuEnter = (menuTitle: string, el?: HTMLElement) => {
    setActiveMenu(menuTitle);
    setAnchorEl(el || null);
    
    if (el) {
      const rect = el.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX - 250 + rect.width / 2,
      });
    }
  };

  const handleMenuLeave = (menuTitle: string) => {
    setTimeout(() => {
      setActiveMenu(prev => prev === menuTitle ? null : prev);
      setAnchorEl(null);
    }, 150);
  };

  const renderDropdown = (menuTitle: string) => {
    if (!dropdownPos) return null;
    return createPortal(
      <div
        className="absolute bg-slate-800/95 backdrop-blur-xl rounded-2xl border border-slate-700/50 shadow-2xl"
        style={{
          top: dropdownPos.top,
          left: Math.max(20, Math.min(dropdownPos.left, window.innerWidth - 520)),
          zIndex: 1000,
        }}
        onMouseEnter={() => setActiveMenu(menuTitle)}
        onMouseLeave={() => handleMenuLeave(menuTitle)}
      >
        <div className="p-8 min-w-[300px]">
          <h3 className="text-lg font-semibold text-white capitalize mb-4">{menuTitle}</h3>
          <p className="text-gray-300 text-sm">Coming soon...</p>
        </div>
      </div>,
      document.body
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all ${
      isScrolled ? 'bg-black/90 backdrop-blur-lg' : 'bg-black/60'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Brain className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                AI Corner
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onMouseEnter={(e) => handleMenuEnter('products', e.currentTarget)}
              onMouseLeave={() => handleMenuLeave('products')}
              className="flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
            >
              Products
              <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === 'products' ? 'rotate-180' : ''}`} />
            </button>
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'loading' && (
              <div className="w-20 h-8 bg-gray-700 animate-pulse rounded"></div>
            )}
            {status === 'unauthenticated' && (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
                  Login
                </Link>
                <Link href="/trial" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all">
                  Start Free Trial
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </>
            )}
            {status === 'authenticated' && (
              <Link href="/dashboard" className="flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all">
                Dashboard
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Desktop dropdowns */}
      {activeMenu && renderDropdown(activeMenu)}

      {/* Mobile menu */}
      {isOpen && createPortal(
        <div className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-xl z-50">
          <nav className="h-full overflow-y-auto">
            <div className="px-5 pt-5 pb-8 text-white">
              {/* Mobile header */}
              <div className="flex items-center justify-between pb-8">
                <div className="flex items-center gap-2">
                  <Brain className="w-8 h-8 text-purple-500" />
                  <span className="text-xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                    AI Corner
                  </span>
                </div>
                <button onClick={() => setIsOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Products */}
              <div className="pb-6">
                <button
                  onClick={() => toggleSection('products')}
                  className="w-full flex justify-between items-center py-2 text-left"
                >
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-purple-400" />
                    <span className="font-semibold">Products</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSections.products ? 'rotate-180' : ''}`} />
                </button>
                {mobileSections.products && (
                  <div className="px-2 pb-2 mt-2">
                    <Link href="/agents" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">AI Agents</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Pricing */}
              <div className="pb-6">
                <Link href="/pricing" onClick={() => setIsOpen(false)} className="flex items-center gap-2 text-white py-2">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="font-semibold">Pricing</span>
                </Link>
              </div>

              {/* Mobile CTA */}
              <div className="space-y-3 pt-4">
                {status === 'loading' && (
                  <div className="w-full h-12 bg-slate-700/50 animate-pulse rounded-lg"></div>
                )}
                {status === 'unauthenticated' && (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded-lg py-3 transition-all">
                      Login
                    </Link>
                    <Link href="/trial" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
                      Start Free Trial
                      <Sparkles className="w-4 h-4" />
                    </Link>
                  </>
                )}
                {status === 'authenticated' && (
                  <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
                    Dashboard
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
            </div>
          </nav>
        </div>,
        document.body
      )}
    </header>
  );
}
