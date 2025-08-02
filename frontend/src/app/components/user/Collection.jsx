'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { useGlobalContext } from '../context/GlobalContext';
import Image from 'next/image';
import { FaRupeeSign } from 'react-icons/fa';

export default function EarringsMarquee({Pid}) {
  const { subCategoriesMap, refetchProductsByCategory } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skeletons = Array.from({ length: 6 });
//   '6880c122e9e1dc327b67e304';
  const subCategories = subCategoriesMap[Pid] || [];

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await refetchProductsByCategory(Pid);

      if (Array.isArray(result)) {
        const filtered = result.filter(
          (p) =>
            p.category === Pid || p.category?._id === Pid
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    } catch (err) {
      console.error('Error fetching earrings:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, [Pid]);


  const loop = filteredProducts;

  return (
    <section className="">
          <div
            className={`col-span-1 xl:col-span-8 flex flex-col justify-center `}
          >
                {/* <div>
          <h2 className="text-3xl md:text-4xl font-serif ">Saaj Riwaaj Exclusive</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif  mt-4">
            Crafted with passion, worn with pride. Explore our signature exclusives.
          </p>
        </div> */}
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 ">
            {loading
              ? skeletons.map((_, idx) => (
                  <div
                    key={idx}
                    className="shadow-lg rounded-lg bg-gray-200 animate-pulse "
                  ></div>
                ))
              : loop.map((product, index) => (
                  <Link href={`/product/${product.name}/${product._id}`} key={product._id} className="group">
                    {/* <div className="flex items-center justify-center gap-4"> */}
                      <div
                        className="group relative aspect-square overflow-hidden shadow-lg rounded-lg"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                      >
                      <div className="relative w-full h-full">
  <Image
    src={
      hoveredIndex === index && product.images?.[1]
        ? product.images[1]
        : product.images?.[0]
    }
    alt={product.name}
    fill
    className="object-cover rounded-xl transition-all duration-300"
    unoptimized
  />
</div>

                      </div>
                    <div className='flex items-center justify-between flex-wrap mt-4'>
                    <h3 className="font-semibold text-lg text-stone-700 group-hover:text-[#B67032] transition-colors duration-300">
                      {product.name}
                    </h3>
                                         <h3 className="flex items-center  font-semibold text-md text-[#B67032] transition-colors duration-300 ">
                      <span className="line-through mr-4 flex items-center ">
                        <FaRupeeSign size={14} />
                        {product.price}
                      </span><FaRupeeSign size={14} />  {product.finalPrice}
                    </h3>
                    </div>

                   <button className='py-2 w-full cursor-pointer bg-[#B67032] rounded-lg text-white font-semibold mt-4'>Add To Cart</button>
                  </Link>
                ))}
                </div>
          </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}
