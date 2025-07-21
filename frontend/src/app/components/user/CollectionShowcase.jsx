import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const CollectionCard = ({ title, description, imageUrl, hoverImageUrl, link, bgColor }) => {
  return (
    <div className={`group relative overflow-hidden rounded-2xl ${bgColor} p-8 h-96 flex flex-col justify-between hover:shadow-2xl transition-all duration-500 hover:-translate-y-3 cursor-pointer`}>
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
          style={{ backgroundImage: `url("${imageUrl}")` }}
        ></div>
        <div 
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-all duration-700 opacity-0 group-hover:opacity-100 scale-105"
          style={{ backgroundImage: `url("${hoverImageUrl}")` }}
        ></div>
      </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-black/10 group-hover:to-black/20 transition-all duration-500"></div>
      
      <div className="relative z-10 transform transition-all duration-500 group-hover:translate-y-1">
        <h3 className="text-3xl font-bold text-stone-800 mb-4 transition-all duration-300 group-hover:text-amber-800">
          {title}
        </h3>
        <p className="text-stone-600 text-lg leading-relaxed transition-all duration-300 group-hover:text-stone-700">
          {description}
        </p>
      </div>
      
      <Link 
        href={link}
        className="relative z-10 inline-flex items-center text-amber-700 font-semibold group-hover:text-amber-800 transition-all duration-300 transform group-hover:translate-x-2"
      >
        Explore Collection
        <ArrowRight className="ml-2 w-5 h-5 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110" />
      </Link>

      {/* Decorative Element */}
      <div className="absolute top-4 right-4 w-8 h-8 bg-amber-200/30 rounded-full transition-all duration-500 group-hover:scale-150 group-hover:bg-amber-300/40"></div>
    </div>
  );
};

export default function CollectionShowcase() {
  const collections = [
    {
      title: "Modern",
      description: "Contemporary designs that blend minimalism with statement-making elegance for the modern woman.",
      imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "Modern",
      bgColor: "bg-gradient-to-br from-amber-50 to-amber-100"
    },
    {
      title: "Oxidized",
      description: "Artisanal pieces with vintage charm, showcasing traditional craftsmanship with an antique finish.",
      imageUrl: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImageUrl: "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "Oxidized",
      bgColor: "bg-gradient-to-br from-stone-100 to-stone-200"
    },
    {
      title: "Wedding",
      description: "Opulent bridal jewelry designed to make your special day unforgettable with timeless grandeur.",
      imageUrl: "https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      hoverImageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      link: "Wedding",
      bgColor: "bg-gradient-to-br from-rose-50 to-amber-50"
    }
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-stone-800 mb-6 relative">
            Our Collections
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full"></span>
          </h2>
          <p className="text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Each collection tells a unique story, crafted with passion and designed 
            to celebrate the diverse facets of feminine beauty.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <div
              key={index}
              className="opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CollectionCard {...collection} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}