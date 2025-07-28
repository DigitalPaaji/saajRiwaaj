'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGlobalContext } from "../../components/context/GlobalContext";
import { FaRupeeSign } from 'react-icons/fa';

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

  const skeletons = Array.from({ length: 6 });

  if (!loading && allProducts.length === 0) return null; // hide section if no data

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
     
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-center">Best Sellers</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif text-center mt-4">
            The favorites everyone's talking about. Timeless picks loved by all.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 xl:gap-12 text-center pt-24">
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="aspect-square rounded-full bg-gray-200 animate-pulse"
                ></div>
              ))
            : [...allProducts]
  .sort(() => 0.5 - Math.random())
  .slice(0, 6)
  .map((product) => (
                <Link href={'/category'} key={product._id} className="group">
                  <div className="aspect-square rounded-full overflow-hidden shadow-lg relative">
                    {/* Hover Image Swap */}
                    <img
                      src={product.images?.[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  
                  </div>
                  <h3 className="mt-4 font-semibold text-lg text-stone-700 group-hover:text-[#B67032] transition-colors duration-300">
                    {product.name}
                  </h3>
                   
                  <h3 className="font-semibold  text-md text-[#B67032] transition-colors duration-300 flex items-center justify-center">
                     <span className='line-through mr-4 flex items-center'><FaRupeeSign size={14}/>{product.price}</span><FaRupeeSign size={14}/>{product.finalPrice}
                  </h3>
                 
                
                </Link>
              ))}
        </div>
  
    </section>
  );
}
