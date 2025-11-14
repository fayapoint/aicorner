'use client';

import { useEffect, useState, useRef } from "react";
import { useClientSession } from "../hooks/useClientSession";

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
  const [menuTimeouts, setMenuTimeouts] = useState<Map<string, ReturnType<typeof setTimeout>>>(new Map());
  const [dropdownPos, setDropdownPos] = useState<{ top: number; left: number } | null>(null);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [isClient, setIsClient] = useState(false);
  const { data: session, status } = useClientSession();
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
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

  const handleMenuEnter = (menu: string, element: HTMLElement) => {
    if (menuTimeouts.has(menu)) {
      clearTimeout(menuTimeouts.get(menu)!);
      menuTimeouts.delete(menu);
    }
    
    setActiveMenu(menu);
    setAnchorEl(element);
    
    if (element) {
      const rect = element.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom,
        left: rect.left - 300 + rect.width / 2,
      });
    }
  };
  
  const handleMenuLeave = (menu: string) => {
    const timeout = setTimeout(() => {
      setActiveMenu(prev => prev === menu ? null : prev);
    }, 100);
    
    setMenuTimeouts(prev => new Map(prev).set(menu, timeout));
  };
  
  const handleDropdownEnter = (menu: string) => {
    if (menuTimeouts.has(menu)) {
      clearTimeout(menuTimeouts.get(menu)!);
      menuTimeouts.delete(menu);
    }
  };
  
  const handleDropdownLeave = (menu: string) => {
    handleMenuLeave(menu);
  };

  const toggleMobileSection = (section: string) => {
    setMobileSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Menu configuration
  const products = [
    { title: "AI Agents", desc: "Custom AI agents for your business", href: "/agents", icon: BrainIcon },
    { title: "Chatbots", desc: "Intelligent conversational agents", href: "/chatbots", icon: MessageSquare },
    { title: "Process Automation", desc: "Streamline your workflows", href: "/automation", icon: Zap },
    { title: "Custom Development", desc: "Tailored AI solutions", href: "/development", icon: Code },
    { title: "Data Solutions", desc: "AI-powered data processing", href: "/data", icon: Database },
    { title: "Integration Services", desc: "Connect AI to your systems", href: "/integration", icon: Layers },
  ];

  const learn = [
    { title: "Documentation", desc: "Guides and resources", href: "/docs", icon: FileText },
    { title: "API Reference", desc: "Integrate with our API", href: "/api-docs", icon: Code },
    { title: "Tutorials", desc: "Step-by-step learning", href: "/tutorials", icon: PlayCircle },
    { title: "Case Studies", desc: "Success stories", href: "/cases", icon: Target },
    { title: "Blog", desc: "Insights and updates", href: "/blog", icon: Puzzle },
  ];

  const company = [
    { title: "About Us", desc: "Our mission and vision", href: "/about", icon: Users },
    { title: "Careers", desc: "Join our team", href: "/careers", icon: Rocket },
    { title: "Contact", desc: "Get in touch", href: "/contact", icon: MessageSquare },
  ];

  const pricing = [
    { title: "Starter", desc: "For small teams", href: "/pricing#starter", icon: Lightbulb },
    { title: "Professional", desc: "For growing businesses", href: "/pricing#professional", icon: Rocket },
    { title: "Enterprise", desc: "For organizations", href: "/pricing#enterprise", icon: Globe },
  ];

  const menuConfig = {
    products: { items: products, cols: 3 },
    learn: { items: learn, cols: 3 },
    company: { items: company, cols: 1 },
    pricing: { items: pricing, cols: 2 },
  };

  const renderDropdown = (menuTitle: string) => {
    const config = menuConfig[menuTitle as keyof typeof menuConfig];
    if (!config || !dropdownPos || !isClient || typeof document === 'undefined') return null;

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

  // Prevent rendering session-dependent UI during SSR
  if (!isClient) {
    return (
      <header className="fixed top-0 left-0 right-0 z-40 transition-all duration-300 bg-black/80 backdrop-blur-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex-shrink-0">
              <div className="flex items-center gap-2 text-white">
                <Brain className="w-8 h-8 text-purple-500" />
                <span className="text-2xl font-bold">Fayza</span>
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
                <ChevronDown className="w-4 h-4" />
              </button>
            ))}
            <Link href="/pricing" className="text-gray-300 hover:text-white transition-colors">
              Pricing
            </Link>
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
            <Link href="/" className="flex items-center gap-2 text-white">
              <Brain className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold">Fayza</span>
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
                <div className="mt-4 ml-4 space-y-6">
                  {products.map((item, i) => (
                    <Link key={i} href={item.href} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 mt-1 text-purple-400" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
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
                <div className="mt-4 ml-4 space-y-6">
                  {learn.map((item, i) => (
                    <Link key={i} href={item.href} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 mt-1 text-purple-400" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
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
                <div className="mt-4 ml-4 space-y-6">
                  {company.map((item, i) => (
                    <Link key={i} href={item.href} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 mt-1 text-purple-400" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
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
                <div className="mt-4 ml-4 space-y-6">
                  {pricing.map((item, i) => (
                    <Link key={i} href={item.href} className="flex items-start gap-3">
                      <item.icon className="w-5 h-5 mt-1 text-purple-400" />
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.desc}</p>
                      </div>
                    </Link>
                  ))}
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
