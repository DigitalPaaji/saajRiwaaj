import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function MegaMenu({ onClose, category, subcategories }) {
    if (!category || !subcategories?.length) return null;
  // const content = {
  //   earrings: {
  //     categories: [
  //       { name: 'Studs', link: '/earrings/studs' },
  //       { name: 'Jhumkas', link: '/earrings/jhumkas' },
  //       { name: 'Hoops', link: '/earrings/hoops' },
  //       { name: 'Danglers', link: '/earrings/danglers' },
  //       { name: 'Chandbalis', link: '/earrings/chandbalis' },
  //     ],
  //     viewAll: '/earrings',
  //   },
  //   neckwear: {
  //     categories: [
  //       { name: 'Chokers', link: '/neckwear/chokers' },
  //       { name: 'Long Necklaces', link: '/neckwear/long' },
  //       { name: 'Pearl Sets', link: '/neckwear/pearls' },
  //       { name: 'Layered Necklaces', link: '/neckwear/layered' },
  //     ],
  //     viewAll: '/neckwear',
  //   },
  //   collections: {
  //     categories: [
  //       { name: 'Modern', link: '/collections/modern' },
  //       { name: 'Oxidized', link: '/collections/oxidized' },
  //       { name: 'Wedding', link: '/collections/wedding' },
  //       { name: 'Party Wear', link: '/collections/partywear' },
  //     ],
  //     viewAll: '/collections',
  //   },
  //   exclusive: {
  //     categories: [
  //       { name: 'New Arrivals', link: '/exclusive/new' },
  //       { name: 'Best Sellers', link: '/exclusive/bestsellers' },
  //       { name: 'Limited Edition', link: '/exclusive/limited' },
  //       { name: 'Signature Picks', link: '/exclusive/signature' },
  //     ],
  //     viewAll: '/exclusive',
  //   },
  // };

  const featured = [
    {
      name: 'The Aura Collection',
      description: 'Minimalist designs for everyday sparkle.',
      imageUrl: '/Images/1.webp',
      link: '/collections/aura',
    },
    {
      name: 'Geometric Gems',
      description: 'Bold shapes meet modern elegance.',
      imageUrl: '/Images/2.webp',
      link: '/collections/geometric',
    },
    {
      name: 'Riwaaj Royal',
      description: 'Our top picks in luxurious charm.',
      imageUrl: '/Images/3.webp',
      link: '/exclusive/royal',
    },  {
      name: 'Geometric Gems',
      description: 'Bold shapes meet modern elegance.',
      imageUrl: '/Images/2.webp',
      link: '/collections/geometric',
    },
    {
      name: 'Riwaaj Royal',
      description: 'Our top picks in luxurious charm.',
      imageUrl: '/Images/3.webp',
      link: '/exclusive/royal',
    },
  ];

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

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-lg border-t animate-[fadeIn_0.3s_ease-out] z-50">
      <div className="max-w-screen-2xl mx-auto px-8 py-10 grid grid-cols-4 gap-8">
        {/* Categories */}
        <div className="col-span-1">
          <h3 className="text-sm font-semibold uppercase text-stone-500 mb-4"> Shop By Category</h3>
          <ul className="space-y-3">
            {subcategories.map((sub) => {
              const categoryPath = `/${formatCategoryPath(category.name)}/${formatCategoryPath(sub.name)}`;
    const categoryLabel = formatCategoryLabel(sub.name);
            return(
              <li key={sub._id}>
                <Link
             href={`/${category.name.toLowerCase().replace(/\s+/g, '-')}/${sub.name.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={onClose}
                  className="hover:text-amber-700 hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  {categoryLabel}
                </Link>
              </li>
            )})}
            <li>
              <Link
                href={`/${category.name.toLowerCase()}`}
                onClick={onClose}
                className="flex items-center text-amber-700 font-semibold mt-4 hover:underline"
              >
                View All <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </li>
          </ul>
        </div>

        {/* Featured Collections */}
        <div className="col-span-3">
          <h3 className="text-sm font-semibold uppercase text-stone-500 mb-4">Featured</h3>
          <div className="grid grid-cols-5 gap-8">
            {featured.map((item, idx) => (
              <Link
                key={idx}
                href={item.link}
                onClick={onClose}
                className="group flex flex-col items-center bg-stone-50 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="w-full">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="h-60 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h4 className="font-semibold text-stone-800 group-hover:text-amber-700 transition-colors">
                    {item.name}
                  </h4>
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
