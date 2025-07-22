"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  User,
  Search,
  Menu,
  X,
  Heart,
  ChevronDown,
} from "lucide-react";
import MegaMenu from "./MegaMenu";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Modern", path: "/Modern", hasMegaMenu: true },
    { name: "Oxidized", path: "/Oxidized" },
    { name: "Wedding", path: "/Wedding" },
    { name: "Occasions", path: "/Occasions" },
  ];

  return (
    <header
      className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm"
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="md:hidden p-2 text-stone-700 hover:text-amber-700"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <img
              src="/logo.png"
              alt="Saaj Riwaaj Logo"
              className="h-10 w-auto lg:h-12 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-10">
            {navLinks.map(({ name, path, hasMegaMenu }) => (
              <div
                key={name}
                onMouseEnter={() => hasMegaMenu && setActiveMegaMenu(name.toLowerCase())}
              >
                <Link
                  href={path}
                  className="flex items-center text-stone-700 hover:text-amber-700 font-medium transition"
                >
                  {name}
                  {hasMegaMenu && (
                    <ChevronDown
                      className={`w-4 h-4 ml-1 transition-transform ${
                        activeMegaMenu === name.toLowerCase() ? "rotate-180" : ""
                      }`}
                    />
                  )}
                </Link>
              </div>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-stone-700 hover:text-amber-700">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700">
              <User className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-amber-700 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-amber-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Mega Menu */}
      {activeMegaMenu === "modern" && <MegaMenu onClose={() => setActiveMegaMenu(null)} />}

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-50 transition-transform md:hidden ${{
          true: "translate-x-0",
          false: "-translate-x-full",
        }[isMobileMenuOpen]}`}
      >
        <div
          className="absolute inset-0 bg-black/40"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div className="relative w-4/5 max-w-sm h-screen bg-white shadow-xl flex flex-col">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="font-semibold text-lg">Menu</h2>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-grow  p-4 space-y-2">
            {navLinks.map(({ name, path }) => (
              <Link
            key={name}
               href={path}
                onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
              ${
                active
                  ? 'bg-[#d1d1d1] text-black'
                  : 'neumorphic-btn hover:bg-[#d6d6d6]'
              }`}
          >
            <Icon size={18} />
            {name}
          </Link>

             <Link
                key={name}
                href={path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 px-3 rounded hover:bg-amber-50 transition"
              >
                {name}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
