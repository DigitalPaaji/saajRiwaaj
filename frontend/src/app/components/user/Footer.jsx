import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-stone-100 text-stone-700">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-1">
            <img src="/logo.png" alt="Saaj Riwaaj" className="h-10 mb-4" />
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-amber-700"><Facebook /></a>
              <a href="#" className="hover:text-amber-700"><Instagram /></a>
              <a href="#" className="hover:text-amber-700"><Twitter /></a>
              <a href="#" className="hover:text-amber-700"><Youtube /></a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Shop</h3>
            <ul className="space-y-2 text-stone-600">
              <li><Link href={"Rings"} className="hover:text-amber-700">Rings</Link></li>
              <li><Link href={"Earrings"} className="hover:text-amber-700">Earrings</Link></li>
              <li><Link href={"Necklaces"} className="hover:text-amber-700">Necklaces</Link></li>
              <li><Link href={"Gifts"} className="hover:text-amber-700">Gifts</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">About Saaj Riwaaj</h3>
            <ul className="space-y-2 text-stone-600">
              <li><Link href={"About"} className="hover:text-amber-700">Our Story</Link></li>
              <li><Link href={"Careers"} className="hover:text-amber-700">Careers</Link></li>
              <li><Link href={"Press"} className="hover:text-amber-700">Press</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2 text-stone-600">
              <li><Link href={"Contact"} className="hover:text-amber-700">Contact Us</Link></li>
              <li><Link href={"FAQ"} className="hover:text-amber-700">FAQ</Link></li>
              <li><Link href={"Shipping"} className="hover:text-amber-700">Shipping</Link></li>
              <li><Link href={"Returns"} className="hover:text-amber-700">Returns</Link></li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
             <h3 className="font-semibold mb-4">Sign Up for Our Newsletter</h3>
             <p className="text-stone-600 mb-4">Receive exclusive offers, styling tips, and more.</p>
             <form className="flex">
               <input type="email" placeholder="Your email" className="w-full px-3 py-2 border border-r-0 rounded-l-md focus:outline-none focus:ring-1 focus:ring-amber-500" />
               <button className="bg-stone-800 text-white px-4 rounded-r-md hover:bg-amber-700 transition-colors">Sign Up</button>
             </form>
          </div>
        </div>
        <div className="border-t mt-12 pt-8 text-center text-sm text-stone-500">
          <p>&copy; {new Date().getFullYear()} Saaj Riwaaj. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}