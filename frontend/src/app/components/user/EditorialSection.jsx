import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function EditorialSection() {
  const editorialItems = [
    {
      title: 'The Wedding Edit',
      description: 'Find the perfect jewels for your special day.',
      link: 'Wedding',
      imageUrl: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw1eded5b5/homepage/tanishq-collections/dailywear-chains.jpg',
    },
    {
      title: 'Everyday Diamonds',
      description: 'Subtle sparkle for your daily life.',
      link: 'Diamonds',
      imageUrl: 'https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw08083f53/homepage/new-arrivals/new-arrivals-background.jpg',
    },
    {
      title: 'Gifts of Love',
      description: 'Celebrate moments that matter.',
      link: 'Gifts',
      imageUrl: 'https://www.tanishq.co.in/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dwfba22b76/homepage/tanishq-collections/stunning-every-ear.jpg',
    },
  ];

  return (
    <section className="py-20 ">
      <div className=" px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {editorialItems.map((item) => (
            <div
              key={item.title}
              className="relative h-96 rounded-xl overflow-hidden group"
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white z-20">
                <h3 className="text-2xl font-serif mb-1">{item.title}</h3>
                                    {item.description?.paragraphs?.[0] && (
  <p className="text-sm mb-3">
    {item.description.paragraphs[0].split(" ").slice(0, 10).join(" ")}...
  </p>
)}

              
                <Link
                  href={item.link}
                  className="font-semibold text-sm flex items-center group-hover:underline"
                >
                  Shop Now{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
