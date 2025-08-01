'use client';

import Link from 'next/link';

export default function Banner({ title = '', image = '' }) {
  return (
    <div
      className="w-full h-[250px] md:h-[400px] bg-center bg-cover flex items-center justify-center relative text-white"
      style={{
        backgroundImage: `url(${image})`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 text-center px-4">
        <h1 className="text-2xl md:text-4xl font-bold ">{title.toUpperCase()}</h1>
        <div className="mt-2 text-sm md:text-base text-gray-200 space-x-1">
          <Link href="/" className="hover:underline">Home</Link>
          <span>/</span>
          <Link href="/collections" className="hover:underline">Category</Link>
          <span>/</span>
          <span className="capitalize">{title}</span>
        </div>
      </div>
    </div>
  );
}
