'use client';

import Collection from '../../../components/user/Collection';
import InnerBanner from '../../../components/user/InnerBanner';
import { useState } from 'react';
import { useParams } from 'next/navigation';

export default function FilterLayout() {
 
  const [filters, setFilters] = useState({
    subCategories: [],
    tags: [],
    prices: [],
  });
  const { name } = useParams();

  return (
    <div>
      <InnerBanner title={name} image="/Images/banner.webp" />
      <div className="relative px-4 md:px-12 xl:px-24 py-12">

     <main className="flex-1 w-full">
          <Collection Pid={'6880c122e9e1dc327b67e304'} filters={filters} />
        </main>
      
      </div>
    </div>
  );
}
