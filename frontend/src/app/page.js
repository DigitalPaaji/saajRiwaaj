import React from 'react';
import Navbar from './components/user/Navbar';
import HeroBanner from './components/user/HeroBanner';
import ShopByCategory from './components/user/ShopByMenu';
import EditorialSection from './components/user/EditorialSection';
import FeaturedProducts from './components/user/FeauturedProducts';
import Footer from './components/user/Footer';
import AnnouncementBar from './components/user/AnnouncementBar';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-stone-800">
      
        <AnnouncementBar />
      <Navbar />
        <HeroBanner />
        <ShopByCategory />
        <EditorialSection />
        <FeaturedProducts />
      <Footer />
    </div>
  );
}