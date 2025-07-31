'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaRupeeSign } from 'react-icons/fa';
import { useGlobalContext } from '../context/GlobalContext';
import { ArrowRight } from 'lucide-react';

export default function CategorySection({ categoryId, categoryName, heading, description }) {
  const { subCategoriesMap, refetchProductsByCategory } = useGlobalContext();
  const [selectedSub, setSelectedSub] = useState('all');
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const subCategories = subCategoriesMap[categoryId] || [];

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await refetchProductsByCategory(categoryId);
      setProducts(data || []);
      setLoading(false);
    };
    fetch();
  }, [categoryId, refetchProductsByCategory]);

  const filteredProducts = products.filter((p) => {
    const matchCategory = p.category === categoryId || p.category?._id === categoryId;
    const matchSub =
      selectedSub === 'all' ||
      p.subCategory === selectedSub ||
      p.subcategory?._id === selectedSub;
    return matchCategory && matchSub;
  });

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between flex-wrap xl:flex-nowrap mb-8">
        <div className="max-w-xl">
          <h2 className="text-3xl md:text-4xl font-serif">{heading}</h2>
          <p className="text-md md:text-xl text-stone-500 font-serif mt-4">{description}</p>
        </div>
        <ul className="flex gap-4 mt-4 xl:mt-0 flex-wrap text-md font-medium">
          <li>
            <button
              onClick={() => setSelectedSub('all')}
              className={`transition-all ${selectedSub === 'all' ? 'text-[#B67032]' : 'text-gray-600 hover:text-[#B67032]'}`}
            >
              All
            </button>
          </li>
          {subCategories.slice(0, 5).map((sub) => (
            <li key={sub._id}>
              <button
                onClick={() => setSelectedSub(sub._id)}
                className={`transition-all ${selectedSub === sub._id ? 'text-[#B67032]' : 'text-gray-600 hover:text-[#B67032]'}`}
              >
                {sub.name}
              </button>
            </li>
          ))}
          <li>
            <Link
              href={`/${categoryName.toLowerCase().replace(/\s+/g, '-')}`}
              className="flex items-center text-[#B67032] font-semibold hover:underline ml-4"
            >
              View All <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </li>
        </ul>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 xl:gap-10 text-center">
        {loading
          ? Array.from({ length: 5 }).map((_, idx) => (
              <div
                key={idx}
                className="aspect-square rounded-lg bg-gray-200 animate-pulse"
              ></div>
            ))
          : filteredProducts.slice(0, 5).map((product) => (
              <Link href={`/product/${product._id}`} key={product._id} className="group">
                <div className="aspect-square rounded-lg overflow-hidden shadow relative">
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 font-semibold text-lg text-stone-700 group-hover:text-[#B67032] transition">
                  {product.name}
                </h3>
                <h3 className="font-semibold text-md text-[#B67032] flex items-center justify-center mt-1">
                  <span className="line-through mr-3 flex items-center text-gray-500">
                    <FaRupeeSign size={14} />
                    {product.price}
                  </span>
                  <FaRupeeSign size={14} />
                  {product.finalPrice}
                </h3>
              </Link>
            ))}
      </div>
    </section>
  );
}
