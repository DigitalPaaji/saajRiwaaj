'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';
const filtersData = {
  // categories: ['earrings', 'neckwear', 'collections', 'saaj riwaaj exclusive'],
  // subcategories: [
  //   'jhumkas', 'studs', 'hoops', 'danglers', 'chandbalis',
  //   'chains', 'necklace sets', 'layered necklaces',
  //   'oxidized', 'wedding', 'modern'
  // ],
  tags: [
    'anti-tarnish', 'fashion jewellery', 'ear-rings', 'studs', 'hoops',
    'danglers', 'chandbali', 'sahara collection', 'wedding special',
    'bridal collection', 'neck chains', 'american diamond collection',
    'daily wear collection', 'oxidised jewellery', 'necklaces',
    'meenakari collection', 'kundan / polki collection'
  ],
  highlights: ['Featured', 'New Arrivals'],
  priceRanges: ['Under ₹1000', '₹1000 - ₹2500', '₹2500 - ₹5000', 'Above ₹5000']
};

export default function LeftFilterSidebar({ collapsed, setCollapsed, Pid }) {
  const {subCategoriesMap} = useGlobalContext();
  const subCategories = subCategoriesMap[Pid] || [];
  return (
    <aside
      className={`
        ${collapsed ? 'w-12' : 'w-56 lg:w-64'} 
        transition-all duration-300 
        min-h-screen sticky top-0 z-20 px-2 py-4
      `}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-white rounded-lg bg-[#4d4c4b] p-1"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {!collapsed && (
        <div className="space-y-6">
          {/* <FilterGroup title="Categories" items={filtersData.categories} /> */}
          <FilterGroup title="Subcategories" items={filtersData.subcategories} />
          <FilterGroup title="Price" items={filtersData.priceRanges} />

          <FilterGroup title="Tags" items={filtersData.tags} />
          <FilterGroup title="Highlights" items={filtersData.highlights} />
        </div>
      )}
    </aside>
  );
}

function FilterGroup({ title, items }) {
  return (
    <div>
      <h3 className="text-sm font-medium text-gray-600 mb-2">{title}</h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item}>
            <label className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
              <input type="checkbox" className="accent-black" />
              {item}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
