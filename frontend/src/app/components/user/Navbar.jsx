'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ShoppingBag, User, Search, Menu, X, Heart, ChevronDown } from 'lucide-react';
import MegaMenu from './MegaMenu';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMobileMenuOpen]);

  return (
    <header 
      className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button (Left on Mobile) */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-stone-700 hover:text-amber-700 transition-colors"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href={"Home"} className="group">
              <img 
                src="/logo.png" 
                alt="Saaj Riwaaj Logo" 
                className="h-10 w-auto lg:h-12 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-10">
            <div onMouseEnter={() => setActiveMegaMenu('modern')}>
              <Link href={"Modern"} className="flex items-center text-stone-700 hover:text-amber-700 font-medium transition-colors group">
                Modern <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${activeMegaMenu === 'modern' ? 'rotate-180' : ''}`} />
              </Link>
            </div>
            <Link href={"Oxidized"} className="text-stone-700 hover:text-amber-700 font-medium transition-colors">
              Oxidized
            </Link>
            <Link href={"Wedding"} className="text-stone-700 hover:text-amber-700 font-medium transition-colors">
              Wedding
            </Link>
            <Link href={"Occasions"} className="text-stone-700 hover:text-amber-700 font-medium transition-colors">
              Occasions
            </Link>
          </nav>
          
          {/* Right Side Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-stone-700 hover:text-amber-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700 transition-colors">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700 transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">0</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mega Menu */}
      {activeMegaMenu === 'modern' && <MegaMenu onClose={() => setActiveMegaMenu(null)} />}

      {/* Mobile Navigation Panel */}
      <div 
        className={`fixed inset-0 z-50 transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}
      >
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)}></div>
        <div className="relative w-4/5 max-w-sm h-full bg-white shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-grow p-4 space-y-2">
            <Link href={"Modern"} className="block py-2 px-3 rounded hover:bg-amber-50 transition-colors">Modern</Link>
            <Link href={"Oxidized"} className="block py-2 px-3 rounded hover:bg-amber-50 transition-colors">Oxidized</Link>
            <Link href={"Wedding"} className="block py-2 px-3 rounded hover:bg-amber-50 transition-colors">Wedding</Link>
            <Link href={"Occasions"} className="block py-2 px-3 rounded hover:bg-amber-50 transition-colors">Occasions</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}