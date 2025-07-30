'use client';
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import BestSellers from './BestSellers';
import EditorialSection from './EditorialSection';
import Exclusive from './Exclusive';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import CategorySection from './CategorySlider';
import EarringsMarquee from './Earring';
import Neckwear from './Neckwear'
export default function Home() {
 
  return (
    <div className="min-h-screen text-stone-800 bg-[#f3ecdf5d]">
      
        <AnnouncementBar />
      <Navbar/>
        <HeroBanner />

        <EditorialSection />
        <EarringsMarquee/>
        <Exclusive />

        <BestSellers />

<Neckwear/>





      <Footer />
    </div>
  );
}