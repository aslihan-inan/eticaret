import React, { useState } from "react";
import SalesCard from "./SalesCard";

export default function FeaturedSection() {
  const [color, setColor] = useState("blue");

  return (
    <section className="w-full max-w-[1050px] mx-auto px-4 sm:px-6 md:px-10 py-16 sm:py-20 flex flex-col items-center gap-12 sm:gap-16">
      
      {/* Header */}
      <div className="text-center max-w-[309px]">
        <h6 className="text-sm sm:text-base font-medium text-blue-600">Practice Advice</h6>
        <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mt-2">
          Featured Posts
        </h3>
      </div>

      {/* Cards */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-6 md:gap-8 w-full">
        <SalesCard buttonColor={color} onColorSelect={setColor} />
        <SalesCard buttonColor={color} onColorSelect={setColor} />
      </div>
    </section>
  );
}
