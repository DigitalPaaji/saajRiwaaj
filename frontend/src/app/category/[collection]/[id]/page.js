'use client';

import LeftFilterSidebar from '../../../components/user/FIlter';
import Collection from '../../../components/user/Collection';
import InnerBanner from '../../../components/user/InnerBanner'
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';


export default function FilterLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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
useEffect(()=>{
  console.log(id)
},[id])
  return (
    <div>
      
 <InnerBanner title = {collection} image = 'https://via.placeholder.com/1200x500?text=Earrings+Banner'/>
    <div className="flex  mx-4 md:mx-12 xl:mx-24  bg-gray-100">
      {/* Left Filter Sidebar */}
      <LeftFilterSidebar className={"fixed top-0"} collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Right Content */}
      <main className="flex-1 p-6">
        <Collection Pid={id}/>
      </main>
    </div>
       </div>
  );
}
