'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useGlobalContext } from '../context/GlobalContext' 
import {
  LayoutDashboard,
  Package,
  PlusSquare,
  logoutAdmin,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
} from 'lucide-react'
import PopupModal from './ConfirmPopup'

const navItems = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'All Products', href: '/admin/products', icon: Package },
  { name: 'Add Product', href: '/admin/products/add', icon: PlusSquare },
   { name: 'Tags', href: '/admin/tags', icon: Package },
  { name: 'Categories', href: '/admin/categories', icon: PlusSquare },
  { name: 'Sub Categories', href: '/admin/subcategories', icon: PlusSquare },
  { name: 'banner', href: '/admin/banner', icon: PlusSquare },
  { name: 'users', href: '/admin/users', icon: PlusSquare },
  { name: 'Account', href: '/admin/account', icon: User },
  { name: 'Coupon', href: '/admin/coupon', icon: User },




]
function Sidebar() {
    const { logoutAdmin } = useGlobalContext();
    const pathname = usePathname()
    const [collapsed, setCollapsed] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [showLogoutPopup, setShowLogoutPopup] = useState(false);
    
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
    <div>  <aside
  className={`
   sticky min-h-screen z-50  top-0 left-0 
    ${collapsed ? 'w-20' : 'w-64'} 
    transition-all duration-300 
    px-4 py-8 flex shadow-md flex-col justify-between 
    bg-[#faf8f8]  
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
            className={`flex items-center gap-3 capitalize px-4 py-3 rounded-lg text-sm transition-all
              ${
                active
                  ? 'bg-[#f3f2f1] text-black'
                  : 'neumorphic-btn hover:bg-[#f3f2f1]'
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
   <button
    onClick={() => setShowLogoutPopup(true)}
    className="neumorphic-btn cursor-pointer flex items-center gap-3 px-4 py-3 w-full rounded-xl text-sm text-red-500 hover:text-red-700 transition"
  >
    <LogOut size={18} />
    {!collapsed && "Logout"}
  </button>
  </div>
</aside>
{showLogoutPopup && (
  <PopupModal
    title="Are you sure you want to logout?"
    onCancel={() => setShowLogoutPopup(false)}
    onConfirm={() => {
      setShowLogoutPopup(false);
      logoutAdmin();
    }}
    confirmText="Logout"
    cancelText="Cancel"
    type="delete"
  />
)}
</div>
  )
}

export default Sidebar