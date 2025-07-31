'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGlobalContext } from "../context/GlobalContext";
import { FaRupeeSign } from 'react-icons/fa';

export default function ShopByCategory() {
  const { refetchProductsByCategory } = useGlobalContext();
  const [exclusiveProducts, setExclusiveProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const skeletons = Array.from({ length: 6 });
  const earringsCategoryId = '688321125c75af760aa800e7'; // Your actual category ID

useEffect(() => {
  const fetchData = async () => {
    setLoading(true);
    try {
      const result = await refetchProductsByCategory(earringsCategoryId);

      const filtered = Array.isArray(result)
        ? result.filter(
            (p) =>
              p.category === earringsCategoryId || p.category?._id === earringsCategoryId
          )
        : [];


      setExclusiveProducts(filtered);
    } catch (err) {
      console.error(' Error fetching category-exclusive products:', err);
    } finally {
      setLoading(false);
    }
  };

  fetchData();
}, []);


  return (
    <section className="py-12 ">
      <div className="px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-3xl md:text-4xl font-serif text-center">Saaj Riwaaj Exclusive</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif text-center mt-4">
            Crafted with passion, worn with pride. Explore our signature exclusives.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2   xl:grid-cols-5      gap-6 text-center py-12`}
        >
          {loading
            ? skeletons.map((_, idx) => (
                <div
                  key={idx}
                  className="shadow-lg rounded-lg bg-gray-200 animate-pulse h-[400px]"
                ></div>
              ))
            : exclusiveProducts.slice(0, 5).map((product) => (
                <Link href={'/category'} key={product._id} className="group">
                  <div className="relative w-full h-[400px] overflow-hidden shadow-lg rounded-lg">
                    <img
                      src={product.images?.[0]}
                      alt="product"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                    />

                    <img
                      src={product.images?.[1] || product.images?.[0]}
                      alt="product hover"
                      className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    />
                  </div>

                  <h3 className="mt-4 font-semibold text-lg text-stone-700 group-hover:text-[#B67032] transition-colors duration-300">
                    {product.name}
                  </h3>

                  <h3 className="font-semibold text-md text-[#B67032] transition-colors duration-300 flex items-center justify-center">
                    <span className="line-through mr-4 flex items-center">
                      <FaRupeeSign size={14} />
                      {product.price}
                    </span>
                    <FaRupeeSign size={14} />
                    {product.finalPrice}
                  </h3>
                </Link>
              ))}
        </div>
      </div>
    </section>
  );
}
