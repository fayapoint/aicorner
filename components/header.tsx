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
import React, { useState, useEffect } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuTimeouts, setMenuTimeouts] = useState<Map<string, NodeJS.Timeout>>(new Map());

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

  const handleMenuEnter = (menuTitle: string) => {
    // Clear any existing timeout for this menu
    clearMenuTimeout(menuTitle);
    // Immediately show this menu
    setActiveMenu(menuTitle);
  };

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
        { name: "Blog", href: "/blog", icon: FileText, description: "Latest insights" },
        { name: "Support", href: "/support", icon: MessageSquare, description: "Get help" }
      ]
    }
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-gradient-to-r from-slate-900/95 via-purple-900/20 to-slate-900/95 backdrop-blur-3xl shadow-2xl border-b border-purple-400/40'
          : 'bg-gradient-to-r from-slate-900/90 via-purple-900/15 to-slate-900/90 backdrop-blur-3xl shadow-xl'
      }`}
      style={{
        background: isScrolled
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 135, 0.25) 25%, rgba(147, 51, 234, 0.15) 50%, rgba(88, 28, 135, 0.25) 75%, rgba(15, 23, 42, 0.95) 100%)'
          : 'linear-gradient(135deg, rgba(15, 23, 42, 0.90) 0%, rgba(88, 28, 135, 0.20) 25%, rgba(147, 51, 234, 0.10) 50%, rgba(88, 28, 135, 0.20) 75%, rgba(15, 23, 42, 0.90) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderImage: 'linear-gradient(90deg, transparent, rgba(147, 51, 234, 0.4), transparent) 1',
        boxShadow: isScrolled
          ? '0 8px 32px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(147, 51, 234, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          : '0 4px 24px rgba(0, 0, 0, 0.2), 0 0 0 1px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.05)'
      } as React.CSSProperties}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 group">
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
          </a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-2">
          {menuItems.map((menu, index) => (
            <div
              key={index}
              className="relative"
              onMouseEnter={() => handleMenuEnter(menu.title)}
              onMouseLeave={() => handleMenuLeave(menu.title)}
            >
              <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50 group">
                <menu.icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="font-medium">{menu.title}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === menu.title ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {activeMenu === menu.title && (
                <div
                  className="absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                  onMouseEnter={() => handleDropdownEnter(menu.title)}
                  onMouseLeave={() => handleDropdownLeave(menu.title)}
                  style={{
                    background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(88, 28, 135, 0.4) 25%, rgba(147, 51, 234, 0.3) 50%, rgba(88, 28, 135, 0.4) 75%, rgba(15, 23, 42, 0.85) 100%)',
                    backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                    WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                    border: '1px solid rgba(147, 51, 234, 0.6)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(147, 51, 234, 0.3)'
                  } as React.CSSProperties}
                >
                  {/* Content layer */}
                  <div className="p-4 relative">
                    {/* Reflection effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                    <div className="space-y-1 relative">
                      {menu.items.map((item, itemIndex) => (
                        <a
                          key={itemIndex}
                          href={item.href}
                          className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                          style={{
                            background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)',
                            backdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                            WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)'
                          } as React.CSSProperties}
                          onMouseEnter={(e) => {
                            const style = e.currentTarget.style as any;
                            style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(88, 28, 135, 0.5) 100%)';
                            style.borderColor = 'rgba(147, 51, 234, 0.7)';
                            style.boxShadow = '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                            style.backdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                            style.WebkitBackdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                          }}
                          onMouseLeave={(e) => {
                            const style = e.currentTarget.style as any;
                            style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(88, 28, 135, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)';
                            style.borderColor = 'transparent';
                            style.boxShadow = 'none';
                            style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                            style.WebkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                          }}
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
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Pricing Menu */}
          <div
            className="relative"
            onMouseEnter={() => handleMenuEnter('pricing')}
            onMouseLeave={() => handleMenuLeave('pricing')}
          >
            <button className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:text-white transition-all duration-300 rounded-lg hover:bg-slate-800/50 group">
              <Star className="w-4 h-4 group-hover:scale-110 transition-transform" />
              <span className="font-medium">Pricing</span>
              <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${activeMenu === 'pricing' ? 'rotate-180' : ''}`} />
            </button>

            {activeMenu === 'pricing' && (
              <div
                className="absolute top-full left-0 mt-2 w-80 rounded-2xl shadow-2xl overflow-hidden z-[60]"
                onMouseEnter={() => handleDropdownEnter('pricing')}
                onMouseLeave={() => handleDropdownLeave('pricing')}
                style={{
                  background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.85) 0%, rgba(88, 28, 135, 0.4) 25%, rgba(147, 51, 234, 0.3) 50%, rgba(88, 28, 135, 0.4) 75%, rgba(15, 23, 42, 0.85) 100%)',
                  backdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                  WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.1)',
                  border: '1px solid rgba(147, 51, 234, 0.6)',
                  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(147, 51, 234, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 8px 32px rgba(147, 51, 234, 0.3)'
                } as React.CSSProperties}
              >
                  <div className="p-4 relative z-10">
                  {/* Reflection effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
                  <div className="space-y-2 relative">
                    <a
                      href="/pricing"
                      className="flex items-center gap-3 p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.3) 0%, rgba(88, 28, 135, 0.1) 50%, rgba(51, 65, 85, 0.3) 100%)',
                        backdropFilter: 'blur(8px)',
                        WebkitBackdropFilter: 'blur(8px)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(88, 28, 135, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(88, 28, 135, 0.4) 100%)';
                        e.currentTarget.style.borderColor = 'rgba(147, 51, 234, 0.5)';
                        e.currentTarget.style.boxShadow = '0 8px 25px rgba(147, 51, 234, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.3) 0%, rgba(88, 28, 135, 0.1) 50%, rgba(51, 65, 85, 0.3) 100%)';
                        e.currentTarget.style.borderColor = 'transparent';
                        e.currentTarget.style.boxShadow = 'none';
                      }}
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
                    </a>

                    <a
                      href="/starter"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(34, 197, 94, 0.5) 0%, rgba(34, 197, 94, 0.3) 50%, rgba(34, 197, 94, 0.5) 100%)';
                        style.borderColor = 'rgba(34, 197, 94, 0.7)';
                        style.boxShadow = '0 8px 25px rgba(34, 197, 94, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                        style.backdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                        style.WebkitBackdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(34, 197, 94, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)';
                        style.borderColor = 'transparent';
                        style.boxShadow = 'none';
                        style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                        style.WebkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                      }}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-green-400 group-hover:shadow-lg group-hover:shadow-green-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-green-300 transition-colors duration-300">Starter</span>
                      </div>
                      <span className="text-sm text-green-400 font-medium group-hover:text-green-300 transition-colors duration-300 relative z-10">$3/mo</span>
                    </a>

                    <a
                      href="/growth"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(59, 130, 246, 0.5) 0%, rgba(59, 130, 246, 0.3) 50%, rgba(59, 130, 246, 0.5) 100%)';
                        style.borderColor = 'rgba(59, 130, 246, 0.7)';
                        style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                        style.backdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                        style.WebkitBackdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(59, 130, 246, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)';
                        style.borderColor = 'transparent';
                        style.boxShadow = 'none';
                        style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                        style.WebkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                      }}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-blue-400 group-hover:shadow-lg group-hover:shadow-blue-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-blue-300 transition-colors duration-300">Growth</span>
                      </div>
                      <span className="text-sm text-blue-400 font-medium group-hover:text-blue-300 transition-colors duration-300 relative z-10">$47/mo</span>
                    </a>

                    <a
                      href="/professional"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(147, 51, 234, 0.5) 0%, rgba(147, 51, 234, 0.3) 50%, rgba(147, 51, 234, 0.5) 100%)';
                        style.borderColor = 'rgba(147, 51, 234, 0.7)';
                        style.boxShadow = '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                        style.backdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                        style.WebkitBackdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(147, 51, 234, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)';
                        style.borderColor = 'transparent';
                        style.boxShadow = 'none';
                        style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                        style.WebkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                      }}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-purple-400 group-hover:shadow-lg group-hover:shadow-purple-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-purple-300 transition-colors duration-300">Professional</span>
                      </div>
                      <span className="text-sm text-purple-400 font-medium group-hover:text-purple-300 transition-colors duration-300 relative z-10">$147/mo</span>
                    </a>

                    <a
                      href="/enterprise"
                      className="flex items-center justify-between p-3 rounded-xl transition-all duration-300 group border border-transparent relative overflow-hidden"
                      style={{
                        background: 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(234, 179, 8, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)',
                        backdropFilter: 'blur(20px) saturate(180%) brightness(1.05)',
                        WebkitBackdropFilter: 'blur(20px) saturate(180%) brightness(1.05)'
                      } as React.CSSProperties}
                      onMouseEnter={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(234, 179, 8, 0.5) 0%, rgba(234, 179, 8, 0.3) 50%, rgba(234, 179, 8, 0.5) 100%)';
                        style.borderColor = 'rgba(234, 179, 8, 0.7)';
                        style.boxShadow = '0 8px 25px rgba(234, 179, 8, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.25)';
                        style.backdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                        style.WebkitBackdropFilter = 'blur(25px) saturate(200%) brightness(1.15)';
                      }}
                      onMouseLeave={(e) => {
                        const style = e.currentTarget.style as any;
                        style.background = 'linear-gradient(135deg, rgba(51, 65, 85, 0.4) 0%, rgba(234, 179, 8, 0.2) 50%, rgba(51, 65, 85, 0.4) 100%)';
                        style.borderColor = 'transparent';
                        style.boxShadow = 'none';
                        style.backdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                        style.WebkitBackdropFilter = 'blur(20px) saturate(180%) brightness(1.05)';
                      }}
                    >
                      {/* Reflection overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      <div className="flex items-center gap-3 relative z-10">
                        <div className="w-3 h-3 rounded-full bg-yellow-400 group-hover:shadow-lg group-hover:shadow-yellow-400/50 transition-all duration-300"></div>
                        <span className="font-medium text-white group-hover:text-yellow-300 transition-colors duration-300">Enterprise</span>
                      </div>
                      <span className="text-sm text-yellow-400 font-medium group-hover:text-yellow-300 transition-colors duration-300 relative z-10">$497/mo</span>
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        {/* CTA Buttons */}
        <div className="flex items-center gap-4">
          <a
            href="/login"
            className="hidden md:flex items-center gap-2 border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 hover:border-purple-400 rounded-lg px-4 py-2 transition-all duration-300 font-medium hover:scale-105"
          >
            Login
          </a>
          <a
            href="/signup"
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-purple-500/25 transition-all duration-300 hover:scale-105 hover:-translate-y-0.5"
          >
            <span className="flex items-center gap-2">
              Start Free Trial
              <Sparkles className="w-4 h-4" />
            </span>
          </a>
        </div>
        {/* Mobile Nav Trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-gray-300 hover:text-white ml-2 rounded-lg hover:bg-slate-800/50 transition-all duration-300 hover:scale-110"
          aria-label="Toggle menu"
        >
          <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </div>
        </button>
      </div>
      {/* Mobile Nav Menu */}
      {isOpen && (
        <nav
          className="lg:hidden absolute top-full left-0 w-full border-t shadow-2xl z-[60]"
          style={{
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(88, 28, 135, 0.20) 50%, rgba(15, 23, 42, 0.95) 100%)',
            backdropFilter: 'blur(24px) saturate(180%)',
            WebkitBackdropFilter: 'blur(24px) saturate(180%)',
            borderTop: '1px solid rgba(147, 51, 234, 0.4)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          } as React.CSSProperties}
        >
          <div className="p-6 space-y-6 relative">
            {/* Reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none" />
            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4">
              <a href="/tools" className="flex items-center gap-2 p-3 bg-slate-800/80 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-purple-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}}>
                <Zap className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">Free Tools</span>
              </a>
              <a href="/api" className="flex items-center gap-2 p-3 bg-slate-800/80 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-purple-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}}>
                <Code className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">API</span>
              </a>
              <a href="/docs" className="flex items-center gap-2 p-3 bg-slate-800/80 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-purple-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}}>
                <FileText className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">Docs</span>
              </a>
              <a href="/tutorials" className="flex items-center gap-2 p-3 bg-slate-800/80 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-purple-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.6)'}}>
                <PlayCircle className="w-4 h-4 text-purple-400" />
                <span className="text-white font-medium">Tutorials</span>
              </a>
            </div>

            {/* Pricing Plans */}
            <div>
              <h3 className="text-gray-400 font-semibold mb-3">Pricing Plans</h3>
              <div className="space-y-2">
                <a href="/starter" className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-green-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.5)'}}>
                  <span className="text-white">Starter</span>
                  <span className="text-green-400 font-medium">$3/mo</span>
                </a>
                <a href="/growth" className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-blue-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.5)'}}>
                  <span className="text-white">Growth</span>
                  <span className="text-blue-400 font-medium">$47/mo</span>
                </a>
                <a href="/professional" className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-purple-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.5)'}}>
                  <span className="text-white">Professional</span>
                  <span className="text-purple-400 font-medium">$147/mo</span>
                </a>
                <a href="/enterprise" className="flex items-center justify-between p-3 bg-slate-800/70 rounded-lg hover:bg-slate-700/80 transition-all border border-transparent hover:border-yellow-500/30" style={{backgroundColor: 'rgba(30, 41, 59, 0.5)'}}>
                  <span className="text-white">Enterprise</span>
                  <span className="text-yellow-400 font-medium">$497/mo</span>
                </a>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-4 border-t border-gray-700">
              <a href="/login" className="flex items-center justify-center w-full border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded-lg py-3 transition-all">
                Login
              </a>
              <a href="/signup" className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-lg shadow-lg transition-all">
                Start Free Trial
                <Sparkles className="w-4 h-4" />
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
