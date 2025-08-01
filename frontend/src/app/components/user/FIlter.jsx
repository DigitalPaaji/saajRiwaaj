'use client';

import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Filter } from 'lucide-react';

const filters = ['Gold', 'Silver', 'Pearls', 'Kundan', 'Under ₹1000'];

export default function LeftFilterSidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`
        ${collapsed ? 'w-20' : 'w-64'} 
        bg-white border-r p-4 transition-all duration-300 
        min-h-screen sticky top-0 z-20
      `}
    >
      <div className="flex items-center justify-between mb-6">
        {!collapsed && (
          <h2 className="text-lg font-semibold text-gray-700">Filters</h2>
        )}
        <button onClick={() => setCollapsed(!collapsed)} className="text-gray-600">
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <ul className="space-y-3">
        {filters.map((f) => (
          <li key={f}>
            <label className="flex items-center gap-3 text-sm cursor-pointer">
              <input type="checkbox" className="accent-black" />
              {!collapsed && f}
            </label>
          </li>
        ))}
      </ul>
    </aside>
  );
}
