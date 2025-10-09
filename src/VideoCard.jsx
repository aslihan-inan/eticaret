import React from "react";
import manzara from "./assets/manzara.jpg";

export default function VideoCard() {
  return (
    <section className="w-full flex justify-center relative mt-12 px-4">
      <div className="relative w-full max-w-4xl aspect-[16/9] bg-white rounded-2xl overflow-hidden">
        <img
          src={manzara}
          alt="Video placeholder"
          className="w-full h-full object-cover"
        />

        {/* Play Button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex items-center justify-center bg-blue-500 rounded-full w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32">
            <div
              className="border-l-[18px] border-l-white border-t-[14px] border-t-transparent border-b-[14px] border-b-transparent ml-1"
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
}
