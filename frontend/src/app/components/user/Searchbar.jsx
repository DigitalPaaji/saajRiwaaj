"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function SearchBar({ products, onClose }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [placeholder, setPlaceholder] = useState("Search products...");

  // Debounce search results
  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() === "") {
        const randomProducts = [...products]
          .sort(() => 0.5 - Math.random())
          .slice(0, 10);
        setFiltered(randomProducts);
      } else {
        const matches = products.filter((p) =>
          p.name?.toLowerCase().includes(query.toLowerCase())
        );
        setFiltered(
          matches.length > 0
            ? matches
            : [...products].sort(() => 0.5 - Math.random()).slice(0, 10)
        );
      }
    }, 300);

    return () => clearTimeout(handler);
  }, [query, products]);

  // Dynamic placeholder rotation (every 3s)
  useEffect(() => {
    if (!products?.length) return;
    let idx = 0;
    const interval = setInterval(() => {
      setPlaceholder(products[idx % products.length]?.name || "Search...");
      idx++;
    }, 3000);
    return () => clearInterval(interval);
  }, [products]);

  return (
    <div className="absolute top-full left-1/2  w-1/2 bg-white shadow-lg border-t animate-[fadeIn_0.3s_ease-out] z-50">
      <div className="max-w-screen-2xl mx-auto px-8 py-6">
        {/* Search Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-[#B67032] text-sm"
          />
        </div>

        {/* Results Row */}
        <div className="flex gap-4 overflow-x-auto pb-2 custom-scroll">
          {filtered.map((item) => (
            <Link
              key={item._id}
              href={`/product/${item.name?.toLowerCase().replace(/\s+/g, "-")}/${item._id}`}
              onClick={onClose}
              className="flex-shrink-0 w-40 group border rounded-md overflow-hidden hover:border-[#B67032] transition"
            >
              <div className="w-full h-32">
                <img
                  src={item.images?.[0]}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition"
                />
              </div>
              <div className="p-2">
                <h4 className="text-xs font-medium text-stone-800 group-hover:text-[#B67032] line-clamp-1">
                  {item.name}
                </h4>
                {item.price && (
                  <p className="text-[#B67032] font-semibold text-xs">
                    ₹{item.price}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
