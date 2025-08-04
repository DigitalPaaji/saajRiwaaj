'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useGlobalContext } from '../context/GlobalContext';
import Image from 'next/image';
import { FaRupeeSign } from 'react-icons/fa';

export default function Collection({ Pid, filters = { subCategories: [], tags: [], prices: [] } }) {
  const { subCategoriesMap, refetchProductsByCategory } = useGlobalContext();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const skeletons = Array.from({ length: 6 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const result = await refetchProductsByCategory(Pid);
        let filtered = Array.isArray(result)
          ? result.filter(p => p.category === Pid || p.category?._id === Pid)
          : [];

        const { subCategories = [], tags = [], prices = [] } = filters;
        const hasFilters = subCategories.length > 0 || tags.length > 0 || prices.length > 0;

        if (hasFilters) {
          // Subcategory filter
          if (subCategories.length > 0) {
            filtered = filtered.filter(p =>
              subCategories.includes(p.subcategory?.name?.toUpperCase())
            );
          }

          // Tag filter (compare tag IDs directly)
          if (tags.length > 0) {
            filtered = filtered.filter(p =>
              p.tags?.some(tagId => tags.includes(tagId))
            );
          }

          // Price filter
          if (prices.length > 0) {
            filtered = filtered.filter(p => {
              const price = p.finalPrice;
              return prices.some(range => {
                if (range === 'Under ₹1000') return price < 1000;
                if (range === '₹1000 - ₹2500') return price >= 1000 && price <= 2500;
                if (range === '₹2500 - ₹5000') return price > 2500 && price <= 5000;
                if (range === 'Above ₹5000') return price > 5000;
                return false;
              });
            });
          }
        }

        setFilteredProducts(filtered);
      } catch (error) {
        console.error('Error fetching products:', error);
        setFilteredProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [Pid, filters]);

  return (
    <section>
      <div className=" col-span-1 xl:col-span-8 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {loading
            ? skeletons.map((_, idx) => (
                <div key={idx} className="shadow-lg rounded-lg bg-gray-200 animate-pulse h-[400px]"></div>
              ))
            : filteredProducts.map((product, index) => (
                <Link
                  href={`/product/${product.name}/${product._id}`}
                  key={product._id}
                  className="group"
                >
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
                  <div className="flex items-center justify-between flex-wrap mt-4">
                    <h3 className="font-semibold text-lg text-stone-700 group-hover:text-[#B67032] transition-colors duration-300">
                      {product.name}
                    </h3>
                    <h3 className="flex items-center font-semibold text-md text-[#B67032] transition-colors duration-300">
                      <span className="line-through mr-4 flex items-center">
                        <FaRupeeSign size={14} />
                        {product.price}
                      </span>
                      <FaRupeeSign size={14} /> {product.finalPrice}
                    </h3>
                  </div>
                  <button className="py-2 w-full cursor-pointer bg-[#B67032] rounded-lg text-white font-semibold mt-4">
                    Add To Cart
                  </button>
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
