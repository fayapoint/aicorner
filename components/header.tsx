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

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTimeouts, setMenuTimeouts] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    products: true,
    learn: false,
    company: false,
    pricing: true,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Clear all timeouts when component unmounts
  useEffect(() => {
    return () => {
      menuTimeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [menuTimeouts]);

  // Close menus on route change (prevents mobile drawer from blocking navigation)
  useEffect(() => {
    setIsOpen(false);
    setActiveMenu(null);
  }, [pathname]);

  // Body scroll lock and ESC to close when mobile menu is open
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

  // Return focus to the menu button when the menu closes
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
    // Clear existing timeout for this menu
    clearMenuTimeout(menuTitle);

    // Set new timeout
    const timeout = setTimeout(callback, delay);
    const newTimeouts = new Map(menuTimeouts);
    newTimeouts.set(menuTitle, timeout);
    setMenuTimeouts(newTimeouts);
  };

  const handleMenuEnter = (menuTitle: string, el?: HTMLElement) => {
    // Clear any existing timeout for this menu
    clearMenuTimeout(menuTitle);
    // Immediately show this menu
    setActiveMenu(menuTitle);
    if (el && typeof window !== 'undefined') {
      const r = el.getBoundingClientRect();
      // Use viewport coordinates for fixed-position portal. Do NOT add scroll offsets.
      setDropdownPos({ top: r.bottom + 8, left: r.left });
      setAnchorEl(el);
    }
  };

  // Keep portal aligned on scroll/resize while open
  useEffect(() => {
    if (!activeMenu || !anchorEl) return;
    const update = () => {
      const r = anchorEl.getBoundingClientRect();
      // Keep aligned using viewport coordinates; no scroll offsets for fixed-position elements
      setDropdownPos({ top: r.bottom + 8, left: r.left });
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [activeMenu, anchorEl]);

  const handleMenuLeave = (menuTitle: string) => {
    // Set timeout to hide this specific menu
    setMenuTimeout(menuTitle, () => {
      setActiveMenu(current => current === menuTitle ? null : current);
    }, 300);
  };

  const handleDropdownEnter = (menuTitle: string) => {
    // Clear timeout when entering dropdown
    clearMenuTimeout(menuTitle);
  };

  const handleDropdownLeave = (menuTitle: string) => {
    // Set shorter timeout when leaving dropdown
    setMenuTimeout(menuTitle, () => {
      setActiveMenu(current => current === menuTitle ? null : current);
    }, 150);
  };

  const menuItems = [
    {
      title: "Products",
      icon: Sparkles,
      items: [
        { name: "Free Tools", href: "/tools", icon: Zap, description: "Try our AI tools for free" },
        { name: "API Access", href: "/api", icon: Code, description: "Integrate AI into your apps" },
        { name: "AI Solutions", href: "/solutions", icon: Target, description: "Complete AI solutions" },
        { name: "Integrations", href: "/integrations", icon: Puzzle, description: "Connect with your tools" }
      ]
    },
    {
      title: "Learn",
      icon: BookOpen,
      items: [
        { name: "Documentation", href: "/docs", icon: FileText, description: "Complete guides" },
        { name: "Tutorials", href: "/tutorials", icon: PlayCircle, description: "Step-by-step learning" },
        { name: "Learn AI", href: "/learn", icon: BookOpen, description: "Master AI fundamentals" },
        { name: "Community", href: "/community", icon: Users, description: "Join our community" }
      ]
    },
    {
      title: "Company",
      icon: Globe,
      items: [
        { name: "About Us", href: "/sobre", icon: Users, description: "Our mission and team" },
        { name: "Success Stories", href: "/success-stories", icon: TrendingUp, description: "Customer stories" },
        { name: "Blog", href: "/news", icon: FileText, description: "Latest insights" },
        { name: "Support", href: "/support", icon: MessageSquare, description: "Get help" }
      ]
    }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-slate-900/90 via-purple-900/20 to-slate-900/90 backdrop-blur-2xl shadow-2xl border-b border-purple-400/40 bg-slate-900/80 supports-[backdrop-filter]:bg-slate-900/50'
          : 'bg-gradient-to-r from-slate-900/70 via-purple-900/15 to-slate-900/70 backdrop-blur-2xl shadow-xl bg-slate-900/70 supports-[backdrop-filter]:bg-slate-900/40'
      }`}
      style={{
        // Removing isolation fixes backdrop-filter not affecting underlying page content
        borderImage: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.4), transparent) 1',
        boxShadow: isScrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-all duration-300 shadow-lg group-hover:shadow-purple-500/25">
                <Brain className="w-6 h-6 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full flex items-center justify-center animate-pulse">
                <Shield className="w-2 h-2 text-green-900" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                AInSeconds
              </h1>
              <p className="text-xs text-gray-400 group-hover:text-gray-300 transition-colors">AI Solutions in Seconds</p>
            </div>
          </Link>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((menu, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={(e) => handleMenuEnter(menu.title, e.currentTarget as HTMLElement)}
              onMouseLeave={() => handleMenuLeave(menu.title)}
            >
              <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50 group">
                <menu.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{menu.title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menu.title ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {activeMenu === menu.title && dropdownPos
                ? (typeof document !== 'undefined' ? createPortal(
                  <div
                    className="fixed w-80 rounded-2xl shadow-2xl overflow-hidden z-[1000] bg-slate-900/70 backdrop-blur-2xl supports-[backdrop-filter]:bg-slate-900/40 border border-purple-500/60"
                    onMouseEnter={() => handleDropdownEnter(menu.title)}
                    onMouseLeave={() => handleDropdownLeave(menu.title)}
                    style={{
                      top: dropdownPos.top,
                      left: dropdownPos.left,
                      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(147, 51, 234, 0.3)',
                      backdropFilter: 'blur(24px) saturate(180%) brightness(1.08)',
                      WebkitBackdropFilter: 'blur(24px) saturate(180%) brightness(1.08)'
                    } as React.CSSProperties}
                  >
                    {/* Content layer */}
                    <div className="p-4 relative">
                      {/* Backdrop overlay to guarantee blur visibility */}
                      <div className="absolute inset-0 backdrop-blur-2xl bg-slate-900/30 pointer-events-none" />
                      {/* Reflection effect */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                      <div className="space-y-1 relative">
                        {menu.items.map((item, itemIndex) => (
                          <Link
                            key={itemIndex}
                            href={item.href}
                            className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-purple-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                            onClick={() => setActiveMenu(null)}
                          >
                            {/* Reflection overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-purple-500/30 to-pink-500/30 rounded-lg flex items-center justify-center group-hover:from-purple-500/50 group-hover:to-pink-500/50 transition-all duration-300 relative overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                              <item.icon className="w-4 h-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300 relative z-10" />
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-white group-hover:text-purple-300 transition-colors">
                                {item.name}
                              </div>
                              <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
                                {item.description}
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 text-gray-500 group-hover:text-purple-400 opacity-0 group-hover:opacity-100 transition-all" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>, document.body) : null)
                  : null}
            </div>
          ))}

          {/* Pricing Menu */}
          <div
            className="relative"
            onMouseEnter={(e) => handleMenuEnter('pricing', e.currentTarget as HTMLElement)}
            onMouseLeave={() => handleMenuLeave('pricing')}
          >
            <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50 group">
              <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Pricing</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'pricing' ? 'rotate-180' : ''}`} />
            </button>

            {activeMenu === 'pricing' && dropdownPos
              ? (typeof document !== 'undefined' ? createPortal(
              <div
                className="fixed w-80 rounded-2xl shadow-2xl overflow-hidden z-[1000] bg-slate-900/20 backdrop-blur-3xl supports-[backdrop-filter]:bg-slate-900/10 border border-purple-500/60"
                onMouseEnter={() => handleDropdownEnter('pricing')}
                onMouseLeave={() => handleDropdownLeave('pricing')}
                style={{
                  top: dropdownPos.top,
                  left: dropdownPos.left,
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(147, 51, 234, 0.3)'
                } as React.CSSProperties}
              >
                <div className="p-4 relative z-10">
                  {/* Backdrop overlay to guarantee blur visibility */}
                  <div className="absolute inset-0 backdrop-blur-2xl bg-slate-900/20 pointer-events-none" />
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  <div className="space-y-2 relative">
                    <Link
                      href="/pricing"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-purple-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-500/30 to-cyan-500/30 rounded-lg flex items-center justify-center group-hover:from-blue-500/50 group-hover:to-cyan-500/50 transition-all duration-300 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <BarChart3 className="w-4 h-4 text-blue-400 group-hover:text-blue-300 transition-colors duration-300 relative z-10" />
                      </div>
                      <div className="flex-1 relative z-10">
                        <div className="font-medium text-white group-hover:text-purple-300 transition-colors duration-300">View All Plans</div>
                        <div className="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300">Compare features & pricing</div>
                      </div>
                    </Link>

                    <Link
                      href="/starter"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-green-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-green-400 group-hover:shadow-lg group-hover:shadow-green-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-green-300 transition-colors duration-300">Starter</span>
                      </div>
                      <span className="text-sm text-green-400 font-medium group-hover:text-green-300 transition-colors duration-300 relative z-10">$3/mo</span>
                    </Link>

                    <Link
                      href="/growth"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-blue-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-blue-400 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-blue-300 transition-colors duration-300">Growth</span>
                      </div>
                      <span className="text-sm text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300 relative z-10">$47/mo</span>
                    </Link>

                    <Link
                      href="/professional"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-purple-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-purple-400 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-purple-300 transition-colors duration-300">Professional</span>
                      </div>
                      <span className="text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-300 relative z-10">$147/mo</span>
                    </Link>

                    <Link
                      href="/enterprise"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-200 group border border-white/10 hover:border-yellow-500/40 relative overflow-hidden bg-white/5 hover:bg-white/10"
                      onClick={() => setActiveMenu(null)}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-yellow-300 transition-colors duration-300">Enterprise</span>
                      </div>
                      <span className="text-sm text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors duration-300 relative z-10">$497/mo</span>
                    </Link>
                  </div>
                </div>
              </div>, document.body) : null)
            : null}
          </div>
        </nav>
        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/login"
            className="hidden md:flex items-center gap-2 border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 font-medium hover:scale-105"
          >
            Login
          </Link>
          <Link
            href="/trial"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <Sparkles className="w-4 h-4" />
            </span>
          </Link>
        </div>
        {/* Mobile Nav Trigger */}
        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white ml-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </div>
      {/* Mobile Nav Menu - Redesigned full-screen overlay via portal */}
      {isOpen && (typeof document !== 'undefined' ? createPortal(
        <div className="fixed inset-0 z-[1000] lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-950/90"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />

          {/* Panel */}
          <nav
            className="absolute inset-0 bg-slate-900 text-white overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-slate-900/95 border-b border-white/10">
              <span className="text-sm text-gray-300">Menu</span>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-purple-500"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-5 py-5 space-y-4">
              {/* Collapsible sections derived from desktop config */}
              {menuItems.map((menu) => {
                const key = menu.title.toLowerCase();
                return (
                  <div key={key} className="border border-white/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(key)}
                      className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10"
                      aria-expanded={!!mobileSections[key]}
                      aria-controls={`mobile-sec-${key}`}
                    >
                      <span className="flex items-center gap-2">
                        <menu.icon className="w-4 h-4 text-purple-400" />
                        <span className="font-semibold">{menu.title}</span>
                      </span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${mobileSections[key] ? 'rotate-180' : ''}`} />
                    </button>
                    {mobileSections[key] && (
                      <div id={`mobile-sec-${key}`} className="px-2 pb-2">
                        {menu.items.map((item, idx) => (
                          <Link
                            key={idx}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between px-3 py-3 rounded-lg hover:bg-white/5"
                          >
                            <span className="flex items-center gap-3">
                              <item.icon className="w-4 h-4 text-purple-400" />
                              <span className="font-medium">{item.name}</span>
                            </span>
                            <ArrowRight className="w-4 h-4 text-gray-400" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Pricing section */}
              <div className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection('pricing')}
                  className="w-full flex items-center justify-between px-4 py-3 bg-white/5 hover:bg-white/10"
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

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <Link href="/login" onClick={() => setIsOpen(false)} className="flex items-center justify-center w-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded-lg py-3 transition-all">
                  Login
                </Link>
                <Link href="/trial" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
                  Start Free Trial
                  <Sparkles className="w-4 h-4" />
                </Link>
              </div>

              <div className="h-8" />
            </div>
          </nav>
        </div>, document.body) : null)}
    </header>
  );
}
