import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';

const ProductCard = ({ product }) => {
  return (
    <div className="group text-center">
      <div className="relative overflow-hidden">
        <Link href={`product/${product.id}`}>
          <img src={product.imageUrl} alt={product.name} className="transition-opacity duration-500 group-hover:opacity-0" />
          <img src={product.hoverImageUrl} alt={product.name} className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        </Link>
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:text-red-500">
          <Heart className="w-5 h-5" />
        </button>
      </div>
      <div className="mt-4">
        <h3 className="font-semibold text-stone-800">{product.name}</h3>
        <p className="text-stone-600 mt-1">₹{product.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

export default function FeaturedProducts() {
  const products = [
    { id: 1, name: 'Aura Diamond Studs', price: 45000, imageUrl: 'https://images.unsplash.com/photo-1600721391689-b21a44315b81?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', hoverImageUrl: 'https://images.unsplash.com/photo-1611652033939-a7624d3a3553?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 2, name: 'Eternity Gold Band', price: 32000, imageUrl: 'https://images.unsplash.com/photo-1598561074773-4554b548b23b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', hoverImageUrl: 'https://images.unsplash.com/photo-1627293583162-5355b0a5ca65?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 3, name: 'Celestial Pendant', price: 28500, imageUrl: 'https://images.unsplash.com/photo-1617038220399-c6b3c1859b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', hoverImageUrl: 'https://images.unsplash.com/photo-1611591437281-462bf4d3ab45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
    { id: 4, name: 'Heritage Jhumkas', price: 68000, imageUrl: 'https://images.unsplash.com/photo-1612178948253-1c9a11a33773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', hoverImageUrl: 'https://images.unsplash.com/photo-1600721391717-d61e3ab331f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80' },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Our Bestsellers</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {products.map(product => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  );
}