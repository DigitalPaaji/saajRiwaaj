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
  CalendarHeart,
    Sparkles,
  Leaf,
  HeartHandshake,
  Gem,
  Flower,
  HandHeart,

} from "lucide-react";
const iconOptions = [
    Sparkles,
    Gem,
    Flower,
    HandHeart,
];
import MegaMenu from "./MegaMenu";
import { useGlobalContext } from "../context/GlobalContext";


export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMegaMenu, setActiveMegaMenu] = useState(null);
  const { categories, subCategoriesMap, cart, addToCart, removeFromCart, updateQty, setIsCartOpen } = useGlobalContext();

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMobileMenuOpen]);
 
function formatCategoryPath(name) {
  return name.trim().toLowerCase().replace(/\s+/g, '-'); // e.g., Saaj Riwaaj Exclusive → saaj-riwaaj-exclusive
}

function formatCategoryLabel(name) {
  return name
  .trim()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' '); // e.g., saaj riwaaj → Saaj Riwaaj
}

const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  return (
    <header
      className="bg-white/95 backdrop-blur-md sticky top-0 z-50 shadow-sm "
      onMouseLeave={() => setActiveMegaMenu(null)}
    >
      <div className=" mx-4 md:mx-12 xl:mx-24  ">
        <div className="flex justify-between items-center h-20">
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(true)}
            className="lg:hidden p-2 text-stone-700 hover:text-[#B67032]"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex-shrink-0 group">
            <img
              src="/Images/logo.webp"
              alt="Saaj Riwaaj Logo"
              className="h-10 w-auto lg:h-12 transition-transform group-hover:scale-105"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center space-x-10">
  {categories.map((cat) => {
    const hasSubCats = subCategoriesMap[cat._id]?.length > 0;
    const categoryPath = `/category/${formatCategoryPath(cat.name)}/${formatCategoryPath(cat._id)}`;
    const categoryLabel = formatCategoryLabel(cat.name);
    return (
      <div
        key={cat._id}
        onMouseEnter={() => hasSubCats && setActiveMegaMenu(cat.name.toLowerCase())}
        // onMouseLeave={() => setActiveMegaMenu(null)}
      >
        <Link
           href={categoryPath}
          className="flex items-center text-stone-700 hover:text-[#B67032] font-medium transition"
        >
          {categoryLabel}
          {hasSubCats && (
            <ChevronDown
              className={`w-4 h-4 ml-1 transition-transform ${
                activeMegaMenu === cat.name.toLowerCase() ? "rotate-180" : ""
              }`}
            />
          )}
        </Link>

        {/* MegaMenu dropdown */}
        {activeMegaMenu === cat.name.toLowerCase() && hasSubCats && (
          <MegaMenu
            onClose={() => setActiveMegaMenu(null)}
            category={cat}
            
            subcategories={subCategoriesMap[cat._id]}
          />
        )}
      </div>
    );
  })}
</nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block p-2 text-stone-700 hover:text-[#B67032]">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-[#B67032]">
              <Heart className="w-5 h-5" />
            </button>
            <button className="p-2 text-stone-700 hover:text-[#B67032]">
              <User className="w-5 h-5" />
            </button>
              <button
      onClick={() => setIsCartOpen(true)}
      className="p-2 text-stone-700 hover:text-[#B67032] relative"
    >
      <ShoppingBag className="w-5 h-5" />
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#B67032] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </button>
          </div>
        </div>
      </div>

 {/* Mega Menus (Dynamic) */}
     
{/* 
 {activeMegaMenu === cat.name.toLowerCase() && hasSubCats && (
          <MegaMenu
            onClose={() => setActiveMegaMenu(null)}
            category={cat}
            subcategories={subCategoriesMap[cat._id]}
          />
        )} */}




      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed inset-0 z-50 transition-transform lg:hidden ${{
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
              <Link href="/" className="flex-shrink-0 group">
            <img
            
              src="/Images/logo.webp"
              alt="Saaj Riwaaj Logo"
              className="h-10 w-auto lg:h-12 transition-transform group-hover:scale-105"
            />
          </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="cursor-pointer p-2">
              <X className="w-6 h-6" />
            </button>
          </div>
          <nav className="flex-grow  p-4 space-y-2">
            {categories.map((cat) =>{
              const Icon = iconOptions[categories.indexOf(cat) % iconOptions.length];

                const categoryPath = `/category/${formatCategoryPath(cat.name)}/${formatCategoryPath(cat._id)}`;
                const categoryLabel = formatCategoryLabel(cat.name);
              return(
              <Link
               key={cat._id}
               href={categoryPath}
                onClick={() => setIsMobileMenuOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all`}
      
          >
            <Icon size={18} />
            {categoryLabel}
          </Link>
        
            )})}
          </nav>
        </div>
      </div>
    </header>
  );
}
