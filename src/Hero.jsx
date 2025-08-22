import React from "react";
import woman from './assets/woman.png';

export default function Hero() {
  return (
<section
  className="relative bg-hooli-gradient rounded-[10px] overflow-hidden w-[1292px] h-[622px] opacity-100 my-[30px] mx-auto flex flex-col md:flex-row items-center justify-between px-20 py-10"
> 
      <div className="z-10 flex-1 text-center md:text-left">
        <p className="text-md font-semibold text-blue-700 uppercase mb-2">SUMMER 2020</p>
        <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
          NEW COLLECTION
        </h1>
        <p className="text-gray-700 mb-6 max-w-md mx-auto md:mx-0">
          We know how large objects will act, but things on a small scale.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded shadow-md transition">
          SHOP NOW
        </button>
      </div>

   

      <div className="hidden md:block absolute top-10 right-20 w-3 h-3 bg-purple-400 rounded-full"></div>
      <div className="hidden md:block absolute bottom-20 right-10 w-2 h-2 bg-white rounded-full"></div>
      <div className="hidden md:block absolute -top-16 right-10 w-72 h-72 bg-white rounded-full z-0"></div>

      
      
      <img 
        src={woman} 
        alt="Happy woman"
        className="hidden md:block absolute top-0 right-0 w-[697px] h-[619px] object-cover z-10"
      />
    </section>
  );
}
