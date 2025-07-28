'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { ArrowRight } from 'lucide-react';
import { useGlobalContext } from '../context/GlobalContext';

export default function EarringsMarquee() {
  const { subCategoriesMap, refetchAllProducts, productsByCategory, refetchProductsByCategory } = useGlobalContext();
//  const [selectedSub, setSelectedSub] = useState('all');
  const subCategories = subCategoriesMap['6880c122e9e1dc327b67e304'] || [];


  const earringsCategoryId = '6880c122e9e1dc327b67e304'; // Replace with your actual category ID
  const products = productsByCategory.filter((p) => p.category === earringsCategoryId);

  useEffect(() => {

    refetchAllProducts();
    refetchProductsByCategory('6880c122e9e1dc327b67e304')
  }, [refetchProductsByCategory,refetchAllProducts]);
const loop = [...productsByCategory,...productsByCategory]

  return (
    <section className="py-16 px-4 sm:px-8 lg:px-16 bg-[#fff8f1]">
      <div className="flex items-center justify-between flex-wrap xl:flex-nowrap mb-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-serif">Shop Earrings</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif mt-4">
           From timeless studs to graceful chandbalis, find your perfect pair.
          </p>
        </div>
        <ul className="flex gap-4 mt-4 xl:mt-0 flex-wrap text-md font-medium">
          <li>
      
          </li>
          {subCategories.slice(0, 5).map((sub) => (
            <li key={sub._id}>
              <div
                // onClick={() => setSelectedSub(sub._id)}
                className={`neumorphic-btn1 p-2 transition-all text-[#B67032] `}
              >
             {sub.name.toUpperCase()}
              </div>
            </li>
          ))}
          {/* <li>
            <Link
              href={`/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center text-[#B67032] font-semibold hover:underline ml-4"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </li> */}
        </ul>
      </div>
      <div className="overflow-x-auto scrollbar-hide">
<Swiper
  modules={[Navigation, Autoplay]}
  slidesPerView={2}
  spaceBetween={16}
  breakpoints={{
    640: { slidesPerView: 2 },
    768: { slidesPerView: 3 },
    1024: { slidesPerView: 4 },
    1280: { slidesPerView: 5 },
    1536: { slidesPerView: 6 },
  }}
  autoplay={{
    delay: 0,
    disableOnInteraction: false,
  }}
  speed={6000}
  loop={true}
  grabCursor={true}
>
  {loop.map((item, idx) => {
    const categoryPath = item.category?.name?.toLowerCase().replace(/\s+/g, '-') || 'category';
    const subcategoryPath = item.subcategory?.name?.toLowerCase().replace(/\s+/g, '-') || 'subcategory';
    const productPath = `${categoryPath}/${subcategoryPath}`;

    return (
      <SwiperSlide key={idx}>
        <Link
          href={`/${productPath}`}
          className="group flex-shrink-0 w-full bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow"
        >
          <div className="w-full h-[300px] relative">
            <img
              src={item.images?.[0]}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-2 left-2 bg-[#B67032] text-white text-xs px-2 py-1 rounded">
              {item.subCategory || item.subcategory?.name || 'Earring'}
            </div>
          </div>
          <div className="p-4 flex flex-col justify-between">
            <h4 className="font-semibold text-stone-800 group-hover:text-[#B67032] transition-colors text-sm truncate">
              {item.name}
            </h4>
            <p className="text-xs text-stone-600 mt-1 line-clamp-2">{item.description}</p>
          </div>
        </Link>
      </SwiperSlide>
    );
  })}
</Swiper>


      </div>

      <style jsx>{`
        .animate-scroll {
          animation: scroll-x 60s linear infinite;
        }
        @keyframes scroll-x {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
