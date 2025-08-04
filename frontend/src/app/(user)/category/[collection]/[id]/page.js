'use client';

import LeftFilterSidebar from '../../../../components/user/Filter';
import Collection from '../../../../components/user/Collection';
import InnerBanner from '../../../../components/user/InnerBanner'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


export default function FilterLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
 const [filters, setFilters] = useState({
  subCategories: [],
  tags: [],
  prices: [],
});
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setCollapsed(mobile);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  const {collection,id}=useParams()
// useEffect(()=>{
//   console.log(id)
// },[id])
  return (
    <div>
 <InnerBanner title = {collection} image = '/Images/banner.webp'/>
    <div className="relative flex items-start justify-center md:gap-6  px-4 md:px-12 xl:px-24 py-24  ">
      {/* Left Filter Sidebar */}
       <div className="sticky top-24">
    <LeftFilterSidebar collapsed={collapsed} setCollapsed={setCollapsed} Pid={id}  onFilterChange={setFilters} />
  </div>

      {/* Right Content */}
      <main className="flex-1">
        <Collection Pid={id} filters={filters}/>
      </main>
    </div>
       </div>
  );
}
