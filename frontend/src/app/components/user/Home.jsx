'use client';
import React from 'react';
import Navbar from './Navbar';
import HeroBanner from './HeroBanner';
import ShopByCategory from './ShopByMenu';
import EditorialSection from './EditorialSection';
import FeaturedProducts from './FeauturedProducts';
import Footer from './Footer';
import AnnouncementBar from './AnnouncementBar';
import { useState, useEffect, useCallback } from 'react';


export default function Home() {
 

  return (
    <div className="min-h-screen bg-white text-stone-800">
      
        <AnnouncementBar />
      <Navbar/>
        <HeroBanner />
        <ShopByCategory />
        <EditorialSection />
        <FeaturedProducts />
      <Footer />
    </div>
  );
}