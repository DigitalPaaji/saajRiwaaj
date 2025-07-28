'use client';
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ShopByCategory from './ShopByMenu';
import EditorialSection from './EditorialSection';
import FeaturedProducts from './FeauturedProducts';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';

import EarringsMarquee from './Earring';

export default function Home() {
 

  return (
    <div className="min-h-screen text-stone-800 bg-[#f3ecdf5d]">
      
        <AnnouncementBar />
      <Navbar/>
        <HeroBanner />
        <EditorialSection />
        <EarringsMarquee/>
{/* <Earrings
  categoryId="6880c122e9e1dc327b67e304" // earrings category ID
  categoryName="Earrings"
  heading="Shop Earrings"
  description="From timeless studs to graceful chandbalis, find your perfect pair."
/> */}

        <ShopByCategory />
        <FeaturedProducts />
      <Footer />
    </div>
  );
}