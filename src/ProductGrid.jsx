import React from "react";
import product1 from "./assets/product-1.png";
import product2 from "./assets/product-2.png";
import product3 from "./assets/product-3.png";

const products = [
  { id: 1, title: "Top Product", image: product1 },
  { id: 2, title: "Top Product", image: product2 },
  { id: 3, title: "Top Product", image: product3 },
];

export default function ProductGrid() {
  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row gap-6">
      


        <div className="w-full lg:w-1/2 rounded-lg overflow-hidden relative aspect-[4/3]">
          <img
            src={products[0].image}
            alt={products[0].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 w-full bg-blue-500/80 text-white p-6">
            <h3 className="text-lg font-semibold mb-2">{products[0].title}</h3>
            <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-500 transition">
              EXPLORE ITEMS
            </button>
          </div>
        </div>

        

        
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {[products[1], products[2]].map((product) => (
            <div
              key={product.id}
              className="w-full rounded-lg overflow-hidden relative aspect-[2/1]"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 left-0 w-full bg-blue-500/80 text-white p-6">
                <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                <button className="px-4 py-2 border border-white text-white rounded hover:bg-white hover:text-blue-500 transition">
                  EXPLORE ITEMS
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
