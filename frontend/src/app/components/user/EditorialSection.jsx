import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EditorialSection() {
  const editorialItems = [
    {
      title: 'The Wedding Edit',
      description: 'Find the perfect jewels for your special day.',
      link: 'Wedding',
      imageUrl: 'https://images.unsplash.com/photo-1597037145435-b635f7564e7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      gridClass: 'lg:col-span-2 lg:row-span-2'
    },
    {
      title: 'Everyday Diamonds',
      description: 'Subtle sparkle for your daily life.',
      link: 'Diamonds',
      imageUrl: 'https://images.unsplash.com/photo-1599330293299-82f34e622142?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      gridClass: 'lg:col-span-1'
    },
    {
      title: 'Gifts of Love',
      description: 'Celebrate moments that matter.',
      link: 'Gifts',
      imageUrl: 'https://images.unsplash.com/photo-1553733393-2e745e0a4f5a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
      gridClass: 'lg:col-span-1'
    },
  ];

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 lg:grid-rows-2 gap-6">
          {editorialItems.map(item => (
            <div key={item.title} className={`relative rounded-lg overflow-hidden group ${item.gridClass} h-96 lg:h-auto`}>
              <img src={item.imageUrl} alt={item.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h3 className="text-3xl font-serif mb-2">{item.title}</h3>
                <p className="mb-4">{item.description}</p>
                <Link href={item.link} className="font-semibold flex items-center group-hover:underline">
                  Shop Now <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}