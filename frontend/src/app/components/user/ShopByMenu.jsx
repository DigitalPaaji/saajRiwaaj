import React from 'react';
import Link from 'next/link';

const categories = [
  { name: 'Rings', imageUrl: 'https://images.unsplash.com/photo-1598561074773-4554b548b23b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Rings' },
  { name: 'Earrings', imageUrl: 'https://images.unsplash.com/photo-1612178948253-1c9a11a33773?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Earrings' },
  { name: 'Necklaces', imageUrl: 'https://images.unsplash.com/photo-1611591437281-462bf4d3ab45?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Necklaces' },
  { name: 'Bracelets', imageUrl: 'https://images.unsplash.com/photo-1616782163533-8b7250b335aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Bracelets' },
  { name: 'Pendants', imageUrl: 'https://images.unsplash.com/photo-1617038220399-c6b3c1859b56?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Pendants' },
  { name: 'Bangles', imageUrl: 'https://images.unsplash.com/photo-1611955812328-1b1b4227e029?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80', link: 'Bangles' },
];

export default function ShopByCategory() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif text-center mb-12">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 text-center">
          {categories.map(category => (
            <Link href={category.link} key={category.name} className="group">
              <div className="aspect-square rounded-full overflow-hidden border-2 border-stone-200 group-hover:border-amber-400 transition-all duration-300">
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="mt-4 font-semibold text-lg text-stone-700 group-hover:text-amber-700 transition-colors duration-300">{category.name}</h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}