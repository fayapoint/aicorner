'use client';

import {
  Brain,
  Menu,
  X,
  Shield,
  ChevronDown,
  Zap,
  Code,
  BookOpen,
  Users,
  Star,
  Puzzle,
  Lock,
  Calendar,
  ArrowRight,
  Sparkles,
  Target,
  TrendingUp,
  MessageSquare,
  Award,
  Globe,
  Settings,
  PlayCircle,
  FileText,
  BarChart3
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTimeouts, setMenuTimeouts] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  
  // Safely call useSession with error handling
  let sessionData = null;
  try {
    sessionData = useSession();
  } catch (error) {
    // Session provider not available during SSR
    sessionData = null;
  }
  const { data: session, status } = sessionData || { data: null, status: 'loading' };
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    products: true,
    learn: false,
    company: false,
    pricing: true,
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

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

  const toggleSection = (key: string) =>
    setMobileSections(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }));

  const clearMenuTimeout = (menuTitle: string) => {
    const timeout = menuTimeouts.get(menuTitle);
    if (timeout) {
      clearTimeout(timeout);
      const newTimeouts = new Map(menuTimeouts);
      newTimeouts.delete(menuTitle);
      setMenuTimeouts(newTimeouts);
    }
  };

  const setMenuTimeout = (menuTitle: string, callback: () => void, delay: number) => {
    clearMenuTimeout(menuTitle);
    const timeout = setTimeout(callback, delay);
    const newTimeouts = new Map(menuTimeouts);
    newTimeouts.set(menuTitle, timeout);
    setMenuTimeouts(newTimeouts);
  };

  const handleMenuEnter = (menuTitle: string, el?: HTMLElement) => {
    clearMenuTimeout(menuTitle);
    setActiveMenu(menuTitle);
    if (el && typeof window !== 'undefined') {
      const r = el.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 8, left: r.left });
      setAnchorEl(el);
    }
  };

  useEffect(() => {
    if (!activeMenu || !anchorEl) return;
    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 8, left: r.left });
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update, true);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update, true);
    };
  }, [activeMenu, anchorEl]);

  const handleMenuLeave = (menuTitle: string) => {
    setMenuTimeout(menuTitle, () => {
      setActiveMenu(null);
      setAnchorEl(null);
    }, 200);
  };

  const handleDropdownEnter = (menuTitle: string) => {
    clearMenuTimeout(menuTitle);
  };

  const handleDropdownLeave = (menuTitle: string) => {
    setActiveMenu(null);
    setAnchorEl(null);
  };

  const products = [
    { icon: Zap, title: "Instant Ingestion", desc: "Real-time data capture", href: "/products/ingestion" },
    { icon: Code, title: "Vectorization", desc: "Create AI-ready data", href: "/products/vectorization" },
    { icon: Brain, title: "Semantic Search", desc: "Find what you mean", href: "/products/search" },
    { icon: Shield, title: "Access Control", desc: "Secure, granular permissions", href: "/products/access-control" },
  ];

  const learn = [
    { icon: BookOpen, title: "Docs", desc: "In-depth guides & references", href: "/docs" },
    { icon: PlayCircle, title: "Tutorials", desc: "Hands-on walkthroughs", href: "/tutorials" },
    { icon: Users, title: "Community", desc: "Join our Discord server", href: "/community" },
    { icon: FileText, title: "Blog", desc: "Latest news and insights", href: "/blog" },
  ];

  const company = [
    { icon: Award, title: "About Us", desc: "Our mission and team", href: "/about" },
    { icon: MessageSquare, title: "Contact", desc: "Get in touch with us", href: "/contact" },
    { icon: Star, title: "Case Studies", desc: "See how customers succeed", href: "/cases" },
    { icon: TrendingUp, title: "Careers", desc: "Join our growing team", href: "/careers" },
  ];

  const pricing = [
    { icon: Sparkles, title: "All Plans", desc: "Compare features", href: "/pricing" },
    { icon: Target, title: "Usage-Based", desc: "Pay as you grow", href: "/pricing/usage" },
    { icon: Globe, title: "Enterprise", desc: "For large-scale deployments", href: "/enterprise" },
    { icon: Settings, title: "Talk to Sales", desc: "Custom solutions", href: "/contact-sales" },
  ];

  const menuConfig = {
    products: { items: products, cols: 2 },
    learn: { items: learn, cols: 2 },
    company: { items: company, cols: 2 },
    pricing: { items: pricing, cols: 2 },
  };

  const renderDropdown = (menuTitle: string) => {
    const config = menuConfig[menuTitle as keyof typeof menuConfig];
    if (!config || !dropdownPos) return null;

    return createPortal(
      <div
        className="fixed z-50 bg-gray-900/80 backdrop-blur-lg border border-white/10 rounded-lg shadow-2xl p-6 text-white animate-fade-in-fast"
        style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
        onMouseEnter={() => handleDropdownEnter(menuTitle)}
        onMouseLeave={() => handleDropdownLeave(menuTitle)}
      >
        <div className={`grid grid-cols-${config.cols} gap-x-8 gap-y-4`}>
          {config.items.map((item, i) => (
            <Link key={i} href={item.href} className="flex items-start gap-4 p-2 rounded-lg hover:bg-white/5 transition-colors">
              <item.icon className="w-5 h-5 mt-1 text-purple-400 flex-shrink-0" />
              <div>
                <p className="font-semibold">{item.title}</p>
                <p className="text-sm text-gray-400">{item.desc}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>,
      document.body
    );
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 text-white">
              <Brain className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold">Fayza</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {Object.keys(menuConfig).map(menuTitle => (
              <button
                key={menuTitle}
                onMouseEnter={(e) => handleMenuEnter(menuTitle, e.currentTarget)}
                onMouseLeave={() => handleMenuLeave(menuTitle)}
                className="capitalize flex items-center gap-1 text-gray-300 hover:text-white transition-colors"
              >
                {menuTitle}
                <ChevronDown className={`w-4 h-4 transition-transform ${activeMenu === menuTitle ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4 text-sm">
            {status === 'loading' && (
              <div className="w-48 h-9 bg-slate-700/50 animate-pulse rounded-lg"></div>
            )}
            {status === 'unauthenticated' && (
              <>
                <Link href="/login" className="text-gray-300 hover:text-white transition-colors font-medium">Login</Link>
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

          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {activeMenu && renderDropdown(activeMenu)}
      {isOpen && (createPortal(
        <div id="mobile-menu" className="md:hidden fixed inset-0 bg-black/90 backdrop-blur-xl z-50 animate-fade-in-fast">
          <nav className="h-full overflow-y-auto">
            <div className="px-5 pt-5 pb-8 text-white">
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-2 text-white" onClick={() => setIsOpen(false)}>
                  <Brain className="w-8 h-8 text-purple-500" />
                  <span className="text-2xl font-bold">Fayza</span>
                </Link>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700"
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="divide-y divide-white/10">
                {Object.keys(menuConfig).map(key => (
                  <div key={key}>
                    <button
                      onClick={() => toggleSection(key)}
                      className="w-full flex justify-between items-center py-4 text-left"
                      aria-expanded={!!mobileSections[key as keyof typeof mobileSections]}
                      aria-controls={`mobile-sec-${key}`}
                    >
                      <span className="capitalize text-lg font-semibold">{key}</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${mobileSections[key as keyof typeof mobileSections] ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSections[key as keyof typeof mobileSections] && (
                      <div id={`mobile-sec-${key}`} className="grid grid-cols-2 gap-2 px-2 pb-4">
                        {menuConfig[key as keyof typeof menuConfig].items.map(item => (
                          <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)} className="flex flex-col items-center text-center gap-2 p-3 rounded-lg hover:bg-white/5">
                            <item.icon className="w-6 h-6 text-purple-400" />
                            <span className="text-sm font-medium">{item.title}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 mt-4 pt-4">
                 <button
                  onClick={() => toggleSection('pricing')}
                  className="w-full flex justify-between items-center py-2 text-left"
                  aria-expanded={!!mobileSections['pricing']}
                  aria-controls="mobile-sec-pricing"
                >
                  <span className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="font-semibold">Pricing</span>
                  </span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileSections['pricing'] ? 'rotate-180' : ''}`} />
                </button>
                {mobileSections['pricing'] && (
                  <div id="mobile-sec-pricing" className="px-2 pb-2">
                    <Link href="/pricing" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">View All Plans</span>
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    </Link>
                    <Link href="/starter" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">Starter</span>
                      <span className="text-green-400">$3/mo</span>
                    </Link>
                    <Link href="/growth" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">Growth</span>
                      <span className="text-blue-400">$47/mo</span>
                    </Link>
                    <Link href="/professional" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">Professional</span>
                      <span className="text-purple-400">$147/mo</span>
                    </Link>
                    <Link href="/enterprise" onClick={() => setIsOpen(false)} className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5">
                      <span className="font-medium">Enterprise</span>
                      <span className="text-yellow-400">$497/mo</span>
                    </Link>
                  </div>
                )}
              </div>

              <div className="space-y-3 pt-2">
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
                  <>
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
                      Dashboard
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                )}
              </div>

              <div className="h-8" />
            </div>
          </nav>
        </div>, document.body)
      )}
    </header>
  );
}