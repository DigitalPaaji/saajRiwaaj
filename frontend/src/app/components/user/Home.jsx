"use client";
import React from "react";
import HeroBanner from "./HeroBanner";
import BestSellers from "./BestSellers";
import EditorialSection from "./EditorialSection";
import Exclusive from "./Exclusive";
import EarringsMarquee from "./Earring";
import Neckwear from "./Neckwear";
export default function Home() {
  return (
    <div className="min-h-screen bg-[#faf8ea] text-stone-800 ">
      {/* <AnnouncementBar /> */}
      {/* <Navbar/> */}
      <HeroBanner />
      <EditorialSection />
      <EarringsMarquee />
      <Exclusive />
      <Neckwear />
      <BestSellers />
      {/* <Footer /> */}
    </div>
  );
}
