import React, { useState } from "react";
import SalesCard from "./SalesCard";

export default function FeaturedSection() {
  const [color, setColor] = useState("blue");

  return (
    <section className="max-w-[1050px] mx-auto px-4 py-20 flex flex-col items-center gap-16">
      


      <div className="text-center max-w-[309px]">
        <h6 className="text-sm font-medium text-blue-600">Practice Advice</h6>
        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mt-2">
          Featured Posts
        </h3>
      </div>

 

 
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 w-full">
        <SalesCard buttonColor={color} onColorSelect={setColor} />
        <SalesCard buttonColor={color} onColorSelect={setColor} />
      </div>
    </section>
  );
}
