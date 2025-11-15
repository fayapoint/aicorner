'use client';

import { useEffect, useState, useRef } from "react";
import { useClientSession } from "../hooks/useClientSession";

import type { LucideIcon } from "lucide-react";
import {
  Brain,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  Sparkles,
  MessageSquare,
  Award,
  Globe,
  Settings,
  PlayCircle,
  FileText,
  BarChart3,
  Brain as BrainIcon,
  // Replace PuzzlePiece with Puzzle which exists
  Users,
  Rocket,
  ArrowRight as ArrowRightIcon,
  Lightbulb,
  Zap,
  Code,
  Database,
  Layers,
  Cloud,
  Shield,
  Puzzle,
  Lock,
  Calendar,
  ArrowRight,
  Target,
  TrendingUp,
} from "lucide-react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useClientSession();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [mobileSections, setMobileSections] = useState<Record<string, boolean>>({
    products: true,
    learn: false,
    company: false,
    pricing: true,
  });

  // Set isClient to true when component mounts on the client
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
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

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

  const clearHoverTimeout = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const scheduleClose = () => {
    clearHoverTimeout();
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setDropdownPos(null);
    }, 120);
  };

  const handleMenuEnter = (menu: string, element: HTMLElement) => {
    clearHoverTimeout();
    setActiveMenu(menu);
    if (element) {
      const rect = element.getBoundingClientRect();
      const config = menuConfig[menu as keyof typeof menuConfig];
      const dropdownWidth = config?.cols === 1 ? 300 : config?.cols === 2 ? 520 : 640;
      const viewportWidth = window.innerWidth;
      const padding = 24;
      const idealLeft = rect.left + rect.width / 2 - dropdownWidth / 2;
      const clampedLeft = Math.max(padding, Math.min(idealLeft, viewportWidth - dropdownWidth - padding));

      setDropdownPos({
        top: rect.bottom + 1,
        left: clampedLeft,
      });
    }
  };

  const handleMenuLeave = () => {
    scheduleClose();
  };

  const handleDropdownEnter = () => {
    clearHoverTimeout();
  };

  const handleDropdownLeave = () => {
    scheduleClose();
  };

  const toggleMobileSection = (section: string) => {
    setMobileSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  type MegaMenuItem = {
    title: string;
    desc: string;
    href: string;
    icon: LucideIcon;
    accentFrom?: string;
    accentTo?: string;
    pill?: { label: string; tone: string };
  };

  type MenuConfig = Record<string, { items: MegaMenuItem[]; cols: number }>;

  // Menu configuration
  const products: MegaMenuItem[] = [
    { title: "Free Tools", desc: "Try our AI tools for free", href: "/tools", icon: BrainIcon, accentFrom: "#f472b6", accentTo: "#a855f7" },
    { title: "API Access", desc: "Integrate AI into your apps", href: "/docs/api/chat-completions", icon: Code, accentFrom: "#34d399", accentTo: "#0ea5e9" },
    { title: "AI Solutions", desc: "Complete AI solutions", href: "/solutions", icon: Layers, accentFrom: "#93c5fd", accentTo: "#6366f1" },
    { title: "Integrations", desc: "Connect with your tools", href: "/integrations", icon: Puzzle, accentFrom: "#fbbf24", accentTo: "#fb7185" },
  ];

  const learn: MegaMenuItem[] = [
    { title: "Docs", desc: "Guides & resources", href: "/docs", icon: FileText, accentFrom: "#a5b4fc", accentTo: "#818cf8" },
    { title: "Tutorials", desc: "Step-by-step lessons", href: "/tutorials", icon: PlayCircle, accentFrom: "#fb7185", accentTo: "#f472b6" },
    { title: "Case Studies", desc: "Success stories", href: "/cases", icon: Target, accentFrom: "#fcd34d", accentTo: "#f97316" },
    { title: "News", desc: "Insights & updates", href: "/news", icon: MessageSquare, accentFrom: "#34d399", accentTo: "#22d3ee" },
  ];

  const company: MegaMenuItem[] = [
    { title: "About", desc: "Our mission", href: "/sobre", icon: Users, accentFrom: "#f472b6", accentTo: "#ec4899" },
    { title: "Careers", desc: "Join the team", href: "/carreiras", icon: Rocket, accentFrom: "#93c5fd", accentTo: "#60a5fa" },
    { title: "Community", desc: "Meet other builders", href: "/community", icon: Globe, accentFrom: "#5eead4", accentTo: "#2dd4bf" },
    { title: "Contact", desc: "Talk to us", href: "/contato", icon: MessageSquare, accentFrom: "#fecdd3", accentTo: "#fb7185" },
  ];

  const pricing: MegaMenuItem[] = [
    { title: "View All Plans", desc: "Compare features & pricing", href: "/pricing", icon: Lightbulb, accentFrom: "#fcd34d", accentTo: "#f97316" },
    { title: "Starter", desc: "Kickstart in minutes", href: "/pricing#starter", icon: Sparkles, pill: { label: "$0/mo", tone: "text-emerald-300" }, accentFrom: "#34d399", accentTo: "#0ea5e9" },
    { title: "Growth", desc: "Scale your impact", href: "/pricing#professional", icon: TrendingUp, pill: { label: "$47/mo", tone: "text-sky-300" }, accentFrom: "#c084fc", accentTo: "#7c3aed" },
    { title: "Enterprise", desc: "Tailored partnership", href: "/pricing#enterprise", icon: Shield, pill: { label: "Custom", tone: "text-amber-300" }, accentFrom: "#fb923c", accentTo: "#ea580c" },
  ];

  const menuConfig: MenuConfig = {
    products: { items: products, cols: 1 },
    learn: { items: learn, cols: 1 },
    company: { items: company, cols: 1 },
    pricing: { items: pricing, cols: 1 },
  };

  const menuOrder = ["products", "learn", "company", "pricing"] as const;

  const getGradient = (item: MegaMenuItem) => `linear-gradient(135deg, ${item.accentFrom ?? '#8b5cf6'}, ${item.accentTo ?? '#ec4899'})`;

  const renderMenuCards = (items: MegaMenuItem[], variant: 'desktop' | 'mobile' = 'desktop') => (
    items.map((item, i) => (
      <Link
        key={`${item.title}-${item.href}`}
        href={item.href}
        className={`relative block rounded-[18px] overflow-hidden transition-all duration-300 group ${variant === 'mobile' ? 'w-full' : ''}`}
      >
        <div
          className="absolute inset-0 opacity-45"
          style={{ background: getGradient(item) }}
        />
        <div className="absolute inset-[2px] rounded-[16px] bg-white/6 backdrop-blur-[34px] border border-white/18 shadow-[0_18px_32px_rgba(6,1,20,0.4)] group-hover:border-white/30 transition-all" />
        <div className={`relative flex items-center justify-between gap-4 ${variant === 'mobile' ? 'px-4 py-3.5' : 'px-5 py-3.5'}`}>
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-white/20 border border-white/30 shadow-inner">
              <item.icon className="w-4 h-4 text-white/95" />
            </div>
            <div>
              <p className="font-semibold text-white tracking-tight flex items-center gap-2">
                {item.title}
                {i === 0 && variant === 'desktop' && (
                  <span className="text-[10px] font-semibold text-white/80 uppercase tracking-wide">Featured</span>
                )}
              </p>
              <p className="text-sm text-white/80">{item.desc}</p>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            {item.pill && (
              <span className={`text-xs font-semibold ${item.pill.tone}`}>
                {item.pill.label}
              </span>
            )}
            {variant === 'desktop' && (
              <ArrowRight className="w-4 h-4 text-white/80 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition" />
            )}
          </div>
        </div>
      </Link>
    ))
  );

  const renderDropdown = (menuTitle: string) => {
    const config = menuConfig[menuTitle as keyof typeof menuConfig];
    if (!config || !dropdownPos || !isClient || typeof document === 'undefined') return null;

    const gridColsClass = 
      config.cols === 1 ? 'grid-cols-1' :
      config.cols === 2 ? 'grid-cols-2' :
      'grid-cols-3';

    return createPortal(
      <div
        className="fixed z-50"
        style={{ 
          top: `${dropdownPos.top}px`, 
          left: `${dropdownPos.left}px`,
          width: config.cols === 1 ? 320 : config.cols === 2 ? 520 : 640
        }}
        onMouseEnter={handleDropdownEnter}
        onMouseLeave={handleDropdownLeave}
      >
        <div className="rounded-[26px] bg-gradient-to-br from-white/25 via-purple-500/25 to-transparent p-[1px] shadow-[0_28px_90px_rgba(6,0,22,0.5)]">
          <div className="rounded-[24px] bg-[#0b0420]/55 backdrop-blur-[45px] border border-white/18 px-5 py-5 text-white/90">
            <div className={`grid ${gridColsClass} gap-2.5`}>
              {renderMenuCards(config.items)}
            </div>
          </div>
        </div>
      </div>,
      document.body
    );
  };

  // Prevent rendering session-dependent UI during SSR
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-3 text-white">
                <div className="relative">
                  <Brain className="w-10 h-10 text-purple-500" />
                  <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <div>
                  <span className="text-2xl font-bold block leading-tight">AInSeconds</span>
                  <span className="text-xs text-gray-400 block leading-tight">AI Solutions in Seconds</span>
                </div>
              </div>
            </div>
            {/* Placeholder for session-dependent UI */}
            <div className="hidden md:flex items-center gap-4">
              <div className="w-24 h-8 bg-gray-800 animate-pulse rounded-md"></div>
            </div>
            <div className="md:hidden">
              <button className="text-white p-2">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-black/85 backdrop-blur-xl shadow-[0_12px_35px_rgba(0,0,0,0.45)]' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-3 text-white group">
              <div className="relative">
                <Brain className="w-10 h-10 text-purple-500 group-hover:text-purple-400 transition-colors" />
                <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight">AInSeconds</span>
                <span className="text-xs text-gray-400 block leading-tight">AI Solutions in Seconds</span>
              </div>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            {menuOrder.map(menuTitle => (
              <button
                key={menuTitle}
                onMouseEnter={(e) => handleMenuEnter(menuTitle, e.currentTarget)}
                onMouseLeave={handleMenuLeave}
                className={`capitalize flex items-center gap-1 px-3 py-2 rounded-lg transition-all duration-200 ${
                  activeMenu === menuTitle 
                    ? 'text-white bg-white/10' 
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {menuTitle}
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${activeMenu === menuTitle ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            {status === 'loading' ? (
              // Loading state
              <div className="w-24 h-10 bg-gray-800 animate-pulse rounded-md"></div>
            ) : !session ? (
              // Unauthenticated
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm text-gray-300 hover:text-white"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-md"
                >
                  Start Free Trial
                </Link>
              </>
            ) : (
              // Authenticated
              <Link
                href="/dashboard"
                className="px-4 py-2 text-sm bg-purple-600 hover:bg-purple-500 text-white rounded-md flex items-center gap-2"
              >
                Dashboard
                <ArrowRightIcon className="w-4 h-4" />
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              ref={menuButtonRef}
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 bg-black/95 h-full w-full overflow-y-auto`}>
        <div className="px-4 py-8">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 text-white">
              <div className="relative">
                <Brain className="w-10 h-10 text-purple-500" />
                <Sparkles className="w-4 h-4 text-purple-400 absolute -top-1 -right-1 animate-pulse" />
              </div>
              <div>
                <span className="text-2xl font-bold block leading-tight">AInSeconds</span>
                <span className="text-xs text-gray-400 block leading-tight">AI Solutions in Seconds</span>
              </div>
            </Link>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-white"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="mt-8 space-y-6 divide-y divide-white/10">
            {/* Mobile Products */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileSection('products')}
                className="flex items-center justify-between w-full text-white mb-4"
              >
                <span className="text-xl font-semibold">Products</span>
                {mobileSections.products ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {mobileSections.products && (
                <div className="mt-4 ml-2 space-y-4">
                  {renderMenuCards(products, 'mobile')}
                </div>
              )}
            </div>

            {/* Mobile Learn */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileSection('learn')}
                className="flex items-center justify-between w-full text-white mb-4"
              >
                <span className="text-xl font-semibold">Learn</span>
                {mobileSections.learn ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {mobileSections.learn && (
                <div className="mt-4 ml-2 space-y-4">
                  {renderMenuCards(learn, 'mobile')}
                </div>
              )}
            </div>

            {/* Mobile Company */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileSection('company')}
                className="flex items-center justify-between w-full text-white mb-4"
              >
                <span className="text-xl font-semibold">Company</span>
                {mobileSections.company ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {mobileSections.company && (
                <div className="mt-4 ml-2 space-y-4">
                  {renderMenuCards(company, 'mobile')}
                </div>
              )}
            </div>

            {/* Mobile Pricing */}
            <div className="py-4">
              <button
                onClick={() => toggleMobileSection('pricing')}
                className="flex items-center justify-between w-full text-white mb-4"
              >
                <span className="text-xl font-semibold">Pricing</span>
                {mobileSections.pricing ? (
                  <ChevronUp className="h-5 w-5" />
                ) : (
                  <ChevronDown className="h-5 w-5" />
                )}
              </button>
              {mobileSections.pricing && (
                <div className="mt-4 ml-2 space-y-4">
                  {renderMenuCards(pricing, 'mobile')}
                </div>
              )}
            </div>

            {/* Mobile CTA */}
            <div className="py-6">
              {status === 'loading' ? (
                <div className="w-full h-12 bg-gray-800 animate-pulse rounded-md"></div>
              ) : !session ? (
                <div className="space-y-4">
                  <Link
                    href="/login"
                    className="block w-full text-center px-6 py-3 text-white border border-white/20 rounded-md hover:bg-white/5"
                  >
                    Login
                  </Link>
                  <Link
                    href="/signup"
                    className="block w-full text-center px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-500"
                  >
                    Start Free Trial
                  </Link>
                </div>
              ) : (
                <Link
                  href="/dashboard"
                  className="block w-full text-center px-6 py-3 text-white bg-purple-600 rounded-md hover:bg-purple-500 flex items-center justify-center gap-2"
                >
                  <span>Dashboard</span>
                  <ArrowRightIcon className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop dropdowns */}
      {activeMenu && renderDropdown(activeMenu)}
    </header>
  );
}
