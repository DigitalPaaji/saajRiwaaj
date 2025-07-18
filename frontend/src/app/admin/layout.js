'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Products', href: '/admin/products', icon: Package },
  { name: 'Add Product', href: '/admin/products/add', icon: PlusSquare },
]

export default function AdminLayout({ children }) {
  const pathname = usePathname()
const [collapsed, setCollapsed] = useState(false);
const [isMobile, setIsMobile] = useState(false);

useEffect(() => {
  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    if (window.innerWidth < 768) {
      setCollapsed(true); // auto collapse on mobile
    }
  };

  handleResize(); // Initial check
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);
  return (
    <div className="flex h-full md:min-h-screen bg-[#e0e0e0] transition-all duration-300 text-[#333] font-sans ">
      {/* Sidebar */}
  <aside
  className={`
   relative z-50 min-h-screen top-0 left-0 
    ${collapsed ? 'w-20' : 'w-64'} 
    transition-all duration-300 
    px-4 py-8 flex shadow-md flex-col justify-between 
    bg-[#e0e0e0]  
    ${isMobile && !collapsed ? 'absolute' : ''}
  `}
>
  {/* Top Section */}
  <div>
    <div className="flex items-center justify-between mb-6">
      {!collapsed && (
        <h1 className="text-xl lg:text-2xl font-bold text-[#4d4c4b] drop-shadow-sm">
          Saaj Riwaaj
        </h1>
      )}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 neumorphic-btn ml-auto lg:ml-0"
      >
        {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
      </button>
    </div>

    <nav className="space-y-3">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;
        return (
          <Link
            key={item.name}
             onClick={() =>{ if(window.innerWidth<768){
              setCollapsed(true)}
             }}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all
              ${
                active
                  ? 'bg-[#d1d1d1] text-black'
                  : 'neumorphic-btn hover:bg-[#d6d6d6]'
              }`}
          >
            <Icon size={18} />
            {!collapsed && item.name}
          </Link>
        );
      })}
    </nav>
  </div>

  {/* Bottom Section */}
  <div>
    <button className="neumorphic-btn cursor-pointer flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-red-500 hover:text-red-700 transition">
      <LogOut size={18} />
      {!collapsed && 'Logout'}
    </button>
  </div>
</aside>


      {/* Main Content */}
      <main className="flex-1  p-8  overflow-y-auto shadow-2xl ">
        {children}
      </main>
    </div>
  )
}
