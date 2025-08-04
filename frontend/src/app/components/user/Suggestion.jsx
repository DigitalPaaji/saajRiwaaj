'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGlobalContext } from "../context/GlobalContext";
import { FaRupeeSign } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';

export default function ShopByCategory() {
  const { allProducts, refetchAllProducts } = useGlobalContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      await refetchAllProducts();
      setLoading(false);
    };
    fetch();
  }, [refetchAllProducts]);



  if (!loading && allProducts.length === 0) return null; // hide section if no data

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
     
        {/* <div>
          <h2 className="text-3xl md:text-4xl font-serif text-center">Best Sellers</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif text-center mt-4">
            The favorites everyone's talking about. Timeless picks loved by all.
          </p>
        </div> */}

       <div className="overflow-x-auto scrollbar-hide">
        {loading ? (
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {Array.from({ length: 6 }).map((_, idx) => (
              <div
                key={idx}
                className="min-w-[220px] sm:min-w-[250px] bg-white rounded-xl overflow-hidden shadow-md animate-pulse flex-shrink-0"
              >
                <div className="w-full h-[300px] bg-stone-200" />
                <div className="p-4 space-y-2">
                  <div className="h-4 bg-stone-300 rounded w-3/4" />
                  <div className="h-3 bg-stone-200 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
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
            {allProducts.map((item, idx) => {
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
                      <Image
                       width={400}
                  height={400}
                        src={item.images?.[0]}
                        alt={item.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute top-2 right-0 bg-[#B67032] text-white text-xs p-2 rounded-lg">

  {item.discount > 0 ? `Flat ${item.discount}% off` : 'Best Price'}

                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between">
                      <h4 className="font-semibold text-stone-800 group-hover:text-[#B67032] transition-colors text-md truncate">
                        {item.name}
                      </h4>
                          {item.description?.paragraphs?.[0] && (
                      <p className="text-sm text-stone-600 mt-1 line-clamp-2">
                        {item.description.paragraphs[0].split(" ").slice(0, 10).join(" ")}...
                      </p>
                    )}
                 
                                                               <h3 className="flex items-center mt-1 font-semibold text-md text-[#B67032] transition-colors duration-300 ">
                                            <span className="line-through mr-4 flex items-center ">
                                              <FaRupeeSign size={14} />
                                              {item.price}
                                            </span><FaRupeeSign size={14} />  {item.finalPrice}
                                          </h3>
                                        
                    </div>
                  </Link>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
