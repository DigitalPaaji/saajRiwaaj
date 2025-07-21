import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MegaMenu({ onClose }) {
  const categories = [
    { name: 'Rings', link: 'Rings' },
    { name: 'Earrings', link: 'Earrings' },
    { name: 'Necklaces', link: 'Necklaces' },
    { name: 'Bracelets', link: 'Bracelets' },
    { name: 'Pendants', link: 'Pendants' },
  ];

  const featured = [
    { 
      name: 'The Aura Collection', 
      description: 'Minimalist designs for everyday sparkle.',
      imageUrl: 'https://images.unsplash.com/photo-1611652033939-a7624d3a3553?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      link: 'AuraCollection'
    },
    { 
      name: 'Geometric Gems', 
      description: 'Bold shapes meet modern elegance.',
      imageUrl: 'https://images.unsplash.com/photo-1591811262334-90554d5381a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      link: 'GeometricGems'
    },
  ];

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t animate-[fadeIn_0.3s_ease-out]">
      <div className="max-w-screen-2xl mx-auto px-8 py-10 grid grid-cols-4 gap-8">
        {/* Categories */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold uppercase text-stone-500 mb-4">Shop By Category</h3>
          <ul className="space-y-3">
            {categories.map(cat => (
              <li key={cat.name}>
                <Link href={cat.link} onClick={onClose} className="hover:text-amber-700 hover:translate-x-1 transition-all duration-200 inline-block">
                  {cat.name}
                </Link>
              </li>
            ))}
            <li>
                <Link href={"Modern"} onClick={onClose} className="flex items-center text-amber-700 font-semibold mt-4 hover:underline">
                  View All Modern <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </li>
          </ul>
        </div>
        
        {/* Featured Collections */}
        <div className="col-span-3">
          <h3 className="text-sm font-semibold uppercase text-stone-500 mb-4">Featured</h3>
          <div className="grid grid-cols-2 gap-8">
            {featured.map(item => (
              <Link href={item.link} onClick={onClose} key={item.name} className="group flex items-center bg-stone-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <div className="w-1/3">
                  <img src={item.imageUrl} alt={item.name} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                </div>
                <div className="p-4 flex-1">
                  <h4 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">{item.name}</h4>
                  <p className="text-sm text-stone-600">{item.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}