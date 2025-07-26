'use client';
import React, { useEffect, useState, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';
import Link from 'next/link';

export default function HeroBanner() {
  const [banners, setBanners] = useState([]);

  const fetchBanners = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:5000/banner');
      const data = await res.json();
      setBanners(data);
    } catch (err) {
      console.error("Error fetching banners:", err);
    }
  }, []);

  useEffect(() => {
    fetchBanners();
  }, [fetchBanners]);

  if (banners.length === 0) {
    return <div className="h-auto bg-stone-100 animate-pulse"></div>;
  }

  return (
    <section className="relative w-full overflow-hidden">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        pagination={{ clickable: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full h-auto"
      >
        {banners.map((banner, index) => (
          <SwiperSlide key={index}>
            <div className="relative w-full h-full">
        <img
  src={banner.mobileImage}
  alt="Mobile Banner"
  className="block lg:hidden w-full h-full "
/>
<img
  src={banner.desktopImage}
  alt="Desktop Banner"
  className="hidden lg:block w-full h-full "
/>

              {/* Optional: Overlay content */}
              {/* <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-white text-center px-4 max-w-4xl animate-fadeInUp">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-semibold mb-4">
                    {banner.title}
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl mb-6">
                    {banner.description}
                  </p>
                  {banner.buttonText && banner.link && (
                    <Link
                      href={banner.link}
                      className="bg-white text-stone-800 font-semibold px-6 py-3 rounded-full hover:bg-amber-100 transition-colors duration-300"
                    >
                      {banner.buttonText}
                    </Link>
                  )}
                </div>
              </div> */}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
