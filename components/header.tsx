'use client';

import { Sparkles, Menu, X } from "lucide-react";
import React, { useState } from "react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="w-full z-50 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <a href="/" className="flex items-center gap-3 group">
  <div className="relative">
    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
      <Sparkles className="w-6 h-6 text-white" />
    </div>
    <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
  </div>
  <div>
    <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
      Portal Tech
    </h1>
    <p className="text-xs text-gray-400">Digital Solutions</p>
  </div>
</a>
        </div>
        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
  <a href="/servicos" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Serviços</a>
  <a href="/planos" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Planos</a>
  <a href="/blog" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Blog</a>
  <a href="/contato" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Contato</a>
  <a href="/faq" className="relative group text-gray-300 hover:text-white transition-colors duration-300">FAQ</a>
  <a href="/sobre" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Sobre Nós</a>
  <a href="/cases" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Cases de Sucesso</a>
  <a href="/carreiras" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Carreiras</a>
  <a href="/parceiros" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Parceiros</a>
  <a href="/dashboard" className="relative group text-gray-300 hover:text-white transition-colors duration-300">Área do Assinante</a>
</nav>
        <div className="flex items-center gap-4">
          <a href="/login" className="hidden md:flex border border-purple-500/50 text-purple-300 hover:bg-purple-500/20 rounded px-4 py-2">Login</a>
          <a href="/signup" className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-2 rounded">Começar Agora</a>
        </div>
        {/* Mobile Nav Trigger */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-gray-300 hover:text-white ml-2" aria-label="Abrir menu">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Nav Menu */}
      {isOpen && (
        <nav className="lg:hidden absolute top-full left-0 w-full bg-slate-900/98 backdrop-blur-xl border-t border-purple-500/20 shadow-xl z-50 animate-fade-in">
          <ul className="flex flex-col p-6 gap-4">
  <li><a href="/servicos" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Serviços</a></li>
  <li><a href="/planos" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Planos</a></li>
  <li><a href="/blog" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Blog</a></li>
  <li><a href="/contato" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Contato</a></li>
  <li><a href="/faq" className="text-gray-300 hover:text-purple-400 transition-colors py-2">FAQ</a></li>
  <li><a href="/sobre" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Sobre Nós</a></li>
  <li><a href="/cases" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Cases de Sucesso</a></li>
  <li><a href="/carreiras" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Carreiras</a></li>
  <li><a href="/parceiros" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Parceiros</a></li>
  <li><a href="/dashboard" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Área do Assinante</a></li>
  <li><a href="/login" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Login</a></li>
  <li><a href="/signup" className="text-gray-300 hover:text-purple-400 transition-colors py-2">Começar Agora</a></li>
</ul>
        </nav>
      )}
    </header>
  );
}
