'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerData, setBannerData] = useState([]);

  useEffect(() => {
    const dummyBanners = [
      {
        id: 1,
        title: "The Solitaire Collection",
        description: "Unmatched brilliance, exceptional craftsmanship.",
        imageUrl: "https://images.unsplash.com/photo-1620950337833-500a1d433b9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        buttonText: "Explore Now",
        link: "Solitaire"
      },
      {
        id: 2,
        title: "Ethereal Pearls",
        description: "Timeless elegance for the modern muse.",
        imageUrl: "https://images.unsplash.com/photo-1588444968576-f6453a1a37b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        buttonText: "Discover Pearls",
        link: "Pearls"
      },
      {
        id: 3,
        title: "Men's Platinum",
        description: "Strength and sophistication, forged in platinum.",
        imageUrl: "https://images.unsplash.com/photo-1617038220399-c6b3c1859b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
        buttonText: "Shop The Collection",
        link: "MensPlatinum"
      }
    ];
    setBannerData(dummyBanners);
  }, []);

  useEffect(() => {
    if (bannerData.length === 0) return;
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % bannerData.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [bannerData.length]);

  if (bannerData.length === 0) return <div className="h-[80vh] bg-stone-100"></div>;
  
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      {bannerData.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={banner.imageUrl} alt={banner.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="absolute inset-0 flex items-center justify-center text-white">
            <div className="text-center max-w-4xl px-4 animate-[fadeInUp_1s_ease-out]">
              <h1 className="text-4xl md:text-6xl font-serif mb-4">{banner.title}</h1>
              <p className="text-lg md:text-xl mb-8">{banner.description}</p>
              <Link href={banner.link} className="bg-white text-stone-800 font-semibold px-8 py-3 rounded-full hover:bg-amber-50 transition-colors duration-300">
                {banner.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}